import assert from 'assert';
import { getLahiriAyanamsa, dateToJD } from '../ayanamsa';
import { getSunrise, getSunset, getSiderealSunLong, getSiderealMoonLong } from '../astronomy';
import { getCurrentTithi } from '../tithi';
import { getCurrentNakshatra } from '../nakshatra';
import { getCurrentYoga } from '../yoga';
import { getCurrentKarana } from '../karana';
import { getPlanetaryHora } from '../hora';

async function runTests() {
  console.log("Starting Panchang unit tests...\n");

  // 1. Ayanamsa Tests (IAU 2006 precession polynomial)
  // J2000 epoch: 2000-01-01 12:00 TT (approx 12:00 UTC)
  const j2000 = new Date("2000-01-01T12:00:00Z");
  const ayanamsa2000 = getLahiriAyanamsa(j2000);
  console.log(`Ayanamsa at J2000: ${ayanamsa2000.toFixed(5)}°`);
  // Expected: ~23.85321°
  assert(Math.abs(ayanamsa2000 - 23.85321) < 0.001, "J2000 ayanamsa should match Chitrapaksha value");

  // 2025 epoch
  const date2025 = new Date("2025-01-01T00:00:00Z");
  const ayanamsa2025 = getLahiriAyanamsa(date2025);
  console.log(`Ayanamsa at 2025: ${ayanamsa2025.toFixed(5)}°`);
  // Precession over 25 years: ~50.29" * 25 = 1257.25" = 0.349°
  // 23.853 + 0.349 = ~24.202°
  assert(Math.abs(ayanamsa2025 - 24.202) < 0.01, "2025 ayanamsa should be approx 24.202°");

  // 2. Sunrise/Sunset (Lucknow: 26.8467, 80.9462)
  const lucknowLat = 26.8467;
  const lucknowLng = 80.9462;
  const testDate = new Date("2026-07-08T00:00:00+05:30");
  
  const sunrise = getSunrise(testDate, lucknowLat, lucknowLng);
  const sunset = getSunset(testDate, lucknowLat, lucknowLng);
  
  if (!sunrise || !sunset) throw new Error("Sunrise/sunset failed");
  
  console.log(`Lucknow Sunrise (UTC): ${sunrise.toISOString()}`);
  console.log(`Lucknow Sunset (UTC): ${sunset.toISOString()}`);
  
  // Convert to IST for display (+05:30)
  const sRiseIST = new Date(sunrise.getTime() + 5.5 * 3600000).toISOString().slice(11, 16);
  const sSetIST = new Date(sunset.getTime() + 5.5 * 3600000).toISOString().slice(11, 16);
  console.log(`Lucknow Sunrise (IST): ${sRiseIST}`); // Should be around 05:25 in July
  console.log(`Lucknow Sunset (IST): ${sSetIST}`); // Should be around 19:00 in July

  // 3. Tithi, Nakshatra, Yoga, Karana Smoke Tests
  const sidSun = getSiderealSunLong(sunrise);
  const sidMoon = getSiderealMoonLong(sunrise);
  console.log(`\nSidereal Sun at sunrise: ${sidSun.toFixed(2)}°`);
  console.log(`Sidereal Moon at sunrise: ${sidMoon.toFixed(2)}°`);

  const tithi = getCurrentTithi(sunrise);
  console.log(`Tithi at sunrise: ${tithi.name} (${tithi.paksha} Paksha)`);

  const nak = getCurrentNakshatra(sunrise);
  console.log(`Nakshatra at sunrise: ${nak.name} (Lord: ${nak.lord.name})`);

  const yoga = getCurrentYoga(sunrise);
  console.log(`Yoga at sunrise: ${yoga.name}`);

  const karana = getCurrentKarana(sunrise);
  console.log(`Karana at sunrise: ${karana.name}`);

  console.log("\n✅ All unit tests passed!");
}

runTests().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
