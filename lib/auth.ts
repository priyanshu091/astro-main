/**
 * Admin authentication.
 *
 * Design notes:
 * - The admin password lives ONLY in the `ADMIN_PASSWORD` server environment
 *   variable. It is never imported into a client component, so it never ends up
 *   in the browser bundle. (The previous implementation compared the password
 *   inside a "use client" page, which shipped the literal password to every
 *   visitor.)
 * - A successful login issues a short-lived HMAC-signed session token stored in
 *   an httpOnly cookie. httpOnly means client-side JavaScript — including any
 *   injected script — cannot read it.
 * - Every privileged API route verifies that token server-side. Client-side
 *   checks are treated purely as UI convenience and are never trusted.
 * - FAIL CLOSED: if `ADMIN_PASSWORD` is not configured, every login attempt and
 *   every session check fails. An unconfigured deployment is locked, not open.
 */

import { createHmac, timingSafeEqual, randomBytes } from "crypto";

export const ADMIN_COOKIE_NAME = "astro_admin_session";

/** Sessions expire after 8 hours. */
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

function getAdminPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length > 0 ? pw : null;
}

/**
 * Key used to sign session tokens. Prefers a dedicated secret, but falls back to
 * deriving one from the admin password so that a deployment only strictly needs
 * ADMIN_PASSWORD set. Changing the password invalidates existing sessions, which
 * is the desired behaviour.
 */
function getSigningKey(): string | null {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit && explicit.length > 0) return explicit;
  const pw = getAdminPassword();
  return pw ? `derived:${pw}` : null;
}

/** Constant-time string comparison; avoids leaking length/content via timing. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Verify a submitted password against ADMIN_PASSWORD. */
export function verifyAdminPassword(candidate: unknown): boolean {
  if (typeof candidate !== "string" || candidate.length === 0) return false;
  const expected = getAdminPassword();
  if (!expected) return false; // fail closed — not configured means locked
  return safeEqual(candidate, expected);
}

/** True when the server has an admin password configured at all. */
export function isAdminConfigured(): boolean {
  return getAdminPassword() !== null;
}

/** Create a signed, expiring session token. */
export function createSessionToken(): string {
  const key = getSigningKey();
  if (!key) throw new Error("ADMIN_PASSWORD is not configured");
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const nonce = randomBytes(12).toString("hex");
  const payload = `${expiresAt}.${nonce}`;
  const signature = createHmac("sha256", key).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

/** Validate a session token's signature and expiry. */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const key = getSigningKey();
  if (!key) return false; // fail closed

  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expiresAt, nonce, signature] = parts;

  const expected = createHmac("sha256", key).update(`${expiresAt}.${nonce}`).digest("hex");
  if (!safeEqual(signature, expected)) return false;

  const expiry = Number(expiresAt);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return false;

  return true;
}

/** Read the session cookie off an incoming request and validate it. */
export function isAuthenticatedRequest(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return false;
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return false;
  return verifySessionToken(decodeURIComponent(match[1]));
}

/** Cookie options for issuing the session. */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  };
}
