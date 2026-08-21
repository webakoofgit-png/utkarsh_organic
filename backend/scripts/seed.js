import bcrypt from "bcryptjs";
import { assertEnv, env } from "../config/env.js";
import { sequelize } from "../config/database.js";
import {
  Admin,
  Blog,
  BlogCategory,
  Category,
  Coupon,
  Permission,
  Product,
  ProductImage,
  Role,
  SiteSetting,
} from "../models/index.js";
import { createOrUpdateInventory } from "../services/inventoryService.js";
import { loadFrontendCatalog } from "../utils/frontendCatalog.js";

assertEnv();

const modules = [
  "dashboard",
  "products",
  "categories",
  "inventory",
  "orders",
  "customers",
  "blogs",
  "coupons",
  "payments",
  "returns",
  "refunds",
  "bulk-orders",
  "contact-enquiries",
  "reviews",
  "reports",
  "settings",
  "media",
  "notifications",
  "administration",
];
const actions = ["read", "create", "update", "delete"];
const {
  CATEGORIES: frontendCategories,
  PRODUCTS: frontendProducts,
  BLOG_POSTS: frontendBlogs,
} = loadFrontendCatalog();

const categories = [
  ["dehydrated-flakes", "Dehydrated Vegetables & Flakes"],
  ["dehydrated-powders", "Dehydrated Vegetable Powders"],
  ["organic-powders", "Organic & Ayurvedic Powders"],
  ["spices", "Spice Powders"],
  ["dried-specialty", "Dried Specialty Ingredients"],
];

