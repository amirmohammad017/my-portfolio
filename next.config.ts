import type { NextConfig } from "next";

const hosts = [
  "amirmohammad-dev.s3.ir-central1.arvanstorage.ir",
  "property-pulse.s3.ir-central1.arvanstorage.ir",
  "avatars.githubusercontent.com",
];

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
