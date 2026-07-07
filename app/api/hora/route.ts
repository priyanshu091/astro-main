export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

const clientIds = (process.env.PROKERALA_CLIENT_ID || "").split(',').map(s => s.trim()).filter(Boolean);
const clientSecrets = (process.env.PROKERALA_CLIENT_SECRET || "").split(',').map(s => s.trim()).filter(Boolean);

let currentKeyIndex = 0;
let cachedToken: { value: string; expiresAt: number; index: number } | null = null;

async function getAccessToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedToken && Date.now() < cachedToken.expiresAt - 60_000 && cachedToken.index === currentKeyIndex) {
    return cachedToken.value;
  }

  if (clientIds.length === 0) throw new Error("No PROKERALA credentials found");

  const id = clientIds[currentKeyIndex];
  const secret = clientSecrets[currentKeyIndex];

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: id,
      client_secret: secret,
    }),
    cache: "no-store",
  });
  
  if (!res.ok) {
    if (currentKeyIndex < clientIds.length - 1) {
        currentKeyIndex++;
        return getAccessToken(true);
    }
    throw new Error(`Token fetch failed: ${res.status}`);
  }
  
  const data = await res.json();
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000, index: currentKeyIndex };
  return cachedToken.value;
}

import clientPromise from "@/lib/mongodb";

const getCachedHora = unstable_cache(
  async (lat: string, lng: string, datetime: string, token: string) => {
    const base = `ayanamsa=1&coordinates=${lat},${lng}&datetime=${encodeURIComponent(datetime)}&la=en`;
    const dateStr = datetime.slice(0, 10); // YYYY-MM-DD

    // 1. Check MongoDB
    const client = await clientPromise;
    const db = client.db("astro_cache");
    const collection = db.collection("hora");

    const cachedDbDoc = await collection.findOne({
      lat,
      lng,
      dateStr,
    });

    if (cachedDbDoc) {
      return cachedDbDoc.data; // Return from MongoDB
    }

    // 2. Fetch from API
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

    if (!horaRes.ok) {
      const errText = await horaRes.text();
      throw new Error(errText);
    }
    if (!chogRes.ok) {
      const errText = await chogRes.text();
      throw new Error(errText);
    }

    const [hora, chog] = await Promise.all([horaRes.json(), chogRes.json()]);

    const result = {
      hora: hora.data,
      choghadiya: chog.data,
    };

    // 3. Save to MongoDB
    await collection.insertOne({
      lat,
      lng,
      dateStr,
      data: result,
      createdAt: new Date(),
    });

    return result;
  },
  ["prokerala-hora-data"],
  { revalidate: 3600 }
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const datetime = searchParams.get("datetime") ?? new Date().toISOString().slice(0, 10) + "T00:00:00+05:30";
    const lat = searchParams.get("lat") ?? "26.8467";
    const lng = searchParams.get("lng") ?? "80.9462";

    let token = await getAccessToken();
    
    let result;
    try {
      result = await getCachedHora(lat, lng, datetime, token);
    } catch(err: any) {
      if ((err.message?.includes("credit balance") || err.message?.includes("rate limit") || err.message?.includes("Too Many Requests")) && currentKeyIndex < clientIds.length - 1) {
        currentKeyIndex++;
        token = await getAccessToken(true);
        result = await getCachedHora(lat, lng, datetime, token);
      } else {
        throw err;
      }
    }
    
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
