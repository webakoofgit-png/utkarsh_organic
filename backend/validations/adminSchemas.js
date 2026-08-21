import Joi from "joi";

export const statusSchema = Joi.object({
  status: Joi.string().required(),
  note: Joi.string().allow("", null),
});

export const orderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("Pending", "Confirmed", "Processing", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Returned", "Refunded")
    .required(),
  note: Joi.string().allow("", null),
});

export const shipmentSchema = Joi.object({
  courierCompany: Joi.string().allow("", null),
  trackingNumber: Joi.string().allow("", null),
  trackingUrl: Joi.string().allow("", null),
  dispatchDate: Joi.date().allow(null),
  expectedDeliveryDate: Joi.date().allow(null),
  deliveryStatus: Joi.string().allow("", null),
  notes: Joi.string().allow("", null),
});

export const inventoryAdjustmentSchema = Joi.object({
  mode: Joi.string().valid("add", "reduce", "set", "damage", "return", "correction").required(),
  quantity: Joi.number().integer().min(0).required(),
  reason: Joi.string().allow("", null),
  transactionType: Joi.string().allow("", null),
});

export const customerNoteSchema = Joi.object({
  note: Joi.string().required(),
});
