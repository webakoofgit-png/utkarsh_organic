import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const money = () => ({ type: DataTypes.DECIMAL(12, 2), defaultValue: 0 });
const statusString = { type: DataTypes.STRING(40), defaultValue: "Active" };

export const Role = sequelize.define("Role", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(80), allowNull: false, unique: true },
  slug: { type: DataTypes.STRING(90), allowNull: false, unique: true },
  description: DataTypes.STRING(255),
  status: statusString,
}, { tableName: "roles" });

export const Permission = sequelize.define("Permission", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  module: { type: DataTypes.STRING(80), allowNull: false },
  action: { type: DataTypes.STRING(40), allowNull: false },
}, { tableName: "permissions", timestamps: false });

export const RolePermission = sequelize.define("RolePermission", {
  roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  permissionId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, { tableName: "role_permissions", timestamps: false });

export const Admin = sequelize.define("Admin", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  email: { type: DataTypes.STRING(190), allowNull: false, unique: true },
  phone: DataTypes.STRING(30),
  passwordHash: { type: DataTypes.STRING(255), allowNull: false },
  avatar: DataTypes.STRING(500),
  forcePasswordChange: { type: DataTypes.BOOLEAN, defaultValue: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  lastLoginAt: DataTypes.DATE,
}, {
  tableName: "admins",
  defaultScope: { attributes: { exclude: ["passwordHash"] } },
  scopes: { withPassword: { attributes: {} } },
});

export const AdminRole = sequelize.define("AdminRole", {
  adminId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, { tableName: "admin_roles", timestamps: false });

export const RefreshToken = sequelize.define("RefreshToken", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  adminId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  tokenHash: { type: DataTypes.STRING(128), allowNull: false, unique: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  revokedAt: DataTypes.DATE,
}, { tableName: "refresh_tokens" });

export const PasswordResetToken = sequelize.define("PasswordResetToken", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  adminId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  tokenHash: { type: DataTypes.STRING(128), allowNull: false, unique: true },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  usedAt: DataTypes.DATE,
}, { tableName: "password_reset_tokens" });

export const Customer = sequelize.define("Customer", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  customerCode: { type: DataTypes.STRING(40), unique: true },
  name: { type: DataTypes.STRING(140), allowNull: false },
  mobile: { type: DataTypes.STRING(30), allowNull: false },
  email: DataTypes.STRING(190),
  status: { type: DataTypes.STRING(40), defaultValue: "Active" },
  totalOrders: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  totalSpend: money(),
  lastOrderAt: DataTypes.DATE,
}, { tableName: "customers", paranoid: true, indexes: [{ fields: ["email"] }, { fields: ["mobile"] }] });

export const CustomerAddress = sequelize.define("CustomerAddress", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  customerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  type: { type: DataTypes.STRING(30), defaultValue: "Shipping" },
  name: DataTypes.STRING(140),
  phone: DataTypes.STRING(30),
  line1: DataTypes.STRING(255),
  line2: DataTypes.STRING(255),
  city: DataTypes.STRING(100),
  state: DataTypes.STRING(100),
  pincode: DataTypes.STRING(20),
  country: { type: DataTypes.STRING(80), defaultValue: "India" },
  isDefault: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: "customer_addresses" });

export const CustomerNote = sequelize.define("CustomerNote", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  customerId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  adminId: DataTypes.INTEGER.UNSIGNED,
  note: { type: DataTypes.TEXT, allowNull: false },
}, { tableName: "customer_notes" });

export const Category = sequelize.define("Category", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  parentId: DataTypes.INTEGER.UNSIGNED,
  name: { type: DataTypes.STRING(140), allowNull: false },
  slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
  image: DataTypes.STRING(500),
  description: DataTypes.TEXT,
  seoTitle: DataTypes.STRING(180),
  seoDescription: DataTypes.STRING(300),
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: statusString,
}, { tableName: "categories", paranoid: true, indexes: [{ fields: ["slug"] }, { fields: ["status"] }] });

