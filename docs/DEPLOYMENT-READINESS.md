# Deployment readiness — School Connect Map

Checked 2026-10-02. Refactor commit: `e51f320`. No deployment or live database migration has been performed.

## Verification

- Frontend non-interactive typecheck and production build: passed.
- API production build: passed on 2026-10-02.
- API integration checks: passed against an isolated PostgreSQL engine, without live credentials.
- Browser checks: blocked before page startup by Chromium `socket() failed: Operation not permitted`. Run `pnpm run verify:browser` on a machine with Chromium support before release. Screenshots from earlier runs do not establish the current build's correctness.

## Deployment configuration

- Frontend package: `school-connect-map`; build from the repository root with `CI=true pnpm --filter school-connect-map run build`.
- Static output: `artifacts/chuy-sala/dist/public`. Configure SPA fallback to `index.html` and serve static workers/fonts with correct MIME types.
- Backend: build with `CI=true pnpm --filter @workspace/api-server run build`; start with `NODE_ENV=production node artifacts/api-server/dist/index.cjs`. Runtime dependencies must be installed; this bundle is not a self-contained executable.
- Route `/api/*` on the frontend origin to its own Express backend. Static hosting alone will not provide login, database access or communication APIs.
- Provision a separate PostgreSQL database and unique `SESSION_SECRET` for each app. Preserve IDs when importing the relevant accounts and dependent rows. Validate on copied data before any production migration.
- The current Express session configuration uses its default in-memory store. Choose persistent session storage before a multi-instance deployment; process restarts otherwise sign users out.

## Publication decisions still needed

- The Digital Map target is `https://schoolconnectcambodia.com`; the STEM target is `https://khmerone.jaredrobertw.workers.dev`. Backend hosting still needs configuration.
- STEM builds use `VITE_MAP_SITE_URL=https://schoolconnectcambodia.com`.
- Map builds use `VITE_STEM_SITE_URL=https://khmerone.jaredrobertw.workers.dev`, also the fallback and example environment value.
- Both split checkouts keep the local audit checkout as `origin`. The `source` remote targets `https://github.com/Jrmyster/schoolconnectcambodia.git` for publication of each refactor branch; do not merge one split into the other.
- After preview deployment, verify sign-in, the cross-site links, browser rendering and offline behavior where applicable before switching live domains.

School photo uploads use `<server working directory>/uploads`; attach durable storage there. Live terrain, imagery and urban tiles also need provider access. Vite reports a size warning for the dynamically imported MapLibre chunk.

Production bridge and PWA configuration checks passed: each app preserves unrelated caches during cleanup, bypasses private APIs, and uses its assigned name and cache prefix. Both frontend production builds passed after these changes. Browser execution remains blocked as described above.
