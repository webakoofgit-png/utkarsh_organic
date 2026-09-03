import { Router } from "express";
import {
  blogDetail,
  bulkOrder,
  contact,
  createOrder,
  createReview,
  listBlogs,
  listCategories,
  listCoupons,
  listProducts,
  orderTracking,
  productDetail,
  validateCoupon,
} from "../controllers/storeController.js";
import { validate } from "../middleware/validate.js";
import { bulkOrderSchema, contactSchema, couponValidationSchema, storeOrderSchema, trackingSchema } from "../validations/storeSchemas.js";

const router = Router();

router.get("/products", listProducts);
router.get("/products/:slug", productDetail);
router.get("/categories", listCategories);
router.get("/blogs", listBlogs);
router.get("/blogs/:slug", blogDetail);
router.get("/coupons", listCoupons);
router.post("/coupons/validate", validate(couponValidationSchema), validateCoupon);
router.post("/orders", validate(storeOrderSchema), createOrder);
router.post("/order-tracking", validate(trackingSchema), orderTracking);
router.post("/contact-enquiries", validate(contactSchema), contact);
router.post("/bulk-orders", validate(bulkOrderSchema), bulkOrder);
router.post("/reviews", createReview);

export default router;
