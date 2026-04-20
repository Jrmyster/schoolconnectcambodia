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

- **World History — "The Human Journey"** (`src/pages/WorldHistoryPage.tsx`, route `/world-history`):
  - Interactive bilingual EN/Khmer timeline across 5 eras: Neolithic Revolution, Khmer Empire, Industrial Revolution, Information Age, The Horizon (speculative future)
  - 12 clickable "artifact" zoom nodes (Stone Sickle → Climate Survival) each opening a Radix Dialog modal with a "Why it changed everything" callout
  - Sticky cross-fading background gradient: 5 fixed full-screen gradient layers, opacity-driven by an `IntersectionObserver` watching the active era section (rootMargin `-30% 0px -50% 0px`) — no scroll listeners
  - "Time Machine" quick-jump UI: fixed right rail on desktop with `aria-current` on the active era; mobile uses a floating button + custom `MobileJumpSheet` (role=dialog) with Escape-to-close, click-outside dismiss, and auto-focus on the first jump button
  - Smooth `scrollIntoView` with reduced-motion fallback (`useReducedMotion` from framer-motion)
  - Route lazy-loaded via `React.lazy` + `Suspense` in `App.tsx` to keep the main bundle small (the bilingual content payload is ~30KB of strings)
  - Linked from Navbar "Resources" group with the Library icon
  - `/world-history` added to `public/sw.js` precache list for offline access
  - Historical claims deliberately softened (e.g. Angkor Wat described as "one of the largest religious monuments in the world", Angkor population given as a researcher-estimated range of 700K–900K) to remain credible in a school context
  - **Interactive 3D History Globe** (`src/components/world-history/HistoryGlobe.tsx`) embedded near the top of `/world-history`:
    - Built on `@react-three/fiber` + `@react-three/drei` + `three`; lazy-loaded inside `WorldHistoryPage` so the three.js bundle isn't paid for elsewhere
    - 4 region pins (Asia / Europe / Africa / Americas) placed via lat/lng→vec3 helper at GLOBE_RADIUS + 0.04
    - Time Machine slider (native `<input type="range">` for free a11y) drives 4 eras: Neolithic (lush green), Ancient Empires (warm sandstone), Industrial (smoky grey), Modern (deep blue with 60 deterministic city-light dots on the surface)
    - Region × era content matrix (4×4 = 16 bilingual entries) renders in a Radix Dialog modal; Ancient + Asia, Industrial + Europe, and Modern + Asia each carry an extra "Why it matters" callout (Khmer Empire engineering, Watt's steam engine, Asian-Century manufacturing)
    - Performance: 48-segment sphere, MeshBasicMaterial atmosphere with `BackSide` for cheap glow, capped DPR `[1, 1.5]`, `powerPreference: "low-power"`, auto-spin pauses while user interacts or while a modal is open, respects `useReducedMotion`
    - Resilience: synchronous `detectWebGL()` probe runs on mount; if WebGL is unavailable the Canvas is never mounted and a bilingual `<GlobeFallback />` (`data-testid="globe-fallback"`) is shown — slider, region pills, and modals stay fully functional. A `<WebGLBoundary>` class component catches any post-mount THREE errors as a second safety net.
- **IoT & 5G — The Global Nervous System** (`src/components/tech/IoT5GModule.tsx`, Lesson 6 of `/how-computers-work`, page now advertises `INTERACTIVES: 07`):
  - **Smart Farm Simulator**: 3 SVG nodes (`node-soil`, `node-weather`, `node-pump`) on a stylized Cambodian field. `Start Day` (`button-start-day`) walks deterministically through all 4 truth-table combinations of soil moisture × incoming rain (Day 1 = Dry+Clear, Day 2 = Wet+Clear, Day 3 = Dry+Rain, Day 4 = Wet+Rain) so users see the full logic in 4 clicks instead of stalling on randomness. Animated dashed SVG lines + circles riding `offset-path` show data packets flowing from sensors to the pump. Pump turns ON only when soil is dry AND no rain is coming; otherwise the result banner explains *why* it stayed off. Bilingual pull-quote: "The machines talk to each other so the farmer can rest!"
  - **5G Reflex Test**: rAF-driven mini-game with two cars on horizontal tracks heading toward an obstacle. Press `button-stop` → 5G car (60 ms) brakes essentially instantly; 4G car (1100 ms) keeps rolling and crashes into the warning-triangle obstacle. `lane-4g` / `lane-5g` show real-time outcomes (STOPPED SAFELY / CRASHED). Lesson text: "5G isn't just about downloading movies faster — it gives machines the fast reflexes needed to keep humans safe."
  - **Everyday IoT cards** (`iot-card-watch`, `iot-card-bulb`, `iot-card-gps`): Smart watches (heart-rate monitoring), smart bulbs (30–40% electricity savings), motorbike GPS trackers (anti-theft, common in Cambodian cities). Each card has a small pulsing "connected" indicator using shared `iot-pulse` keyframes.
  - Shared in-component `<style>` block defines `iotDashFlow`, `iotPacket`, and `iotPulse` keyframes — keeps the "data invisibly travelling through the air" aesthetic consistent across all three sub-experiences.

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
