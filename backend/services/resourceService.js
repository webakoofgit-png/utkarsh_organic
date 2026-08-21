import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import {
  Admin,
  Blog,
  BlogCategory,
  BulkOrder,
  Category,
  ContactEnquiry,
  Coupon,
  Customer,
  CustomerAddress,
  CustomerNote,
  Inventory,
  InventoryTransaction,
  Media,
  Notification,
  Order,
  OrderItem,
  OrderStatusHistory,
  Payment,
  Product,
  ProductImage,
  ProductVariant,
  Refund,
  Return,
  Review,
  Role,
  Permission,
  Shipment,
  SiteSetting,
  AdminActivityLog,
} from "../models/index.js";
import { logActivity } from "./auditService.js";
import { createProduct, duplicateProduct, updateProduct } from "./productService.js";
import { getPagination, paginationMeta } from "../utils/pagination.js";
import { notFound, AppError } from "../utils/errors.js";
import { slugify } from "../utils/slug.js";

export const resources = {
  products: {
    model: Product,
    module: "products",
    search: ["name", "slug", "sku", "shortDescription"],
    include: [{ model: Category, as: "category" }, { model: ProductImage, as: "images" }, { model: ProductVariant, as: "variants" }],
    special: "product",
  },
  categories: { model: Category, module: "categories", search: ["name", "slug", "description"], include: [{ model: Category, as: "parent" }] },
  inventory: { model: Inventory, module: "inventory", search: [], include: [{ model: Product, as: "product" }, { model: ProductVariant, as: "variant" }] },
  "inventory-transactions": {
    model: InventoryTransaction,
    module: "inventory",
    search: ["transactionType", "reason"],
    include: [{ model: Product, as: "product" }, { model: ProductVariant, as: "variant" }],
  },
  orders: { model: Order, module: "orders", search: ["orderNumber", "customerName", "customerPhone", "customerEmail"], include: [{ model: OrderItem, as: "items" }, { model: OrderStatusHistory, as: "history" }, { model: Payment, as: "payments" }, { model: Shipment, as: "shipments" }], noDelete: true },
  customers: { model: Customer, module: "customers", search: ["customerCode", "name", "mobile", "email"], include: [{ model: CustomerAddress, as: "addresses" }, { model: CustomerNote, as: "notes" }] },
  blogs: { model: Blog, module: "blogs", search: ["title", "slug", "shortDescription"], include: [{ model: BlogCategory, as: "category" }] },
  "blog-categories": { model: BlogCategory, module: "blogs", search: ["name", "slug", "description"] },
  coupons: { model: Coupon, module: "coupons", search: ["code", "description"] },
  payments: { model: Payment, module: "payments", search: ["paymentId", "transactionId", "paymentMethod"], include: [{ model: Order, as: "order" }], noDelete: true },
  returns: { model: Return, module: "returns", search: ["returnNumber", "reason", "returnStatus"], include: [{ model: Order, as: "order" }] },
  refunds: { model: Refund, module: "refunds", search: ["refundReference", "status", "notes"] },
  "bulk-orders": { model: BulkOrder, module: "bulk-orders", search: ["name", "businessName", "phone", "email", "product", "status"] },
  "contact-enquiries": { model: ContactEnquiry, module: "contact-enquiries", search: ["name", "phone", "email", "subject", "message", "status"] },
  reviews: { model: Review, module: "reviews", search: ["review", "status"], include: [{ model: Product, as: "product" }, { model: Customer, as: "customer" }] },
  notifications: { model: Notification, module: "notifications", search: ["title", "message", "type"] },
  media: { model: Media, module: "media", search: ["filename", "originalName", "mimeType"] },
  "admin-users": { model: Admin, module: "administration", search: ["name", "email", "phone"], include: [Role] },
  roles: { model: Role, module: "administration", search: ["name", "slug", "description"], include: [Permission] },
  "activity-logs": { model: AdminActivityLog, module: "administration", search: ["action", "module", "recordId"], noDelete: true },
};

export function resourceConfig(name) {
  const config = resources[name];
  if (!config) throw notFound("Admin resource not found");
  return config;
}

function searchWhere(config, query) {
  const where = {};
  if (query.status) {
    if (config.model.rawAttributes.status) where.status = query.status;
    if (config.model.rawAttributes.orderStatus) where.orderStatus = query.status;
    if (config.model.rawAttributes.returnStatus) where.returnStatus = query.status;
    if (config.model.rawAttributes.paymentStatus) where.paymentStatus = query.status;
  }
  if (query.paymentStatus && config.model.rawAttributes.paymentStatus) where.paymentStatus = query.paymentStatus;
  if (query.paymentMethod && config.model.rawAttributes.paymentMethod) where.paymentMethod = query.paymentMethod;
  if (query.from || query.to) {
    where.createdAt = {};
    if (query.from) where.createdAt[Op.gte] = new Date(query.from);
    if (query.to) where.createdAt[Op.lte] = new Date(query.to);
  }
  if (query.search && config.search.length) {
    where[Op.or] = config.search.map((field) => ({ [field]: { [Op.like]: `%${query.search}%` } }));
  }
  return where;
}

function sortOrder(query) {
  const sort = query.sort || "createdAt";
  const direction = String(query.order || "desc").toUpperCase() === "ASC" ? "ASC" : "DESC";
  return [[sort, direction]];
}

