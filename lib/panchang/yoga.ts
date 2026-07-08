/**
 * Yoga Calculation
 *
 * Yoga = (Sun longitude + Moon longitude) mod 360 / 13°20'
 * There are 27 yogas. The sum is computed using TROPICAL longitudes
 * (not sidereal — this is a common point of confusion, but the standard
 * Drik Panchang convention uses tropical sun+moon for yoga).
 *
 * Note: Some implementations use sidereal. We use tropical to match
 * ProKerala's output. If validation shows a mismatch, switch to sidereal.
 */

import { getSunLongitude, getMoonLongitude } from "./astronomy";
import { toSidereal } from "./ayanamsa";
import { YOGA_NAMES } from "./constants";

const YOGA_SIZE = 360 / 27; // 13.3333...°

/**
 * Get the yoga index (0–26) at a given moment.
 * Uses sidereal Sun + sidereal Moon (standard Vedic convention).
 */
export function getYogaIndex(date: Date): number {
  const sunSid = toSidereal(getSunLongitude(date), date);
  const moonSid = toSidereal(getMoonLongitude(date), date);
  const sum = (sunSid + moonSid) % 360;
  return Math.floor(sum / YOGA_SIZE);
}

/**
 * Get yoga details at a given moment.
 */
export function getCurrentYoga(date: Date): { index: number; name: string } {
  const index = getYogaIndex(date);
  return { index, name: YOGA_NAMES[index] };
}

/**
 * Find the exact time of a yoga transition via binary search.
 */
function findYogaTransition(start: Date, end: Date): Date | null {
  const startYoga = getYogaIndex(start);
  const endYoga = getYogaIndex(end);

  if (startYoga === endYoga) return null;

  let lo = start.getTime();
  let hi = end.getTime();

  while (hi - lo > 1000) {
    const mid = lo + (hi - lo) / 2;
    const midYoga = getYogaIndex(new Date(mid));
    if (midYoga === startYoga) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return new Date(hi);
}

/**
 * Get all yoga transitions within a Vedic day (sunrise to next sunrise).
 */
export function getYogaTransitions(
  sunrise: Date,
  nextSunrise: Date,
  tzOffset: string
): Array<{ id: number; name: string; start: string; end: string }> {
  const results: Array<{ id: number; name: string; start: string; end: string }> = [];

  let currentStart = sunrise;
  let currentIdx = getYogaIndex(currentStart);

  for (let i = 0; i < 3; i++) {
    const transition = findYogaTransition(currentStart, nextSunrise);
    const endTime = transition || nextSunrise;

    results.push({
      id: currentIdx + 1,
      name: YOGA_NAMES[currentIdx],
      start: toISOWithTz(currentStart, tzOffset),
      end: toISOWithTz(endTime, tzOffset),
    });

    if (!transition) break;

    currentStart = transition;
    currentIdx = getYogaIndex(transition);
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
