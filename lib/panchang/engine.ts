/**
 * Panchang Engine Orchestrator
 *
 * Assembles all the individual Panchang calculations into the exact JSON
 * shapes expected by the frontend.
 */

import { getSunrise, getSunset, getNextSunrise, getMoonrise, getMoonset } from "./astronomy";
import { getTithiTransitions } from "./tithi";
import { getNakshatraTransitions, getNakshatraIndex } from "./nakshatra";
import { getYogaTransitions } from "./yoga";
import { getKaranaTransitions } from "./karana";
import { getPlanetaryHora, HoraTiming } from "./hora";
import { getChaughadiya, ChoghadiyaMuhurat } from "./chaughadiya";
import {
  getRahuKaal,
  getGulikaKaal,
  getYamaghanda,
  getAbhijitMuhurat,
  getBrahmaMuhurat,
  getAmritKaal,
  getDurMuhurat,
  toISOWithTz,
  parseTzOffset,
} from "./timings";
import { WEEKDAY_NAMES } from "./constants";

export interface PanchangData {
  vaara: string;
  sunrise: string;
  sunset: string;
  moonrise?: string;
  moonset?: string;
  tithi: Array<any>;
  nakshatra: Array<any>;
  yoga: Array<any>;
  karana: Array<any>;
  auspicious_period?: Array<any>;
  inauspicious_period?: Array<any>;
}

export interface HoraData {
  hora_timing: HoraTiming[];
}

export interface ChoghadiyaData {
  muhurat: ChoghadiyaMuhurat[];
}

/**
 * Main function to compute the Panchang for a given date and location.
 *
 * @param dateStr ISO 8601 date string (e.g., "2026-07-08T00:00:00+05:30")
 * @param lat Latitude
 * @param lng Longitude
 * @param tzOffset Timezone offset string (e.g., "+05:30")
 */
