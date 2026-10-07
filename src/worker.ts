// Static assets stay on Cloudflare; authenticated APIs run on the Node backend.
export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  BACKEND_API_URL: string;
  BACKEND_PROXY_SECRET: string;
}
const unavailable = (status: number, error: string) => Response.json({ error }, {
  status, headers: { "Cache-Control": "no-store" },
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api" && !url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }
    let upstream: URL;
    try {
      upstream = new URL(env.BACKEND_API_URL);
      if (upstream.protocol !== "https:" || upstream.username || upstream.password ||
          upstream.pathname !== "/" || upstream.search || upstream.hash ||
          upstream.origin === url.origin || !env.BACKEND_PROXY_SECRET) throw new Error();
    } catch {
      return unavailable(503, "API service is not configured.");
    }
    // Assign pathname instead of resolving a user-controlled URL against a base.
    upstream.pathname = url.pathname;
    upstream.search = url.search;
    const headers = new Headers(request.headers);
    for (const name of ["host", "forwarded", "x-forwarded-for", "x-forwarded-host", "x-forwarded-proto", "x-backend-proxy-secret"]) headers.delete(name);
    headers.set("X-Forwarded-Host", url.host);
    headers.set("X-Forwarded-Proto", "https");
    headers.set("X-Backend-Proxy-Secret", env.BACKEND_PROXY_SECRET);
    try {
      const response = await fetch(new Request(new Request(upstream, request), { headers, redirect: "manual" }));
      // Never follow upstream redirects while carrying session cookies or secrets.
      const result = new Response(response.body, response);
      result.headers.set("Cache-Control", "no-store");
      result.headers.set("CDN-Cache-Control", "no-store");
      const location = result.headers.get("Location");
      if (location) {
        const redirect = new URL(location, upstream);
        if (redirect.origin !== upstream.origin || !redirect.pathname.startsWith("/api/")) {
          return unavailable(502, "Unexpected API redirect.");
        }
        result.headers.set("Location", url.origin + redirect.pathname + redirect.search);
      }
      return result;
    } catch {
      return unavailable(502, "API service is temporarily unavailable.");
    }
  },
};
