// Tiny in-memory rate limiter (per-identifier, sliding window reset).
// Suitable for single-instance serverless / Node deployments.
// NOTE: Not suitable for multi-instance deployments without a shared store.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Periodically purge expired buckets to prevent unbounded memory growth.
const PURGE_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
let lastPurgeAt = 0;

function purge(now: number) {
  if (now - lastPurgeAt < PURGE_INTERVAL_MS) return;
  lastPurgeAt = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Returns `true` if the request is allowed, `false` if rate limit exceeded.
 *
 * @param identifier  Unique key per client (usually IP).
 * @param limit        Max requests allowed in the window.
 * @param windowMs     Window length in milliseconds.
 */
export function rateLimit(
  identifier: string,
  limit = 30,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  purge(now);

  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= limit) {
    return false;
  }

  existing.count += 1;
  return true;
}

/**
 * Extracts a best-effort client IP from a Next.js Request.
 * Falls back to "unknown" if no headers are available.
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