export function computePanchang(dateStr: string, lat: number, lng: number, tzOffset: string): PanchangData {
  // We use the start of the civil day for calculations.
  // The provided dateStr often has T00:00:00 with offset.
  const queryDate = new Date(dateStr);
  const weekday = queryDate.getDay(); // 0 = Sunday

  // Get sunrise and sunset for the requested day
  const sunrise = getSunrise(queryDate, lat, lng);
  const sunset = getSunset(queryDate, lat, lng);

  if (!sunrise || !sunset) {
    throw new Error("Could not calculate sunrise/sunset for this location and date.");
  }

  // Get next sunrise for calculations that span the night
  const nextSunrise = getNextSunrise(queryDate, lat, lng);
  if (!nextSunrise) {
    throw new Error("Could not calculate next day's sunrise.");
  }

  // Get moonrise/moonset
  const moonrise = getMoonrise(queryDate, lat, lng);
  const moonset = getMoonset(queryDate, lat, lng);

  // Transitions
  const tithi = getTithiTransitions(sunrise, nextSunrise, tzOffset);
  const nakshatra = getNakshatraTransitions(sunrise, nextSunrise, tzOffset);
  const yoga = getYogaTransitions(sunrise, nextSunrise, tzOffset);
  const karana = getKaranaTransitions(sunrise, nextSunrise, tzOffset);

  // Auspicious periods
  const auspicious_period = [];
  
  const abhijit = getAbhijitMuhurat(sunrise, sunset);
  auspicious_period.push({
    id: 1,
    name: "Abhijit Muhurat",
    type: "auspicious",
    period: [{ start: toISOWithTz(abhijit.start, tzOffset), end: toISOWithTz(abhijit.end, tzOffset) }]
  });

  const amritKaal = getAmritKaal(sunrise, sunset, weekday);
  if (amritKaal) {
    auspicious_period.push({
      id: 2,
      name: "Amrit Kaal",
      type: "auspicious",
      period: [{ start: toISOWithTz(amritKaal.start, tzOffset), end: toISOWithTz(amritKaal.end, tzOffset) }]
    });
  }

  const brahma = getBrahmaMuhurat(sunrise);
  auspicious_period.push({
    id: 3,
    name: "Brahma Muhurat",
    type: "auspicious",
    period: [{ start: toISOWithTz(brahma.start, tzOffset), end: toISOWithTz(brahma.end, tzOffset) }]
  });

  // Inauspicious periods
  const inauspicious_period = [];

  const rahu = getRahuKaal(sunrise, sunset, weekday);
  inauspicious_period.push({
    id: 1,
    name: "Rahu Kaal",
    type: "inauspicious",
    period: [{ start: toISOWithTz(rahu.start, tzOffset), end: toISOWithTz(rahu.end, tzOffset) }]
  });

  const yamaghanda = getYamaghanda(sunrise, sunset, weekday);
  inauspicious_period.push({
    id: 2,
    name: "Yamaghanda",
    type: "inauspicious",
    period: [{ start: toISOWithTz(yamaghanda.start, tzOffset), end: toISOWithTz(yamaghanda.end, tzOffset) }]
  });

  const gulika = getGulikaKaal(sunrise, sunset, weekday);
  inauspicious_period.push({
    id: 3,
    name: "Gulika Kaal",
    type: "inauspicious",
    period: [{ start: toISOWithTz(gulika.start, tzOffset), end: toISOWithTz(gulika.end, tzOffset) }]
  });

  const durMuhurat = getDurMuhurat(sunrise, sunset, weekday);
  if (durMuhurat.length > 0) {
    inauspicious_period.push({
      id: 4,
      name: "Dur Muhurat",
      type: "inauspicious",
      period: durMuhurat.map(p => ({
        start: toISOWithTz(p.start, tzOffset),
        end: toISOWithTz(p.end, tzOffset)
      }))
    });
  }

  // Varjyam (Not fully implemented in constants, using placeholder or skipping if missing from ProKerala)
  // Most Panchangs also display Varjyam (poisonous time) based on Nakshatra.
  // We'll leave it out for now as the user didn't specifically list its lookup table,
  // but the structure supports adding it later.

  const panchang: PanchangData = {
    vaara: WEEKDAY_NAMES[weekday],
    sunrise: toISOWithTz(sunrise, tzOffset),
    sunset: toISOWithTz(sunset, tzOffset),
    tithi,
    nakshatra,
    yoga,
    karana,
    auspicious_period,
    inauspicious_period,
  };

  if (moonrise) panchang.moonrise = toISOWithTz(moonrise, tzOffset);
  if (moonset) panchang.moonset = toISOWithTz(moonset, tzOffset);

  return panchang;
}

/**
 * Computes both Hora and Chaughadiya data for a given date and location.
 */
export function computeHoraChaughadiya(dateStr: string, lat: number, lng: number, tzOffset: string): { hora: HoraData; choghadiya: ChoghadiyaData } {
  const queryDate = new Date(dateStr);
  const weekday = queryDate.getDay();

  const sunrise = getSunrise(queryDate, lat, lng);
  const sunset = getSunset(queryDate, lat, lng);
  const nextSunrise = getNextSunrise(queryDate, lat, lng);

  if (!sunrise || !sunset || !nextSunrise) {
    throw new Error("Could not calculate sunrise/sunset times.");
  }

  const hora_timing = getPlanetaryHora(sunrise, sunset, nextSunrise, weekday, tzOffset);
  const choghadiya_timing = getChaughadiya(sunrise, sunset, nextSunrise, weekday, tzOffset);

  return {
    hora: { hora_timing },
    choghadiya: { muhurat: choghadiya_timing },
  };
}

export function extractTzOffset(datetimeStr: string): string {
  // E.g. "2026-07-08T00:00:00+05:30"
  // Should extract "+05:30"
  const match = datetimeStr.match(/([+-]\d{2}:\d{2})$/);
  return match ? match[1] : "+00:00"; // Default to UTC if not found
}
