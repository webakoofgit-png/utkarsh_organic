import { Op } from "sequelize";
import { sequelize } from "../config/database.js";
import {
  Coupon,
  CouponUsage,
  Customer,
  CustomerAddress,
  Inventory,
  InventoryTransaction,
  Order,
  OrderItem,
  OrderSequence,
  OrderStatusHistory,
  Payment,
  Product,
  ProductVariant,
  Shipment,
  ShipmentTracking,
} from "../models/index.js";
import { logActivity, notifyAdmin } from "./auditService.js";
import { inventoryStatus, recordInventoryChange } from "./inventoryService.js";
import { AppError, notFound } from "../utils/errors.js";

async function generateOrderNumber(transaction) {
  const year = new Date().getFullYear();
  let sequence = await OrderSequence.findByPk(year, { transaction, lock: true });
  if (!sequence) sequence = await OrderSequence.create({ year, nextNumber: 1 }, { transaction });
  const orderNumber = `UTK-${year}-${String(sequence.nextNumber).padStart(6, "0")}`;
  sequence.nextNumber += 1;
  await sequence.save({ transaction });
  return orderNumber;
}

async function applyCoupon(couponCode, subtotal, customerId, transaction) {
  if (!couponCode) return { discount: 0, coupon: null };
  const coupon = await Coupon.findOne({ where: { code: couponCode.toUpperCase(), status: "Active" }, transaction });
  if (!coupon) throw new AppError("Coupon is invalid or inactive", 422);

  const now = new Date();
  if (coupon.startDate && new Date(coupon.startDate) > now) throw new AppError("Coupon is not active yet", 422);
  if (coupon.expiryDate && new Date(coupon.expiryDate) < now) throw new AppError("Coupon has expired", 422);
  if (Number(coupon.minimumOrder || 0) > subtotal) throw new AppError("Minimum order value not reached for this coupon", 422);

  if (coupon.usageLimit) {
    const usageCount = await CouponUsage.count({ where: { couponId: coupon.id }, transaction });
    if (usageCount >= coupon.usageLimit) throw new AppError("Coupon usage limit reached", 422);
  }
  if (coupon.usagePerCustomer && customerId) {
    const customerUsage = await CouponUsage.count({ where: { couponId: coupon.id, customerId }, transaction });
    if (customerUsage >= coupon.usagePerCustomer) throw new AppError("Coupon customer usage limit reached", 422);
  }

  let discount = 0;
  if (coupon.discountType === "Percentage") discount = Math.round((subtotal * Number(coupon.discountValue || 0)) / 100);
  if (coupon.discountType === "Fixed Amount") discount = Number(coupon.discountValue || 0);
  if (coupon.discountType === "Free Shipping") discount = 0;
  if (coupon.maximumDiscount) discount = Math.min(discount, Number(coupon.maximumDiscount));
  return { discount, coupon };
}

export async function createStoreOrder(payload) {
  return sequelize.transaction(async (transaction) => {
    const [customer] = await Customer.findOrCreate({
      where: { mobile: payload.customer.phone },
      defaults: {
        customerCode: `CUST-${Date.now().toString().slice(-8)}`,
        name: payload.customer.name,
        mobile: payload.customer.phone,
        email: payload.customer.email,
      },
      transaction,
    });
    await customer.update({ name: payload.customer.name, email: payload.customer.email || customer.email }, { transaction });

    const shippingAddress = payload.shippingAddress;
    await CustomerAddress.create({ ...shippingAddress, customerId: customer.id, type: "Shipping" }, { transaction });

    const computedItems = [];
    let subtotal = 0;
    let tax = 0;

    for (const item of payload.items) {
      const product = await Product.findOne({ where: { slug: item.slug, status: "Active" }, transaction });
      if (!product) throw new AppError(`Product unavailable: ${item.slug}`, 422);

      let variant = null;
      if (item.variantId) variant = await ProductVariant.findOne({ where: { id: item.variantId, productId: product.id, status: "Active" }, transaction });
      if (!variant && item.weight) {
        variant = await ProductVariant.findOne({ where: { productId: product.id, weight: item.weight, status: "Active" }, transaction });
      }

      const inventory = await Inventory.findOne({
        where: { productId: product.id, variantId: variant?.id || null },
        transaction,
        lock: true,
      });
      if (!inventory || Number(inventory.availableStock) < Number(item.quantity)) {
        throw new AppError(`${product.name} does not have enough stock`, 409);
      }

      const unitPrice = Number(variant?.salePrice || variant?.price || product.salePrice || product.regularPrice || 0);
      const lineSubtotal = unitPrice * Number(item.quantity);
      const lineTax = Math.round((lineSubtotal * Number(product.gstPercent || 0)) / 100);
      subtotal += lineSubtotal;
      tax += lineTax;

      computedItems.push({
        product,
        variant,
        inventory,
        quantity: Number(item.quantity),
        unitPrice,
        lineTax,
        lineTotal: lineSubtotal + lineTax,
      });
    }

    const { discount, coupon } = await applyCoupon(payload.couponCode, subtotal, customer.id, transaction);
    const shipping = subtotal - discount >= 500 ? 0 : 50;
    const grandTotal = Math.max(0, subtotal - discount + tax + shipping);
    const orderNumber = await generateOrderNumber(transaction);

    const order = await Order.create(
      {
        orderNumber,
        customerId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.mobile,
        subtotal,
        discount,
        couponDiscount: discount,
        tax,
        shipping,
        grandTotal,
        paymentMethod: payload.paymentMethod,
        paymentStatus: payload.paymentMethod === "COD" ? "Pending" : "Pending Verification",
        orderStatus: "Confirmed",
        trackingStatus: "Order Confirmed",
        billingAddress: payload.billingAddress || shippingAddress,
        shippingAddress,
        couponCode: coupon?.code || null,
        notes: payload.notes,
      },
      { transaction }
    );

    for (const item of computedItems) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.product.id,
          variantId: item.variant?.id || null,
          productName: item.product.name,
          sku: item.variant?.sku || item.product.sku,
          variantName: item.variant?.weight || item.product.weight || item.product.unit,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          tax: item.lineTax,
          total: item.lineTotal,
          image: item.product.mainImage,
        },
        { transaction }
      );

      await recordInventoryChange({
        inventory: item.inventory,
        changedQuantity: -item.quantity,
        transactionType: "Sale",
        reason: `Order ${orderNumber}`,
        relatedOrderId: order.id,
        transaction,
      });
    }

    await Payment.create(
      {
        orderId: order.id,
        customerId: customer.id,
        amount: grandTotal,
        paymentMethod: payload.paymentMethod,
        gateway: payload.paymentMethod === "COD" ? "Manual" : "Pending Gateway",
        paymentStatus: payload.paymentMethod === "COD" ? "Pending" : "Pending",
      },
      { transaction }
    );

    if (coupon) await CouponUsage.create({ couponId: coupon.id, customerId: customer.id, orderId: order.id, discountAmount: discount }, { transaction });

    await OrderStatusHistory.bulkCreate(
      [
        { orderId: order.id, status: "Order Placed", note: "Order received from storefront" },
        { orderId: order.id, status: "Confirmed", note: "Inventory verified and deducted" },
      ],
      { transaction }
    );

    await customer.increment({ totalOrders: 1, totalSpend: grandTotal }, { transaction });
    customer.lastOrderAt = new Date();
    await customer.save({ transaction });

    await notifyAdmin({
      title: "New Order Received",
      message: `${orderNumber} placed by ${customer.name}`,
      type: "Order",
      link: `/orders/${order.id}`,
      transaction,
    });

    return order.reload({ include: ["items", "history", "payments"], transaction });
  });
}

