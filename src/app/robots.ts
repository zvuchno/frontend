import { type MetadataRoute } from "next";

const baseUrl = process.env.FRONTEND_ORIGIN ?? "https://zvuchno.space/";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/forgot-password",
        "/reset-password-confirm",
        "/signin",
        "/signup",
        "/role",
        "/artist/",
        "/fans/",
        "/order",
        "/verify/verify-email",
        "/cart",
        "/favorites",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
