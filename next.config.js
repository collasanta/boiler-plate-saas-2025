const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/requests.ts");

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  workboxOptions: {
    skipWaiting: true,
  },
  // buildExcludes: [/\/_next\/static\/.*\.js/],
  // reloadOnOnline: true,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = withNextIntl(withPWA(nextConfig));
