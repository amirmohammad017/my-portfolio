import { randomUUID } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client, isS3Configured, storageConfig } from "@/config/storage";

export type StoredImage = { url: string; key: string };

const LOCAL_ROOT = path.join(process.cwd(), "storage", "uploads");
const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "avif", "gif"]);

export function isAllowedImage(file: File) {
  if (!file.type.startsWith("image/")) return false;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTENSIONS.has(ext);
}

function safeExtension(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTENSIONS.has(ext) ? ext : "jpg";
}

export async function saveImage(
  file: File,
  folder: "blogs" | "projects",
): Promise<StoredImage> {
  if (!isAllowedImage(file)) {
    throw new Error("INVALID_IMAGE");
  }

  const key = `${folder}/${randomUUID()}.${safeExtension(file)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isS3Configured) {
    await getS3Client().send(
      new PutObjectCommand({
        Bucket: storageConfig.bucket!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read",
      }),
    );

    return { url: `${storageConfig.publicUrl}/${key}`, key };
  }

  const target = path.join(LOCAL_ROOT, key);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, buffer);

  return { url: `/media/${key}`, key };
}

export async function deleteImage(key?: string | null) {
  if (!key) return;

  if (isS3Configured) {
    await getS3Client()
      .send(
        new DeleteObjectCommand({
          Bucket: storageConfig.bucket!,
          Key: key,
        }),
      )
      .catch(() => undefined);
    return;
  }

  await rm(path.join(LOCAL_ROOT, key), { force: true }).catch(() => undefined);
}

export function getLocalImagePath(key: string) {
  const resolved = path.resolve(LOCAL_ROOT, key);
  if (!resolved.startsWith(path.resolve(LOCAL_ROOT) + path.sep)) {
    throw new Error("INVALID_PATH");
  }
  return resolved;
}
