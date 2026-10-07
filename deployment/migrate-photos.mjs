// Idempotent copy: keeps existing /api/uploads/<filename> references and never deletes originals.
import { createRequire } from 'node:module';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(new URL('../artifacts/api-server/package.json', import.meta.url));
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
for (const key of ['LEGACY_UPLOADS_DIR', 'R2_ENDPOINT', 'R2_BUCKET', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY']) {
  if (!process.env[key]) throw new Error('Missing ' + key);
}
const client = new S3Client({ region: 'auto', endpoint: process.env.R2_ENDPOINT, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY } });
let copied = 0, retained = 0;
for (const entry of await readdir(process.env.LEGACY_UPLOADS_DIR, { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  const extension = path.extname(entry.name).toLowerCase();
  const contentType = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp' }[extension];
  if (!contentType || !/^[a-zA-Z0-9_-]+\.[a-z]+$/i.test(entry.name)) throw new Error('Unsupported legacy filename; review migration manifest before cutover.');
  const bytes = await readFile(path.join(process.env.LEGACY_UPLOADS_DIR, entry.name));
  if (bytes.length > 10 * 1024 * 1024) throw new Error('Oversize legacy photo; review before cutover.');
  const object = { Bucket: process.env.R2_BUCKET, Key: 'uploads/' + entry.name };
  try {
    const existing = await client.send(new HeadObjectCommand(object));
    if (existing.ContentLength !== bytes.length) throw new Error('Existing object size differs; refusing overwrite.');
    retained++;
  } catch (error) {
    if (error.name !== 'NotFound' && error.$metadata?.httpStatusCode !== 404) throw error;
    await client.send(new PutObjectCommand({ ...object, Body: bytes, ContentType: contentType, IfNoneMatch: '*' }));
    const verified = await client.send(new HeadObjectCommand(object));
    if (verified.ContentLength !== bytes.length) throw new Error('Upload verification failed.');
    copied++;
  }
}
console.log({ copied, retained, originalsDeleted: 0 });
