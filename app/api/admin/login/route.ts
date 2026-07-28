export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  isAdminConfigured,
  sessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/auth";

/**
 * POST /api/admin/login  { password }
 *
 * Verifies the password server-side and, on success, sets an httpOnly session
 * cookie. The password itself never reaches the client bundle.
 */
export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    // Deployment has no ADMIN_PASSWORD set — refuse rather than allow.
    return NextResponse.json(
      { error: "Admin access is not configured on this server." },
      { status: 503 }
    );
  }

  let password: unknown;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    // Deliberately vague: do not reveal whether the account or password was wrong.
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createSessionToken(), sessionCookieOptions());
  return response;
}
