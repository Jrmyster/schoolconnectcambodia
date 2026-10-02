# School Connect Map

Standalone Cambodia Earth, school directory and local school communication application. Extracted from School Connect Cambodia baseline `2c7da36df9f9748ba2aea71edb5d9fb3c693107c` on `refactor/school-connect-map`.

The frontend package is `school-connect-map` in `artifacts/chuy-sala`; its Express backend is `@workspace/api-server`. Routes retain school profiles, requests/needs, completed projects, school inboxes, notifications, stories, partners, school sign-in and administration. STEM routes and learning database tables are removed. The administrative weekly report counts school messages and stories directly; it does not depend on a learning/AI service.

## Run and build

Use Node 22.13+ and pnpm 11.25.0:

```bash
pnpm install --frozen-lockfile
cp artifacts/chuy-sala/.env.example artifacts/chuy-sala/.env.local
cp artifacts/api-server/.env.example artifacts/api-server/.env
# Configure a separate Map database, session secret and VITE_STEM_SITE_URL.
pnpm --filter @workspace/api-server dev
# In another terminal:
pnpm --filter school-connect-map dev
```

The frontend dev server proxies `/api` to port 5000. Use independent API ports if running both applications on one machine and adjust the development proxy accordingly. Production needs its own origin: serve `artifacts/chuy-sala/dist/public` with SPA fallback, and proxy `/api` to this app's server. Geographic workers, local MapLibre modules and boundary data use origin-root URLs. Set `PORT` and the server environment when launching `artifacts/api-server/dist/index.cjs`.

```bash
pnpm --filter @workspace/api-spec run codegen
pnpm run typecheck
pnpm --filter school-connect-map run build
pnpm --filter @workspace/api-server run build
pnpm run verify:api
pnpm exec playwright install chromium
pnpm run verify:browser
```

`VITE_STEM_SITE_URL` is the external **STEM Hub** bridge; configure it before building. Its fallback is `https://khmerone.jaredrobertw.workers.dev`. Analytics are optional through this app's own `VITE_GA_MEASUREMENT_ID`. Mapping is keyless: no Mapbox, Cesium or AI credentials are required. Database credentials, upload storage and `SESSION_SECRET` belong only to this server. The session cookie is `map.sid`. No cross-site session sharing is implemented.

## Cambodia Earth

Vendored from `/workspace/sites/cambodia-earth` commit `a79bb221f21e5fd2533cfdf0bb12f3e8addc06e7`. The original project is unchanged. Source is isolated under `src/features/cambodia-earth`:

- MapLibre renderer and controls; client-only loading and explicit worker setup.
- Terrain height sampling, relief/satellite layers, province/city/place data, urban LOD streets and building extrusions, night display and low-data mode.
- Geographic parsing/query workers; licensed boundary datasets and attribution remain in `public/data`.
- School pins fetched through `/api/schools`; hidden schools are excluded server-side, invalid coordinates are rejected, bilingual names use DOM text, and links open the retained `/school/:id` profiles.
- A searchable school directory remains available when WebGL or school data requests fail. Errors and empty lists are distinguished.

`prepare-map-assets.mjs` builds local MapLibre worker modules and geographic workers before dev/build. Earth CSS is scoped so it does not change school forms or administration pages. School-profile mini-maps also use MapLibre; no Leaflet or Three.js runtime is retained.

Public tile providers are Mapzen/AWS Terrarium elevation, NASA Blue Marble imagery and OpenFreeMap urban tiles/glyphs. The service worker caches only public geographic assets with size/age limits; private APIs, authenticated messages and uploaded user content are not cached by it. There is one service worker registration per Map origin.

## Data and verification

Use a separate PostgreSQL database containing schools, needs, projects, school users, messages, notifications, stories and password-reset tokens. Import school accounts and network-owned rows with stable IDs. No live data migration was executed. Uploads need durable storage at the existing API upload path; local container storage alone is not durable hosting.

`verify:api` uses a fresh in-memory PostgreSQL engine generated from the Map Drizzle schema. It verifies hidden-school filtering, school sessions, authorized communication, student-account rejection and removed learning endpoints. It never contacts a live database.

Publishing the refactor branches does not deploy either application or migrate live data.

Khmer/Latin fonts are vendored locally as Kantumruy Pro (Google Fonts, SIL Open Font License; see `public/fonts/OFL.txt`) so bilingual rendering does not depend on Google Fonts availability.

## Latest validation (2026-10-02)

- `CI=true pnpm --filter school-connect-map run typecheck`: passed.
- `CI=true pnpm --filter school-connect-map run build`: passed (9.15 seconds). Vite reports a size warning for the dynamically loaded MapLibre bundle.
- `CI=true node verification/run-api.mjs`: passed using isolated PostgreSQL, including school sessions, hidden-school filtering and school messaging.
- Browser smoke verification could not start Chromium in this execution environment: `socket() failed: Operation not permitted`. This run does not establish browser/WebGL compatibility or live tile-provider availability.

See `docs/DEPLOYMENT-READINESS.md` for backend build results and remaining hosting decisions.

Production frontend: `https://schoolconnectcambodia.com`. Installed PWA name: **School Connect Cambodia Map**; service-worker cache prefix: `map-pwa-v1`.
