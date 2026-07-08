import { computePanchang } from '../engine';

// This is a manual test script, you can run it via `npx tsx lib/panchang/__tests__/compare-prokerala.ts`
// Replace with actual ProKerala credentials to test
const PROKERALA_CLIENT_ID = process.env.PROKERALA_CLIENT_ID || "";
const PROKERALA_CLIENT_SECRET = process.env.PROKERALA_CLIENT_SECRET || "";

async function getAccessToken() {
  if (!PROKERALA_CLIENT_ID) throw new Error("Missing PROKERALA_CLIENT_ID");
  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ 
      grant_type: "client_credentials", 
      client_id: PROKERALA_CLIENT_ID, 
      client_secret: PROKERALA_CLIENT_SECRET 
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function fetchProkerala(date: string, lat: number, lng: number, token: string) {
  const coords = `${lat},${lng}`;
  const res = await fetch(
    `https://api.prokerala.com/v2/astrology/panchang/advanced?ayanamsa=1&coordinates=${coords}&datetime=${encodeURIComponent(date)}&la=en`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`ProKerala failed: ${await res.text()}`);
  const json = await res.json();
  return json.data;
}

async function compare() {
  if (!PROKERALA_CLIENT_ID) {
    console.log("No PROKERALA_CLIENT_ID set, skipping live comparison test.");
    return;
  }
  
  const token = await getAccessToken();
  
  const testCases = [
    { name: "Lucknow Today", date: "2026-07-08T00:00:00+05:30", lat: 26.8467, lng: 80.9462, tz: "+05:30" },
    { name: "Delhi Tomorrow", date: "2026-07-09T00:00:00+05:30", lat: 28.61, lng: 77.21, tz: "+05:30" },
  ];

  for (const tc of testCases) {
    console.log(`\n=== Comparing ${tc.name} ===`);
    try {
      const prokerala = await fetchProkerala(tc.date, tc.lat, tc.lng, token);
      const local = computePanchang(tc.date, tc.lat, tc.lng, tc.tz);

      console.log(`Sunrise: PK=${prokerala.sunrise} | Local=${local.sunrise}`);
      console.log(`Sunset: PK=${prokerala.sunset} | Local=${local.sunset}`);
      
      console.log(`\nTithi (ProKerala):`);
      prokerala.tithi.forEach((t: any) => console.log(`  ${t.name} (${t.start} to ${t.end})`));
      console.log(`Tithi (Local):`);
      local.tithi.forEach((t: any) => console.log(`  ${t.name} (${t.start} to ${t.end})`));

      console.log(`\nNakshatra (ProKerala):`);
      prokerala.nakshatra.forEach((t: any) => console.log(`  ${t.name} (${t.start} to ${t.end})`));
      console.log(`Nakshatra (Local):`);
      local.nakshatra.forEach((t: any) => console.log(`  ${t.name} (${t.start} to ${t.end})`));

    } catch (err: any) {
      console.error("Error comparing:", err.message);
    }
  }
}

compare().catch(console.error);