export const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(180), allowNull: false },
  slug: { type: DataTypes.STRING(200), allowNull: false, unique: true },
  sku: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  productCode: DataTypes.STRING(100),
  categoryId: DataTypes.INTEGER.UNSIGNED,
  subcategoryId: DataTypes.INTEGER.UNSIGNED,
  shortDescription: DataTypes.TEXT,
  fullDescription: DataTypes.TEXT,
  regularPrice: money(),
  salePrice: money(),
  costPrice: money(),
  gstPercent: { type: DataTypes.DECIMAL(6, 2), defaultValue: 0 },
  hsnCode: DataTypes.STRING(40),
  stockQuantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  minimumStockAlert: { type: DataTypes.INTEGER, defaultValue: 10 },
  unit: { type: DataTypes.STRING(30), defaultValue: "kg" },
  weight: DataTypes.STRING(40),
  productSize: DataTypes.STRING(80),
  minimumOrderQuantity: { type: DataTypes.STRING(80), defaultValue: "100 Kilogram (MOQ)" },
  mainImage: DataTypes.STRING(500),
  priceLabel: DataTypes.STRING(120),
  highlights: DataTypes.JSON,
  ingredients: DataTypes.TEXT,
  benefits: DataTypes.JSON,
  usageInstructions: DataTypes.JSON,
  specs: DataTypes.JSON,
  shelfLife: DataTypes.STRING(120),
  storageInstructions: DataTypes.TEXT,
  countryOfOrigin: { type: DataTypes.STRING(100), defaultValue: "India" },
  manufacturerDetails: DataTypes.TEXT,
  fssaiDetails: DataTypes.STRING(160),
  seoTitle: DataTypes.STRING(180),
  seoDescription: DataTypes.STRING(300),
  seoKeywords: DataTypes.TEXT,
  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
  isBestSeller: { type: DataTypes.BOOLEAN, defaultValue: false },
  isNewArrival: { type: DataTypes.BOOLEAN, defaultValue: false },
  status: { type: DataTypes.ENUM("Draft", "Active", "Inactive", "Out of Stock"), defaultValue: "Draft" },
  rating: { type: DataTypes.DECIMAL(3, 2), defaultValue: 4.8 },
  reviewCount: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  sourceUrl: DataTypes.STRING(500),
}, { tableName: "products", paranoid: true, indexes: [{ fields: ["sku"] }, { fields: ["slug"] }, { fields: ["status"] }] });

export const ProductImage = sequelize.define("ProductImage", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  url: { type: DataTypes.STRING(500), allowNull: false },
  alt: DataTypes.STRING(180),
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: "product_images" });

export const ProductVariant = sequelize.define("ProductVariant", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  sku: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  weight: { type: DataTypes.STRING(60), allowNull: false },
  price: money(),
  salePrice: money(),
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  status: { type: DataTypes.STRING(40), defaultValue: "Active" },
}, { tableName: "product_variants", indexes: [{ fields: ["sku"] }, { fields: ["status"] }] });

export const Inventory = sequelize.define("Inventory", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  variantId: DataTypes.INTEGER.UNSIGNED,
  availableStock: { type: DataTypes.INTEGER, defaultValue: 0 },
  reservedStock: { type: DataTypes.INTEGER, defaultValue: 0 },
  soldQuantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  minimumStock: { type: DataTypes.INTEGER, defaultValue: 10 },
  status: { type: DataTypes.STRING(40), defaultValue: "In Stock" },
  lastUpdated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "inventory", indexes: [{ fields: ["status"] }] });

export const InventoryTransaction = sequelize.define("InventoryTransaction", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  variantId: DataTypes.INTEGER.UNSIGNED,
  previousQuantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  changedQuantity: { type: DataTypes.INTEGER, allowNull: false },
  newQuantity: { type: DataTypes.INTEGER, allowNull: false },
  transactionType: { type: DataTypes.STRING(60), allowNull: false },
  reason: DataTypes.TEXT,
  relatedOrderId: DataTypes.INTEGER.UNSIGNED,
  changedBy: DataTypes.INTEGER.UNSIGNED,
}, { tableName: "inventory_transactions" });

export const OrderSequence = sequelize.define("OrderSequence", {
  year: { type: DataTypes.INTEGER, primaryKey: true },
  nextNumber: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
}, { tableName: "order_sequences", timestamps: false });

export const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  orderNumber: { type: DataTypes.STRING(40), unique: true },
  customerId: DataTypes.INTEGER.UNSIGNED,
  customerName: DataTypes.STRING(140),
  customerEmail: DataTypes.STRING(190),
  customerPhone: DataTypes.STRING(30),
  subtotal: money(),
  discount: money(),
  couponDiscount: money(),
  tax: money(),
  shipping: money(),
  grandTotal: money(),
  paymentMethod: { type: DataTypes.STRING(60), defaultValue: "COD" },
  paymentStatus: { type: DataTypes.STRING(60), defaultValue: "Pending" },
  orderStatus: { type: DataTypes.STRING(60), defaultValue: "Pending" },
  trackingStatus: { type: DataTypes.STRING(80), defaultValue: "Order Placed" },
  billingAddress: DataTypes.JSON,
  shippingAddress: DataTypes.JSON,
  couponCode: DataTypes.STRING(80),
  notes: DataTypes.TEXT,
  placedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "orders", indexes: [{ fields: ["order_number"] }, { fields: ["order_status"] }, { fields: ["payment_status"] }, { fields: ["created_at"] }] });

