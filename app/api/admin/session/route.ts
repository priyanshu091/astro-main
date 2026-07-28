export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isAuthenticatedRequest, sessionCookieOptions } from "@/lib/auth";

/**
 * GET /api/admin/session
 * Lets the admin UI ask "am I still logged in?" without ever handling the
 * password. Returns only a boolean — no token is exposed to JavaScript.
 */
export async function GET(request: Request) {
  return NextResponse.json({ authenticated: isAuthenticatedRequest(request) });
}

/**
 * DELETE /api/admin/session — log out by clearing the cookie.
 */
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