export async function updateOrderStatus(orderId, payload, admin, req) {
  return sequelize.transaction(async (transaction) => {
    const order = await Order.findByPk(orderId, { include: [{ model: OrderItem, as: "items" }], transaction, lock: true });
    if (!order) throw notFound("Order not found");
    const previousStatus = order.orderStatus;

    if (payload.status === "Cancelled" && previousStatus !== "Cancelled") {
      for (const item of order.items || []) {
        const inventory = await Inventory.findOne({ where: { productId: item.productId, variantId: item.variantId || null }, transaction, lock: true });
        if (inventory) {
          await recordInventoryChange({
            inventory,
            changedQuantity: item.quantity,
            transactionType: "Cancellation",
            reason: `Cancelled ${order.orderNumber}`,
            relatedOrderId: order.id,
            changedBy: admin?.id,
            transaction,
          });
        }
      }
      order.paymentStatus = order.paymentStatus === "Paid" ? "Refunded" : order.paymentStatus;
    }

    order.orderStatus = payload.status;
    order.trackingStatus = payload.status;
    await order.save({ transaction });

    await OrderStatusHistory.create(
      { orderId: order.id, status: payload.status, note: payload.note, changedBy: admin?.id },
      { transaction }
    );

    await logActivity({
      adminId: admin?.id,
      action: `Admin changed ${order.orderNumber} to ${payload.status}`,
      module: "orders",
      recordId: order.id,
      previousData: { orderStatus: previousStatus },
      updatedData: { orderStatus: payload.status },
      ipAddress: req?.ip,
      transaction,
    });

    return order.reload({ include: ["items", "history", "payments", "shipments"], transaction });
  });
}

export async function saveShipment(orderId, payload, admin, req) {
  return sequelize.transaction(async (transaction) => {
    const order = await Order.findByPk(orderId, { transaction });
    if (!order) throw notFound("Order not found");
    const [shipment] = await Shipment.findOrCreate({
      where: { orderId: order.id },
      defaults: { orderId: order.id, ...payload },
      transaction,
    });
    await shipment.update(payload, { transaction });
    await ShipmentTracking.create(
      {
        shipmentId: shipment.id,
        status: payload.deliveryStatus || shipment.deliveryStatus || "Processing",
        note: payload.notes || "Shipment updated",
      },
      { transaction }
    );
    order.trackingStatus = payload.deliveryStatus || order.trackingStatus;
    await order.save({ transaction });
    await logActivity({
      adminId: admin?.id,
      action: `Admin updated shipment for ${order.orderNumber}`,
      module: "shipments",
      recordId: shipment.id,
      updatedData: payload,
      ipAddress: req?.ip,
      transaction,
    });
    return shipment.reload({ include: ["tracking"], transaction });
  });
}

export async function trackOrder(orderNumber, contact) {
  const order = await Order.findOne({
    where: {
      orderNumber,
      [Op.or]: [{ customerPhone: contact }, { customerEmail: contact }],
    },
    include: ["items", "history", { model: Shipment, as: "shipments", include: ["tracking"] }],
  });
  if (!order) throw notFound("Order was not found for the provided details");
  return order;
}

export async function lowStockRows() {
  return Inventory.findAll({
    where: { status: { [Op.in]: ["Low Stock", "Out of Stock"] } },
    include: [{ model: Product, as: "product" }, { model: ProductVariant, as: "variant" }],
    limit: 20,
    order: [["availableStock", "ASC"]],
  });
}

export async function resyncInventoryStatuses() {
  const rows = await Inventory.findAll();
  await Promise.all(
    rows.map((row) =>
      row.update({
        status: inventoryStatus(row.availableStock, row.minimumStock),
        lastUpdated: new Date(),
      })
    )
  );
}
