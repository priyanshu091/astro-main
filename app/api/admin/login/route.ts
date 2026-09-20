export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  isAdminConfigured,
  sessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/auth";
import {
  checkRateLimit,
  clearRateLimit,
  getClientIp,
  recordFailedAttempt,
} from "@/lib/rate-limit";

/**
 * POST /api/admin/login  { password }
 *
 * Verifies the password server-side and, on success, sets an httpOnly session
 * cookie. The password itself never reaches the client bundle.
 *
 * Security Protections:
 * - Constant-time comparison (prevents timing attacks)
 * - IP rate-limiting (max 5 failed attempts per 15-minute window)
 * - 15-minute lockout on threshold reached
 * - Artificial delay on failed attempts to stop rapid dictionary scripts
 * - Automatic lockout reset on successful authentication
 */
export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    // Deployment has no ADMIN_PASSWORD set — refuse rather than allow.
    return NextResponse.json(
      { error: "Admin access is not configured on this server." },
      { status: 503 }
    );
  }

  const clientIp = getClientIp(request);

  // 1. Pre-check: is this IP locked out from too many previous failures?
  const limitStatus = await checkRateLimit(clientIp);
  if (limitStatus.isLocked) {
    const retryAfter = limitStatus.retryAfterSeconds || 900;
    const minutes = Math.max(1, Math.ceil(retryAfter / 60));
    return NextResponse.json(
      {
        error: `Too many failed login attempts. Access is locked. Please try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
        },
      }
    );
  }

  let password: unknown;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // 2. Validate password
  if (!verifyAdminPassword(password)) {
    // Increment failed attempt counter
    const failedStatus = await recordFailedAttempt(clientIp);

    // Add 500ms delay to thwart automated fast-burst scripts
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (failedStatus.isLocked) {
      const retryAfter = failedStatus.retryAfterSeconds || 900;
      const minutes = Math.max(1, Math.ceil(retryAfter / 60));
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Account temporarily locked for ${minutes} minutes.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
          },
        }
      );
    }

    const remaining = failedStatus.remainingAttempts;
    return NextResponse.json(
      {
        error: `Invalid password. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining before temporary lockout.`,
      },
      { status: 401 }
    );
  }

  // 3. Clear failed attempts on valid login
  await clearRateLimit(clientIp);

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createSessionToken(), sessionCookieOptions());
  return response;
}
