export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { computePanchang, extractTzOffset } from "@/lib/panchang";

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
          continue;
        }
        throw new Error(errText);
      }
      const json = await res.json();
      return json.data;
    } catch (err: any) {
      if ((err.message?.includes("credit balance") || err.message?.includes("rate limit") || err.message?.includes("Too Many Requests")) && i < clientIds.length - 1) {
        continue;
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
    
    // Feature flag: "local" (default) or "prokerala"
    const source = process.env.PANCHANG_SOURCE || "local";

    try {
      const mongoClient = await clientPromise;
      const db = mongoClient.db("astro_cache");
      
      if (source === "local") {
        const collection = db.collection("panchang_local");
        const cachedDoc = await collection.findOne({ coords, dateStr });
        if (cachedDoc) {
          return NextResponse.json({ panchang: cachedDoc.data });
        }

        const tzOffset = extractTzOffset(datetime);
        const data = computePanchang(datetime, parseFloat(lat), parseFloat(lng), tzOffset);
        
        await collection.insertOne({ coords, dateStr, lat, lng, data, createdAt: new Date() });
        return NextResponse.json({ panchang: data });
      } else {
        // Fallback to existing ProKerala logic
        const collection = db.collection("panchang");
        const cachedDoc = await collection.findOne({ ayanamsa, coords, dateStr });
        if (cachedDoc) {
          return NextResponse.json({ panchang: cachedDoc.data });
        }

        const data = await fetchPanchangWithFallback(ayanamsa, coords, datetime);
        await collection.insertOne({ ayanamsa, coords, dateStr, data, createdAt: new Date() });
        return NextResponse.json({ panchang: data });
      }
    } catch (mongoErr: any) {
      console.error("MongoDB or Compute error, falling back:", mongoErr.message);
      
      if (source === "local") {
        // If DB fails, try compute again and just return
        const tzOffset = extractTzOffset(datetime);
        const data = computePanchang(datetime, parseFloat(lat), parseFloat(lng), tzOffset);
        return NextResponse.json({ panchang: data });
      } else {
        const data = await fetchPanchangWithFallback(ayanamsa, coords, datetime);
        return NextResponse.json({ panchang: data });
      }
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
