CREATE DATABASE IF NOT EXISTS `Utkarsh_organic`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Table creation is managed by Sequelize models through:
-- npm run migrate
--
-- The migration script creates every normalized ecommerce table:
-- admins, roles, permissions, role_permissions, admin_roles, customers,
-- customer_addresses, customer_notes, categories, products, product_images,
-- product_variants, inventory, inventory_transactions, orders, order_items,
-- order_status_history, payments, shipments, shipment_tracking, coupons,
-- coupon_usage, blogs, blog_categories, blog_tags, reviews, returns,
-- return_items, refunds, bulk_orders, contact_enquiries, notifications,
-- admin_activity_logs, site_settings, media, refresh_tokens,
-- password_reset_tokens, and order_sequences.
