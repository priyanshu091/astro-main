import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";
import { computePanchang, computeHoraChaughadiya, extractTzOffset } from "@/lib/panchang";

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

  // 20 Major Indian Cities
  const cities = [
    { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
    { name: "Delhi", lat: 28.61, lng: 77.21 },
    { name: "Mumbai", lat: 19.08, lng: 72.88 },
    { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
    { name: "Pune", lat: 18.5204, lng: 73.8567 },
    { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
    { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
    { name: "Surat", lat: 21.1702, lng: 72.8311 },
    { name: "Kanpur", lat: 26.4499, lng: 80.3319 },
    { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
    { name: "Indore", lat: 22.7196, lng: 75.8577 },
    { name: "Thane", lat: 19.2183, lng: 72.9781 },
    { name: "Bhopal", lat: 23.2599, lng: 77.4126 },
    { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185 },
    { name: "Pimpri-Chinchwad", lat: 18.6298, lng: 73.7997 },
    { name: "Patna", lat: 25.5941, lng: 85.1376 },
    { name: "Vadodara", lat: 22.3072, lng: 73.1812 }
  ];

  let successCount = 0;
  let failCount = 0;
  let totalComputeTime = 0;

  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("astro_cache");
    const panchangColl = db.collection("panchang_local");
    const horaColl = db.collection("hora_local");

    // Pre-fetch for the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().slice(0, 10);
      const datetime = `${dateStr}T00:00:00+05:30`;
      const tzOffset = "+05:30";

      for (const city of cities) {
        try {
          const coords = `${city.lat},${city.lng}`;
          
          const startCompute = performance.now();
          
          // Panchang Compute & Cache
          const pCached = await panchangColl.findOne({ coords, dateStr });
          if (!pCached) {
            const pData = computePanchang(datetime, city.lat, city.lng, tzOffset);
            await panchangColl.insertOne({ coords, dateStr, lat: city.lat.toString(), lng: city.lng.toString(), data: pData, createdAt: new Date() });
          }

          // Hora Compute & Cache
          const hCached = await horaColl.findOne({ coords, dateStr });
          if (!hCached) {
            const hData = computeHoraChaughadiya(datetime, city.lat, city.lng, tzOffset);
            await horaColl.insertOne({ coords, dateStr, lat: city.lat.toString(), lng: city.lng.toString(), data: hData, createdAt: new Date() });
          }

          totalComputeTime += performance.now() - startCompute;
          successCount++;
        } catch (err) {
          console.error(`Failed to prefetch for ${city.name} on ${dateStr}`, err);
          failCount++;
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Pre-fetching complete. Successfully processed ${successCount} combinations. Failed: ${failCount}. Total compute time: ${totalComputeTime.toFixed(0)}ms.`
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
