/**
 * Karana Calculation
 *
 * Each tithi has 2 karanas (first half and second half).
 * Karana = (Moon longitude − Sun longitude) mod 360 / 6°
 *
 * There are 60 karanas in a lunar month:
 * - Karana 0: Kimstughna (fixed, second half of Krishna Chaturdashi)
 * - Karanas 1–56: 7 repeating karanas (Bava, Balava, Kaulava, Taitila, Garija, Vanija, Vishti)
 *   cycling 8 times
 * - Karana 57: Shakuni (fixed)
 * - Karana 58: Chatushpada (fixed)
 * - Karana 59: Nagava (fixed, first half of Shukla Pratipada)
 */

import { getSunLongitude, getMoonLongitude } from "./astronomy";
import { getKaranaName } from "./constants";

/** Size of one karana in degrees (half a tithi = 6°) */
const KARANA_SIZE = 6;

/**
 * Get the karana index (0–59) at a given moment.
 */
export function getKaranaIndex(date: Date): number {
  const sunLong = getSunLongitude(date);
  const moonLong = getMoonLongitude(date);
  let diff = (moonLong - sunLong + 360) % 360;
  return Math.floor(diff / KARANA_SIZE);
}

/**
 * Get karana details at a given moment.
 */
export function getCurrentKarana(date: Date): { index: number; name: string } {
  const index = getKaranaIndex(date);
  return { index, name: getKaranaName(index) };
}

/**
 * Find the exact time of a karana transition via binary search.
 */
function findKaranaTransition(start: Date, end: Date): Date | null {
  const startKarana = getKaranaIndex(start);
  const endKarana = getKaranaIndex(end);

  if (startKarana === endKarana) return null;

  let lo = start.getTime();
  let hi = end.getTime();

  while (hi - lo > 1000) {
    const mid = lo + (hi - lo) / 2;
    const midKarana = getKaranaIndex(new Date(mid));
    if (midKarana === startKarana) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return new Date(hi);
}

/**
 * Get all karana transitions within a Vedic day (sunrise to next sunrise).
 * Usually 3–4 karanas per day (each karana is ~half a tithi ≈ ~14.75 hrs).
 */
export function getKaranaTransitions(
  sunrise: Date,
  nextSunrise: Date,
  tzOffset: string
): Array<{ id: number; name: string; start: string; end: string }> {
  const results: Array<{ id: number; name: string; start: string; end: string }> = [];

  let currentStart = sunrise;
  let currentIdx = getKaranaIndex(currentStart);

  // A karana lasts ~14.75 hours, so max ~4 in a day
  for (let i = 0; i < 5; i++) {
    const transition = findKaranaTransition(currentStart, nextSunrise);
    const endTime = transition || nextSunrise;

    results.push({
      id: currentIdx + 1,
      name: getKaranaName(currentIdx),
      start: toISOWithTz(currentStart, tzOffset),
      end: toISOWithTz(endTime, tzOffset),
    });

    if (!transition) break;

    currentStart = transition;
    currentIdx = getKaranaIndex(transition);
  }

  return results;
}

function toISOWithTz(date: Date, tzOffset: string): string {
  const offsetMs = parseTzOffset(tzOffset);
  const local = new Date(date.getTime() + offsetMs);
  const y = local.getUTCFullYear();
  const m = String(local.getUTCMonth() + 1).padStart(2, "0");
  const d = String(local.getUTCDate()).padStart(2, "0");
  const h = String(local.getUTCHours()).padStart(2, "0");
  const min = String(local.getUTCMinutes()).padStart(2, "0");
  const s = String(local.getUTCSeconds()).padStart(2, "0");
  return `${y}-${m}-${d}T${h}:${min}:${s}${tzOffset}`;
}

function parseTzOffset(tz: string): number {
  const match = tz.match(/^([+-])(\d{2}):(\d{2})$/);
  if (!match) return 0;
  const sign = match[1] === "+" ? 1 : -1;
  return sign * (parseInt(match[2]) * 3600000 + parseInt(match[3]) * 60000);
}
