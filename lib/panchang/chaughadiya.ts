/**
 * Chaughadiya Muhurat Calculation
 *
 * A Vedic day is divided into 16 Chaughadiya muhurats (8 day and 8 night).
 * - Day Chaughadiya: Sunrise to Sunset, each is 1/8th of day duration.
 * - Night Chaughadiya: Sunset to next Sunrise, each is 1/8th of night duration.
 *
 * Each segment is ruled by a Chaughadiya name (Amrut, Shubh, Labh, Char, Udveg, Kaal, Rog).
 * The sequence repeats. The first Chaughadiya of the day depends on the weekday.
 */

import {
  CHAUGHADIYA_NAMES,
  CHAUGHADIYA_TYPE,
  CHAUGHADIYA_DAY_START,
  CHAUGHADIYA_NIGHT_START,
} from "./constants";
import { toISOWithTz } from "./timings";

export interface ChoghadiyaMuhurat {
  id: number;
  name: string;
  type: string;
  vela: string | null;
  is_day: boolean;
  start: string;
  end: string;
}

export function getChaughadiya(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  weekday: number,
  tzOffset: string
): ChoghadiyaMuhurat[] {
  const choghadiya: ChoghadiyaMuhurat[] = [];

  const dayDurationMs = sunset.getTime() - sunrise.getTime();
  const daySegmentDurationMs = dayDurationMs / 8;

  const nightDurationMs = nextSunrise.getTime() - sunset.getTime();
  const nightSegmentDurationMs = nightDurationMs / 8;

  let currentDayIndex = CHAUGHADIYA_DAY_START[weekday];
  let idCounter = 1;

  // 8 Day Chaughadiyas
  for (let i = 0; i < 8; i++) {
    const startMs = sunrise.getTime() + i * daySegmentDurationMs;
    const endMs = startMs + daySegmentDurationMs;
    const name = CHAUGHADIYA_NAMES[currentDayIndex];

    // Vela logic (Kaal Vela, Vaar Vela, etc.) - Simplified based on ProKerala outputs
    // where they usually put 'vela' as null or specific strings based on combinations
    // For exact match, leaving null as default unless required.
    const vela = null;

    choghadiya.push({
      id: idCounter++,
      name: name,
      type: CHAUGHADIYA_TYPE[name],
      vela: vela,
      is_day: true,
      start: toISOWithTz(new Date(startMs), tzOffset),
      end: toISOWithTz(new Date(endMs), tzOffset),
    });

    currentDayIndex = (currentDayIndex + 1) % CHAUGHADIYA_NAMES.length;
  }

  let currentNightIndex = CHAUGHADIYA_NIGHT_START[weekday];

  // 8 Night Chaughadiyas
  for (let i = 0; i < 8; i++) {
    const startMs = sunset.getTime() + i * nightSegmentDurationMs;
    const endMs = startMs + nightSegmentDurationMs;
    const name = CHAUGHADIYA_NAMES[currentNightIndex];

    choghadiya.push({
      id: idCounter++,
      name: name,
      type: CHAUGHADIYA_TYPE[name],
      vela: null,
      is_day: false,
      start: toISOWithTz(new Date(startMs), tzOffset),
      end: toISOWithTz(new Date(endMs), tzOffset),
    });

    currentNightIndex = (currentNightIndex + 1) % CHAUGHADIYA_NAMES.length;
  }

  return choghadiya;
}
