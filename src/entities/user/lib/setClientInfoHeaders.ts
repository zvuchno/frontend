export function setClientInfoHeaders(source: Headers, target: Headers): void {
  // User-Agent: 
  const ua = source.get("user-agent");
  if (ua) {
    target.set("user-agent", ua);
  }

  // IP: приоритет цепочки заголовков для Vercel/Cloudflare/Nginx
  let ip: string | null = null;

  const forwarded = source.get("x-forwarded-for");
  if (forwarded) {
    // Первый IP в цепочке — реальный клиент
    ip = forwarded.split(",")[0].trim();
  } else {
    const cfIp = source.get("cf-connecting-ip");
    if (cfIp) {
      ip = cfIp.trim();
    } else {
      const realIp = source.get("x-real-ip");
      if (realIp) {
        ip = realIp.trim();
      }
    }
  }

  if (ip) {
    target.set("x-forwarded-for", ip);
  }
}