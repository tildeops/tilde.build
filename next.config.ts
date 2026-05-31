import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // The headless-Shopify page is now the homepage. Permanently send the old
  // /shopify-headless URL (and any inbound links to it) to /. `permanent: true`
  // emits a 308, the method-preserving equivalent of a 301.
  async redirects() {
    return [
      {
        source: "/shopify-headless",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
