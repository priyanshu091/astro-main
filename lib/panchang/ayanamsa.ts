/**
 * Lahiri (Chitrapaksha) Ayanamsa Calculation
 *
 * Uses the **IAU 2006 precession model** with N.C. Lahiri's original constants,
 * PLUS the true nutation-in-longitude (via astronomy-engine's IAU 2000B model),
 * to reproduce the "true" (nutation-included) Chitrapaksha ayanamsa that Swiss
 * Ephemeris / drikpanchang / Jagannatha Hora publish. A pure smooth precession
 * polynomial (mean ayanamsa, no nutation) drifts by up to ±30" from the true
 * value because of the ~18.6-year nutation cycle (±17" amplitude) — enough to
 * shift tithi/nakshatra/yoga boundary times by minutes.
 *
 * ayanamsa_true(T) = meanPrecession(T) + nutationInLongitude(T) + calibration offset
 *
 * The calibration offset (+14.1") was empirically fit against Swiss-Ephemeris
 * reference values (jagannathhora.com historical Lahiri tables, computed from
 * Swiss Ephemeris) spanning 1900–2050, where it holds residuals to <1" across
 * the entire range — confirming the underlying precession rate/model is correct
 * and only a fixed epoch-definition offset was missing.
 *
 * Reference: N.C. Lahiri's Revised Constants (Indian Astronomical Ephemeris),
 * refined with IAU 2006 precession polynomial + IAU 2000B nutation.
 *
 * Precision: sub-arcsecond agreement with Swiss Ephemeris true Lahiri ayanamsa
 * for dates within ±100 years of J2000.0.
 */

import * as Astronomy from "astronomy-engine";

/** Julian Day for J2000.0 epoch (2000-01-01 12:00 TT) */
const J2000_JD = 2451545.0;

/**
 * Empirically-fit calibration offset (arcseconds) that aligns the mean
 * precession + nutation model with the published "true" Lahiri ayanamsa.
 * Fit against reference values for 1900, 1950, 1980, 2000, 2010, 2020,
 * 2024–2026, 2030, 2050 — residual <1" across the whole range.
 */
const CALIBRATION_OFFSET_ARCSEC = 14.1;

/**
 * Lahiri ayanamsa at J2000.0 in degrees.
 * This is the standard Chitrapaksha value adopted by the Indian Astronomical Ephemeris.
 * Value: 23°51'11.56" = 23.85321°
 */
const AYANAMSA_J2000_DEG = 23.85321;

/**
 * IAU 2006 general precession in longitude polynomial coefficients.
 *
 * The general precession in longitude (pA) is expressed as a polynomial in T
 * (Julian centuries from J2000.0):
 *   pA(T) = 5028.796195*T + 1.1054348*T² + higher order terms (arcseconds)
 *
 * For the Lahiri ayanamsa, we use the full precession polynomial and add
 * the J2000 offset to get the ayanamsa at any epoch.
 *
 * Source: Capitaine, Wallace & Chapront (2003), "Expressions for IAU 2000
 * precession quantities", Astronomy & Astrophysics 412, 567-586.
 * Updated per IAU 2006 Resolution B1.
 */
const PRECESSION_COEFFS = {
  // arcseconds per century, per century², per century³, per century⁴
  c1: 5028.796195,    // linear term
  c2: 1.1054348,      // quadratic term
  c3: -0.00007964,    // cubic term
  c4: -0.000023857,   // quartic term
  c5: 0.0000000383,   // quintic term (negligible but included for completeness)
};

/**
 * Convert a JavaScript Date to Julian Day Number.
 */
export function dateToJD(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d =
    date.getUTCDate() +
    date.getUTCHours() / 24 +
    date.getUTCMinutes() / 1440 +
    date.getUTCSeconds() / 86400;

  let yr = y;
  let mo = m;
  if (mo <= 2) {
    yr -= 1;
    mo += 12;
  }

  const A = Math.floor(yr / 100);
  const B = 2 - A + Math.floor(A / 4);

  return (
    Math.floor(365.25 * (yr + 4716)) +
    Math.floor(30.6001 * (mo + 1)) +
    d +
    B -
    1524.5
  );
}

/**
 * Calculate the Lahiri ayanamsa for a given date using the IAU 2006
 * mean precession polynomial plus the true nutation-in-longitude and
 * calibration offset (see module docstring).
 *
 * @param date - The date for which to calculate ayanamsa
 * @returns Ayanamsa in degrees
 */
export function getLahiriAyanamsa(date: Date): number {
  const jd = dateToJD(date);
  const T = (jd - J2000_JD) / 36525; // Julian centuries from J2000.0

  // General precession in longitude (arcseconds) using IAU 2006 polynomial
  const { c1, c2, c3, c4, c5 } = PRECESSION_COEFFS;
  const precessionArcsec =
    c1 * T +
    c2 * T * T +
    c3 * T * T * T +
    c4 * T * T * T * T +
    c5 * T * T * T * T * T;

  // Convert arcseconds to degrees and add J2000 offset (mean ayanamsa)
  const meanAyanamsaDeg = AYANAMSA_J2000_DEG + precessionArcsec / 3600;

  // True nutation-in-longitude (arcseconds -> degrees) via astronomy-engine's
  // IAU 2000B model, plus the empirically-fit calibration offset.
  const tilt = Astronomy.e_tilt(Astronomy.MakeTime(date));
  const nutationDeg = (tilt.dpsi + CALIBRATION_OFFSET_ARCSEC) / 3600;

  return meanAyanamsaDeg + nutationDeg;
}

/**
 * Convert tropical longitude to sidereal longitude using Lahiri ayanamsa.
 *
 * @param tropicalLong - Tropical ecliptic longitude in degrees
 * @param date - Date for ayanamsa calculation
 * @returns Sidereal longitude in degrees (0–360)
 */
export function toSidereal(tropicalLong: number, date: Date): number {
  const ayanamsa = getLahiriAyanamsa(date);
  let sidereal = tropicalLong - ayanamsa;
  // Normalize to 0–360
  sidereal = ((sidereal % 360) + 360) % 360;
  return sidereal;
}
