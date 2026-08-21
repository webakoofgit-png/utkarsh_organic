import { AdminActivityLog, Notification } from "../models/index.js";

export async function logActivity({ adminId, action, module, recordId, previousData, updatedData, ipAddress, transaction }) {
  return AdminActivityLog.create(
    { adminId, action, module, recordId: recordId ? String(recordId) : null, previousData, updatedData, ipAddress },
    { transaction }
  );
}

export async function notifyAdmin({ title, message, type = "Info", link, adminId = null, transaction }) {
  return Notification.create({ title, message, type, link, adminId }, { transaction });
}
