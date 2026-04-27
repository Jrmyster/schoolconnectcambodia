/* Chouy Sala Service Worker
 *
 * Production-readiness sweep — strategy mix:
 *
 *   1. PRECACHE  — App shell + a small set of beginner-friendly modules are
 *                   downloaded at install so the very first offline visit works.
 *
 *   2. CACHE-FIRST — Static, fingerprinted build assets (Vite hashed JS, CSS,
 *                    fonts, icons, images). These never change once their hash
 *                    is in the URL, so we serve from cache instantly and only
 *                    revalidate in the background. This is what makes the site
 *                    feel native on a 3G connection.
 *
 *   3. STALE-WHILE-REVALIDATE — HTML navigations (SPA routes). The student
 *                    sees the previously-cached page immediately, while a
 *                    fresh copy is fetched in the background for next time.
 *                    If the network is offline, the cached shell is served.
 *
 *   4. NETWORK-ONLY — `/api/*` requests. The UI shows its own bilingual
 *                    "needs internet" message when these fail.
 */

// Bump this on every release to invalidate the previous version's caches.
// v3 = navigation strategy switched from stale-while-revalidate to
//      network-first (fixes white-screen-of-death from stale index.html
//      pointing at evicted JS chunks after a redeploy).
const VERSION = "v4";
const SHELL_CACHE = `chouy-sala-shell-${VERSION}`;
const ASSET_CACHE = `chouy-sala-assets-${VERSION}`;
const RUNTIME_CACHE = `chouy-sala-runtime-${VERSION}`;
const KEEP = new Set([SHELL_CACHE, ASSET_CACHE, RUNTIME_CACHE]);

// SW scope ends with a trailing slash; everything we precache is relative to it.
const BASE = new URL("./", self.registration.scope).pathname;

// App shell + Beginner English/Math + mascot/icon assets we want available offline.
const PRECACHE_URLS = [
  "",
  "manifest.webmanifest",
  "favicon.svg",
  "images/logo.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  // Beginner-friendly modules called out for offline use:
  "english-writing",
  "finlit-intro",
  "exam-prep",
  "world-history",
].map((p) => BASE + p);

// File extensions we treat as immutable static assets (cache-first).
const STATIC_ASSET_RE =
  /\.(?:js|mjs|css|woff2?|ttf|otf|eot|png|jpg|jpeg|gif|webp|avif|svg|ico|map)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Use individual fetches so a single 404 doesn't abort install.
      await Promise.all(
        PRECACHE_URLS.map(async (url) => {
          try {
            const res = await fetch(url, { cache: "no-cache" });
            if (res.ok) await cache.put(url, res.clone());
          } catch {
            /* skip — will be cached opportunistically by SWR */
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      // Drop any cache from a prior version (chouy-sala-shell-v1, etc).
      await Promise.all(
        keys.filter((k) => !KEEP.has(k)).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isSameOriginGet(request) {
  if (request.method !== "GET") return false;
  const url = new URL(request.url);
  return url.origin === self.location.origin;
}

function isApi(url) {
  if (url.pathname.startsWith(BASE + "api/")) return true;
  if (url.pathname.includes("/api/")) return true;
  return false;
}

function isStaticAsset(url) {
  return STATIC_ASSET_RE.test(url.pathname);
}

// ── Strategy: cache-first for hashed static assets ───────────────────────
async function cacheFirst(request) {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  if (cached) {
    // Background revalidation — does not block the response.
    fetch(request)
      .then((res) => {
        if (res && res.ok && res.type !== "opaque") {
          cache.put(request, res.clone()).catch(() => {});
        }
      })
      .catch(() => {});
    return cached;
  }
  try {
    const network = await fetch(request);
    if (network && network.ok && network.type !== "opaque") {
      cache.put(request, network.clone()).catch(() => {});
    }
    return network;
  } catch {
    return Response.error();
  }
}

// ── Strategy: stale-while-revalidate for everything else (incl. navigations)
async function staleWhileRevalidate(request, cacheName = RUNTIME_CACHE) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.ok && response.type !== "opaque") {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    })
    .catch(() => null);
  return cached || (await networkPromise) || Response.error();
}

// ── Navigations: NETWORK-FIRST with shell fallback when offline ─────────
//
// IMPORTANT: this MUST be network-first for HTML navigations, not
// stale-while-revalidate. SWR caused a "white screen of death" on the
// initial visit after a deploy: the SW served the OLD cached index.html,
// whose <script src="/assets/main-OLDHASH.js"> referenced bundle hashes
// that were no longer on the server. If the matching old chunk had been
// evicted from the asset cache, the script tag failed → React never
// mounted → blank screen. A manual hard refresh bypassed the SW and
// "fixed" it; that was the smoking gun.
//
// Network-first sidesteps the entire class of stale-HTML bugs while
// preserving full offline support: when the network fails (truly offline,
// or transient), we fall back to whatever HTML we previously cached, and
// finally to the precached app shell so the SPA can still render.
async function handleNavigation(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const network = await fetch(request);
    // Only cache successful responses. We deliberately accept 200–299;
    // serving a cached error page later would be worse than a fresh one.
    if (network && network.ok) {
      cache.put(request, network.clone()).catch(() => {});
      return network;
    }
    // Non-OK from the network (e.g. 5xx) — still try cache, then shell.
  } catch {
    // True network failure → fall through to cache.
  }

  const cached = await cache.match(request);
  if (cached) return cached;

  // Offline + never visited this route before — fall back to the precached
  // app shell so the SPA can render its own client-side route (or 404).
  const shell = await caches.open(SHELL_CACHE);
  const shellRes =
    (await shell.match(BASE)) || (await shell.match(BASE + "index.html"));
  if (shellRes) return shellRes;

  return new Response(
    "<!doctype html><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>Offline</title>" +
      "<body style='font-family:system-ui;padding:2rem;color:#0f172a;background:#f8fafc'>" +
      "<h1>Offline · ក្រៅបណ្តាញ</h1>" +
      "<p>This part of Chouy Sala has not been opened before, so it isn't cached for offline use yet.<br>" +
      "Please reconnect to the internet and try again.</p>" +
      "<p style='font-family:Hanuman,serif;line-height:1.85'>" +
      "ផ្នែកនេះនៃ ជួយសាលា មិនទាន់ត្រូវបានបើកពីមុនទេ ដូច្នេះមិនទាន់ផ្ទុករួចសម្រាប់ប្រើក្រៅបណ្តាញ។ សូមភ្ជាប់អ៊ីនធឺណិតឡើងវិញហើយព្យាយាមម្ដងទៀត។" +
      "</p></body>",
    { status: 503, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // SPA route changes (top-level HTML navigations) → SWR + shell fallback.
  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (!isSameOriginGet(request)) return;

  const url = new URL(request.url);

  // API calls bypass the SW entirely — let them fail loudly when offline.
  if (isApi(url)) return;

  // Hashed static build artefacts → cache-first (fast, offline-resilient).
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Everything else same-origin → SWR.
  event.respondWith(staleWhileRevalidate(request));
});
