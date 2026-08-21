# Utkarsh Organic Backend API

Base URL: `http://localhost:5000/api`

Responses are consistent:

```json
{ "success": true, "message": "Done", "data": {} }
```

Errors:

```json
{ "success": false, "message": "Validation failed", "errors": {} }
```

## Auth

- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/profile`
- `PATCH /auth/profile`
- `POST /auth/change-password`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

## Admin

All admin routes require `Authorization: Bearer <accessToken>`.

- `GET /admin/dashboard`
- `GET|POST /admin/products`
- `GET|PUT|PATCH|DELETE /admin/products/:id`
- `POST /admin/products/:id/duplicate`
- `POST /admin/products/bulk`
- `GET|POST /admin/categories`
- `GET /admin/inventory`
- `POST /admin/inventory/:id/adjust`
- `GET /admin/inventory/transactions`
- `GET /admin/orders`
- `PATCH /admin/orders/:id/status`
- `PUT /admin/orders/:id/shipment`
- `GET /admin/customers`
- `POST /admin/customers/:id/notes`
- `GET|POST /admin/blogs`
- `GET|POST /admin/blog-categories`
- `GET|POST /admin/coupons`
- `GET /admin/payments`
- `GET|POST /admin/returns`
- `GET|POST /admin/refunds`
- `GET|POST /admin/bulk-orders`
- `GET|POST /admin/contact-enquiries`
- `GET|POST /admin/reviews`
- `GET /admin/reports/:type`
- `GET /admin/reports/:type/export/csv`
- `GET|PUT /admin/settings`
- `POST /admin/media/upload`
- `GET /admin/media`
- `DELETE /admin/media/:id`

## Storefront

- `GET /store/products`
- `GET /store/products/:slug`
- `GET /store/categories`
- `GET /store/blogs`
- `GET /store/blogs/:slug`
- `POST /store/orders`
- `POST /store/order-tracking`
- `POST /store/contact-enquiries`
- `POST /store/bulk-orders`
- `POST /store/reviews`

## Setup

```bash
cd backend
copy .env.example .env
npm install
npm run migrate
npm run seed
npm run dev
```
