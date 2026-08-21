import { sequelize } from "../config/database.js";
import { CustomerNote, SiteSetting } from "../models/index.js";
import { success, created } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { adjustInventory } from "../services/inventoryService.js";
import { dashboardData, reportData } from "../services/dashboardService.js";
import {
  bulkActionResource,
  createResource,
  deleteResource,
  duplicateResource,
  getResource,
  listResource,
  listSettings,
  markNotificationRead,
  saveSettings,
  updateResource,
} from "../services/resourceService.js";
import { saveShipment, updateOrderStatus } from "../services/orderService.js";
import { logActivity } from "../services/auditService.js";

export const dashboard = asyncHandler(async (_req, res) => {
  const data = await dashboardData();
  return success(res, "Dashboard loaded", data);
});

export function list(name) {
  return asyncHandler(async (req, res) => {
    const { rows, pagination } = await listResource(name, req.query);
    return success(res, "Records loaded", rows, 200, { pagination });
  });
}

export function read(name) {
  return asyncHandler(async (req, res) => {
    const record = await getResource(name, req.params.id);
    return success(res, "Record loaded", record);
  });
}

export function create(name) {
  return asyncHandler(async (req, res) => {
    const record = await createResource(name, req.body, req.admin, req);
    return created(res, "Record created successfully", record);
  });
}

export function update(name) {
  return asyncHandler(async (req, res) => {
    const record = await updateResource(name, req.params.id, req.body, req.admin, req);
    return success(res, "Record updated successfully", record);
  });
}

export function remove(name) {
  return asyncHandler(async (req, res) => {
    await deleteResource(name, req.params.id, req.admin, req);
    return success(res, "Record deleted successfully");
  });
}

export function bulk(name) {
  return asyncHandler(async (req, res) => {
    const result = await bulkActionResource(name, req.body, req.admin, req);
    return success(res, "Bulk action completed", result);
  });
}

export function duplicate(name) {
  return asyncHandler(async (req, res) => {
    const record = await duplicateResource(name, req.params.id, req.admin, req);
    return created(res, "Record duplicated successfully", record);
  });
}

export const changeOrderStatus = asyncHandler(async (req, res) => {
  const order = await updateOrderStatus(req.params.id, req.body, req.admin, req);
  return success(res, "Order status updated", order);
});

export const upsertShipment = asyncHandler(async (req, res) => {
  const shipment = await saveShipment(req.params.id, req.body, req.admin, req);
  return success(res, "Shipment updated", shipment);
});

export const inventoryAdjustment = asyncHandler(async (req, res) => {
  const row = await sequelize.transaction((transaction) => adjustInventory(req.params.id, req.body, req.admin.id, transaction));
  await logActivity({
    adminId: req.admin.id,
    action: "Admin adjusted stock",
    module: "inventory",
    recordId: row.id,
    updatedData: req.body,
    ipAddress: req.ip,
  });
  return success(res, "Stock adjusted successfully", row);
});

export const addCustomerNote = asyncHandler(async (req, res) => {
  const note = await CustomerNote.create({ customerId: req.params.id, adminId: req.admin.id, note: req.body.note });
  await logActivity({
    adminId: req.admin.id,
    action: "Admin added customer note",
    module: "customers",
    recordId: req.params.id,
    updatedData: req.body,
    ipAddress: req.ip,
  });
  return created(res, "Customer note added", note);
});

export const settingsIndex = asyncHandler(async (_req, res) => {
  return success(res, "Settings loaded", await listSettings());
});

export const settingsSave = asyncHandler(async (req, res) => {
  const rows = await saveSettings(req.body);
  return success(res, "Settings saved", rows);
});

export const reports = asyncHandler(async (req, res) => {
  const data = await reportData(req.params.type || "sales", req.query);
  return success(res, "Report loaded", data);
});

export const exportReport = asyncHandler(async (req, res) => {
  const data = await reportData(req.params.type || "sales", req.query);
  const plainRows = (data.rows || []).map((row) => (typeof row.toJSON === "function" ? row.toJSON() : row));
  const headers = [...new Set(plainRows.flatMap((row) => Object.keys(row)))];
  const escape = (value) => {
    const text = typeof value === "object" && value !== null ? JSON.stringify(value) : String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  };
  const csv = [headers.join(","), ...plainRows.map((row) => headers.map((header) => escape(row[header])).join(","))].join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename="${req.params.type || "report"}-report.csv"`);
  return res.send(csv);
});

export const readNotification = asyncHandler(async (req, res) => {
  const result = await markNotificationRead(req.params.id, req.admin.id);
  return success(res, "Notification updated", result);
});

export const updateSingleSetting = asyncHandler(async (req, res) => {
  const [row] = await SiteSetting.findOrCreate({
    where: { group: req.params.group, key: req.params.key },
    defaults: { group: req.params.group, key: req.params.key, value: req.body.value },
  });
  await row.update({ value: req.body.value });
  return success(res, "Setting saved", row);
});
