import { Inventory, InventoryTransaction, Product, ProductVariant } from "../models/index.js";
import { AppError, notFound } from "../utils/errors.js";

export function inventoryStatus(stock, minimumStock) {
  if (Number(stock) <= 0) return "Out of Stock";
  if (Number(stock) <= Number(minimumStock || 0)) return "Low Stock";
  return "In Stock";
}

export async function createOrUpdateInventory({ productId, variantId = null, stock = 0, minimumStock = 10, transaction }) {
  const [row] = await Inventory.findOrCreate({
    where: { productId, variantId },
    defaults: {
      productId,
      variantId,
      availableStock: stock,
      minimumStock,
      status: inventoryStatus(stock, minimumStock),
      lastUpdated: new Date(),
    },
    transaction,
  });

  if (!row.isNewRecord) {
    row.availableStock = stock;
    row.minimumStock = minimumStock;
    row.status = inventoryStatus(stock, minimumStock);
    row.lastUpdated = new Date();
    await row.save({ transaction });
  }

  return row;
}

export async function recordInventoryChange({ inventory, changedQuantity, transactionType, reason, relatedOrderId, changedBy, transaction }) {
  const previousQuantity = Number(inventory.availableStock || 0);
  const newQuantity = previousQuantity + Number(changedQuantity || 0);
  if (newQuantity < 0) throw new AppError("Insufficient inventory available", 409);

  inventory.availableStock = newQuantity;
  inventory.status = inventoryStatus(newQuantity, inventory.minimumStock);
  inventory.lastUpdated = new Date();
  if (transactionType === "Sale") inventory.soldQuantity = Number(inventory.soldQuantity || 0) + Math.abs(Number(changedQuantity));
  await inventory.save({ transaction });

  if (inventory.variantId) {
    await ProductVariant.update({ stock: newQuantity }, { where: { id: inventory.variantId }, transaction });
  } else {
    const productUpdate = { stockQuantity: newQuantity };
    if (newQuantity <= 0) productUpdate.status = "Out of Stock";
    await Product.update(productUpdate, { where: { id: inventory.productId }, transaction });
  }

  return InventoryTransaction.create(
    {
      productId: inventory.productId,
      variantId: inventory.variantId,
      previousQuantity,
      changedQuantity,
      newQuantity,
      transactionType,
      reason,
      relatedOrderId,
      changedBy,
    },
    { transaction }
  );
}

export async function adjustInventory(inventoryId, payload, adminId, transaction) {
  const inventory = await Inventory.findByPk(inventoryId, { transaction, lock: true });
  if (!inventory) throw notFound("Inventory record not found");

  const current = Number(inventory.availableStock || 0);
  const quantity = Number(payload.quantity || 0);
  const map = {
    add: { delta: quantity, type: payload.transactionType || "Purchase" },
    reduce: { delta: -quantity, type: payload.transactionType || "Adjustment" },
    damage: { delta: -quantity, type: "Damage" },
    return: { delta: quantity, type: "Return" },
    correction: { delta: quantity, type: "Manual Correction" },
    set: { delta: quantity - current, type: payload.transactionType || "Manual Correction" },
  };

  const movement = map[payload.mode];
  if (!movement) throw new AppError("Invalid inventory adjustment mode", 422);

  await recordInventoryChange({
    inventory,
    changedQuantity: movement.delta,
    transactionType: movement.type,
    reason: payload.reason || movement.type,
    changedBy: adminId,
    transaction,
  });

  return inventory.reload({ transaction });
}
