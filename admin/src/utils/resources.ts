import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpen,
  Boxes,
  ClipboardList,
  Contact,
  FileText,
  Package,
  ReceiptIndianRupee,
  Shield,
  ShoppingCart,
  Tags,
  Users,
} from "lucide-react";

export type FieldType = "text" | "number" | "textarea" | "select" | "checkbox" | "date" | "password";

export type FieldDefinition = {
  name: string;
  label: string;
  type?: FieldType;
  tab?: string;
  full?: boolean;
  required?: boolean;
  options?: string[];
  hint?: string;
};

export type ColumnDefinition = {
  key: string;
  label: string;
  type?: "text" | "money" | "status" | "image" | "date" | "bool";
};

export type ResourceDefinition = {
  resource: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  columns: ColumnDefinition[];
  fields: FieldDefinition[];
  statusOptions?: string[];
  transform?: (values: Record<string, any>) => Record<string, any>;
};

const productStatuses = ["Draft", "Active", "Inactive", "Out of Stock"];
const commonStatus = ["Active", "Inactive"];
const orderStatuses = ["Pending", "Confirmed", "Processing", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Returned", "Refunded"];

function splitLines(value: any) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function productTransform(values: Record<string, any>) {
  return {
    ...values,
    regularPrice: Number(values.regularPrice || 0),
    salePrice: Number(values.salePrice || values.regularPrice || 0),
    costPrice: Number(values.costPrice || 0),
    gstPercent: Number(values.gstPercent || 0),
    stockQuantity: Number(values.stockQuantity || 0),
    minimumStockAlert: Number(values.minimumStockAlert || 10),
    benefits: splitLines(values.benefits),
    usageInstructions: splitLines(values.usageInstructions),
    galleryImages: splitLines(values.galleryImages),
  };
}

export const resourceDefinitions: Record<string, ResourceDefinition> = {
  products: {
    resource: "products",
    title: "Products",
    eyebrow: "Catalog",
    description: "Manage product listings, pricing, stock defaults, images, SEO, and publish status.",
    icon: Package,
    statusOptions: productStatuses,
    columns: [
      { key: "mainImage", label: "Image", type: "image" },
      { key: "name", label: "Product" },
      { key: "sku", label: "SKU" },
      { key: "category.name", label: "Category" },
      { key: "salePrice", label: "Price", type: "money" },
      { key: "stockQuantity", label: "Stock" },
      { key: "status", label: "Status", type: "status" },
    ],
    fields: [
      { name: "name", label: "Product Name", required: true, tab: "General" },
      { name: "slug", label: "Slug", tab: "General" },
      { name: "sku", label: "SKU", required: true, tab: "General" },
      { name: "productCode", label: "Product Code", tab: "General" },
      { name: "category", label: "Category Slug", required: true, tab: "General" },
      { name: "shortDescription", label: "Short Description", type: "textarea", full: true, tab: "General" },
      { name: "fullDescription", label: "Full Description", type: "textarea", full: true, tab: "General" },
      { name: "regularPrice", label: "Regular Price", type: "number", tab: "Pricing" },
      { name: "salePrice", label: "Sale Price", type: "number", tab: "Pricing" },
      { name: "costPrice", label: "Cost Price", type: "number", tab: "Pricing" },
      { name: "gstPercent", label: "GST %", type: "number", tab: "Pricing" },
      { name: "hsnCode", label: "HSN Code", tab: "Pricing" },
      { name: "stockQuantity", label: "Stock Quantity", type: "number", tab: "Inventory" },
      { name: "minimumStockAlert", label: "Minimum Stock Alert", type: "number", tab: "Inventory" },
      { name: "unit", label: "Unit", tab: "Inventory" },
      { name: "weight", label: "Weight", tab: "Inventory" },
      { name: "minimumOrderQuantity", label: "MOQ", tab: "Inventory" },
      { name: "mainImage", label: "Main Product Image URL", full: true, tab: "Images" },
      { name: "galleryImages", label: "Gallery Image URLs", type: "textarea", full: true, tab: "Images", hint: "One URL per line" },
      { name: "ingredients", label: "Ingredients", type: "textarea", full: true, tab: "Product Details" },
      { name: "benefits", label: "Benefits", type: "textarea", full: true, tab: "Product Details", hint: "One benefit per line" },
      { name: "usageInstructions", label: "Usage Instructions", type: "textarea", full: true, tab: "Product Details", hint: "One instruction per line" },
      { name: "shelfLife", label: "Shelf Life", tab: "Product Details" },
      { name: "storageInstructions", label: "Storage Instructions", type: "textarea", full: true, tab: "Product Details" },
      { name: "countryOfOrigin", label: "Country of Origin", tab: "Product Details" },
      { name: "manufacturerDetails", label: "Manufacturer Details", type: "textarea", full: true, tab: "Product Details" },
      { name: "fssaiDetails", label: "FSSAI Details", tab: "Product Details" },
      { name: "seoTitle", label: "SEO Title", tab: "SEO" },
      { name: "seoDescription", label: "SEO Description", type: "textarea", full: true, tab: "SEO" },
      { name: "seoKeywords", label: "SEO Keywords", type: "textarea", full: true, tab: "SEO" },
      { name: "isFeatured", label: "Featured Product", type: "checkbox", tab: "SEO" },
      { name: "isBestSeller", label: "Best Seller", type: "checkbox", tab: "SEO" },
      { name: "isNewArrival", label: "New Arrival", type: "checkbox", tab: "SEO" },
      { name: "status", label: "Product Status", type: "select", options: productStatuses, tab: "SEO" },
    ],
    transform: productTransform,
  },
  categories: {
    resource: "categories",
    title: "Categories",
    eyebrow: "Catalog",
    description: "Create parent and child categories used by storefront filters and product grouping.",
    icon: Tags,
    statusOptions: commonStatus,
    columns: [
      { key: "image", label: "Image", type: "image" },
      { key: "name", label: "Category" },
      { key: "slug", label: "Slug" },
      { key: "displayOrder", label: "Order" },
      { key: "status", label: "Status", type: "status" },
    ],
    fields: [
      { name: "name", label: "Category Name", required: true },
      { name: "slug", label: "Slug" },
      { name: "parentId", label: "Parent Category ID", type: "number" },
      { name: "image", label: "Category Image URL", full: true },
      { name: "description", label: "Description", type: "textarea", full: true },
      { name: "seoTitle", label: "SEO Title" },
      { name: "seoDescription", label: "SEO Description", type: "textarea", full: true },
      { name: "displayOrder", label: "Display Order", type: "number" },
      { name: "status", label: "Status", type: "select", options: commonStatus },
    ],
  },
  blogs: {
    resource: "blogs",
    title: "Blog Posts",
    eyebrow: "Content",
    description: "Publish, preview, schedule, and archive product education content.",
    icon: BookOpen,
    statusOptions: ["Draft", "Published", "Scheduled", "Archived"],
    columns: [
      { key: "featuredImage", label: "Image", type: "image" },
      { key: "title", label: "Title" },
      { key: "author", label: "Author" },
      { key: "publishedDate", label: "Published", type: "date" },
      { key: "status", label: "Status", type: "status" },
    ],
    fields: [
      { name: "title", label: "Blog Title", required: true, full: true },
      { name: "slug", label: "Slug" },
      { name: "featuredImage", label: "Featured Image URL", full: true },
      { name: "blogCategoryId", label: "Category ID", type: "number" },
      { name: "author", label: "Author" },
      { name: "shortDescription", label: "Short Description", type: "textarea", full: true },
      { name: "fullContent", label: "Full Content", type: "textarea", full: true },
      { name: "tags", label: "Tags", type: "textarea", full: true },
      { name: "seoTitle", label: "SEO Title" },
      { name: "metaDescription", label: "Meta Description", type: "textarea", full: true },
      { name: "keywords", label: "Keywords", type: "textarea", full: true },
      { name: "publishedDate", label: "Published Date", type: "date" },
      { name: "status", label: "Status", type: "select", options: ["Draft", "Published", "Scheduled", "Archived"] },
    ],
    transform: (values) => ({ ...values, tags: splitLines(values.tags) }),
  },
  "blog-categories": {
    resource: "blog-categories",
    title: "Blog Categories",
    eyebrow: "Content",
    description: "Organize articles and editorial content.",
    icon: FileText,
    statusOptions: commonStatus,
    columns: [
      { key: "name", label: "Category" },
      { key: "slug", label: "Slug" },
      { key: "status", label: "Status", type: "status" },
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "slug", label: "Slug" },
      { name: "description", label: "Description", type: "textarea", full: true },
      { name: "status", label: "Status", type: "select", options: commonStatus },
    ],
  },
  coupons: {
    resource: "coupons",
    title: "Coupons",
    eyebrow: "Marketing",
    description: "Create percentage, fixed discount, and free shipping offers.",
    icon: Tags,
    statusOptions: commonStatus,
    columns: [
      { key: "code", label: "Code" },
      { key: "discountType", label: "Type" },
      { key: "discountValue", label: "Value", type: "money" },
      { key: "expiryDate", label: "Expiry", type: "date" },
      { key: "status", label: "Status", type: "status" },
    ],
    fields: [
      { name: "code", label: "Coupon Code", required: true },
      { name: "description", label: "Description", type: "textarea", full: true },
      { name: "discountType", label: "Discount Type", type: "select", options: ["Percentage", "Fixed Amount", "Free Shipping"] },
      { name: "discountValue", label: "Discount Value", type: "number" },
      { name: "minimumOrder", label: "Minimum Order", type: "number" },
      { name: "maximumDiscount", label: "Maximum Discount", type: "number" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "expiryDate", label: "Expiry Date", type: "date" },
      { name: "usageLimit", label: "Usage Limit", type: "number" },
      { name: "usagePerCustomer", label: "Usage Per Customer", type: "number" },
      { name: "status", label: "Status", type: "select", options: commonStatus },
    ],
  },
  customers: {
    resource: "customers",
    title: "Customers",
    eyebrow: "CRM",
    description: "Review customer profiles, purchase value, addresses, and lifecycle status.",
    icon: Users,
    statusOptions: ["Active", "Blocked"],
    columns: [
      { key: "customerCode", label: "Customer ID" },
      { key: "name", label: "Name" },
      { key: "mobile", label: "Mobile" },
      { key: "email", label: "Email" },
      { key: "totalOrders", label: "Orders" },
      { key: "totalSpend", label: "Spend", type: "money" },
      { key: "status", label: "Status", type: "status" },
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "mobile", label: "Mobile", required: true },
      { name: "email", label: "Email" },
      { name: "status", label: "Status", type: "select", options: ["Active", "Blocked"] },
    ],
  },
  "bulk-orders": {
    resource: "bulk-orders",
    title: "Bulk Orders",
    eyebrow: "B2B",
    description: "Manage wholesale and B2B product requirements with follow-up notes.",
    icon: Boxes,
    statusOptions: ["New", "Contacted", "Quotation Sent", "Negotiation", "Converted", "Rejected", "Closed"],
    columns: [
      { key: "name", label: "Name" },
      { key: "businessName", label: "Business" },
      { key: "phone", label: "Phone" },
      { key: "product", label: "Product" },
      { key: "quantity", label: "Quantity" },
      { key: "status", label: "Status", type: "status" },
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "businessName", label: "Business Name" },
      { name: "phone", label: "Phone", required: true },
      { name: "email", label: "Email" },
      { name: "gstNumber", label: "GST Number" },
      { name: "product", label: "Product" },
      { name: "quantity", label: "Quantity" },
      { name: "requiredDate", label: "Required Date", type: "date" },
      { name: "deliveryLocation", label: "Delivery Location" },
      { name: "message", label: "Message", type: "textarea", full: true },
      { name: "adminNotes", label: "Internal Notes", type: "textarea", full: true },
      { name: "followUpDate", label: "Follow-up Date", type: "date" },
      { name: "status", label: "Status", type: "select", options: ["New", "Contacted", "Quotation Sent", "Negotiation", "Converted", "Rejected", "Closed"] },
    ],
  },
  "contact-enquiries": {
    resource: "contact-enquiries",
    title: "Contact Enquiries",
    eyebrow: "Support",
    description: "Handle website messages and support queries.",
    icon: Contact,
    statusOptions: ["New", "In Progress", "Resolved", "Closed"],
    columns: [
      { key: "name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "subject", label: "Subject" },
      { key: "status", label: "Status", type: "status" },
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "phone", label: "Phone" },
      { name: "email", label: "Email" },
      { name: "subject", label: "Subject" },
      { name: "message", label: "Message", type: "textarea", full: true },
      { name: "adminNotes", label: "Admin Notes", type: "textarea", full: true },
      { name: "status", label: "Status", type: "select", options: ["New", "In Progress", "Resolved", "Closed"] },
    ],
  },
  reviews: {
    resource: "reviews",
    title: "Reviews",
    eyebrow: "Moderation",
    description: "Approve, reject, hide, and manage public product reviews.",
    icon: Bell,
    statusOptions: ["Pending", "Approved", "Rejected", "Hidden"],
    columns: [
      { key: "product.name", label: "Product" },
      { key: "customer.name", label: "Customer" },
      { key: "rating", label: "Rating" },
      { key: "review", label: "Review" },
      { key: "status", label: "Status", type: "status" },
    ],
    fields: [
      { name: "customerId", label: "Customer ID", type: "number" },
      { name: "productId", label: "Product ID", type: "number" },
      { name: "rating", label: "Rating", type: "number" },
      { name: "review", label: "Review", type: "textarea", full: true },
      { name: "status", label: "Status", type: "select", options: ["Pending", "Approved", "Rejected", "Hidden"] },
    ],
  },
  returns: {
    resource: "returns",
    title: "Returns",
    eyebrow: "Orders",
    description: "Track return requests, pickup status, receipt, and closure.",
    icon: ClipboardList,
    statusOptions: ["Requested", "Approved", "Rejected", "Picked Up", "Received", "Refunded", "Closed"],
    columns: [
      { key: "returnNumber", label: "Return ID" },
      { key: "order.orderNumber", label: "Order" },
      { key: "reason", label: "Reason" },
      { key: "returnStatus", label: "Status", type: "status" },
    ],
    fields: [
      { name: "returnNumber", label: "Return ID" },
      { name: "orderId", label: "Order ID", type: "number" },
      { name: "customerId", label: "Customer ID", type: "number" },
      { name: "reason", label: "Reason", type: "textarea", full: true },
      { name: "customerRemarks", label: "Customer Remarks", type: "textarea", full: true },
      { name: "adminRemarks", label: "Admin Remarks", type: "textarea", full: true },
      { name: "returnStatus", label: "Return Status", type: "select", options: ["Requested", "Approved", "Rejected", "Picked Up", "Received", "Refunded", "Closed"] },
    ],
  },
  refunds: {
    resource: "refunds",
    title: "Refunds",
    eyebrow: "Payments",
    description: "Approve, reject, process, and record refunds.",
    icon: ReceiptIndianRupee,
    statusOptions: ["Requested", "Approved", "Rejected", "Processing", "Refunded"],
    columns: [
      { key: "orderId", label: "Order ID" },
      { key: "refundAmount", label: "Amount", type: "money" },
      { key: "refundReference", label: "Reference" },
      { key: "status", label: "Status", type: "status" },
    ],
    fields: [
      { name: "orderId", label: "Order ID", type: "number" },
      { name: "returnId", label: "Return ID", type: "number" },
      { name: "customerId", label: "Customer ID", type: "number" },
      { name: "refundAmount", label: "Refund Amount", type: "number" },
      { name: "refundReference", label: "Refund Reference" },
      { name: "notes", label: "Notes", type: "textarea", full: true },
      { name: "status", label: "Status", type: "select", options: ["Requested", "Approved", "Rejected", "Processing", "Refunded"] },
    ],
  },
  payments: {
    resource: "payments",
    title: "Payments",
    eyebrow: "Finance",
    description: "Audit payment methods, IDs, gateways, statuses, and verification dates.",
    icon: ReceiptIndianRupee,
    statusOptions: ["Pending", "Paid", "Failed", "Refunded", "Partially Refunded"],
    columns: [
      { key: "order.orderNumber", label: "Order" },
      { key: "amount", label: "Amount", type: "money" },
      { key: "paymentMethod", label: "Method" },
      { key: "gateway", label: "Gateway" },
      { key: "paymentStatus", label: "Status", type: "status" },
    ],
    fields: [
      { name: "orderId", label: "Order ID", type: "number" },
      { name: "customerId", label: "Customer ID", type: "number" },
      { name: "amount", label: "Amount", type: "number" },
      { name: "paymentMethod", label: "Payment Method" },
      { name: "gateway", label: "Gateway" },
      { name: "paymentId", label: "Payment ID" },
      { name: "transactionId", label: "Transaction ID" },
      { name: "paymentStatus", label: "Status", type: "select", options: ["Pending", "Paid", "Failed", "Refunded", "Partially Refunded"] },
      { name: "paymentDate", label: "Payment Date", type: "date" },
    ],
  },
  notifications: {
    resource: "notifications",
    title: "Notifications",
    eyebrow: "System",
    description: "Read and manage admin alerts.",
    icon: Bell,
    statusOptions: ["Info", "Order", "Inventory", "Payment", "Review"],
    columns: [
      { key: "title", label: "Title" },
      { key: "type", label: "Type" },
      { key: "isRead", label: "Read", type: "bool" },
      { key: "createdAt", label: "Date", type: "date" },
    ],
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "message", label: "Message", type: "textarea", full: true },
      { name: "type", label: "Type" },
      { name: "link", label: "Link" },
      { name: "isRead", label: "Read", type: "checkbox" },
    ],
  },
  "admin-users": {
    resource: "admin-users",
    title: "Admin Users",
    eyebrow: "Administration",
    description: "Create internal admin accounts and assign role IDs.",
    icon: Shield,
    statusOptions: ["Active", "Inactive"],
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "isActive", label: "Active", type: "bool" },
    ],
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", required: true },
      { name: "phone", label: "Phone" },
      { name: "password", label: "Temporary Password", type: "password" },
      { name: "roleIds", label: "Role IDs", hint: "Comma separated IDs" },
      { name: "isActive", label: "Active", type: "checkbox" },
    ],
    transform: (values) => ({ ...values, roleIds: splitLines(String(values.roleIds || "").replace(/,/g, "\n")).map(Number) }),
  },
};

export const orderStatusOptions = orderStatuses;
