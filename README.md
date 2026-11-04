<div align="center">

# 👨‍💻 amirmohammad-dev

Personal portfolio, blog and live project showcase

[![Live](https://img.shields.io/badge/🌐_Live-amirmohammad--dev.ir-blue?style=for-the-badge)](https://amirmohammad-dev.ir/)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)
![Liara](https://img.shields.io/badge/Liara-Hosting-2D3748?style=flat)
![Arvan](https://img.shields.io/badge/ArvanCloud-S3-00A3E0?style=flat)

</div>

---

## ✨ Features

- 🏠 Minimal home page with a dark / light theme toggle (dark by default)
- 📝 Blog with Markdown posts, cover images and search
- 🧩 Projects page: external projects open GitHub / demo, embedded projects run inside the site
- 🔐 Admin panel (`/admin`) to create, edit and delete blogs and projects
- 📬 Contact form with an admin inbox
- 🏘️ **property-pulse** (Next.js + NextAuth + MongoDB) embedded at `/projects/property-pulse`
- 🎬 **movie-app** (OMDb search) embedded at `/projects/movie-app`
- 🖼️ Image uploads to ArvanCloud S3, or local disk as a fallback

---

## 🗺️ Architecture

```mermaid
flowchart TB
  User([👤 Visitor]) --> Proxy{{🛡️ proxy.ts}}

  Proxy -->|public| Site["🌐 app/(site)<br/>home, about, blog, projects, contact"]
  Proxy -->|/admin, JWT cookie| Admin["🔐 app/(admin)<br/>dashboard, blogs, projects"]
  Proxy -->|NextAuth session| Pulse["🏘️ app/(property-pulse)<br/>/projects/property-pulse"]
  Proxy -->|public| Movie["🎬 app/(movie-app)<br/>/projects/movie-app"]

  Site --> Lib["📚 lib/*<br/>queries"]
  Admin --> Actions["⚙️ app/actions/*<br/>server actions"]
  Actions --> Lib
  Lib --> Models["🧬 models/*<br/>Mongoose schemas"]
  Models --> DB[("🍃 MongoDB<br/>Liara")]
  Actions --> Storage["🖼️ lib/storage"]
  Storage --> S3[("☁️ ArvanCloud S3")]
  Storage -.fallback.-> Disk[("💾 storage/uploads")]

  Pulse --> PPModule["📦 modules/property-pulse<br/>actions, models, components"]
  PPModule --> DB
  PPModule --> S3PP[("☁️ property-pulse bucket")]

  Movie --> MovieModule["📦 modules/movie-app<br/>components, context, utils"]
  MovieModule --> OMDb(["🎞️ OMDb API"])
```

### 🧱 Route groups

Each route group has its own root layout, so every section keeps its own look and providers.

| Group | Path | Purpose |
| --- | --- | --- |
| `app/(site)` | `/`, `/about`, `/blog`, `/projects`, `/contact` | Public portfolio, theme toggle |
| `app/(admin)` | `/admin/*` | Admin panel |
| `app/(property-pulse)` | `/projects/property-pulse/*` | Isolated rental marketplace |
| `app/(movie-app)` | `/projects/movie-app/*` | Isolated movie search app |

### 📁 Folder structure

```text
my-portfolio/
├── app/
│   ├── (site)/              public pages
│   ├── (admin)/             admin pages
│   ├── (property-pulse)/    property-pulse routes + own layout
│   ├── (movie-app)/         movie-app routes + own layout
│   ├── actions/             portfolio server actions (auth, blog, project, contact)
│   ├── api/                 property-pulse auth, movie-app search
│   └── media/               serves locally stored uploads
├── components/              admin, blog, contact, layout, project, theme, ui
├── models/                  Blog, Project, ContactMessage (Mongoose)
├── lib/                     queries, auth (JWT), storage, helpers
├── config/                  database.ts, storage.ts
├── modules/
│   ├── property-pulse/      actions, components, models, utils, ...
│   └── movie-app/           components, context, types, utils
├── scripts/seed.mjs         sample data
└── proxy.ts                 route protection
```

---

## 🗄️ How the backend and database work

There is no separate backend server. Next.js is the backend: **Server Components** read data, **Server Actions** write it, and a few **Route Handlers** cover what actions cannot.

```mermaid
sequenceDiagram
  actor Admin as 🔐 Admin
  participant Form as 📝 Form (client)
  participant Action as ⚙️ Server Action
  participant Auth as 🛡️ requireAdmin
  participant S3 as ☁️ Arvan S3
  participant DB as 🍃 MongoDB
  participant Page as 🌐 Public page

  Admin->>Form: fill title, text, image
  Form->>Action: submit FormData
  Action->>Auth: verify JWT cookie (30 days)
  Auth-->>Action: ok
  Action->>S3: upload image (or local disk)
  S3-->>Action: public URL
  Action->>DB: Blog.create({ ..., image })
  Action->>Page: revalidate
  Page->>DB: query on request
  DB-->>Page: blogs
```

| Layer | Where | Role |
| --- | --- | --- |
| 🧬 Models | `models/` | Mongoose schemas for blogs, projects, contact messages |
| 📚 Queries | `lib/*/queries.ts` | Read helpers used by Server Components |
| ⚙️ Actions | `app/actions/*` | Create, update, delete, validated and admin-only |
| 🔌 Connection | `config/database.ts` | Cached Mongoose connection |
| 🖼️ Storage | `lib/storage` | Arvan S3 upload, local fallback served by `/media/*` |
| 🔐 Auth | `lib/auth`, `proxy.ts` | Username and password from env, signed JWT cookie valid for 30 days |

### 🔑 Two separate auth systems

- **Portfolio admin**: username and password in `.env`, signed JWT cookie (`jose`), guarded for `/admin/*`.
- **property-pulse users**: GitHub OAuth through NextAuth, guarded for add, saved and profile pages.

### 🧩 Project kinds

- `external`: the card opens the GitHub or demo link.
- `embedded`: the card opens `internal_path` (for example `/projects/movie-app`) inside this site.

Projects are stored in MongoDB, so new ones can be added from `/admin/projects/new` without a deploy.

---

## 🚀 Getting started

```bash
npm install
npm run seed
npm run dev
```

Open http://localhost:3000.

### 🔧 Environment

- `.env.development` is used by `npm run dev`, `.env` by build and start.
- `MONGODB_URI`, `MONGODB_DB_NAME`
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
- `PORTFOLIO_S3_*`: bucket for blog and project images (leave empty to store locally)
- `ARVAN_CLOUD_S3_*`: property-pulse bucket
- `GITHUB_AUTH_CLIENT_ID`, `GITHUB_AUTH_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DOMAIN`, `NEXT_PUBLIC_API_DOMAIN`, `NEXT_PUBLIC_MAP_GEOCODING`
- `OMDB_API_KEY`: movie-app

> ⚠️ Never commit real secrets. Keep `.env*` files out of git.

---

## ☁️ Deployment

- 🌐 Hosting: Liara (Next.js platform), deployed from GitHub
- 🍃 Database: MongoDB on Liara (private network host)
- 🖼️ Images: ArvanCloud object storage
- 🔗 Domain: `amirmohammad-dev.ir`
- `next.config.mjs` must stay `.mjs` so Liara's standalone rewrite keeps `remotePatterns`

---

## 📬 Contact

[![GitHub](https://img.shields.io/badge/GitHub-amirmohammad017-181717?style=flat&logo=github)](https://github.com/amirmohammad017)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-amirmohammad--dev-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/amirmohammad-dev)
[![Telegram](https://img.shields.io/badge/Telegram-AMiRmohammaD017-26A5E4?style=flat&logo=telegram&logoColor=white)](https://t.me/AMiRmohammaD017)
[![Email](https://img.shields.io/badge/Email-amirm.1774@gmail.com-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:amirm.1774@gmail.com)
