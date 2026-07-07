export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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
    body: new URLSearchParams({ grant_type: "client_credentials", client_id: id, client_secret: secret }),
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

async function fetchPanchangWithFallback(ayanamsa: string, coords: string, datetime: string): Promise<any> {
  // Try each credential
  for (let i = currentKeyIndex; i < clientIds.length; i++) {
    currentKeyIndex = i;
    try {
      const token = await getAccessToken(i !== currentKeyIndex);
      const res = await fetch(
        `https://api.prokerala.com/v2/astrology/panchang/advanced?ayanamsa=${ayanamsa}&coordinates=${coords}&datetime=${encodeURIComponent(datetime)}&la=en`,
        { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
      );
      if (!res.ok) {
        const errText = await res.text();
        if ((errText.includes("credit balance") || errText.includes("rate limit") || errText.includes("Too Many Requests")) && i < clientIds.length - 1) {
          continue; // try next credential
        }
        throw new Error(errText);
      }
      const json = await res.json();
      return json.data;
    } catch (err: any) {
      if ((err.message?.includes("credit balance") || err.message?.includes("rate limit") || err.message?.includes("Too Many Requests")) && i < clientIds.length - 1) {
        continue; // try next credential
      }
      throw err;
    }
  }
  throw new Error("All credentials exhausted");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const datetime = searchParams.get("datetime") ?? new Date().toISOString().slice(0, 10) + "T00:00:00+05:30";
    const lat = searchParams.get("lat") ?? "26.8467";
    const lng = searchParams.get("lng") ?? "80.9462";
    const ayanamsa = searchParams.get("ayanamsa") ?? "1";

    const coords = `${lat},${lng}`;
    const dateStr = datetime.slice(0, 10); // YYYY-MM-DD only

    // 1. Check MongoDB first (the real cache)
    try {
      const mongoClient = await clientPromise;
      const db = mongoClient.db("astro_cache");
      const collection = db.collection("panchang");

      const cachedDoc = await collection.findOne({ ayanamsa, coords, dateStr });
      if (cachedDoc) {
        return NextResponse.json({ panchang: cachedDoc.data });
      }

      // 2. Not in MongoDB — fetch from Prokerala with fallback
      const data = await fetchPanchangWithFallback(ayanamsa, coords, datetime);

      // 3. Save to MongoDB for all future requests
      await collection.insertOne({ ayanamsa, coords, dateStr, data, createdAt: new Date() });

      return NextResponse.json({ panchang: data });
    } catch (mongoErr: any) {
      // If MongoDB itself fails, still try Prokerala directly
      console.error("MongoDB error, falling back to direct API:", mongoErr.message);
      const data = await fetchPanchangWithFallback(ayanamsa, coords, datetime);
      return NextResponse.json({ panchang: data });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
