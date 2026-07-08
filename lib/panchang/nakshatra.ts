/**
 * Nakshatra Calculation
 *
 * Nakshatra = Moon's sidereal longitude / 13°20' (13.3333°)
 * There are 27 nakshatras, each spanning 13°20' of the sidereal zodiac.
 *
 * Each nakshatra has a ruling planet from the repeating cycle:
 * Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury
 */

import { getSiderealMoonLong } from "./astronomy";
import { NAKSHATRA_NAMES, NAKSHATRA_LORDS } from "./constants";

/** Size of one nakshatra in degrees: 13°20' = 13.3333...° */
const NAKSHATRA_SIZE = 360 / 27; // 13.33333...

/**
 * Get the nakshatra index (0–26) at a given moment.
 */
export function getNakshatraIndex(date: Date): number {
  const moonSid = getSiderealMoonLong(date);
  return Math.floor(moonSid / NAKSHATRA_SIZE);
}

/**
 * Get the nakshatra details at a given moment.
 */
export function getCurrentNakshatra(date: Date): {
  index: number;
  name: string;
  lord: { name: string; vedic_name: string };
} {
  const index = getNakshatraIndex(date);
  return {
    index,
    name: NAKSHATRA_NAMES[index],
    lord: NAKSHATRA_LORDS[index],
  };
}

/**
 * Find the exact time of a nakshatra transition via binary search.
 */
function findNakshatraTransition(start: Date, end: Date): Date | null {
  const startNak = getNakshatraIndex(start);
  const endNak = getNakshatraIndex(end);

  if (startNak === endNak) return null;

  let lo = start.getTime();
  let hi = end.getTime();

  while (hi - lo > 1000) {
    const mid = lo + (hi - lo) / 2;
    const midNak = getNakshatraIndex(new Date(mid));
    if (midNak === startNak) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return new Date(hi);
}

/**
 * Get all nakshatra transitions within a Vedic day (sunrise to next sunrise).
 */
export function getNakshatraTransitions(
  sunrise: Date,
  nextSunrise: Date,
  tzOffset: string
): Array<{
  id: number;
  name: string;
  lord: { name: string; vedic_name: string };
  start: string;
  end: string;
}> {
  const results: Array<{
    id: number;
    name: string;
    lord: { name: string; vedic_name: string };
    start: string;
    end: string;
  }> = [];

  let currentStart = sunrise;
  let currentIdx = getNakshatraIndex(currentStart);

  for (let i = 0; i < 3; i++) {
    const transition = findNakshatraTransition(currentStart, nextSunrise);
    const endTime = transition || nextSunrise;

    results.push({
      id: currentIdx + 1,
      name: NAKSHATRA_NAMES[currentIdx],
      lord: NAKSHATRA_LORDS[currentIdx],
      start: toISOWithTz(currentStart, tzOffset),
      end: toISOWithTz(endTime, tzOffset),
    });

    if (!transition) break;

    currentStart = transition;
    currentIdx = getNakshatraIndex(transition);
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
