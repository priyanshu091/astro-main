import { NextResponse } from "next/server";

let cachedToken: { value: string; expiresAt: number } | null = null;

const requestCache = new Map<string, { data: any; expiresAt: number }>();

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const datetime = searchParams.get("datetime") ?? new Date().toISOString().slice(0, 19) + "+05:30";
    const lat = searchParams.get("lat") ?? "26.8467";
    const lng = searchParams.get("lng") ?? "80.9462";
    const ayanamsa = searchParams.get("ayanamsa") ?? "1";

    const token = await getAccessToken();
    const coords = `${lat},${lng}`;
    
    const cacheKey = `panchang-${coords}-${datetime.split('T')[0]}`;
    const cached = requestCache.get(cacheKey);
    if (cached && Date.now() < cached.expiresAt) {
      return NextResponse.json({ panchang: cached.data });
    }

    const panchangRes = await fetch(
      `https://api.prokerala.com/v2/astrology/panchang/advanced?ayanamsa=${ayanamsa}&coordinates=${coords}&datetime=${encodeURIComponent(datetime)}&la=en`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    );

    if (!panchangRes.ok) {
      const err = await panchangRes.text();
      return NextResponse.json({ error: err }, { status: panchangRes.status });
    }

    const json = await panchangRes.json();
    requestCache.set(cacheKey, { data: json.data, expiresAt: Date.now() + 3600 * 1000 });
    return NextResponse.json({ panchang: json.data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
