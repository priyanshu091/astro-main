/**
 * Panchang Timings
 *
 * Calculates auspicious and inauspicious periods based on sunrise/sunset
 * and traditional Vedic astrology rules.
 */

import {
  RAHU_KAAL_SEGMENT,
  GULIKA_KAAL_SEGMENT,
  YAMAGHANDA_SEGMENT,
  DUR_MUHURAT_INDICES,
  AMRIT_KAAL_TABLE,
} from "./constants";
import { getNakshatraIndex } from "./nakshatra";

/**
 * Calculates a specific 1/8th segment of the day.
 * Segment index is 1-based (1 to 8).
 */
function getDaySegment(sunrise: Date, sunset: Date, segmentIndex: number): { start: Date; end: Date } {
  const dayDurationMs = sunset.getTime() - sunrise.getTime();
  const segmentDurationMs = dayDurationMs / 8;
  const startMs = sunrise.getTime() + (segmentIndex - 1) * segmentDurationMs;
  return {
    start: new Date(startMs),
    end: new Date(startMs + segmentDurationMs),
  };
}

/**
 * Calculates Rahu Kaal for a given day.
 * Rahu Kaal is a specific 1/8th segment of the day based on the weekday.
 */
export function getRahuKaal(sunrise: Date, sunset: Date, weekday: number): { start: Date; end: Date } {
  const segment = RAHU_KAAL_SEGMENT[weekday];
  return getDaySegment(sunrise, sunset, segment);
}

/**
 * Calculates Gulika Kaal for a given day.
 * Gulika Kaal is a specific 1/8th segment of the day based on the weekday.
 */
export function getGulikaKaal(sunrise: Date, sunset: Date, weekday: number): { start: Date; end: Date } {
  const segment = GULIKA_KAAL_SEGMENT[weekday];
  return getDaySegment(sunrise, sunset, segment);
}

/**
 * Calculates Yamaghanda for a given day.
 * Yamaghanda is a specific 1/8th segment of the day based on the weekday.
 */
export function getYamaghanda(sunrise: Date, sunset: Date, weekday: number): { start: Date; end: Date } {
  const segment = YAMAGHANDA_SEGMENT[weekday];
  return getDaySegment(sunrise, sunset, segment);
}

/**
 * Calculates Abhijit Muhurat.
 * The 8th muhurat of the day (out of 15), approximately solar noon ± 24 mins.
 */
export function getAbhijitMuhurat(sunrise: Date, sunset: Date): { start: Date; end: Date } {
  const dayDurationMs = sunset.getTime() - sunrise.getTime();
  const muhuratDurationMs = dayDurationMs / 15;
  // 8th muhurat means index 7 (0-based)
  const startMs = sunrise.getTime() + 7 * muhuratDurationMs;
  return {
    start: new Date(startMs),
    end: new Date(startMs + muhuratDurationMs),
  };
}

/**
 * Calculates Brahma Muhurat.
 * 1 hour 36 minutes before sunrise, lasting for 48 minutes (or 2 muhurats before sunrise).
 * We use the standard fixed 96 minutes before sunrise for start, and 48 minutes before for end.
 */
export function getBrahmaMuhurat(sunrise: Date): { start: Date; end: Date } {
  const startMs = sunrise.getTime() - 96 * 60 * 1000;
  const endMs = sunrise.getTime() - 48 * 60 * 1000;
  return {
    start: new Date(startMs),
    end: new Date(endMs),
  };
}

/**
 * Calculates Dur Muhurat periods for a given day.
 * There are 1-2 inauspicious muhurats per day based on the weekday.
 */
export function getDurMuhurat(sunrise: Date, sunset: Date, weekday: number): { start: Date; end: Date }[] {
  const indices = DUR_MUHURAT_INDICES[weekday];
  const dayDurationMs = sunset.getTime() - sunrise.getTime();
  const muhuratDurationMs = dayDurationMs / 15;

  return indices.map((index) => {
    // index is 1-based in our constants table
    const startMs = sunrise.getTime() + (index - 1) * muhuratDurationMs;
    return {
      start: new Date(startMs),
      end: new Date(startMs + muhuratDurationMs),
    };
  });
}

/**
 * Calculates Amrit Kaal for a given day based on current Nakshatra and weekday.
 * Returns null if no Amrit Kaal occurs.
 */
export function getAmritKaal(
  sunrise: Date,
  sunset: Date,
  weekday: number
): { start: Date; end: Date } | null {
  // Amrit Kaal depends on the Nakshatra prevailing at sunrise
  const nakshatraIndex = getNakshatraIndex(sunrise);
  const muhuratNumber = AMRIT_KAAL_TABLE[nakshatraIndex]?.[weekday];

  if (muhuratNumber == null) return null;

  const dayDurationMs = sunset.getTime() - sunrise.getTime();
  const muhuratDurationMs = dayDurationMs / 15;
  // muhuratNumber is 1-based
  const startMs = sunrise.getTime() + (muhuratNumber - 1) * muhuratDurationMs;

  return {
    start: new Date(startMs),
    end: new Date(startMs + muhuratDurationMs),
  };
}

/**
 * Formats a Date to ISO 8601 with timezone offset.
 */
export function toISOWithTz(date: Date, tzOffset: string): string {
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

export function parseTzOffset(tz: string): number {
  const match = tz.match(/^([+-])(\d{2}):(\d{2})$/);
  if (!match) return 0;
  const sign = match[1] === "+" ? 1 : -1;
  return sign * (parseInt(match[2]) * 3600000 + parseInt(match[3]) * 60000);
}
