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

async function fetchHoraWithFallback(lat: string, lng: string, datetime: string): Promise<any> {
  const base = `ayanamsa=1&coordinates=${lat},${lng}&datetime=${encodeURIComponent(datetime)}&la=en`;

  for (let i = currentKeyIndex; i < clientIds.length; i++) {
    currentKeyIndex = i;
    try {
      const token = await getAccessToken(i !== currentKeyIndex);
      const [horaRes, chogRes] = await Promise.all([
        fetch(`https://api.prokerala.com/v2/astrology/hora?${base}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }),
        fetch(`https://api.prokerala.com/v2/astrology/choghadiya?${base}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }),
      ]);

      if (!horaRes.ok) {
        const errText = await horaRes.text();
        if ((errText.includes("credit balance") || errText.includes("rate limit") || errText.includes("Too Many Requests")) && i < clientIds.length - 1) {
          continue;
        }
        throw new Error(errText);
      }
      if (!chogRes.ok) {
        const errText = await chogRes.text();
        if ((errText.includes("credit balance") || errText.includes("rate limit") || errText.includes("Too Many Requests")) && i < clientIds.length - 1) {
          continue;
        }
        throw new Error(errText);
      }

      const [hora, chog] = await Promise.all([horaRes.json(), chogRes.json()]);
      return { hora: hora.data, choghadiya: chog.data };
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

    const dateStr = datetime.slice(0, 10); // YYYY-MM-DD only
    const coords = `${lat},${lng}`;

    // 1. Check MongoDB first (the real cache)
    try {
      const mongoClient = await clientPromise;
      const db = mongoClient.db("astro_cache");
      const collection = db.collection("hora");

      const cachedDoc = await collection.findOne({ coords, dateStr });
      if (cachedDoc) {
        return NextResponse.json(cachedDoc.data);
      }

      // 2. Not in MongoDB — fetch from Prokerala with fallback
      const result = await fetchHoraWithFallback(lat, lng, datetime);

      // 3. Save to MongoDB for all future requests
      await collection.insertOne({ coords, lat, lng, dateStr, data: result, createdAt: new Date() });

      return NextResponse.json(result);
    } catch (mongoErr: any) {
      // If MongoDB itself fails, still try Prokerala directly
      console.error("MongoDB error, falling back to direct API:", mongoErr.message);
      const result = await fetchHoraWithFallback(lat, lng, datetime);
      return NextResponse.json(result);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
