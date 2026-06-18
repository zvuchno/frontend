import type { NextConfig } from "next";

function getApiImageRemotePattern() {
  try {
    const apiBaseUrl =
      process.env.BASE_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL;
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
    remotePatterns: [getApiImageRemotePattern(),
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
        pathname: "/zvuchno-platform-public/**",
      },
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        pathname: "/zvuchno-platform-private/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
