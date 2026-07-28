export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

/**
 * Server-side proxy for OpenStreetMap Nominatim geocoding.
 *
 * Why proxy instead of calling Nominatim from the browser:
 *  1. Nominatim's usage policy requires an identifying User-Agent on every
 *     request. Browsers forbid scripts from setting that header, so direct
 *     client-side calls are always non-compliant and risk being blocked.
 *  2. Calling from the server means visitors' coordinates are not sent directly
 *     to a third party from their own browser.
 *  3. It gives us one place to add caching, which keeps request volume within
 *     Nominatim's fair-use limits.
 *
 * Modes:
 *   GET /api/geocode?q=<place>          → forward search (array of matches)
 *   GET /api/geocode?lat=<n>&lon=<n>    → reverse lookup (single result)
 */

const CONTACT = "https://vedicdestiny.in";
const USER_AGENT = `VedicDestiny/1.0 (${CONTACT})`;

/** Cache results for a day — place coordinates are effectively static. */
const CACHE_SECONDS = 86400;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  let upstream: string;
  if (q && q.trim()) {
    upstream = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      q.trim()
    )}&format=json&limit=5`;
  } else if (lat && lon) {
    // Validate before forwarding so we never proxy arbitrary junk upstream.
    const latNum = Number(lat);
    const lonNum = Number(lon);
    if (
      !Number.isFinite(latNum) ||
      !Number.isFinite(lonNum) ||
      latNum < -90 ||
      latNum > 90 ||
      lonNum < -180 ||
      lonNum > 180
    ) {
      return NextResponse.json({ error: "Invalid coordinates." }, { status: 400 });
    }
    upstream = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latNum}&lon=${lonNum}`;
  } else {
    return NextResponse.json(
      { error: "Provide either ?q= or ?lat= and ?lon=." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(upstream, {
      headers: {
        "User-Agent": USER_AGENT,
        "Accept-Language": "en",
        Referer: CONTACT,
      },
      next: { revalidate: CACHE_SECONDS },
    });

    if (!res.ok) {
      console.error("Nominatim responded", res.status);
      return NextResponse.json({ error: "Location lookup unavailable." }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": `public, max-age=${CACHE_SECONDS}` },
    });
  } catch (err) {
    console.error("Geocode proxy error:", err);
    return NextResponse.json({ error: "Location lookup unavailable." }, { status: 502 });
  }
}
