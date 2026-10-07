import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { promisify } from "node:util";
import { createSessionStore } from "../artifacts/api-server/src/session-store";
import app from "../artifacts/api-server/src/app";
import { database } from "./test-db";
async function main() {
  await database.exec(readFileSync("verification/.tmp/schema.sql", "utf8"));
  for (let pass = 0; pass < 2; pass++) {
    for (const name of readdirSync("deployment/migrations").sort()) {
      await database.exec(readFileSync("deployment/migrations/" + name, "utf8"));
    }
  }
  const firstStore = createSessionStore();
  const secondStore = createSessionStore();
  await promisify(firstStore.set.bind(firstStore))("restart-fixture", { cookie: { maxAge: 60000 }, userId: 123 } as any);
  const restored = await promisify(secondStore.get.bind(secondStore))("restart-fixture");
  assert.equal(restored?.userId, 123, "a different server session-store instance restores the PostgreSQL session");
  await promisify(secondStore.destroy.bind(secondStore))("restart-fixture");
  assert.equal(await promisify(firstStore.get.bind(firstStore))("restart-fixture"), undefined);

  const tables = await database.query<{ table_name: string }>(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public'",
  );
  assert(
    !tables.rows.some((r) =>
      [
        "schools",
        "needs",
        "school_messages",
        "stories",
        "notifications",
      ].includes(r.table_name),
    ),
  );
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.on("listening", resolve));
  const address = server.address();
  assert(address && typeof address !== "string");
  const base = `http://127.0.0.1:${address.port}/api`;
  let cookie = "";
  async function request(path: string, method = "GET", body?: unknown) {
    const r = await fetch(base + path, {
      method,
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (r.headers.has("set-cookie"))
      cookie = r.headers.get("set-cookie")!.split(";")[0];
    return r;
  }
  try {
    const credentials = {
      email: "sokha_12a@student.schoolconnect.local",
      password: "1234",
      role: "student",
    };
    let r = await request("/auth/register", "POST", credentials);
    assert.equal(r.status, 201);
    const user = await r.json();
    assert.equal(user.role, "student");
    assert.equal(user.schoolId, null);
    assert(!("school" in user));
    assert(cookie.startsWith("stem.sid="));
    r = await request("/auth/me");
    assert.equal(r.status, 200);
    assert.equal((await r.json()).id, user.id);
    r = await request("/auth/logout", "POST");
    assert.equal(r.status, 200);
    assert.equal((await request("/auth/me")).status, 401);
    assert.equal(
      (
        await request("/auth/login", "POST", {
          ...credentials,
          password: "9999",
        })
      ).status,
      401,
    );
    r = await request("/auth/login", "POST", credentials);
    assert.equal(r.status, 200);
    await database.query(
      "UPDATE users SET exp_points=25,province=$1 WHERE id=$2",
      ["Kampot", user.id],
    );
    r = await request("/leaderboard/provincial");
    assert.equal(r.status, 200);
    const board = await r.json();
    assert.equal(board[0].province, "Kampot");
    assert.equal(board[0].username, "sokha_12a");
    assert.equal(
      (
        await request("/auth/register", "POST", {
          email: "school@example.test",
          password: "testing123",
          role: "school",
        })
      ).status,
      400,
    );
    assert.equal(
      (
        await request("/quiz-completions", "POST", {
          curiosity: "tech",
          level: "beginner",
          goal: "career",
        })
      ).status,
      201,
    );
    r = await request("/impact-stats");
    assert.equal(r.status, 200);
    const impact = await r.json();
    assert.equal(impact.vitalSigns.studentsGuided, 1);
    assert(!("activeNeeds" in impact.vitalSigns));
    for (const endpoint of [
      "/schools",
      "needs",
      "/school-messages",
      "/notifications",
    ])
      assert.equal(
        (await request(endpoint.startsWith("/") ? endpoint : "/" + endpoint))
          .status,
        404,
      );
    console.log(
      "PASS: PIN registration, login, logout, restored session, province leaderboard, learning impact and removed APIs on a real isolated PostgreSQL engine with no school tables.",
    );
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((e) => (e ? reject(e) : resolve())),
    );
    await database.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
