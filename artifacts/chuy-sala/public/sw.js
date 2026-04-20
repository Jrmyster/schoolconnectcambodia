/* Chouy Sala Service Worker
 * Strategy:
 *   - Pre-cache the app shell + key offline-friendly modules at install.
 *   - Stale-While-Revalidate for same-origin GET requests (HTML, JS, CSS, images, audio, fonts).
 *   - Navigations fall back to the cached app shell when offline so SPA routes still load.
 *   - API requests (/api/*) are network-only — they fail gracefully so the UI can show
 *     the bilingual "needs internet" message.
 */

const VERSION = "v1";
const SHELL_CACHE = `chouy-sala-shell-${VERSION}`;
const RUNTIME_CACHE = `chouy-sala-runtime-${VERSION}`;

// SW scope ends with a trailing slash; everything we precache is relative to it.
const BASE = new URL("./", self.registration.scope).pathname;

// App shell + Beginner English/Math + mascot/icon assets we want available offline.
const PRECACHE_URLS = [
  "",
  "manifest.webmanifest",
  "favicon.svg",
  "images/logo.png",
  "icons/icon-192.svg",
  "icons/icon-512.svg",
  "icons/maskable-512.svg",
  // Beginner-friendly modules called out for offline use:
  "english-writing",
  "finlit-intro",
  "exam-prep",
  "world-history",
].map((p) => BASE + p);

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Use addAll with individual fetches so a single 404 doesn't abort install.
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
      await Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k)),
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

function isCacheableSameOrigin(request) {
  if (request.method !== "GET") return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  // Don't try to cache API calls or websockets — they should hit the network.
  if (url.pathname.startsWith(BASE + "api/")) return false;
  if (url.pathname.includes("/api/")) return false;
  return true;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.ok && response.type !== "opaque") {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    })
    .catch(() => null);
  // Return cached immediately if present; otherwise wait for the network.
  return cached || (await networkPromise) || Response.error();
}

async function handleNavigation(request) {
  // Try the network first for fresh HTML; if offline, fall back to cached shell.
  try {
    const network = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, network.clone()).catch(() => {});
    return network;
  } catch {
    const cache = await caches.open(SHELL_CACHE);
    const shell = await cache.match(BASE) || await cache.match(BASE + "index.html");
    if (shell) return shell;
    const runtime = await caches.open(RUNTIME_CACHE);
    const cachedRoute = await runtime.match(request);
    if (cachedRoute) return cachedRoute;
    return new Response(
      "<!doctype html><meta charset='utf-8'><title>Offline</title><body style='font-family:system-ui;padding:2rem;color:#0f172a;background:#f8fafc'><h1>Offline</h1><p>This part of Chouy Sala is not yet cached. Please reconnect to the internet and try again.</p></body>",
      { status: 503, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }
  if (isCacheableSameOrigin(request)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
