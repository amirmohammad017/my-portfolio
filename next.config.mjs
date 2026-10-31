const hosts = [
  "amirmohammad-dev.s3.ir-central1.arvanstorage.ir",
  "property-pulse.s3.ir-central1.arvanstorage.ir",
  "avatars.githubusercontent.com",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: hosts.map((hostname) => ({
      protocol: "https",
      hostname,
      pathname: "/**",
    })),
  },
};

export default nextConfig;
