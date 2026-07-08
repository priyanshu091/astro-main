/**
 * Low-level astronomical functions using the `astronomy-engine` library.
 *
 * Provides Sun/Moon positions (tropical & sidereal), sunrise/sunset, moonrise/moonset.
 * All functions use `astronomy-engine` (MIT, pure JS, VSOP87 model).
 */

import * as Astronomy from "astronomy-engine";
import { toSidereal } from "./ayanamsa";

/**
 * Get the tropical ecliptic longitude of the Sun at a given date.
 * @returns Longitude in degrees (0–360)
 */
export function getSunLongitude(date: Date): number {
  const equ = Astronomy.SunPosition(date);
  const ecl = Astronomy.Ecliptic(equ.vec);
  return ((ecl.elon % 360) + 360) % 360;
}

/**
 * Get the tropical ecliptic longitude of the Moon at a given date.
 * @returns Longitude in degrees (0–360)
 */
export function getMoonLongitude(date: Date): number {
  const geo = Astronomy.GeoMoon(date);
  const ecl = Astronomy.Ecliptic(geo);
  return ((ecl.elon % 360) + 360) % 360;
}

/**
 * Get sidereal longitude of the Sun (tropical – Lahiri ayanamsa).
 */
export function getSiderealSunLong(date: Date): number {
  return toSidereal(getSunLongitude(date), date);
}

/**
 * Get sidereal longitude of the Moon (tropical – Lahiri ayanamsa).
 */
export function getSiderealMoonLong(date: Date): number {
  return toSidereal(getMoonLongitude(date), date);
}

/**
 * Calculate sunrise for a given date and location.
 * Uses astronomy-engine's SearchRiseSet with standard atmospheric refraction.
 *
 * @param date - The date (uses the calendar day at the given time)
 * @param lat - Observer latitude in degrees (positive = North)
 * @param lng - Observer longitude in degrees (positive = East)
 * @returns Date of sunrise, or null if sun doesn't rise (polar regions)
 */
export function getSunrise(date: Date, lat: number, lng: number): Date | null {
  const observer = new Astronomy.Observer(lat, lng, 0);
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const result = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, startOfDay, 1);
  return result?.date ?? null;
}

/**
 * Calculate sunset for a given date and location.
 */
export function getSunset(date: Date, lat: number, lng: number): Date | null {
  const observer = new Astronomy.Observer(lat, lng, 0);
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const result = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, startOfDay, 1);
  return result?.date ?? null;
}

/**
 * Calculate next day's sunrise (needed for night hora/chaughadiya calculations).
 */
export function getNextSunrise(date: Date, lat: number, lng: number): Date | null {
  const observer = new Astronomy.Observer(lat, lng, 0);
  // Start searching from noon of the current day to find next day's sunrise
  const noon = new Date(date);
  noon.setUTCHours(12, 0, 0, 0);
  const result = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, noon, 1);
  return result?.date ?? null;
}

/**
 * Calculate moonrise for a given date and location.
 * NOTE: Some days genuinely have no moonrise (moon doesn't rise during that
 * calendar day). The frontend must handle null gracefully — the existing
 * ProKerala API may populate these even when astronomically absent, so test
 * edge cases carefully.
 *
 * @returns Date of moonrise, or null if the moon doesn't rise on this day
 */
export function getMoonrise(date: Date, lat: number, lng: number): Date | null {
  const observer = new Astronomy.Observer(lat, lng, 0);
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const result = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, +1, startOfDay, 1);
  return result?.date ?? null;
}

/**
 * Calculate moonset for a given date and location.
 * NOTE: Same null caveat as moonrise — some days have no moonset.
 */
export function getMoonset(date: Date, lat: number, lng: number): Date | null {
  const observer = new Astronomy.Observer(lat, lng, 0);
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const result = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, -1, startOfDay, 1);
  return result?.date ?? null;
}