export const OrderItem = sequelize.define("OrderItem", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  productId: DataTypes.INTEGER.UNSIGNED,
  variantId: DataTypes.INTEGER.UNSIGNED,
  productName: { type: DataTypes.STRING(180), allowNull: false },
  sku: DataTypes.STRING(100),
  variantName: DataTypes.STRING(80),
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  unitPrice: money(),
  discount: money(),
  tax: money(),
  total: money(),
  image: DataTypes.STRING(500),
}, { tableName: "order_items" });

export const OrderStatusHistory = sequelize.define("OrderStatusHistory", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  status: { type: DataTypes.STRING(80), allowNull: false },
  note: DataTypes.TEXT,
  changedBy: DataTypes.INTEGER.UNSIGNED,
  changedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "order_status_history" });

export const Payment = sequelize.define("Payment", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  orderId: DataTypes.INTEGER.UNSIGNED,
  customerId: DataTypes.INTEGER.UNSIGNED,
  amount: money(),
  paymentMethod: DataTypes.STRING(80),
  gateway: DataTypes.STRING(80),
  paymentId: { type: DataTypes.STRING(160), unique: true },
  transactionId: DataTypes.STRING(160),
  paymentStatus: { type: DataTypes.STRING(60), defaultValue: "Pending" },
  paymentDate: DataTypes.DATE,
  verifiedAt: DataTypes.DATE,
  rawPayload: DataTypes.JSON,
}, { tableName: "payments", indexes: [{ fields: ["payment_id"] }, { fields: ["payment_status"] }] });

export const Shipment = sequelize.define("Shipment", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  courierCompany: DataTypes.STRING(120),
  trackingNumber: { type: DataTypes.STRING(160), unique: true },
  trackingUrl: DataTypes.STRING(500),
  dispatchDate: DataTypes.DATE,
  expectedDeliveryDate: DataTypes.DATE,
  deliveryStatus: { type: DataTypes.STRING(80), defaultValue: "Processing" },
  notes: DataTypes.TEXT,
}, { tableName: "shipments", indexes: [{ fields: ["tracking_number"] }] });

export const ShipmentTracking = sequelize.define("ShipmentTracking", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  shipmentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  status: { type: DataTypes.STRING(80), allowNull: false },
  location: DataTypes.STRING(160),
  note: DataTypes.TEXT,
  trackedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "shipment_tracking" });

export const Coupon = sequelize.define("Coupon", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING(80), unique: true, allowNull: false },
  description: DataTypes.TEXT,
  discountType: { type: DataTypes.STRING(40), allowNull: false },
  discountValue: money(),
  minimumOrder: money(),
  maximumDiscount: money(),
  startDate: DataTypes.DATE,
  expiryDate: DataTypes.DATE,
  usageLimit: DataTypes.INTEGER,
  usagePerCustomer: DataTypes.INTEGER,
  applicableProducts: DataTypes.JSON,
  applicableCategories: DataTypes.JSON,
  status: statusString,
}, { tableName: "coupons" });

export const CouponUsage = sequelize.define("CouponUsage", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  couponId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  customerId: DataTypes.INTEGER.UNSIGNED,
  orderId: DataTypes.INTEGER.UNSIGNED,
  discountAmount: money(),
}, { tableName: "coupon_usage" });

export const BlogCategory = sequelize.define("BlogCategory", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(140), allowNull: false },
  slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
  description: DataTypes.TEXT,
  status: statusString,
}, { tableName: "blog_categories", paranoid: true });

export const Blog = sequelize.define("Blog", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  blogCategoryId: DataTypes.INTEGER.UNSIGNED,
  title: { type: DataTypes.STRING(220), allowNull: false },
  slug: { type: DataTypes.STRING(240), allowNull: false, unique: true },
  featuredImage: DataTypes.STRING(500),
  author: DataTypes.STRING(120),
  shortDescription: DataTypes.TEXT,
  fullContent: DataTypes.TEXT,
  body: DataTypes.JSON,
  readTime: DataTypes.STRING(40),
  tags: DataTypes.JSON,
  seoTitle: DataTypes.STRING(180),
  metaDescription: DataTypes.STRING(300),
  keywords: DataTypes.TEXT,
  publishedDate: DataTypes.DATE,
  status: { type: DataTypes.STRING(40), defaultValue: "Draft" },
}, { tableName: "blogs", paranoid: true, indexes: [{ fields: ["slug"] }, { fields: ["status"] }] });

