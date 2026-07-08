/**
 * Tithi Calculation
 *
 * Tithi = (Moon longitude − Sun longitude) mod 360 / 12°
 * There are 30 tithis in a lunar month.
 * Tithis 1–15 = Shukla Paksha (waxing), 16–30 = Krishna Paksha (waning).
 *
 * Transition times are found via binary search on the Sun-Moon angular separation.
 */

import { getSunLongitude, getMoonLongitude } from "./astronomy";
import { TITHI_NAMES, getPaksha } from "./constants";

/** Size of one tithi in degrees */
const TITHI_SIZE = 12;

/**
 * Get the tithi index (0–29) at a given moment.
 */
export function getTithiIndex(date: Date): number {
  const sunLong = getSunLongitude(date);
  const moonLong = getMoonLongitude(date);
  let diff = (moonLong - sunLong + 360) % 360;
  return Math.floor(diff / TITHI_SIZE);
}

/**
 * Get the tithi details at a given moment.
 */
export function getCurrentTithi(date: Date): {
  index: number;
  name: string;
  paksha: string;
} {
  const index = getTithiIndex(date);
  return {
    index,
    name: TITHI_NAMES[index],
    paksha: getPaksha(index),
  };
}

/**
 * Find the exact time when a tithi transition occurs using binary search.
 *
 * We search between `start` and `end` for the moment the tithi index changes
 * from the tithi active at `start`. Precision: ~1 second.
 *
 * @returns The Date of the transition, or null if no transition occurs in range.
 */
function findTithiTransition(start: Date, end: Date): Date | null {
  const startTithi = getTithiIndex(start);
  const endTithi = getTithiIndex(end);

  if (startTithi === endTithi) return null;

  let lo = start.getTime();
  let hi = end.getTime();

  // Binary search to ~1 second precision
  while (hi - lo > 1000) {
    const mid = lo + (hi - lo) / 2;
    const midTithi = getTithiIndex(new Date(mid));
    if (midTithi === startTithi) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return new Date(hi);
}

/**
 * Get all tithi transitions within a Vedic day (sunrise to next sunrise).
 * Returns 1–2 PanchangItem entries with start/end times.
 *
 * The Vedic day starts at sunrise and ends at the next sunrise.
 * Usually there's one tithi active, sometimes two if a transition occurs.
 */
export function getTithiTransitions(
  sunrise: Date,
  nextSunrise: Date,
  tzOffset: string
): Array<{
  id: number;
  name: string;
  paksha: string;
  start: string;
  end: string;
}> {
  const results: Array<{
    id: number;
    name: string;
    paksha: string;
    start: string;
    end: string;
  }> = [];

  let currentStart = sunrise;
  let currentTithiIdx = getTithiIndex(currentStart);

  // Look for up to 3 transitions (extremely rare to have more than 2 tithis in a day)
  for (let i = 0; i < 3; i++) {
    const transition = findTithiTransition(currentStart, nextSunrise);
    const endTime = transition || nextSunrise;

    results.push({
      id: currentTithiIdx + 1,
      name: TITHI_NAMES[currentTithiIdx],
      paksha: getPaksha(currentTithiIdx),
      start: toISOWithTz(currentStart, tzOffset),
      end: toISOWithTz(endTime, tzOffset),
    });

    if (!transition) break;

    currentStart = transition;
    currentTithiIdx = getTithiIndex(transition);
  }

  return results;
}

/** Format Date to ISO 8601 with timezone offset */
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
