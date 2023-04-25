// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withPlaiceholder } = require("@plaiceholder/next");

/** @type {import('next').NextConfig} */
const nextConfig = withPlaiceholder({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  redirects: () => [
    {
      source: "/login",
      destination: "/auth/signin",
      permanent: true,
    },
    {
      source: "/signin",
      destination: "/auth/signin",
      permanent: true,
    },
    {
      source: "/logout",
      destination: "/auth/signout",
      permanent: true,
    },
    {
      source: "/signout",
      destination: "/auth/signout",
      permanent: true,
    },
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});

module.exports = nextConfig;