export const BlogTag = sequelize.define("BlogTag", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), unique: true },
  slug: { type: DataTypes.STRING(120), unique: true },
}, { tableName: "blog_tags" });

export const Review = sequelize.define("Review", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  customerId: DataTypes.INTEGER.UNSIGNED,
  productId: DataTypes.INTEGER.UNSIGNED,
  rating: { type: DataTypes.INTEGER, allowNull: false },
  review: DataTypes.TEXT,
  images: DataTypes.JSON,
  status: { type: DataTypes.STRING(40), defaultValue: "Pending" },
}, { tableName: "reviews" });

export const Return = sequelize.define("Return", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  returnNumber: { type: DataTypes.STRING(60), unique: true },
  orderId: DataTypes.INTEGER.UNSIGNED,
  customerId: DataTypes.INTEGER.UNSIGNED,
  reason: DataTypes.TEXT,
  returnImages: DataTypes.JSON,
  customerRemarks: DataTypes.TEXT,
  adminRemarks: DataTypes.TEXT,
  returnStatus: { type: DataTypes.STRING(60), defaultValue: "Requested" },
}, { tableName: "returns" });

export const ReturnItem = sequelize.define("ReturnItem", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  returnId: DataTypes.INTEGER.UNSIGNED,
  orderItemId: DataTypes.INTEGER.UNSIGNED,
  productId: DataTypes.INTEGER.UNSIGNED,
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
}, { tableName: "return_items" });

export const Refund = sequelize.define("Refund", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  orderId: DataTypes.INTEGER.UNSIGNED,
  returnId: DataTypes.INTEGER.UNSIGNED,
  customerId: DataTypes.INTEGER.UNSIGNED,
  refundAmount: money(),
  refundReference: DataTypes.STRING(160),
  notes: DataTypes.TEXT,
  status: { type: DataTypes.STRING(60), defaultValue: "Requested" },
}, { tableName: "refunds" });

export const BulkOrder = sequelize.define("BulkOrder", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(140), allowNull: false },
  businessName: DataTypes.STRING(180),
  phone: { type: DataTypes.STRING(30), allowNull: false },
  email: DataTypes.STRING(190),
  gstNumber: DataTypes.STRING(40),
  product: DataTypes.STRING(180),
  quantity: DataTypes.STRING(100),
  requiredDate: DataTypes.DATEONLY,
  deliveryLocation: DataTypes.STRING(220),
  message: DataTypes.TEXT,
  status: { type: DataTypes.STRING(60), defaultValue: "New" },
  adminNotes: DataTypes.TEXT,
  followUpDate: DataTypes.DATEONLY,
}, { tableName: "bulk_orders", indexes: [{ fields: ["status"] }] });

export const ContactEnquiry = sequelize.define("ContactEnquiry", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(140), allowNull: false },
  phone: DataTypes.STRING(30),
  email: DataTypes.STRING(190),
  subject: DataTypes.STRING(180),
  message: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING(60), defaultValue: "New" },
  adminNotes: DataTypes.TEXT,
}, { tableName: "contact_enquiries", indexes: [{ fields: ["status"] }] });

export const Notification = sequelize.define("Notification", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  adminId: DataTypes.INTEGER.UNSIGNED,
  title: { type: DataTypes.STRING(180), allowNull: false },
  message: DataTypes.TEXT,
  type: { type: DataTypes.STRING(80), defaultValue: "Info" },
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
  link: DataTypes.STRING(240),
}, { tableName: "notifications", indexes: [{ fields: ["is_read"] }] });

export const AdminActivityLog = sequelize.define("AdminActivityLog", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  adminId: DataTypes.INTEGER.UNSIGNED,
  action: { type: DataTypes.STRING(220), allowNull: false },
  module: DataTypes.STRING(80),
  recordId: DataTypes.STRING(80),
  previousData: DataTypes.JSON,
  updatedData: DataTypes.JSON,
  ipAddress: DataTypes.STRING(80),
}, { tableName: "admin_activity_logs", updatedAt: false });

