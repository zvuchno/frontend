import type { NextConfig } from "next";

function getApiImageRemotePattern() {
  try {
    const apiBaseUrl =
      process.env.BASE_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL;
    const apiUrl = new URL(apiBaseUrl ?? "https://zvuchno-dev.duckdns.org/api");

    return {
      protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
      hostname: apiUrl.hostname,
      port: apiUrl.port,
      pathname: "/media/**",
    };
  } catch {
    return {
      protocol: "https" as const,
      hostname: "zvuchno-dev.duckdns.org",
      pathname: "/media/**",
    };
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [getApiImageRemotePattern()],
  },
  /* config options here */
};

export default nextConfig;
