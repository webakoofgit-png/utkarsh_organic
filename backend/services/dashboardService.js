import { Op, fn, col, literal } from "sequelize";
import {
  BulkOrder,
  ContactEnquiry,
  Customer,
  Inventory,
  Order,
  OrderItem,
  Product,
  ProductVariant,
  Review,
} from "../models/index.js";

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth() {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function dashboardData() {
  const [totalSales, todaySales, monthlyRevenue, totalOrders, totalCustomers, totalProducts, lowStock, outOfStock, recentOrders, orderStatusRows, topRows, newBulk, newEnquiries, pendingReviews] = await Promise.all([
    Order.sum("grandTotal", { where: { paymentStatus: { [Op.in]: ["Paid", "Pending", "Pending Verification"] } } }),
    Order.sum("grandTotal", { where: { createdAt: { [Op.gte]: startOfToday() } } }),
    Order.sum("grandTotal", { where: { createdAt: { [Op.gte]: startOfMonth() } } }),
    Order.count(),
    Customer.count(),
    Product.count(),
    Inventory.count({ where: { status: "Low Stock" } }),
    Inventory.count({ where: { status: "Out of Stock" } }),
    Order.findAll({ include: ["items"], order: [["createdAt", "DESC"]], limit: 8 }),
    Order.findAll({ attributes: ["orderStatus", [fn("COUNT", col("id")), "count"]], group: ["orderStatus"], raw: true }),
    OrderItem.findAll({
      attributes: ["productId", "productName", "image", [fn("SUM", col("quantity")), "unitsSold"], [fn("SUM", col("total")), "revenue"]],
      group: ["productId", "productName", "image"],
      order: [[literal("unitsSold"), "DESC"]],
      limit: 6,
      raw: true,
    }),
    BulkOrder.count({ where: { status: "New" } }),
    ContactEnquiry.count({ where: { status: "New" } }),
    Review.count({ where: { status: "Pending" } }),
  ]);

  const statusCount = Object.fromEntries(orderStatusRows.map((row) => [row.orderStatus, Number(row.count)]));
  const revenueSeries = await Order.findAll({
    attributes: [[fn("DATE", col("created_at")), "date"], [fn("SUM", col("grand_total")), "revenue"], [fn("COUNT", col("id")), "orders"]],
    where: { createdAt: { [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    group: [fn("DATE", col("created_at"))],
    order: [[fn("DATE", col("created_at")), "ASC"]],
    raw: true,
  });

  return {
    stats: {
      totalSales: Number(totalSales || 0),
      todaySales: Number(todaySales || 0),
      monthlyRevenue: Number(monthlyRevenue || 0),
      totalOrders,
      pendingOrders: statusCount.Pending || 0,
      processingOrders: statusCount.Processing || 0,
      shippedOrders: statusCount.Shipped || 0,
      deliveredOrders: statusCount.Delivered || 0,
      cancelledOrders: statusCount.Cancelled || 0,
      totalCustomers,
      totalProducts,
      lowStockProducts: lowStock,
      outOfStockProducts: outOfStock,
      newBulkOrders: newBulk,
      newEnquiries,
      pendingReviews,
    },
    revenueSeries,
    orderStatus: Object.entries(statusCount).map(([status, count]) => ({ status, count })),
    topSellingProducts: topRows,
    recentOrders,
  };
}

export async function reportData(type, query) {
  const where = {};
  if (query.from || query.to) {
    where.createdAt = {};
    if (query.from) where.createdAt[Op.gte] = new Date(query.from);
    if (query.to) where.createdAt[Op.lte] = new Date(query.to);
  }

  if (type === "sales") {
    const rows = await Order.findAll({ where, order: [["createdAt", "DESC"]] });
    return {
      rows,
      summary: {
        grossSales: rows.reduce((sum, row) => sum + Number(row.subtotal || 0), 0),
        discounts: rows.reduce((sum, row) => sum + Number(row.discount || 0), 0),
        tax: rows.reduce((sum, row) => sum + Number(row.tax || 0), 0),
        shipping: rows.reduce((sum, row) => sum + Number(row.shipping || 0), 0),
        refunds: rows.filter((row) => row.orderStatus === "Refunded").reduce((sum, row) => sum + Number(row.grandTotal || 0), 0),
        netSales: rows.reduce((sum, row) => sum + Number(row.grandTotal || 0), 0),
      },
    };
  }

  if (type === "product") {
    const rows = await OrderItem.findAll({
      attributes: ["productId", "productName", [fn("SUM", col("quantity")), "quantitySold"], [fn("SUM", col("total")), "revenue"]],
      group: ["productId", "productName"],
      raw: true,
    });
    return { rows };
  }

  if (type === "inventory") {
    const rows = await Inventory.findAll({ include: [{ model: Product, as: "product" }, { model: ProductVariant, as: "variant" }] });
    return {
      rows,
      summary: {
        currentStock: rows.reduce((sum, row) => sum + Number(row.availableStock || 0), 0),
        lowStock: rows.filter((row) => row.status === "Low Stock").length,
        outOfStock: rows.filter((row) => row.status === "Out of Stock").length,
        inventoryValue: rows.reduce((sum, row) => sum + Number(row.availableStock || 0) * Number(row.product?.costPrice || row.product?.regularPrice || 0), 0),
      },
    };
  }

  const customers = await Customer.findAll({ include: ["orders"], order: [["totalSpend", "DESC"]] });
  return {
    rows: customers,
    summary: {
      newCustomers: customers.filter((customer) => new Date(customer.createdAt) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
      returningCustomers: customers.filter((customer) => Number(customer.totalOrders || 0) > 1).length,
      topCustomers: customers.slice(0, 10),
    },
  };
}
