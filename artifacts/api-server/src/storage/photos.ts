import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const formats = {
  jpg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp",
} as const;
export function photoFormat(bytes: Buffer): keyof typeof formats | undefined {
  if (bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return "png";
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "jpg";
  if (["GIF87a", "GIF89a"].includes(bytes.subarray(0,6).toString())) return "gif";
  if (bytes.subarray(0,4).toString() === "RIFF" && bytes.subarray(8,12).toString() === "WEBP") return "webp";
}
const bucket = process.env.R2_BUCKET;
const configured = !!(bucket && process.env.R2_ENDPOINT && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY);
const client = configured ? new S3Client({
  region: "auto", endpoint: process.env.R2_ENDPOINT,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID!, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY! },
}) : undefined;
const localDir = path.resolve(process.env.LEGACY_UPLOADS_DIR || "uploads");
export async function savePhoto(bytes: Buffer) {
  const format = photoFormat(bytes);
  if (!format) throw new Error("UNSUPPORTED_PHOTO");
  const filename = `${randomUUID()}.${format}`;
  if (client) {
    await client.send(new PutObjectCommand({ Bucket: bucket, Key: `uploads/${filename}`, Body: bytes, ContentType: formats[format] }));
  } else {
    if (process.env.NODE_ENV === "production") throw new Error("PHOTO_STORAGE_NOT_CONFIGURED");
    await mkdir(localDir, { recursive: true });
    await writeFile(path.join(localDir, filename), bytes);
  }
  // Same-origin public URL is stored by school/profile routes. Bucket remains private.
  return `/api/uploads/${filename}`;
}
export async function readPhoto(filename: string) {
  if (!/^[a-zA-Z0-9_-]+\.(?:jpe?g|png|gif|webp)$/i.test(filename)) return undefined;
  if (client) {
    try {
      const object = await client.send(new GetObjectCommand({ Bucket: bucket, Key: `uploads/${filename}` }));
      if (!object.Body) return undefined;
      if (!object.ContentLength || object.ContentLength > 10 * 1024 * 1024) throw new Error("INVALID_PHOTO_SIZE");
      return Buffer.from(await object.Body.transformToByteArray());
    } catch (error) {
      if ((error as { name?: string }).name !== "NoSuchKey") throw error;
    }
  }
  // During migration an explicitly mounted legacy directory can retain old photo URLs.
  if (process.env.NODE_ENV !== "production" || process.env.LEGACY_UPLOADS_DIR) {
    try { return await readFile(path.join(localDir, filename)); }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  }
  return undefined;
}
export const photoMime = (bytes: Buffer) => { const format = photoFormat(bytes); return format ? formats[format] : undefined; };
