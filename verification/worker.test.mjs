import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import worker from "../src/worker.ts";
const env = { ASSETS: { fetch: async () => new Response("SPA") }, BACKEND_API_URL: "https://backend.example", BACKEND_PROXY_SECRET: "test-proxy-secret" };

test("SPA and assets delegate; API routes always invoke the Worker", async () => {
  const config = JSON.parse(readFileSync("wrangler.jsonc", "utf8"));
  assert.equal(config.assets.binding, "ASSETS");
  assert.equal(config.assets.not_found_handling, "single-page-application");
  assert.deepEqual(config.assets.run_worker_first, ["/api", "/api/*"]);
  for (const path of ["/lesson/deep-link", "/assets/test.js", "/apiary"]) {
    assert.equal(await (await worker.fetch(new Request("https://site.example" + path), env)).text(), "SPA");
  }
});
test("API proxy preserves method, query, body, cookies and secure forwarding", async (t) => {
  t.mock.method(globalThis, "fetch", async (request) => {
    assert.equal(request.url, "https://backend.example/api/auth/login?lang=km");
    assert.equal(request.method, "POST");
    assert.equal(await request.text(), '{"pin":"1234"}');
    assert.equal(request.headers.get("cookie"), "test.sid=value");
    assert.equal(request.headers.get("x-forwarded-proto"), "https");
    assert.equal(request.headers.get("x-forwarded-host"), "site.example");
    assert.equal(request.headers.get("x-forwarded-for"), null);
    assert.equal(request.headers.get("x-backend-proxy-secret"), env.BACKEND_PROXY_SECRET);
    assert.equal(request.redirect, "manual");
    return new Response("ok", { headers: { "set-cookie": "test.sid=new; Secure; HttpOnly", "cache-control": "public" } });
  });
  const response = await worker.fetch(new Request("https://site.example/api/auth/login?lang=km", { method: "POST", body: '{"pin":"1234"}', headers: { cookie: "test.sid=value", "x-forwarded-proto": "http", "x-forwarded-for": "forged", "x-backend-proxy-secret": "forged" } }), env);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.match(response.headers.get("set-cookie"), /Secure; HttpOnly/);
});
test("API configuration errors fail closed and never become SPA HTML", async () => {
  for (const backend of ["", "http://backend.example", "https://site.example", "https://backend.example/subpath", "https://secret@backend.example"]) {
    const response = await worker.fetch(new Request("https://site.example/api"), { ...env, BACKEND_API_URL: backend });
    assert.equal(response.status, 503);
    assert.match(response.headers.get("content-type"), /json/);
  }
});
test("redirects cannot leak credentials and same-backend redirects stay same-origin", async (t) => {
  let location = "https://attacker.example/api/capture";
  t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 302, headers: { location } }));
  assert.equal((await worker.fetch(new Request("https://site.example/api/test"), env)).status, 502);
  location = "/api/auth/me";
  assert.equal((await worker.fetch(new Request("https://site.example/api/test"), env)).headers.get("location"), "https://site.example/api/auth/me");
});
test("upstream failure returns an uncached 502", async (t) => {
  t.mock.method(globalThis, "fetch", async () => { throw new Error("network"); });
  const response = await worker.fetch(new Request("https://site.example/api/test"), env);
  assert.equal(response.status, 502);
  assert.equal(response.headers.get("cache-control"), "no-store");
});
