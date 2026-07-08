/**
 * Planetary Hora Calculation
 *
 * A Vedic day is divided into 24 horas (12 day horas and 12 night horas).
 * - Day horas: Sunrise to Sunset, each is 1/12th of day duration.
 * - Night horas: Sunset to next Sunrise, each is 1/12th of night duration.
 *
 * The first hora of the day is ruled by the planet of the weekday.
 * Subsequent horas follow the Chaldean order:
 * Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars.
 */

import {
  HORA_ORDER,
  WEEKDAY_RULERS,
  PLANET_VEDIC_NAMES,
  HORA_TYPE,
} from "./constants";
import { toISOWithTz } from "./timings";

export interface HoraTiming {
  hora: {
    id: number;
    name: string;
    vedic_name: string;
  };
  type: string;
  is_day: boolean;
  start: string;
  end: string;
}

export function getPlanetaryHora(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  weekday: number,
  tzOffset: string
): HoraTiming[] {
  const horas: HoraTiming[] = [];

  const dayDurationMs = sunset.getTime() - sunrise.getTime();
  const dayHoraDurationMs = dayDurationMs / 12;

  const nightDurationMs = nextSunrise.getTime() - sunset.getTime();
  const nightHoraDurationMs = nightDurationMs / 12;

  // The ruler of the first hora is the weekday ruler
  const firstPlanet = WEEKDAY_RULERS[weekday];
  let currentPlanetIndex = HORA_ORDER.indexOf(firstPlanet as typeof HORA_ORDER[number]);

  let idCounter = 1;

  // 12 Day Horas
  for (let i = 0; i < 12; i++) {
    const startMs = sunrise.getTime() + i * dayHoraDurationMs;
    const endMs = startMs + dayHoraDurationMs;
    const planetName = HORA_ORDER[currentPlanetIndex];

    horas.push({
      hora: {
        id: idCounter++,
        name: planetName,
        vedic_name: PLANET_VEDIC_NAMES[planetName],
      },
      type: HORA_TYPE[planetName],
      is_day: true,
      start: toISOWithTz(new Date(startMs), tzOffset),
      end: toISOWithTz(new Date(endMs), tzOffset),
    });

    currentPlanetIndex = (currentPlanetIndex + 1) % HORA_ORDER.length;
  }

  // 12 Night Horas
  for (let i = 0; i < 12; i++) {
    const startMs = sunset.getTime() + i * nightHoraDurationMs;
    const endMs = startMs + nightHoraDurationMs;
    const planetName = HORA_ORDER[currentPlanetIndex];

    horas.push({
      hora: {
        id: idCounter++,
        name: planetName,
        vedic_name: PLANET_VEDIC_NAMES[planetName],
      },
      type: HORA_TYPE[planetName],
      is_day: false,
      start: toISOWithTz(new Date(startMs), tzOffset),
      end: toISOWithTz(new Date(endMs), tzOffset),
    });

    currentPlanetIndex = (currentPlanetIndex + 1) % HORA_ORDER.length;
  }

  return horas;
}
