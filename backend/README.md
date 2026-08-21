# Utkarsh Organic Backend

Node.js, Express, Sequelize, and MySQL backend for the Utkarsh Organic storefront and admin panel.

## Local Setup

```bash
cd backend
copy .env.example .env
npm install
npm run migrate
npm run seed
npm run dev
```

Default local database values are documented in `.env.example`. Credentials are loaded only from environment variables.

## Initial Admin

Set these in `backend/.env` before seeding:

```env
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=ChangeMeImmediately
```

The seeded admin receives the Super Admin role and is marked for password change.
