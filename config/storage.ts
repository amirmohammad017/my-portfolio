import { S3Client } from "@aws-sdk/client-s3";

let client: S3Client | null = null;

export function getS3Client() {
  if (!process.env.PORTFOLIO_S3_ENDPOINT) {
    throw new Error("PORTFOLIO_S3_ENDPOINT is not defined");
  }

  if (!client) {
    client = new S3Client({
      region: "default",
      endpoint: process.env.PORTFOLIO_S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.PORTFOLIO_S3_ACCESS_KEY!,
        secretAccessKey: process.env.PORTFOLIO_S3_SECRET_KEY!,
      },
    });
  }

  return client;
}

export const storageConfig = {
  bucket: process.env.PORTFOLIO_S3_BUCKET,
  publicUrl: process.env.PORTFOLIO_S3_PUBLIC_URL,
};

export const isS3Configured = Boolean(
  storageConfig.bucket &&
    storageConfig.publicUrl &&
    process.env.PORTFOLIO_S3_ENDPOINT &&
    process.env.PORTFOLIO_S3_ACCESS_KEY &&
    process.env.PORTFOLIO_S3_SECRET_KEY,
);
