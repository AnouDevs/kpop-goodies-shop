# kpop-goodies-shop

Kpop goodies shop (photocards, albums, merch ...) — solo project built at the end of a fullstack bootcamp.

## Live Demo

🔗 [kpop-goodies-shop.vercel.app](https://kpop-goodies-shop.vercel.app)

**Demo accounts:**
- Client: `demo-client@kpop-shop.com` / `demo1234`
- Admin: `demo-admin@kpop-shop.com` / `demo1234`

## Features

- Product catalog (public browsing)
- Authentication (Better Auth) — sign up / sign in / sign out
- Role-based access control (admin / client)
- Order placement by customers
- Order history ("My Orders")
- Product management by admin (add, edit, delete, stock) — via service layer, tested

## Tech stack

- Next.js (App Router) + TypeScript
- Drizzle ORM + PostgreSQL (Neon)
- Better Auth
- shadcn/ui + Tailwind CSS
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

Set up environment variables in `.env` (see below).

\`\`\`bash
pnpm dev
\`\`\`

### Environment variables

\`\`\`
POSTGRES_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
\`\`\`

## Testing

\`\`\`bash
pnpm test:run
\`\`\`
