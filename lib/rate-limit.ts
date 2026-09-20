import clientPromise from "./mongodb";

export interface RateLimitStatus {
  isLocked: boolean;
  remainingAttempts: number;
  lockedUntilMs?: number;
  retryAfterSeconds?: number;
}

interface MemoryLimitRecord {
  attempts: number;
  firstAttempt: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const DB_NAME = "astro";
const COLLECTION_NAME = "admin_rate_limits";

// Global store to survive Fast Refresh / HMR during development
declare global {
  // eslint-disable-next-line no-var
  var _adminLoginRateLimits: Map<string, MemoryLimitRecord> | undefined;
}

const memoryStore: Map<string, MemoryLimitRecord> =
  global._adminLoginRateLimits || new Map<string, MemoryLimitRecord>();

if (!global._adminLoginRateLimits) {
  global._adminLoginRateLimits = memoryStore;
}

/**
 * Extracts the real client IP address from request headers.
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ip = xForwardedFor.split(",")[0].trim();
    if (ip) return ip;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  return "127.0.0.1";
}

/**
 * Checks if the given IP address is currently locked out.
 */
export async function checkRateLimit(ip: string): Promise<RateLimitStatus> {
  const now = Date.now();

  // 1. Fast in-memory check
  const memRecord = memoryStore.get(ip);
  if (memRecord) {
    if (memRecord.lockedUntil && now < memRecord.lockedUntil) {
      const retryAfterSeconds = Math.max(1, Math.ceil((memRecord.lockedUntil - now) / 1000));
      return {
        isLocked: true,
        remainingAttempts: 0,
        lockedUntilMs: memRecord.lockedUntil,
        retryAfterSeconds,
      };
    }

    // Check if lockout has expired
    if (memRecord.lockedUntil && now >= memRecord.lockedUntil) {
      memoryStore.delete(ip);
    } else if (now - memRecord.firstAttempt > ATTEMPT_WINDOW_MS) {
      // Window expired
      memoryStore.delete(ip);
    }
  }

  // 2. MongoDB sync check (if database is reachable)
  try {
    const client = await Promise.race([
      clientPromise,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB connection timeout")), 1200)
      ),
    ]);
    const db = client.db(DB_NAME);
    const doc = await db.collection(COLLECTION_NAME).findOne({ _id: ip as any });

    if (doc && doc.lockedUntil) {
      const lockedUntilMs = new Date(doc.lockedUntil).getTime();
      if (lockedUntilMs > now) {
        // Sync to memory store
        memoryStore.set(ip, {
          attempts: doc.attempts || MAX_FAILED_ATTEMPTS,
          firstAttempt: doc.firstAttempt ? new Date(doc.firstAttempt).getTime() : now,
          lastAttempt: doc.lastAttempt ? new Date(doc.lastAttempt).getTime() : now,
          lockedUntil: lockedUntilMs,
        });

        const retryAfterSeconds = Math.max(1, Math.ceil((lockedUntilMs - now) / 1000));
        return {
          isLocked: true,
          remainingAttempts: 0,
          lockedUntilMs,
          retryAfterSeconds,
        };
      }
    }
  } catch {
    // Database check timed out or not configured; safely fall back to in-memory state
  }

  const currentAttempts = memoryStore.get(ip)?.attempts || 0;
  return {
    isLocked: false,
    remainingAttempts: Math.max(0, MAX_FAILED_ATTEMPTS - currentAttempts),
  };
}

/**
 * Records a failed login attempt for an IP.
 * Locks the IP for 15 minutes if failed attempts reach the threshold.
 */
export async function recordFailedAttempt(ip: string): Promise<RateLimitStatus> {
  const now = Date.now();
  let record = memoryStore.get(ip);

  if (!record || now - record.firstAttempt > ATTEMPT_WINDOW_MS) {
    record = {
      attempts: 1,
      firstAttempt: now,
      lastAttempt: now,
    };
  } else {
    record.attempts += 1;
    record.lastAttempt = now;
  }

  const isLocked = record.attempts >= MAX_FAILED_ATTEMPTS;
  if (isLocked) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
  }

  memoryStore.set(ip, record);

  // Sync with MongoDB if available
  try {
    const client = await Promise.race([
      clientPromise,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB connection timeout")), 1200)
      ),
    ]);
    const db = client.db(DB_NAME);
    await db.collection(COLLECTION_NAME).updateOne(
      { _id: ip as any },
      {
        $inc: { attempts: 1 },
        $set: {
          lastAttempt: new Date(now),
          ...(isLocked ? { lockedUntil: new Date(now + LOCKOUT_DURATION_MS) } : {}),
        },
        $setOnInsert: {
          firstAttempt: new Date(now),
        },
      },
      { upsert: true }
    );
  } catch {
    // Safe fallback: in-memory state already updated
  }

  const retryAfterSeconds = isLocked
    ? Math.max(1, Math.ceil(((record.lockedUntil || 0) - now) / 1000))
    : undefined;

  return {
    isLocked,
    remainingAttempts: Math.max(0, MAX_FAILED_ATTEMPTS - record.attempts),
    lockedUntilMs: record.lockedUntil,
    retryAfterSeconds,
  };
}

/**
 * Clears failed attempts upon successful login.
 */
export async function clearRateLimit(ip: string): Promise<void> {
  memoryStore.delete(ip);

  try {
    const client = await Promise.race([
      clientPromise,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB connection timeout")), 1200)
      ),
    ]);
    const db = client.db(DB_NAME);
    await db.collection(COLLECTION_NAME).deleteOne({ _id: ip as any });
  } catch {
    // Safe fallback
  }
}