const products = [
  ["dehydrated-white-onion-powder", "Dehydrated White Onion Powder", "dehydrated-powders", 295, "UOF-DWOP-001", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/dehydrated-white-onion-powder-8765263-pv1.jpeg", true],
  ["dehydrated-red-onion-powder", "Dehydrated Red Onion Powder", "dehydrated-powders", 295, "UOF-DROP-002", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/dehydrated-red-onion-powder-8765273-pv1.jpeg", true],
  ["dehydrated-red-onion-flakes", "Dehydrated Red Onion Flakes", "dehydrated-flakes", 460, "UOF-DROF-003", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/dehydrated-red-onion-flakes-8765256-pv1.jpeg", true],
  ["dehydrated-white-onion-flakes", "Dehydrated White Onion Flakes", "dehydrated-flakes", 460, "UOF-DWOF-004", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/dehydrated-white-onion-flakes-8765259-pv1.jpeg", false],
  ["dehydrated-garlic-flakes", "Dehydrated Garlic Flakes", "dehydrated-flakes", 570, "UOF-DGF-005", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/dehydrated-garlic-flakes-8765314-pv1.jpeg", false],
  ["dehydrated-okra-flakes", "Dehydrated Okra Flakes", "dehydrated-flakes", 800, "UOF-DOF-006", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/dehydrated-okra-flakes-8765253-pv1.jpeg", false],
  ["dehydrated-carrot-flakes", "Dehydrated Carrot Flakes", "dehydrated-flakes", 1200, "UOF-DCF-007", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/dehydrated-carrot-flakes-8765379-pv1.jpeg", false],
  ["dehydrated-spinach-leaves", "Dehydrated Spinach Leaves", "dehydrated-flakes", 1300, "UOF-DSL-008", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/dehydrated-spinach-leaves-8765375-pv1.jpeg", false],
  ["dehydrated-cluster-beans", "Dehydrated Cluster Beans", "dehydrated-flakes", 651, "UOF-DCB-009", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/dehydrated-cluster-beans-8765336-pv1.jpeg", false],
  ["dehydrated-lemon-slices", "Dehydrated Lemon Slices", "dehydrated-flakes", 900, "UOF-DLS-010", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/dehydrated-lemon-slices-8765278-pv1.jpeg", false],
  ["dehydrated-moringa-sticks", "Dehydrated Moringa Sticks", "dehydrated-flakes", 780, "UOF-DMS-011", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/dehydrated-moringa-sticks-8765329-pv1.jpeg", false],
  ["dehydrated-spinach-powder", "Dehydrated Spinach Powder", "dehydrated-powders", 1100, "UOF-DSP-012", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/dehydrated-spinach-powder-8765373-pv1.jpeg", false],
  ["dehydrated-carrot-powder", "Dehydrated Carrot Powder", "dehydrated-powders", 1300, "UOF-DCP-013", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/dehydrated-carrot-powder-8765384-pv1.jpeg", false],
  ["dehydrated-curry-leaf-powder", "Dehydrated Curry Leaf Powder", "dehydrated-powders", 1400, "UOF-DCLP-014", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/dehydrated-curry-leaf-powder-8765392-pv1.jpeg", false],
  ["organic-amla-powder", "Organic Amla Powder", "organic-powders", 890, "UOF-OAP-015", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/organic-amla-powder-8761455-pv2.jpeg", true],
  ["organic-beetroot-powder", "Organic Beetroot Powder", "organic-powders", 2333, "UOF-OBP-016", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/organic-beetroot-powder-8762105-pv2.jpeg", false],
  ["organic-garlic-powder", "Organic Garlic Powder", "organic-powders", 2400, "UOF-OGP-017", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/organic-garlic-powder-8765187-pv1.jpeg", true],
  ["organic-ginger-powder", "Organic Ginger Powder", "organic-powders", 2460, "UOF-OGNP-018", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/organic-ginger-powder-8765190-pv1.jpeg", false],
  ["ayurvedic-moringa-leaf-powder", "Ayurvedic Moringa Leaf Powder", "organic-powders", 1451, "UOF-AMLP-019", "https://2.wlimg.com/product_images/bc-500/2026/7/5707612/ayurvedic-moringa-leaf-powder-8765193-pv1.jpeg", true],
  ["dried-tomato-flakes", "Dried Tomato Flakes", "dried-specialty", 530, "UOF-DTF-020", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/dried-tomato-flakes-8765215-pv1.jpeg", false],
  ["dried-sweet-corn", "Dried Sweet Corn", "dried-specialty", 750, "UOF-DSC-021", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/dried-sweet-corn-8765205-pv1.jpeg", false],
  ["turmeric-powder", "Turmeric Powder", "spices", 1221, "UOF-TP-022", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/turmeric-powder-8765238-pv1.jpeg", true],
  ["coriander-powder", "Coriander Powder", "spices", 280, "UOF-CP-023", "https://2.wlimg.com/product_images/bc-full/2026/7/5707612/coriander-powder-8765229-pv1.jpeg", false],
];

await sequelize.authenticate();

const permissions = [];
for (const module of modules) {
  for (const action of actions) {
    permissions.push(`${module}:${action}`);
  }
}
await Permission.bulkCreate(
  permissions.map((name) => ({ name, module: name.split(":")[0], action: name.split(":")[1] })),
  { ignoreDuplicates: true }
);
const allPermissions = await Permission.findAll();

const roleMap = [
  ["super-admin", "Super Admin", permissions],
  ["admin", "Admin", permissions.filter((name) => !name.startsWith("administration:delete"))],
  ["inventory-manager", "Inventory Manager", permissions.filter((name) => ["dashboard", "products", "categories", "inventory", "reports", "media", "notifications"].includes(name.split(":")[0]))],
  ["order-manager", "Order Manager", permissions.filter((name) => ["dashboard", "orders", "customers", "payments", "returns", "refunds", "bulk-orders", "contact-enquiries", "reports", "notifications"].includes(name.split(":")[0]))],
  ["content-manager", "Content Manager", permissions.filter((name) => ["dashboard", "blogs", "reviews", "media", "settings", "notifications"].includes(name.split(":")[0]))],
];

for (const [slug, name, permissionNames] of roleMap) {
  const [role] = await Role.findOrCreate({ where: { slug }, defaults: { slug, name, status: "Active" } });
  await role.setPermissions(allPermissions.filter((permission) => permissionNames.includes(permission.name)));
}

const superRole = await Role.findOne({ where: { slug: "super-admin" } });
const [admin] = await Admin.scope("withPassword").findOrCreate({
  where: { email: env.seedAdmin.email },
  defaults: {
    name: env.seedAdmin.name,
    email: env.seedAdmin.email,
    passwordHash: await bcrypt.hash(env.seedAdmin.password, 12),
    forcePasswordChange: true,
    isActive: true,
  },
});
await admin.setRoles([superRole]);

const categoryRows = {};
for (const item of frontendCategories) {
  const [category] = await Category.findOrCreate({
    where: { slug: item.id },
    defaults: {
      slug: item.id,
      name: item.name,
      description: item.blurb,
      status: "Active",
    },
  });
  await category.update({
    name: item.name,
    description: item.blurb,
    status: "Active",
  });
  categoryRows[item.id] = category;
}

function specValue(product, label) {
  return product.specs?.find((item) => item.label.toLowerCase() === label.toLowerCase())?.value || "";
}

for (const item of frontendProducts) {
  const category = categoryRows[item.category] || categoryRows[frontendCategories[0]?.id];
  const existing = await Product.findOne({ where: { sku: item.sku } });
  const stockQuantity = Number(existing?.stockQuantity || 250);
  const minimumStockAlert = Number(existing?.minimumStockAlert || 25);
  const payload = {
      name: item.name,
      slug: item.slug,
      sku: item.sku,
      productCode: item.sku,
      categoryId: category.id,
      shortDescription: item.short,
      fullDescription: item.description,
      regularPrice: item.baseMrp,
      salePrice: item.basePrice,
      costPrice: existing?.costPrice || Math.round(Number(item.basePrice || 0) * 0.65),
      gstPercent: 5,
      stockQuantity,
      minimumStockAlert,
      unit: "kg",
      weight: "1kg",
      productSize: item.moq,
      minimumOrderQuantity: item.moq,
      mainImage: item.image,
      priceLabel: item.priceLabel,
      highlights: item.highlights || [],
      ingredients: item.ingredients,
      benefits: item.benefits || [],
      usageInstructions: item.usage || [],
      specs: item.specs || [],
      shelfLife: specValue(item, "Shelf Life") || "Up to 18-24 months",
      storageInstructions: item.storage,
      countryOfOrigin: specValue(item, "Country of Origin") || "India",
      manufacturerDetails: "Utkarsh Organic Farm, Satara, Maharashtra",
      fssaiDetails: "FSSAI Reg. No: 21526039003217",
      seoTitle: item.name,
      seoDescription: item.short,
      seoKeywords: [item.name, item.category, ...(item.highlights || [])].join(", "),
      isBestSeller: Boolean(item.bestSeller),
      isFeatured: Boolean(item.bestSeller),
      isNewArrival: Boolean(item.newArrival),
      status: item.inStock ? "Active" : "Out of Stock",
      rating: item.rating,
      reviewCount: item.reviews,
      sourceUrl: item.sourceUrl,
  };

  const [product] = await Product.findOrCreate({ where: { sku: item.sku }, defaults: payload });
  await product.update(payload);

  await ProductImage.destroy({ where: { productId: product.id } });
  const images = [...new Set([item.image, ...(item.gallery || [])].filter(Boolean))];
  await ProductImage.bulkCreate(
    images.map((url, index) => ({
      productId: product.id,
      url,
      alt: item.name,
      displayOrder: index,
    }))
  );
  await createOrUpdateInventory({ productId: product.id, stock: product.stockQuantity, minimumStock: product.minimumStockAlert });
}

function parseBlogDate(value) {
  if (!value) return new Date();
  const [day, month, year] = String(value).split(" ");
  const monthIndex = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(month);
  return monthIndex >= 0 ? new Date(Number(year), monthIndex, Number(day)) : new Date(value);
}

const [fieldNotesCategory] = await BlogCategory.findOrCreate({
  where: { slug: "field-notes" },
  defaults: {
    name: "Field Notes",
    slug: "field-notes",
    description: "Ingredient guides and practical product education from Utkarsh Organic Farm.",
    status: "Active",
  },
});

for (const post of frontendBlogs) {
  const payload = {
    blogCategoryId: fieldNotesCategory.id,
    title: post.title,
    slug: post.slug,
    author: "Utkarsh Organic Farm",
    shortDescription: post.excerpt,
    fullContent: Array.isArray(post.body) ? post.body.join("\n\n") : "",
    body: post.body || [],
    readTime: post.read,
    tags: ["Utkarsh Organic", "Ingredient Guide", "Official Catalog"],
    seoTitle: post.title,
    metaDescription: post.excerpt,
    keywords: post.title,
    publishedDate: parseBlogDate(post.date),
    status: "Published",
  };
  const [blog] = await Blog.findOrCreate({ where: { slug: post.slug }, defaults: payload });
  await blog.update(payload);
}

await Coupon.findOrCreate({
  where: { code: "ORGANIC10" },
  defaults: {
    code: "ORGANIC10",
    description: "Launch offer for Utkarsh Organic customers",
    discountType: "Percentage",
    discountValue: 10,
    minimumOrder: 500,
    maximumDiscount: 500,
    status: "Active",
  },
});

const settings = {
  business: {
    businessName: "Utkarsh Organic Farm",
    phone: "+91 7507379018",
    email: "PrafullChorage143@gmail.com",
    address: "D-31 Near By Atharva Foundry, MIDC, Satara, Maharashtra, India - 412803",
    gstNumber: "27CKXPB5409F1ZZ",
    fssaiNumber: "21526039003217",
  },
  ecommerce: {
    gst: 5,
    shippingCharges: 50,
    freeShippingMinimum: 500,
    codAvailability: true,
    minimumOrderAmount: 0,
    currency: "INR",
  },
  social: {
    whatsapp: "917507379018",
  },
};

for (const [group, values] of Object.entries(settings)) {
  for (const [key, value] of Object.entries(values)) {
    await SiteSetting.findOrCreate({ where: { group, key }, defaults: { group, key, value } });
  }
}

await sequelize.close();
console.log("Seed data inserted successfully.");
