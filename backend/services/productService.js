import { sequelize } from "../config/database.js";
import { Op } from "sequelize";
import { Category, Inventory, Product, ProductImage, ProductVariant } from "../models/index.js";
import { logActivity } from "./auditService.js";
import { createOrUpdateInventory } from "./inventoryService.js";
import { notFound } from "../utils/errors.js";
import { slugify } from "../utils/slug.js";

function normalizeArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") return value.split("\n").map((item) => item.trim()).filter(Boolean);
  return [];
}

async function resolveCategoryId(payload, transaction) {
  if (payload.categoryId) return payload.categoryId;
  if (!payload.category && !payload.categoryName) return null;
  const name = payload.categoryName || payload.category;
  const slug = slugify(payload.category || payload.categoryName);
  const [category] = await Category.findOrCreate({
    where: { slug },
    defaults: { name, slug, status: "Active" },
    transaction,
  });
  return category.id;
}

function productPayload(payload) {
  return {
    ...payload,
    slug: payload.slug ? slugify(payload.slug) : slugify(payload.name),
    benefits: normalizeArray(payload.benefits),
    usageInstructions: normalizeArray(payload.usageInstructions),
    isFeatured: Boolean(payload.isFeatured),
    isBestSeller: Boolean(payload.isBestSeller),
    isNewArrival: Boolean(payload.isNewArrival),
  };
}

export async function createProduct(payload, admin, req) {
  return sequelize.transaction(async (transaction) => {
    const data = productPayload(payload);
    data.categoryId = await resolveCategoryId(data, transaction);
    const product = await Product.create(data, { transaction });

    const images = normalizeArray(payload.galleryImages || payload.images);
    if (product.mainImage) images.unshift(product.mainImage);
    await Promise.all(
      [...new Set(images)].map((url, index) =>
        ProductImage.create({ productId: product.id, url, alt: product.name, displayOrder: index }, { transaction })
      )
    );

    await createOrUpdateInventory({
      productId: product.id,
      stock: Number(product.stockQuantity || 0),
      minimumStock: Number(product.minimumStockAlert || 10),
      transaction,
    });

    for (const variant of payload.variants || []) {
      const created = await ProductVariant.create(
        {
          productId: product.id,
          sku: variant.sku,
          weight: variant.weight,
          price: variant.price,
          salePrice: variant.salePrice,
          stock: variant.stock || 0,
          status: variant.status || "Active",
        },
        { transaction }
      );
      await createOrUpdateInventory({
        productId: product.id,
        variantId: created.id,
        stock: Number(variant.stock || 0),
        minimumStock: Number(product.minimumStockAlert || 10),
        transaction,
      });
    }

    await logActivity({
      adminId: admin?.id,
      action: `Admin added product ${product.name}`,
      module: "products",
      recordId: product.id,
      updatedData: data,
      ipAddress: req?.ip,
      transaction,
    });

    return product.reload({ include: [{ model: Category, as: "category" }, { model: ProductImage, as: "images" }, { model: ProductVariant, as: "variants" }], transaction });
  });
}

export async function updateProduct(id, payload, admin, req) {
  return sequelize.transaction(async (transaction) => {
    const product = await Product.findByPk(id, { transaction });
    if (!product) throw notFound("Product not found");
    const previousData = product.toJSON();
    const data = productPayload({ ...product.toJSON(), ...payload });
    data.categoryId = await resolveCategoryId(data, transaction);

    await product.update(data, { transaction });
    if (payload.galleryImages || payload.images) {
      await ProductImage.destroy({ where: { productId: product.id }, transaction });
      const images = normalizeArray(payload.galleryImages || payload.images);
      if (product.mainImage) images.unshift(product.mainImage);
      await Promise.all(
        [...new Set(images)].map((url, index) =>
          ProductImage.create({ productId: product.id, url, alt: product.name, displayOrder: index }, { transaction })
        )
      );
    }

    await createOrUpdateInventory({
      productId: product.id,
      stock: Number(product.stockQuantity || 0),
      minimumStock: Number(product.minimumStockAlert || 10),
      transaction,
    });

    if (Array.isArray(payload.variants)) {
      await ProductVariant.destroy({ where: { productId: product.id }, transaction });
      await Inventory.destroy({ where: { productId: product.id, variantId: { [Op.not]: null } }, transaction });
      for (const variant of payload.variants) {
        const created = await ProductVariant.create({ ...variant, productId: product.id }, { transaction });
        await createOrUpdateInventory({
          productId: product.id,
          variantId: created.id,
          stock: Number(variant.stock || 0),
          minimumStock: Number(product.minimumStockAlert || 10),
          transaction,
        });
      }
    }

    await logActivity({
      adminId: admin?.id,
      action: `Admin updated product ${product.name}`,
      module: "products",
      recordId: product.id,
      previousData,
      updatedData: data,
      ipAddress: req?.ip,
      transaction,
    });

    return product.reload({ include: [{ model: Category, as: "category" }, { model: ProductImage, as: "images" }, { model: ProductVariant, as: "variants" }], transaction });
  });
}

export async function duplicateProduct(id, admin, req) {
  return sequelize.transaction(async (transaction) => {
    const product = await Product.findByPk(id, {
      include: [{ model: ProductImage, as: "images" }, { model: ProductVariant, as: "variants" }],
      transaction,
    });
    if (!product) throw notFound("Product not found");
    const copy = product.toJSON();
    delete copy.id;
    delete copy.createdAt;
    delete copy.updatedAt;
    delete copy.deletedAt;
    delete copy.images;
    delete copy.variants;
    copy.name = `${copy.name} Copy`;
    copy.slug = `${copy.slug}-copy-${Date.now()}`;
    copy.sku = `${copy.sku}-COPY-${Date.now().toString().slice(-4)}`;
    copy.status = "Draft";
    const duplicated = await Product.create(copy, { transaction });

    await Promise.all(
      (product.images || []).map((image, index) =>
        ProductImage.create({ productId: duplicated.id, url: image.url, alt: duplicated.name, displayOrder: index }, { transaction })
      )
    );

    await createOrUpdateInventory({
      productId: duplicated.id,
      stock: 0,
      minimumStock: Number(duplicated.minimumStockAlert || 10),
      transaction,
    });

    await logActivity({
      adminId: admin?.id,
      action: `Admin duplicated product ${product.name}`,
      module: "products",
      recordId: duplicated.id,
      ipAddress: req?.ip,
      transaction,
    });

    return duplicated;
  });
}
