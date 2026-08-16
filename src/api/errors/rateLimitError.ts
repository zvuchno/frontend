export class RateLimitError extends Error {
  retryAfterMs: number;

  constructor(retryAfterMs: number) {
    super("Rate limit exceeded");
    this.retryAfterMs = retryAfterMs;
    this.name = "RateLimitError";
  }
}
