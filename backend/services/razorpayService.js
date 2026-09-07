import crypto from "crypto";
import { env } from "../config/env.js";
import { Order, OrderStatusHistory, Payment } from "../models/index.js";
import { notifyAdmin } from "./auditService.js";
import { createStoreOrder } from "./orderService.js";
import { AppError, notFound } from "../utils/errors.js";

const RAZORPAY_API_BASE = "https://api.razorpay.com/v1";

function requireRazorpayCredentials() {
  if (!env.razorpay.keyId || !env.razorpay.keySecret) {
    throw new AppError("Razorpay credentials are not configured", 500);
  }
  return env.razorpay;
}

function amountToSubunits(amount) {
  const value = Math.round(Number(amount || 0) * 100);
  if (!Number.isFinite(value) || value <= 0) {
    throw new AppError("Order amount is invalid for online payment", 422);
  }
  return value;
}

async function razorpayRequest(path, options = {}) {
  const credentials = requireRazorpayCredentials();
  const auth = Buffer.from(`${credentials.keyId}:${credentials.keySecret}`).toString("base64");
  const response = await fetch(`${RAZORPAY_API_BASE}${path}`, {
    method: options.method || "GET",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.error?.description || payload?.message || "Razorpay request failed";
    throw new AppError(message, 502, payload?.error || {});
  }

  return payload;
}

function safeSignatureMatches(expected, received) {
  if (!/^[a-f0-9]{64}$/i.test(received || "")) return false;
  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(received, "hex");
  return expectedBuffer.length === receivedBuffer.length && crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function createRazorpayStoreOrder(payload) {
  const credentials = requireRazorpayCredentials();
  const paymentMethod = payload.paymentMethod === "COD" ? "UPI" : payload.paymentMethod;
  const order = await createStoreOrder({ ...payload, paymentMethod });
  const amount = amountToSubunits(order.grandTotal);

  try {
    const razorpayOrder = await razorpayRequest("/orders", {
      method: "POST",
      body: {
        amount,
        currency: credentials.currency,
        receipt: order.orderNumber,
        notes: {
          internal_order_id: String(order.id),
          order_number: order.orderNumber,
          customer_phone: order.customerPhone || "",
        },
      },
    });

    const payment = await Payment.findOne({ where: { orderId: order.id }, order: [["createdAt", "DESC"]] });
    if (payment) {
      await payment.update({
        gateway: "Razorpay",
        transactionId: razorpayOrder.id,
        paymentStatus: "Pending",
        rawPayload: { razorpayOrder },
      });
    }

    const reloadedOrder = await Order.findByPk(order.id, { include: ["items", "history", "payments"] });
    return {
      order: reloadedOrder,
      razorpay: {
        keyId: credentials.keyId,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Utkarsh Organic",
        description: `Payment for ${order.orderNumber}`,
        prefill: {
          name: order.customerName || "",
          email: order.customerEmail || "",
          contact: order.customerPhone || "",
        },
      },
    };
  } catch (error) {
    await order.update({ paymentStatus: "Gateway Error" });
    await Payment.update(
      {
        gateway: "Razorpay",
        paymentStatus: "Failed",
        rawPayload: { error: error.message },
      },
      { where: { orderId: order.id } }
    );
    throw error;
  }
}

async function markRazorpayPaymentPaid(payment, razorpayPayment, source) {
  const existingPayload = payment.rawPayload && typeof payment.rawPayload === "object" ? payment.rawPayload : {};

  if (payment.paymentStatus === "Paid" && payment.paymentId === razorpayPayment.id) {
    return payment.order.reload({ include: ["items", "history", "payments"] });
  }

  await payment.update({
    gateway: "Razorpay",
    paymentId: razorpayPayment.id,
    transactionId: razorpayPayment.order_id || payment.transactionId,
    paymentStatus: "Paid",
    paymentDate: new Date((razorpayPayment.created_at || Math.floor(Date.now() / 1000)) * 1000),
    verifiedAt: new Date(),
    rawPayload: {
      ...existingPayload,
      [source]: razorpayPayment,
    },
  });

  await payment.order.update({
    paymentStatus: "Paid",
    orderStatus: "Confirmed",
    trackingStatus: "Order Confirmed",
  });

  await OrderStatusHistory.create({
    orderId: payment.order.id,
    status: "Payment Paid",
    note: source === "reconciledPayment" ? "Razorpay payment reconciled from server" : "Razorpay payment signature verified",
  });

  await notifyAdmin({
    title: "Payment Received",
    message: `Razorpay payment received for ${payment.order.orderNumber}`,
    type: "Payment",
    link: `/payments/${payment.id}`,
  });

  return payment.order.reload({ include: ["items", "history", "payments"] });
}

async function markRazorpayPaymentFailed(payment, razorpayPayment) {
  const existingPayload = payment.rawPayload && typeof payment.rawPayload === "object" ? payment.rawPayload : {};
  const reason = razorpayPayment.error_description || razorpayPayment.error_reason || "Razorpay payment failed";

  await payment.update({
    gateway: "Razorpay",
    paymentId: razorpayPayment.id,
    transactionId: razorpayPayment.order_id || payment.transactionId,
    paymentStatus: "Failed",
    rawPayload: {
      ...existingPayload,
      failedPayment: razorpayPayment,
    },
  });

  await payment.order.update({
    paymentStatus: "Failed",
  });

  await OrderStatusHistory.create({
    orderId: payment.order.id,
    status: "Payment Failed",
    note: reason,
  });
}

async function captureAuthorizedPayment(razorpayPayment, amount, currency) {
  if (razorpayPayment.status !== "authorized") return razorpayPayment;
  return razorpayRequest(`/payments/${encodeURIComponent(razorpayPayment.id)}/capture`, {
    method: "POST",
    body: { amount, currency },
  });
}

async function successfulPaymentForOrder(razorpayOrderId, amount, currency) {
  const payload = await razorpayRequest(`/orders/${encodeURIComponent(razorpayOrderId)}/payments`);
  const payments = Array.isArray(payload?.items) ? payload.items : [];
  const paidPayment = payments.find(
    (item) =>
      item.order_id === razorpayOrderId &&
      Number(item.amount) === amount &&
      item.currency === currency &&
      ["captured", "authorized"].includes(item.status)
  );

  if (!paidPayment) {
    const failedPayment = payments.find(
      (item) =>
        item.order_id === razorpayOrderId &&
        Number(item.amount) === amount &&
        item.currency === currency &&
        item.status === "failed"
    );

    if (failedPayment) {
      const message = failedPayment.error_description || failedPayment.error_reason || "Razorpay payment failed";
      const error = new AppError(`Razorpay payment failed: ${message}`, 402);
      error.razorpayPayment = failedPayment;
      throw error;
    }

    throw new AppError("Payment is still pending with Razorpay", 409);
  }

  const payment = await captureAuthorizedPayment(paidPayment, amount, currency);
  if (payment.status !== "captured") {
    throw new AppError("Razorpay payment is not captured yet", 409);
  }
  return payment;
}

export async function verifyRazorpayStorePayment(payload) {
  const credentials = requireRazorpayCredentials();
  const payment = await Payment.findOne({
    where: { transactionId: payload.razorpayOrderId },
    include: [{ model: Order, as: "order" }],
  });

  if (!payment || !payment.order) throw notFound("Payment record was not found");
  if (payload.orderNumber && payment.order.orderNumber !== payload.orderNumber) {
    throw new AppError("Payment does not match this order", 400);
  }

  const expected = crypto
    .createHmac("sha256", credentials.keySecret)
    .update(`${payment.transactionId}|${payload.razorpayPaymentId}`)
    .digest("hex");

  if (!safeSignatureMatches(expected, payload.razorpaySignature)) {
    await payment.update({
      paymentId: payload.razorpayPaymentId,
      paymentStatus: "Failed",
      rawPayload: {
        ...(payment.rawPayload && typeof payment.rawPayload === "object" ? payment.rawPayload : {}),
        failedVerification: {
          razorpayOrderId: payload.razorpayOrderId,
          razorpayPaymentId: payload.razorpayPaymentId,
        },
      },
    });
    throw new AppError("Razorpay payment verification failed", 400);
  }

  const razorpayPayment = {
    id: payload.razorpayPaymentId,
    order_id: payload.razorpayOrderId,
    amount: amountToSubunits(payment.amount),
    currency: credentials.currency,
    status: "captured",
    created_at: Math.floor(Date.now() / 1000),
  };

  return markRazorpayPaymentPaid(payment, razorpayPayment, "verification");
}

export async function reconcileRazorpayStorePayment(payload) {
  const credentials = requireRazorpayCredentials();
  const payment = await Payment.findOne({
    where: { transactionId: payload.razorpayOrderId },
    include: [{ model: Order, as: "order" }],
  });

  if (!payment || !payment.order) throw notFound("Payment record was not found");
  if (payload.orderNumber && payment.order.orderNumber !== payload.orderNumber) {
    throw new AppError("Payment does not match this order", 400);
  }

  const amount = amountToSubunits(payment.amount);
  let razorpayPayment;
  try {
    razorpayPayment = await successfulPaymentForOrder(payload.razorpayOrderId, amount, credentials.currency);
  } catch (error) {
    if (error.razorpayPayment) await markRazorpayPaymentFailed(payment, error.razorpayPayment);
    throw error;
  }
  return markRazorpayPaymentPaid(payment, razorpayPayment, "reconciledPayment");
}
