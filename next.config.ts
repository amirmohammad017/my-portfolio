import type { NextConfig } from "next";

const hosts = Array.from(
  new Set(
    [
      process.env.PORTFOLIO_S3_PUBLIC_URL_WITHOUT_PROTOCOL,
      process.env.ARVAN_CLOUD_S3_PUBLIC_URL_WITHOUT_PROTOCOL,
      "avatars.githubusercontent.com",
    ].filter((host): host is string => Boolean(host)),
  ),
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: hosts.map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "**",
    })),
  },
};

export default nextConfig;
