export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) return cachedToken.value;
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

const getCachedHora = unstable_cache(
  async (lat: string, lng: string, datetime: string, token: string) => {
    const base = `ayanamsa=1&coordinates=${lat},${lng}&datetime=${encodeURIComponent(datetime)}&la=en`;

    const [horaRes, chogRes] = await Promise.all([
      fetch(`https://api.prokerala.com/v2/astrology/hora?${base}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }),
      fetch(`https://api.prokerala.com/v2/astrology/choghadiya?${base}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }),
    ]);

    if (!horaRes.ok || !chogRes.ok) {
      throw new Error("Failed to fetch hora/choghadiya"); // Prevents caching on error
    }

    const [hora, chog] = await Promise.all([horaRes.json(), chogRes.json()]);

    return {
      hora: hora.data,
      choghadiya: chog.data,
    };
  },
  ["prokerala-hora-data"],
  { revalidate: 3600 }
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const datetime = searchParams.get("datetime") ?? new Date().toISOString().slice(0, 19) + "+05:30";
    const lat = searchParams.get("lat") ?? "26.8467";
    const lng = searchParams.get("lng") ?? "80.9462";

    const token = await getAccessToken();
    const dateOnly = datetime.split('T')[0];
    
    const result = await getCachedHora(lat, lng, dateOnly, token);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
