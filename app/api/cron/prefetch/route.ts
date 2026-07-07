import { NextResponse } from 'next/server';

export const maxDuration = 300; // Allow Vercel function to run for 5 minutes

export async function GET(request: Request) {
  // 1. Verify authorization (e.g., cron secret)
  const authHeader = request.headers.get('authorization');
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response('Unauthorized', { status: 401 });
  }

  const host = request.headers.get("host") || "localhost:3005";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Default coordinates used by the frontend
  const cities = [
    { name: "Lucknow (Default)", lat: "26.8467", lng: "80.9462" },
    { name: "Delhi", lat: "28.61", lng: "77.21" },
    { name: "Mumbai", lat: "19.08", lng: "72.88" },
  ];

  let successCount = 0;
  let failCount = 0;

  // Pre-fetch for the next 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().slice(0, 10) + "T00:00:00+05:30";

    for (const city of cities) {
      try {
        // We fetch sequentially to avoid hitting Prokerala rate limits too hard at once
        await fetch(`${baseUrl}/api/panchang?lat=${city.lat}&lng=${city.lng}&datetime=${encodeURIComponent(dateStr)}`);
        await fetch(`${baseUrl}/api/hora?lat=${city.lat}&lng=${city.lng}&datetime=${encodeURIComponent(dateStr)}`);
        
        // Wait 200ms between calls to be gentle on external APIs
        await new Promise(r => setTimeout(r, 200));
        successCount++;
      } catch (err) {
        console.error(`Failed to prefetch for ${city.name} on ${dateStr}`, err);
        failCount++;
      }
    }
  }

  return NextResponse.json({ 
    success: true, 
    message: `Pre-fetching complete. Successfully processed ${successCount} requests. Failed: ${failCount}.`
  });
}
