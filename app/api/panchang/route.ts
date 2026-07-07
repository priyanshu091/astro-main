export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.value;
  }
  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID!,
      client_secret: process.env.PROKERALA_CLIENT_SECRET!,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
  const data = await res.json();
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedToken.value;
}

const getCachedPanchang = unstable_cache(
  async (ayanamsa: string, coords: string, datetime: string, token: string) => {
    const res = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang/advanced?ayanamsa=${ayanamsa}&coordinates=${coords}&datetime=${encodeURIComponent(datetime)}&la=en`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err); // Throwing prevents unstable_cache from caching the error
    }
    const json = await res.json();
    return json.data;
  },
  ["prokerala-panchang-data"], // base cache key
  { revalidate: 3600 } // cache globally for 1 hour
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const datetime = searchParams.get("datetime") ?? new Date().toISOString().slice(0, 19) + "+05:30";
    const lat = searchParams.get("lat") ?? "26.8467";
    const lng = searchParams.get("lng") ?? "80.9462";
    const ayanamsa = searchParams.get("ayanamsa") ?? "1";

    const token = await getAccessToken();
    const coords = `${lat},${lng}`;
    
    // We pass only the date part of datetime so it caches per day, avoiding cache misses on seconds
    const dateOnly = datetime.split("T")[0];
    const data = await getCachedPanchang(ayanamsa, coords, dateOnly, token);
    
    return NextResponse.json({ panchang: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
