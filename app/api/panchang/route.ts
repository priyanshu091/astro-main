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

const getCachedPanchang = unstable_cache(
  async (ayanamsa: string, coords: string, datetime: string, token: string) => {
    // 1. Check MongoDB
    const client = await clientPromise;
    const db = client.db("astro_cache");
    const collection = db.collection("panchang");
    const dateStr = datetime.slice(0, 10); // Use just the YYYY-MM-DD part for caching

    const cachedDbDoc = await collection.findOne({
      ayanamsa,
      coords,
      dateStr,
    });

    if (cachedDbDoc) {
      return cachedDbDoc.data; // Return from MongoDB
    }

    // 2. Not in MongoDB, fetch from API
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

    // 3. Save to MongoDB
    await collection.insertOne({
      ayanamsa,
      coords,
      dateStr,
      data: json.data,
      createdAt: new Date(),
    });

    return json.data;
  },
  ["prokerala-panchang-data"], // base cache key
  { revalidate: 3600 } // cache globally for 1 hour
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const datetime = searchParams.get("datetime") ?? new Date().toISOString().slice(0, 10) + "T00:00:00+05:30";
    const lat = searchParams.get("lat") ?? "26.8467";
    const lng = searchParams.get("lng") ?? "80.9462";
    const ayanamsa = searchParams.get("ayanamsa") ?? "1";

    let token = await getAccessToken();
    const coords = `${lat},${lng}`;
    
    let data;
    try {
      data = await getCachedPanchang(ayanamsa, coords, datetime, token);
    } catch(err: any) {
      if ((err.message?.includes("credit balance") || err.message?.includes("rate limit") || err.message?.includes("Too Many Requests")) && currentKeyIndex < clientIds.length - 1) {
        currentKeyIndex++;
        token = await getAccessToken(true);
        data = await getCachedPanchang(ayanamsa, coords, datetime, token);
      } else {
        throw err;
      }
    }
    
    return NextResponse.json({ panchang: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
