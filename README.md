# School Connect STEM

Independent bilingual learning application extracted from School Connect Cambodia baseline `2c7da36df9f9748ba2aea71edb5d9fb3c693107c`. Branch: `refactor/school-connect-stem`.

The Vite/React frontend remains in `artifacts/chuy-sala` and is named `school-connect-stem`. The Express API is `@workspace/api-server`. Student PIN/email accounts, student administration, saved careers, quizzes, learning progress, AI learning tools, mascots and educational routes remain. School directory, needs, donations, school messaging and related schemas/APIs have been removed. Eleven former GPU visualizers use interactive SVG; their lesson data, formulas, proof sections and bilingual explanations remain.

## Run and build

Use Node 22.13+ and pnpm 11.25.0. From this repository root:

```bash
pnpm install --frozen-lockfile
cp artifacts/chuy-sala/.env.example artifacts/chuy-sala/.env.local
cp artifacts/api-server/.env.example artifacts/api-server/.env
# Set the STEM database, session secret, AI provider credentials, and VITE_MAP_SITE_URL.
pnpm --filter @workspace/api-server dev
# In another terminal:
pnpm --filter school-connect-stem dev
```

The development frontend proxies `/api` to port 5000. In production, serve `artifacts/chuy-sala/dist/public` with SPA fallback to `index.html`, and proxy `/api` to this app's API. Run the built API with its own environment and `PORT` set. Never point the two applications at one database or share session secrets. The STEM session cookie is `stem.sid`. No automatic cross-site login is implemented.

```bash
pnpm --filter @workspace/api-spec run codegen
pnpm run typecheck
pnpm --filter school-connect-stem run build
pnpm --filter @workspace/api-server run build
pnpm run verify:api
pnpm exec playwright install chromium
pnpm run verify:browser
node verification/run-geometry.mjs
bash verification/check-stem-boundary.sh
```

`VITE_MAP_SITE_URL` is the public bridge to the Digital Map deployment; configure it before building. The fallback is `https://schoolconnectcambodia.com`. `VITE_GA_MEASUREMENT_ID` is optional and defaults to disabled. AI provider variables belong only to this application's server, never to frontend `VITE_` variables. The copied server environment file was removed from git; templates contain no credentials.

## Data separation

Fresh databases use `lib/db/src/schema`. For an independently backed-up copy of the baseline database, review `docs/STUDENT-DATABASE-MIGRATION.sql` before applying schema changes: it snapshots province onto users and removes the school foreign key. Legacy `school_id` remains a nullable, non-relational affiliation ID for compatibility. Student authentication and the leaderboard never query school records. No live database migration was performed as part of the refactor.

Import student users and STEM-owned data into the STEM database, keeping user IDs stable for dependent rows. Keep school accounts and mapping-network data in the Map database. The isolated API verification creates an in-memory PostgreSQL engine from the current Drizzle schema; it does not connect to DATABASE_URL or use real credentials.

## Offline learning and renderers

The service worker caches its own namespaced shell, hashed dependencies and selected beginner modules. The production build generates that asset list from Vite's manifest. APIs remain network-only. Content visited online is cached according to the existing runtime strategy; AI services and authentication still need a network connection.

Visualizers include projected polyhedra with exact Euler counts, a sampled Gabriel horn, a Klein-bottle immersion, deformable unknot/trefoil projections, schematic orbital and galaxy views, numbered symmetry transformations, an inline-four stroke diagram, a selectable history map, Möbius/cup-handle schematics and VSEPR bond diagrams. SVG is the intentional renderer, not a WebGL error fallback. Educational diagrams are schematic; engine motion is slowed for legibility. Reduced-motion preferences stop automatic animation.

The Dengue notice and capability-simulator link were carried over from the newer KhmerOne portal. The simulator remains an external application. The downloadable learning guide is loaded only when requested.

See `docs/DEPLOYMENT-READINESS.md` for verification results and the remaining deployment configuration. Publishing the refactor branch does not deploy this application or migrate live data.

Khmer/Latin fonts are vendored locally as Kantumruy Pro (Google Fonts, SIL Open Font License; see `public/fonts/OFL.txt`) so bilingual rendering does not depend on Google Fonts availability.

Production frontend: `https://khmerone.jaredrobertw.workers.dev`. Installed PWA name: **KhmerOne STEM**; service-worker cache prefix: `stem-pwa-v1`.
