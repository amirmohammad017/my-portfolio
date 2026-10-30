# my-portfolio

Next.js 16 + MongoDB (Mongoose) personal site, migrated from React Router + Strapi. property-pulse is merged into the same app at `/projects/property-pulse`.

## Structure
- `app/(site)` public pages, `app/(admin)` admin panel, `app/actions/*` server actions per section
- `models/*`, `lib/*`, `config/*` portfolio models, queries, DB and storage config
- `app/(property-pulse)` property-pulse routes with their own root layout, look and providers
- `modules/property-pulse/*` property-pulse actions, components, context, models, config, utils, types, data, assets
- `public/property-pulse` property-pulse static images
- `app/api/property-pulse/auth` property-pulse NextAuth (GitHub) endpoint
- `proxy.ts` guards `/admin` (JWT cookie, 30 days) and property-pulse protected pages (NextAuth)

## Setup
1. `npm install`
2. Fill `.env` (see below)
3. `npm run seed` (4 sample blogs, `calculator-app`, `property-pulse`)
4. `npm run dev` -> http://localhost:3000

## Env files
- `.env.development` is used by `npm run dev` (local MongoDB, `http://localhost:3000`)
- `.env` is used by `npm run build` / `npm start` (production: Liara DB, replace `YOUR_DOMAIN`)

## Env variables
- `MONGODB_URI`, `MONGODB_DB_NAME` (shared by both parts; collections do not collide)
- `ADMIN_USERNAME`, `ADMIN_PASSWORD` (default `admin` / `admin123`), `ADMIN_SESSION_SECRET`
- `PORTFOLIO_S3_*` Arvan bucket for blog/project images; leave empty to store locally in `storage/uploads`
- `ARVAN_CLOUD_S3_*` property-pulse bucket (old bucket)
- `GITHUB_AUTH_CLIENT_ID`, `GITHUB_AUTH_CLIENT_SECRET`, `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`, `NEXTAUTH_URL_INTERNAL` = `<domain>/api/property-pulse/auth`
- `NEXT_PUBLIC_DOMAIN`, `NEXT_PUBLIC_API_DOMAIN`, `NEXT_PUBLIC_MAP_GEOCODING`

## Notes
- The Liara URI with host `amirmohammad-dev-db` only works inside Liara's private network. For local dev enable the public network on Liara and use its host/port.
- Update the GitHub OAuth callback URL to `<domain>/api/property-pulse/auth/callback/github`.
- Admin: `/admin/login`. Create, edit and delete blog posts with image upload.
- Embedded projects have `internal_path` (e.g. `/projects/property-pulse`); other projects open their GitHub/demo links.
- Rotate every secret in `.env` after finishing.