export async function listResource(name, query) {
  const config = resourceConfig(name);
  const { page, limit, offset } = getPagination(query);
  const result = await config.model.findAndCountAll({
    where: searchWhere(config, query),
    include: config.include || [],
    distinct: true,
    limit,
    offset,
    order: sortOrder(query),
  });
  return { rows: result.rows, pagination: paginationMeta(page, limit, result.count) };
}

export async function getResource(name, id) {
  const config = resourceConfig(name);
  const record = await config.model.findByPk(id, { include: config.include || [] });
  if (!record) throw notFound("Record not found");
  return record;
}

export async function createResource(name, payload, admin, req) {
  const config = resourceConfig(name);
  if (config.special === "product") return createProduct(payload, admin, req);

  const data = { ...payload };
  const roleIds = Array.isArray(data.roleIds) ? data.roleIds.filter(Boolean) : [];
  delete data.roleIds;
  if (data.name && config.model.rawAttributes.slug && !data.slug) data.slug = slugify(data.name);
  if (name === "admin-users") {
    const password = data.password || "ChangeMeImmediately";
    data.passwordHash = await bcrypt.hash(password, 12);
    delete data.password;
    data.forcePasswordChange = true;
  }

  const record = await config.model.create(data);
  if (name === "admin-users" && roleIds.length) await record.setRoles(roleIds);
  await logActivity({
    adminId: admin?.id,
    action: `Admin created ${name}`,
    module: config.module,
    recordId: record.id,
    updatedData: data,
    ipAddress: req?.ip,
  });
  return record;
}

export async function updateResource(name, id, payload, admin, req) {
  const config = resourceConfig(name);
  if (config.special === "product") return updateProduct(id, payload, admin, req);

  const record = await config.model.findByPk(id);
  if (!record) throw notFound("Record not found");
  const previousData = record.toJSON();
  const data = { ...payload };
  const roleIds = Array.isArray(data.roleIds) ? data.roleIds.filter(Boolean) : null;
  delete data.roleIds;
  if (data.name && config.model.rawAttributes.slug && !data.slug) data.slug = slugify(data.name);
  if (name === "admin-users" && data.password) {
    data.passwordHash = await bcrypt.hash(data.password, 12);
    data.forcePasswordChange = true;
    delete data.password;
  }
  await record.update(data);
  if (name === "admin-users" && roleIds) await record.setRoles(roleIds);
  await logActivity({
    adminId: admin?.id,
    action: `Admin updated ${name}`,
    module: config.module,
    recordId: record.id,
    previousData,
    updatedData: data,
    ipAddress: req?.ip,
  });
  return record.reload({ include: config.include || [] });
}

export async function deleteResource(name, id, admin, req) {
  const config = resourceConfig(name);
  if (config.noDelete) throw new AppError("This record type cannot be deleted from the admin panel", 409);
  const record = await config.model.findByPk(id);
  if (!record) throw notFound("Record not found");
  await record.destroy();
  await logActivity({
    adminId: admin?.id,
    action: `Admin deleted ${name}`,
    module: config.module,
    recordId: id,
    previousData: record.toJSON(),
    ipAddress: req?.ip,
  });
  return true;
}

export async function bulkActionResource(name, payload, admin, req) {
  const config = resourceConfig(name);
  if (!Array.isArray(payload.ids) || !payload.ids.length) throw new AppError("No records selected", 422);

  if (payload.action === "delete") {
    if (config.noDelete) throw new AppError("This record type cannot be deleted from the admin panel", 409);
    await config.model.destroy({ where: { id: payload.ids } });
  } else if (payload.action === "activate" && config.model.rawAttributes.status) {
    await config.model.update({ status: "Active" }, { where: { id: payload.ids } });
  } else if (payload.action === "deactivate" && config.model.rawAttributes.status) {
    await config.model.update({ status: "Inactive" }, { where: { id: payload.ids } });
  } else {
    throw new AppError("Unsupported bulk action", 422);
  }

  await logActivity({
    adminId: admin?.id,
    action: `Admin performed ${payload.action} on ${name}`,
    module: config.module,
    recordId: payload.ids.join(","),
    updatedData: payload,
    ipAddress: req?.ip,
  });
  return { affected: payload.ids.length };
}

export async function duplicateResource(name, id, admin, req) {
  if (name !== "products") throw new AppError("Duplicate is only enabled for products", 422);
  return duplicateProduct(id, admin, req);
}

export async function markNotificationRead(id, adminId) {
  if (id === "all") {
    await Notification.update({ isRead: true }, { where: { [Op.or]: [{ adminId }, { adminId: null }] } });
    return { all: true };
  }
  const notification = await Notification.findByPk(id);
  if (!notification) throw notFound("Notification not found");
  await notification.update({ isRead: true });
  return notification;
}

export async function saveSettings(groups) {
  const rows = [];
  for (const [group, values] of Object.entries(groups || {})) {
    for (const [key, value] of Object.entries(values || {})) {
      const [row] = await SiteSetting.findOrCreate({ where: { group, key }, defaults: { group, key, value } });
      await row.update({ value });
      rows.push(row);
    }
  }
  return rows;
}

export async function listSettings() {
  const rows = await SiteSetting.findAll({ order: [["group", "ASC"], ["key", "ASC"]] });
  return rows.reduce((acc, row) => {
    if (!acc[row.group]) acc[row.group] = {};
    acc[row.group][row.key] = row.value;
    return acc;
  }, {});
}
