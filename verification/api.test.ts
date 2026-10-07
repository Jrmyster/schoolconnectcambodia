import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { promisify } from "node:util";
import { createSessionStore } from "../artifacts/api-server/src/session-store";
import { S3Client, PutObjectCommand, GetObjectCommand } from "../artifacts/api-server/node_modules/@aws-sdk/client-s3";
import app from "../artifacts/api-server/src/app";
import { database } from "./test-db";
async function main() {
  const objects = new Map<string, Buffer>();
  const originalSend = S3Client.prototype.send;
  (S3Client.prototype as any).send = async (command: any) => {
    assert.equal(command.input.Bucket, "isolated-test");
    if (command instanceof PutObjectCommand) {
      assert.match(command.input.Key, /^uploads\/[a-z0-9-]+\.png$/);
      assert.equal(command.input.ContentType, "image/png");
      objects.set(command.input.Key, Buffer.from(command.input.Body));
      return {};
    }
    if (command instanceof GetObjectCommand) {
      const bytes = objects.get(command.input.Key);
      if (!bytes) throw Object.assign(new Error(), { name: "NoSuchKey" });
      return { ContentLength: bytes.length, Body: { transformToByteArray: async () => bytes } };
    }
    throw new Error("Unexpected storage command");
  };
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
    assert.equal((await fetch(base + "/upload", { method: "POST" })).status, 401);
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
    const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aBZ0AAAAASUVORK5CYII=", "base64");
    const form = new FormData();
    form.append("photo", new Blob([png], { type: "image/png" }), "school.png");
    const upload = await fetch(base + "/upload", { method: "POST", headers: { Cookie: cookie }, body: form });
    assert.equal(upload.status, 200);
    const photo = await upload.json();
    assert.match(photo.url, /^\/api\/uploads\/[a-z0-9-]+\.png$/);
    const downloaded = await fetch(base.replace(/\/api$/, "") + photo.url);
    assert.equal(downloaded.status, 200);
    assert.equal(downloaded.headers.get("content-type"), "image/png");
    assert.deepEqual(Buffer.from(await downloaded.arrayBuffer()), png);
    const invalid = new FormData();
    invalid.append("photo", new Blob(["<svg><script>alert(1)</script></svg>"], { type: "image/png" }), "fake.png");
    assert.equal((await fetch(base + "/upload", { method: "POST", headers: { Cookie: cookie }, body: invalid })).status, 415);
    assert.equal(objects.size, 1);
    console.log("PASS: persistent sessions across store instances, repeatable migrations, authenticated photo upload/read through a mocked R2 transport, and invalid-image rejection.");
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
    S3Client.prototype.send = originalSend;
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
