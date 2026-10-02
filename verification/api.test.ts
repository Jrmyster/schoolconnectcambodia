import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import app from "../artifacts/api-server/src/app";
import { database } from "./test-db";
async function main() {
  await database.exec(readFileSync("verification/.tmp/schema.sql", "utf8"));
  const tables = await database.query<{ table_name: string }>(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public'",
  );
  assert(
    !tables.rows.some((r) =>
      [
        "conversations",
        "quiz_completions",
        "space_leaderboard",
        "saved_careers",
      ].includes(r.table_name),
    ),
  );
  await database.exec(
    "INSERT INTO schools (name_en,name_kh,province,district,latitude,longitude,hide_from_map) VALUES ('School One','សាលាទី១','Kampot','Kampot',10.61,104.18,false),('School Two','សាលាទី២','Kampot','Kampot',10.62,104.19,false),('Hidden School','សាលា','Kampot','Kampot',10.63,104.2,true)",
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
    let r = await request("/schools");
    assert.equal(r.status, 200);
    const schools = await r.json();
    assert.equal(schools.length, 2);
    assert.equal(schools[0].latitude, 10.61);
    assert.equal(schools[0].nameEn, "School One");
    assert.equal((await request("/school-messages")).status, 401);
    const credentials = {
      email: "teacher@example.test",
      password: "testing123",
      role: "school",
      schoolId: 1,
    };
    r = await request("/auth/register", "POST", credentials);
    assert.equal(r.status, 201);
    assert.equal((await r.json()).school.id, 1);
    assert(cookie.startsWith("map.sid="));
    r = await request("/school-messages", "POST", {
      toSchoolId: 2,
      subject: "Local science fair",
      body: "Please join our science fair next month.",
      category: "general",
    });
    assert.equal(r.status, 201);
    await request("/auth/logout", "POST");
    assert.equal((await request("/auth/me")).status, 401);
    r = await request("/auth/register", "POST", {
      email: "recipient@example.test",
      password: "testing123",
      role: "school",
      schoolId: 2,
    });
    assert.equal(r.status, 201);
    r = await request("/school-messages");
    assert.equal(r.status, 200);
    const inbox = await r.json();
    assert.equal(inbox[0].subject, "Local science fair");
    assert.equal(
      (
        await request("/auth/register", "POST", {
          email: "sokha@student.schoolconnect.local",
          password: "1234",
          role: "student",
        })
      ).status,
      400,
    );
    for (const endpoint of [
      "/leaderboard/provincial",
      "/saved-careers",
      "/openai/conversations",
      "/quiz-completions",
    ])
      assert.equal((await request(endpoint)).status, 404);
    console.log(
      "PASS: school listing and hidden-marker exclusion, school sessions, authorized messaging and inbox, student-account rejection, and absent STEM APIs on isolated PostgreSQL.",
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
