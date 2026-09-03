import Joi from "joi";

const addressSchema = Joi.object({
  name: Joi.string().max(140).required(),
  phone: Joi.string().max(30).required(),
  line1: Joi.string().max(255).required(),
  line2: Joi.string().allow("", null),
  city: Joi.string().max(100).required(),
  state: Joi.string().max(100).required(),
  pincode: Joi.string().max(20).required(),
  country: Joi.string().max(80).default("India"),
});

export const storeOrderSchema = Joi.object({
  customer: Joi.object({
    name: Joi.string().max(140).required(),
    email: Joi.string().email().allow("", null),
    phone: Joi.string().max(30).required(),
  }).required(),
  billingAddress: addressSchema.optional(),
  shippingAddress: addressSchema.required(),
  items: Joi.array()
    .items(
      Joi.object({
        slug: Joi.string().required(),
        variantId: Joi.number().integer().allow(null),
        weight: Joi.string().allow("", null),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
  couponCode: Joi.string().allow("", null),
  paymentMethod: Joi.string().valid("COD", "UPI", "Card", "Net Banking").default("COD"),
  notes: Joi.string().allow("", null),
});

export const couponValidationSchema = Joi.object({
  couponCode: Joi.string().trim().max(80).required(),
  subtotal: Joi.number().min(0).required(),
});

export const trackingSchema = Joi.object({
  orderNumber: Joi.string().required(),
  contact: Joi.string().required(),
});

export const contactSchema = Joi.object({
  name: Joi.string().max(140).required(),
  phone: Joi.string().allow("", null),
  email: Joi.string().email().allow("", null),
  subject: Joi.string().max(180).allow("", null),
  message: Joi.string().required(),
});

export const bulkOrderSchema = Joi.object({
  name: Joi.string().max(140).required(),
  businessName: Joi.string().max(180).allow("", null),
  phone: Joi.string().max(30).required(),
  email: Joi.string().email().allow("", null),
  gstNumber: Joi.string().allow("", null),
  product: Joi.string().allow("", null),
  quantity: Joi.string().allow("", null),
  requiredDate: Joi.date().allow(null),
  deliveryLocation: Joi.string().allow("", null),
  message: Joi.string().allow("", null),
});
