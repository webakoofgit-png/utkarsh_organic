import { Router } from "express";
import {
  addCustomerNote,
  bulk,
  changeOrderStatus,
  create,
  dashboard,
  duplicate,
  exportReport,
  inventoryAdjustment,
  list,
  read,
  readNotification,
  remove,
  reports,
  settingsIndex,
  settingsSave,
  update,
  updateSingleSetting,
  upsertShipment,
} from "../controllers/adminController.js";
import { deleteMedia, uploadMedia } from "../controllers/mediaController.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { customerNoteSchema, inventoryAdjustmentSchema, orderStatusSchema, shipmentSchema } from "../validations/adminSchemas.js";

const router = Router();

router.use(authenticate);

router.get("/dashboard", authorize("dashboard:read"), dashboard);
router.get("/reports/:type?", authorize("reports:read"), reports);
router.get("/reports/:type/export/csv", authorize("reports:read"), exportReport);
router.get("/settings", authorize("settings:read"), settingsIndex);
router.put("/settings", authorize("settings:update"), settingsSave);
router.put("/settings/:group/:key", authorize("settings:update"), updateSingleSetting);
router.post("/media/upload", authorize("media:create"), upload.array("files", 12), uploadMedia);
router.delete("/media/:id", authorize("media:delete"), deleteMedia);
router.patch("/notifications/:id/read", authorize("notifications:update"), readNotification);

router.get("/inventory/transactions", authorize("inventory:read"), list("inventory-transactions"));
router.post("/inventory/:id/adjust", authorize("inventory:update"), validate(inventoryAdjustmentSchema), inventoryAdjustment);
router.patch("/orders/:id/status", authorize("orders:update"), validate(orderStatusSchema), changeOrderStatus);
router.put("/orders/:id/shipment", authorize("orders:update"), validate(shipmentSchema), upsertShipment);
router.post("/customers/:id/notes", authorize("customers:update"), validate(customerNoteSchema), addCustomerNote);

function crud(path, resource, permission = resource) {
  router.get(`/${path}`, authorize(`${permission}:read`), list(resource));
  router.post(`/${path}`, authorize(`${permission}:create`), create(resource));
  router.post(`/${path}/bulk`, authorize(`${permission}:delete`, `${permission}:update`), bulk(resource));
  router.post(`/${path}/:id/duplicate`, authorize(`${permission}:create`), duplicate(resource));
  router.get(`/${path}/:id`, authorize(`${permission}:read`), read(resource));
  router.put(`/${path}/:id`, authorize(`${permission}:update`), update(resource));
  router.patch(`/${path}/:id`, authorize(`${permission}:update`), update(resource));
  router.delete(`/${path}/:id`, authorize(`${permission}:delete`), remove(resource));
}

crud("products", "products");
crud("categories", "categories");
crud("inventory", "inventory");
crud("orders", "orders");
crud("customers", "customers");
crud("blogs", "blogs");
crud("blog-categories", "blog-categories", "blogs");
crud("coupons", "coupons");
crud("payments", "payments");
crud("returns", "returns");
crud("refunds", "refunds");
crud("bulk-orders", "bulk-orders");
crud("contact-enquiries", "contact-enquiries");
crud("reviews", "reviews");
crud("notifications", "notifications");
crud("media", "media");
crud("admin-users", "admin-users", "administration");
crud("roles", "roles", "administration");
crud("activity-logs", "activity-logs", "administration");

export default router;
