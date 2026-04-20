# Chouy Sala (ជួយសាលា / Help School)

Full-stack web app connecting rural Cambodian high schools with donors and NGOs.

## Features
- Interactive Leaflet map of school needs by province
- School need cards with photo, category badge, funding progress bar
- EN/Khmer language toggle (Zustand `useLanguageStore`)
- Province + category filter bar on Browse Needs page with live school name search
- Transparency log (Completed Projects page)
- School Admin Dashboard (`/admin`):
  - School Sign-Up form (quick 3-field form)
  - Register Full School Profile form (photo upload, district dropdown)
  - Post a Need form (bilingual, 9 categories, photo upload)
  - **Manage tab**: table of all schools + needs with Edit buttons
- Edit School modal (EditSchoolModal.tsx) — PUT /api/schools/:id — includes **Latitude + Longitude** fields that move the map pin
- Edit Need modal (EditNeedModal.tsx) — PUT /api/needs/:id
- Visual Analytics Dashboard (`/admin/dashboard`): Pie chart by category, Bar chart by province
- PhotoUploader component with camera capture + file upload
- **User Authentication** (`/login`):
  - Register + Login page with Sign In / Register tabs, bilingual (EN/KH)
  - bcryptjs password hashing (bcrypt 12 rounds)
  - express-session cookie-based sessions (7-day, httpOnly)
  - AuthContext (React Context) persists user + linked school across page refreshes
  - Navbar shows school name badge + Sign Out when logged in; Sign In button when logged out
- **Forgot Password flow** (`/forgot-password` → `/reset-password`):
  - "Forgot Password?" link on the Login page (below Sign In button)
  - Forgot-password form accepts the registered school email; always shows success (no email disclosure)
  - Generates a secure UUID reset token stored in `password_reset_tokens` table (1-hour expiry, single-use)
  - Dev mode: success screen shows a clickable `/reset-password?token=…` link for testing without email
  - Reset-password form has New Password + Confirm New Password (show/hide toggle); validates min 6 chars, match check
  - On success: marks token `usedAt`, hashes + saves new password, shows "Password Updated!" + "Sign In Now"
  - Guards: missing token → warning card; invalid/expired/reused token → server-side 400 error message
- **School Profile page** (`/school/:id`):
  - School photo banner, bilingual name header, province/district/student-count badges
  - **Edit button** (✏️) visible only when `user.schoolId === school.id` (protected)
  - Mini Leaflet map with FlyToMarker showing school location + coordinate badge
  - Active needs grid using NeedCard
  - 404 state for missing schools; Back-to-Map link
- **MapPage sidebar cards** link to `/school/:id` (hover animation, chevron icon)
- **MapComponent popup** has two buttons: "View Profile → /school/:id" + "Needs"
- **Space page** (`/space`): NASA APOD, Space Agencies cards, **Interactive 3D Solar System** (`SolarSystem3D.tsx`):
  - `@react-three/fiber` Canvas + `@react-three/drei` Stars + OrbitControls
  - Sun with three-layer glow effect (meshBasicMaterial, no external textures)
  - 8 planets with distinct procedural colors, orbit rings, self-rotation + orbital animation via `useFrame`
  - Saturn's rings (RingGeometry, semi-transparent DoubleSide material)
  - Click any planet → 2D overlay panel with bilingual (EN/KH) fast fact + close button
  - Proactive WebGL detection (`checkWebGL()`) before Canvas mount; graceful bilingual fallback if unsupported
  - `WebGLErrorBoundary` class component as secondary safety net
  - Lazy-loaded via `React.lazy` + `Suspense` for mobile performance
  - `dpr={[1, 1.5]}` cap to reduce pixel overdraw on Retina screens

- **Progressive Web App (PWA)** — installable + offline-capable for rural Cambodia internet outages:
  - `public/manifest.webmanifest` (standalone, theme `#1e3a8a`, EN names "Chouy Sala / School Connect")
  - PNG icons (`icons/icon-192.png`, `icon-512.png`, `maskable-512.png`, `apple-touch-icon-180.png`) plus SVG variants drawn from Royal Turtle + Kouprey mascots
  - `public/sw.js` service worker — Stale-While-Revalidate for same-origin GETs, network-first navigations with cached-shell fallback, `/api/*` bypassed
  - Pre-cached app shell + Beginner English Writing, Financial Literacy Intro, and Exam Prep routes
  - `src/lib/pwa.ts` — registers SW (respects `import.meta.env.BASE_URL`), captures `beforeinstallprompt`, exposes pub/sub install-prompt store
  - `<PWAStatusBar />` mounted in `App.tsx` — fixed amber offline banner with bilingual text and dismiss button (uses `useOnline()` hook)
  - `<OfflineFallback />` — bilingual "This section needs internet" card with Try Again + Back to Home; wraps `ImpactReportPage` when offline
  - `<InstallAppButton />` in Navbar (compact in desktop row 1, full-width in mobile menu); auto-hides when no install prompt available or app already installed

## API Routes
- GET/POST /api/schools, GET /api/schools/:id, **PUT /api/schools/:id**
- GET/POST /api/needs, GET /api/needs/:id, **PUT /api/needs/:id**, PATCH /api/needs/:id/funding
- GET /api/provinces
- POST /api/auth/register, POST /api/auth/login, POST /api/auth/logout, GET /api/auth/me
- POST /api/auth/forgot-password, POST /api/auth/reset-password

## DB Tables
- `schools`, `needs`, `completed_projects`, `users` (email, passwordHash, schoolId FK), `password_reset_tokens` (token UUID, userId FK, expiresAt, usedAt)

## Custom Hooks
- `useUpdateSchool`, `useUpdateNeed` in `lib/api-client-react/src/custom-hooks.ts`

## Auth Context
- `artifacts/chuy-sala/src/context/AuthContext.tsx` — `AuthProvider`, `useAuth()`
- Session state: `{ user: { id, email, schoolId, school } | null, loading, login, register, logout }`

# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
