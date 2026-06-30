import type { NextConfig } from "next";

function getApiImageRemotePattern() {
  try {
    const apiBaseUrl = process.env.BASE_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL;
    const apiUrl = new URL(apiBaseUrl ?? "https://dev.zvuchno.space/api");

    return {
      protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
      hostname: apiUrl.hostname,
      port: apiUrl.port,
      pathname: "/media/**",
    };
  } catch {
    return {
      protocol: "https" as const,
      hostname: "dev.zvuchno.space",
      pathname: "/media/**",
    };
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
<<<<<<< Updated upstream
    unoptimized: process.env.NODE_ENV === "development",
=======
>>>>>>> Stashed changes
    remotePatterns: [
      getApiImageRemotePattern(),
      {
        protocol: "http",
        hostname: "dev.zvuchno.space",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "dev.zvuchno.space",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
<<<<<<< Updated upstream
        pathname: "/zvuchno-platform-public/**",
      },
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        pathname: "/zvuchno-platform-private/**",
=======
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "storage.yandexcloud.net",
        pathname: "/**",
>>>>>>> Stashed changes
      },
    ],
  },
};

export default nextConfig;