export const SiteSetting = sequelize.define("SiteSetting", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  group: { type: DataTypes.STRING(80), allowNull: false },
  key: { type: DataTypes.STRING(120), allowNull: false },
  value: DataTypes.JSON,
}, { tableName: "site_settings", indexes: [{ unique: true, fields: ["group", "key"] }] });

export const Media = sequelize.define("Media", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  filename: { type: DataTypes.STRING(220), allowNull: false },
  originalName: DataTypes.STRING(220),
  url: { type: DataTypes.STRING(500), allowNull: false },
  mimeType: DataTypes.STRING(100),
  size: DataTypes.INTEGER.UNSIGNED,
  uploadedBy: DataTypes.INTEGER.UNSIGNED,
}, { tableName: "media" });

Admin.belongsToMany(Role, { through: AdminRole, foreignKey: "adminId" });
Role.belongsToMany(Admin, { through: AdminRole, foreignKey: "roleId" });
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId" });
Admin.hasMany(RefreshToken, { foreignKey: "adminId" });

Customer.hasMany(CustomerAddress, { foreignKey: "customerId", as: "addresses" });
Customer.hasMany(CustomerNote, { foreignKey: "customerId", as: "notes" });
Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
CustomerAddress.belongsTo(Customer, { foreignKey: "customerId" });
CustomerNote.belongsTo(Customer, { foreignKey: "customerId" });
CustomerNote.belongsTo(Admin, { foreignKey: "adminId", as: "admin" });

Category.hasMany(Category, { foreignKey: "parentId", as: "children" });
Category.belongsTo(Category, { foreignKey: "parentId", as: "parent" });
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Product.hasMany(ProductImage, { foreignKey: "productId", as: "images" });
Product.hasMany(ProductVariant, { foreignKey: "productId", as: "variants" });
Product.hasMany(Inventory, { foreignKey: "productId", as: "inventoryRows" });
ProductImage.belongsTo(Product, { foreignKey: "productId" });
ProductVariant.belongsTo(Product, { foreignKey: "productId" });
ProductVariant.hasOne(Inventory, { foreignKey: "variantId", as: "inventory" });
Inventory.belongsTo(Product, { foreignKey: "productId", as: "product" });
Inventory.belongsTo(ProductVariant, { foreignKey: "variantId", as: "variant" });
InventoryTransaction.belongsTo(Product, { foreignKey: "productId", as: "product" });
InventoryTransaction.belongsTo(ProductVariant, { foreignKey: "variantId", as: "variant" });

Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
Order.hasMany(OrderStatusHistory, { foreignKey: "orderId", as: "history" });
Order.hasMany(Payment, { foreignKey: "orderId", as: "payments" });
Order.hasMany(Shipment, { foreignKey: "orderId", as: "shipments" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
OrderStatusHistory.belongsTo(Order, { foreignKey: "orderId" });
Payment.belongsTo(Order, { foreignKey: "orderId", as: "order" });
Shipment.belongsTo(Order, { foreignKey: "orderId", as: "order" });
Shipment.hasMany(ShipmentTracking, { foreignKey: "shipmentId", as: "tracking" });
ShipmentTracking.belongsTo(Shipment, { foreignKey: "shipmentId" });

Coupon.hasMany(CouponUsage, { foreignKey: "couponId", as: "usage" });
BlogCategory.hasMany(Blog, { foreignKey: "blogCategoryId", as: "blogs" });
Blog.belongsTo(BlogCategory, { foreignKey: "blogCategoryId", as: "category" });
Review.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
Review.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(Review, { foreignKey: "productId", as: "reviews" });

Return.belongsTo(Order, { foreignKey: "orderId", as: "order" });
Return.hasMany(ReturnItem, { foreignKey: "returnId", as: "items" });
Refund.belongsTo(Return, { foreignKey: "returnId", as: "return" });

export const db = {
  sequelize,
  Role,
  Permission,
  RolePermission,
  Admin,
  AdminRole,
  RefreshToken,
  PasswordResetToken,
  Customer,
  CustomerAddress,
  CustomerNote,
  Category,
  Product,
  ProductImage,
  ProductVariant,
  Inventory,
  InventoryTransaction,
  OrderSequence,
  Order,
  OrderItem,
  OrderStatusHistory,
  Payment,
  Shipment,
  ShipmentTracking,
  Coupon,
  CouponUsage,
  BlogCategory,
  Blog,
  BlogTag,
  Review,
  Return,
  ReturnItem,
  Refund,
  BulkOrder,
  ContactEnquiry,
  Notification,
  AdminActivityLog,
  SiteSetting,
  Media,
};
