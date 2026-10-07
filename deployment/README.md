# Production deployment: school-connect-stem

Prepared for Cloudflare account `47ca22160e0b6b6e04a019a37c5b012b` on 2026-10-07.
**This configuration has passed a local Wrangler dry run; it has not been deployed.**

| Setting | Value |
| --- | --- |
| GitHub branch | `refactor/school-connect-stem` |
| Worker | `khmerone` |
| Public URL | https://khmerone.jaredrobertw.workers.dev |
| Static assets | `artifacts/chuy-sala/dist/public` |
| Frontend build variable | `VITE_MAP_SITE_URL=https://schoolconnectcambodia.com` |
| Backend | Separate Node/Express service using `Dockerfile.backend` |
| Database | Separate PostgreSQL database and database role for this app |

The `khmerone` Worker name is required for the requested workers.dev hostname.
That hostname currently serves an existing KhmerOne portal. Replacing it replaces that portal's directory, engine lab and teacher toolkit; retain its deployment/version and decide the cutover before running a production deploy. A workers.dev hostname is not a custom domain.
The Map Worker configuration binds `schoolconnectcambodia.com` as a custom domain; confirm ownership and existing routing before cutover.

## 1. Prepare databases without rewriting IDs

Back up the current monolith database and old uploads directory. Provision **two empty PostgreSQL databases with different database roles** on the existing provider. No destructive Drizzle push is part of this deployment.
For an existing installation, restore the same consistent snapshot into each empty target. PostgreSQL custom-format dumps preserve primary keys, foreign keys and sequence values:

```bash
# Supply connection URLs only through your host's secret environment.
mkdir -p backups
chmod 700 backups
pg_dump --format=custom --no-owner --no-acl --file=backups/monolith.dump "$SOURCE_DATABASE_URL"
pg_restore --no-owner --no-acl --exit-on-error --single-transaction --dbname="$STEM_DATABASE_URL" backups/monolith.dump
pg_restore --no-owner --no-acl --exit-on-error --single-transaction --dbname="$MAP_DATABASE_URL" backups/monolith.dump
```

Run the corresponding branch's additive migrations on **its isolated target**, with `DATABASE_URL` and `EXPECTED_DATABASE_NAME` set in a secure environment:

```bash
pnpm run db:migrate:production
```

This takes an advisory lock, verifies the target database name, applies migrations in one transaction, and records checksums. Existing user/school/message IDs are not rewritten. STEM snapshots student province and removes only the user-to-school foreign key. Both branches add separate session tables. Duplicated legacy tables remain in restored databases until a separately reviewed data-retention cleanup; application routes determine what is exposed. This launch does not purge historical data.

For a genuinely fresh deployment with **no records to retain**, run `pnpm run db:migrate:production -- --init-empty`. It refuses any nonempty public schema and uses the checked-in schema export. Do not use this instead of restoring existing records.

Compare source/target record counts and sequence values before enabling writes. Pause monolith writes for the final snapshot, restore and migrate, then switch traffic; otherwise late messages/registrations can be lost. Keep the source read-only for rollback. Separate hosts/database credentials enforce isolation; bridges do not share login cookies.

## 2. Deploy each backend

Build `Dockerfile.backend` from this branch's repository root on your existing Node/container host. Use the host's secret manager for:

- `DATABASE_URL`: this app's isolated database.
- `SESSION_SECRET`: a unique random secret of at least 32 characters. Use different values for STEM and Map.
- `BACKEND_PROXY_SECRET`: another random secret, unique per app, shared only between this backend and its Worker.
- `PUBLIC_SITE_URL=https://khmerone.jaredrobertw.workers.dev`; `PORT=5000`; `NODE_ENV=production`.
- Optional administrative bootstrap and AI variables from `artifacts/api-server/.env.example`.

The health probe `/healthz` checks the server. Through the Worker, `/api/readyz` checks database connectivity and the persistent session table; it returns 503 if unavailable. Backend API requests require the proxy secret in production. Session cookies are host-only, Secure, HttpOnly and SameSite=Lax.

For Map, provision an R2 bucket and a bucket-scoped Object Read & Write credential. Configure `R2_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` **on the backend**. The bucket stays private: `/api/uploads/<filename>` reads objects through the authenticated proxy, while public school photos remain publicly viewable through that URL. Upload requires a school/admin session. No production upload falls back to ephemeral disk.

In the Map branch, copy old photos with `LEGACY_UPLOADS_DIR` set to the backed-up/mounted uploads directory:

```bash
node deployment/migrate-photos.mjs
```

The script refuses overwrite, validates copy sizes, preserves filenames/URLs and leaves originals intact. Review unsupported legacy formats before cutover. During transition an explicitly mounted `LEGACY_UPLOADS_DIR` provides read fallback for unmigrated files. School/profile APIs already persist returned photo URLs in PostgreSQL.

## 3. Build and configure Workers

In Cloudflare Workers Builds, connect this branch from `Jrmyster/schoolconnectcambodia`, root directory `/`, and use:

```bash
CI=true pnpm install --frozen-lockfile
CI=true pnpm run typecheck
pnpm run typecheck:worker
VITE_MAP_SITE_URL=https://schoolconnectcambodia.com CI=true pnpm --filter school-connect-stem run build
pnpm run deploy:dry-run
```

The Vite variable must be present at **build time**. The production fallback is also in `src/config/sites.ts`.
Once the backend HTTPS origin is deployed and healthy, add only these proxy secrets to this Worker:

```bash
pnpm exec wrangler secret put BACKEND_API_URL --name khmerone
pnpm exec wrangler secret put BACKEND_PROXY_SECRET --name khmerone
```

`BACKEND_API_URL` must be a different HTTPS origin with no path/query/credentials, for example `https://your-backend.example.com`. Do not use the frontend URL or append `/api`. `SESSION_SECRET`, database credentials and R2 credentials belong to Express, not this proxy Worker.
Do not store any secret in a `VITE_*` variable or git. `.dev.vars.example` is local configuration only.

After database, photos, backend and cutover review are complete:

```bash
pnpm run deploy:production
```

The `/api` and `/api/*` routes always invoke the Worker before the SPA fallback. Proxy responses are not cached; cookies, request bodies and queries are retained. Static paths use the ASSETS binding. Unexpected upstream redirects fail closed.

## 4. Verify and cut over

- Check `/api/readyz` on both frontend origins. Restart the backend and verify the same login still works.
- STEM: Student PIN login, dashboard, representative lessons, English/Khmer toggle and offline lessons.
- Map: school admin login, directory, coordinates/pins, profiles, needs, stories and administrative tools.
- Send/receive messages only between dedicated test school accounts. Check recipient inbox and notifications.
- Upload a test photo, restart the backend and verify it remains available and is saved on the profile.
- Test both external bridge links. Inspect PWA caches for `stem-pwa-v1` versus `map-pwa-v1`; APIs must stay out of caches.
- Verify deep-link refresh returns the SPA, while unknown API routes return API errors, never HTML.

Local tests use an isolated PGlite PostgreSQL engine and mock proxy upstreams. Passing them is not proof of live database, R2 or account access. No production data migration or live messaging has been performed in this preparation.

Sources: [Cloudflare Worker routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/), [R2 AWS SDK](https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/), [PostgreSQL session store](https://github.com/voxpelli/node-connect-pg-simple).
