# kpop-goodies-shop

Kpop/anime goodies shop (photocards, albums, merch ...) — solo project built at the end of a fullstack bootcamp.

## Features

- Product catalog (public browsing)
- Product management by admin (add, edit, delete, stock)
- Order placement by customers (multiple products, quantities)
- Authentication (Better Auth)
- Role-based access control (admin / client)

## Tech stack

- Next.js (App Router) + TypeScript
- Drizzle ORM + PostgreSQL (Neon)
- Better Auth
- Vitest (tests)
- Husky (pre-commit hooks)
- Deployment: Vercel
- CI/CD: GitHub Actions

## Database schema

**Products**: productId (PK), name, description, price, category, stock

**Orders**: orderId (PK), userId, status, orderDate, trackingNumber

**OrderItems**: orderItemId (PK), orderId (FK), productId (FK), quantity

## Getting started

\`\`\`bash
pnpm install
\`\`\`

Set up environment variables in `.env`.

\`\`\`bash
pnpm dev
\`\`\`
