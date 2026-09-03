import { Op } from "sequelize";
import {
  Blog,
  BlogCategory,
  BulkOrder,
  Category,
  ContactEnquiry,
  Coupon,
  Product,
  ProductImage,
  ProductVariant,
  Review,
} from "../models/index.js";
import { created, success } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination, paginationMeta } from "../utils/pagination.js";
import { inr } from "../utils/slug.js";
import { createStoreOrder, previewStoreCoupon, trackOrder } from "../services/orderService.js";
import { notifyAdmin } from "../services/auditService.js";
import { notFound } from "../utils/errors.js";

function productDto(product) {
  const categorySlug = product.category?.slug || "dehydrated-powders";
  const sale = Number(product.salePrice || product.regularPrice || 0);
  const mrp = Number(product.regularPrice || sale);
  const specs = Array.isArray(product.specs) && product.specs.length
    ? product.specs
    : [
        { label: "SKU", value: product.sku },
        { label: "Unit", value: product.unit || "kg" },
        { label: "HSN Code", value: product.hsnCode || "As applicable" },
        { label: "GST", value: `${Number(product.gstPercent || 0)}%` },
        { label: "Shelf Life", value: product.shelfLife || "Up to 18-24 months" },
        { label: "Country of Origin", value: product.countryOfOrigin || "India" },
      ];
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    short: product.shortDescription || "",
    image: product.mainImage || product.images?.[0]?.url || "",
    category: categorySlug,
    categoryName: product.category?.name || categorySlug,
    basePrice: sale,
    baseMrp: mrp,
    priceLabel: product.priceLabel || (mrp > sale ? `${inr(sale)} - ${inr(mrp)} / kg` : `${inr(sale)} / kg`),
    moq: product.minimumOrderQuantity,
    rating: Number(product.rating || 4.8),
    reviews: Number(product.reviewCount || 0),
    bestSeller: Boolean(product.isBestSeller),
    newArrival: Boolean(product.isNewArrival),
    inStock: product.status === "Active" && Number(product.stockQuantity || 0) > 0,
    sku: product.sku,
    sourceUrl: product.sourceUrl || "",
    highlights: Array.isArray(product.highlights) && product.highlights.length ? product.highlights : [product.unit, product.weight, product.shelfLife].filter(Boolean),
    description: product.fullDescription || product.shortDescription || "",
    benefits: Array.isArray(product.benefits) ? product.benefits : [],
    ingredients: product.ingredients || "",
    usage: Array.isArray(product.usageInstructions) ? product.usageInstructions : [],
    specs,
    storage: product.storageInstructions || "Store in a cool, dry and airtight container away from moisture and direct sunlight.",
    gallery: product.images?.map((image) => image.url) || [],
    variants: product.variants || [],
  };
}

export const listProducts = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const where = { status: "Active" };
  if (req.query.search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${req.query.search}%` } },
      { shortDescription: { [Op.like]: `%${req.query.search}%` } },
      { sku: { [Op.like]: `%${req.query.search}%` } },
    ];
  }
  const include = [{ model: Category, as: "category" }, { model: ProductImage, as: "images" }, { model: ProductVariant, as: "variants" }];
  if (req.query.category) {
    include[0].where = { slug: req.query.category };
    include[0].required = true;
  }
  const result = await Product.findAndCountAll({ where, include, distinct: true, limit, offset, order: [["isBestSeller", "DESC"], ["createdAt", "DESC"]] });
  return success(res, "Store products loaded", result.rows.map(productDto), 200, { pagination: paginationMeta(page, limit, result.count) });
});

export const productDetail = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    where: { slug: req.params.slug, status: "Active" },
    include: [{ model: Category, as: "category" }, { model: ProductImage, as: "images" }, { model: ProductVariant, as: "variants" }],
  });
  if (!product) throw notFound("Product not found");
  return success(res, "Store product loaded", productDto(product));
});

export const listCategories = asyncHandler(async (_req, res) => {
  const rows = await Category.findAll({ where: { status: "Active" }, order: [["displayOrder", "ASC"], ["name", "ASC"]] });
  return success(res, "Store categories loaded", rows);
});

export const listBlogs = asyncHandler(async (_req, res) => {
  const rows = await Blog.findAll({ where: { status: "Published" }, include: [{ model: BlogCategory, as: "category" }], order: [["publishedDate", "DESC"]] });
  return success(res, "Store blogs loaded", rows);
});

export const blogDetail = asyncHandler(async (req, res) => {
  const row = await Blog.findOne({ where: { slug: req.params.slug, status: "Published" }, include: [{ model: BlogCategory, as: "category" }] });
  if (!row) throw notFound("Blog post not found");
  return success(res, "Store blog loaded", row);
});

export const createOrder = asyncHandler(async (req, res) => {
  const order = await createStoreOrder(req.body);
  return created(res, "Order created successfully", order);
});

export const listCoupons = asyncHandler(async (_req, res) => {
  const now = new Date();
  const coupons = await Coupon.findAll({
    where: {
      status: "Active",
      [Op.and]: [
        { [Op.or]: [{ startDate: null }, { startDate: { [Op.lte]: now } }] },
        { [Op.or]: [{ expiryDate: null }, { expiryDate: { [Op.gte]: now } }] },
      ],
    },
    attributes: ["code", "description", "discountType", "discountValue", "minimumOrder", "maximumDiscount", "expiryDate"],
    order: [["createdAt", "DESC"]],
  });
  return success(res, "Active coupons loaded", coupons);
});

export const validateCoupon = asyncHandler(async (req, res) => {
  const coupon = await previewStoreCoupon(req.body.couponCode, Number(req.body.subtotal));
  return success(res, "Coupon applied", coupon);
});

export const orderTracking = asyncHandler(async (req, res) => {
  const order = await trackOrder(req.body.orderNumber, req.body.contact);
  return success(res, "Tracking loaded", order);
});

export const contact = asyncHandler(async (req, res) => {
  const enquiry = await ContactEnquiry.create(req.body);
  await notifyAdmin({
    title: "New Contact Enquiry",
    message: `${enquiry.name} sent a ${enquiry.subject || "website"} enquiry`,
    type: "Contact",
    link: `/contact-enquiries/${enquiry.id}`,
  });
  return created(res, "Contact enquiry submitted", enquiry);
});

export const bulkOrder = asyncHandler(async (req, res) => {
  const enquiry = await BulkOrder.create(req.body);
  await notifyAdmin({
    title: "Bulk Order Request",
    message: `${enquiry.name} requested ${enquiry.quantity || "bulk"} ${enquiry.product || "products"}`,
    type: "Bulk Order",
    link: `/bulk-orders/${enquiry.id}`,
  });
  return created(res, "Bulk order enquiry submitted", enquiry);
});

export const createReview = asyncHandler(async (req, res) => {
  const review = await Review.create({ ...req.body, status: "Pending" });
  await notifyAdmin({ title: "New Product Review", message: "A product review is waiting for approval", type: "Review", link: `/reviews/${review.id}` });
  return created(res, "Review submitted for approval", review);
});
