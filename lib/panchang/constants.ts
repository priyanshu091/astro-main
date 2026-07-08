/**
 * Panchang Constants — Lookup tables for Vedic calendar calculations.
 *
 * All tables follow standard Drik Panchang conventions (same reference ProKerala uses).
 */

// ─── Tithi ───────────────────────────────────────────────────────────────────

export const TITHI_NAMES = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya",
] as const;

export function getPaksha(tithiIndex: number): string {
  return tithiIndex < 15 ? "Shukla" : "Krishna";
}

// ─── Planet Names ────────────────────────────────────────────────────────────

export const PLANET_VEDIC_NAMES: Record<string, string> = {
  Sun: "Surya",
  Moon: "Chandra",
  Mars: "Mangal",
  Mercury: "Budh",
  Jupiter: "Guru",
  Venus: "Shukra",
  Saturn: "Shani",
  Rahu: "Rahu",
  Ketu: "Ketu",
};

// ─── Nakshatra ───────────────────────────────────────────────────────────────

export const NAKSHATRA_NAMES = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha",
  "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
  "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
  "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
  "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
  "Uttara Bhadrapada", "Revati",
] as const;

// Ruling planets cycle: Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury (repeating 3x for 27)
const NAKSHATRA_LORD_CYCLE = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];

export const NAKSHATRA_LORDS: { name: string; vedic_name: string }[] = NAKSHATRA_NAMES.map((_, i) => {
  const lordName = NAKSHATRA_LORD_CYCLE[i % 9];
  return { name: lordName, vedic_name: PLANET_VEDIC_NAMES[lordName] || lordName };
});

// ─── Yoga ────────────────────────────────────────────────────────────────────

export const YOGA_NAMES = [
  "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana",
  "Atiganda", "Sukarman", "Dhriti", "Shoola", "Ganda",
  "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
  "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva",
  "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma",
  "Indra", "Vaidhriti",
] as const;

// ─── Karana ───────────────────────────────────────────────────────────────────

// 7 repeating karanas (Bava through Vanija cycle through most of the month)
export const REPEATING_KARANAS = ["Bava", "Balava", "Kaulava", "Taitila", "Garija", "Vanija", "Vishti"] as const;
// 4 fixed karanas that appear once each in specific positions
export const FIXED_KARANAS = ["Shakuni", "Chatushpada", "Nagava", "Kimstughna"] as const;

/**
 * Get karana name from the karana index (0-59 within a lunar month).
 * Karanas map: each tithi has 2 karanas (first half and second half).
 * Position 0 = second half of Krishna Chaturdashi → Kimstughna (fixed)
 * Positions 1-56 = 7 repeating karanas cycling 8 times
 * Position 57 = Shakuni (fixed)
 * Position 58 = Chatushpada (fixed)
 * Position 59 = Nagava (fixed)
 *
 * But for Panchang display, we identify karana from tithi halves directly.
 */
export function getKaranaName(karanaIndex: number): string {
  // karanaIndex is 0-based within the 60 karanas of a lunar month
  if (karanaIndex === 0) return "Kimstughna";
  if (karanaIndex >= 57) return FIXED_KARANAS[karanaIndex - 57] as string;
  return REPEATING_KARANAS[(karanaIndex - 1) % 7] as string;
}

// ─── Hora ────────────────────────────────────────────────────────────────────

// Chaldean order of planets for hora calculation
export const HORA_ORDER = ["Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars"] as const;

// Which planet rules each weekday (index 0=Sunday, 1=Monday, ...)
export const WEEKDAY_RULERS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"] as const;

// Hora type classification
export const HORA_TYPE: Record<string, string> = {
  Sun: "Good",
  Venus: "Good",
  Mercury: "Not Bad",
  Moon: "Good",
  Saturn: "Bad",
  Jupiter: "Good",
  Mars: "Bad",
};

// ─── Chaughadiya ─────────────────────────────────────────────────────────────

export const CHAUGHADIYA_NAMES = ["Udveg", "Char", "Labh", "Amrut", "Kaal", "Shubh", "Rog"] as const;

export const CHAUGHADIYA_TYPE: Record<string, string> = {
  Amrut: "Most Auspicious",
  Shubh: "Good",
  Labh: "Good",
  Char: "Good",
  Udveg: "Inauspicious",
  Kaal: "Inauspicious",
  Rog: "Inauspicious",
};

// Day chaughadiya starting index per weekday (0=Sunday)
// The first chaughadiya of the day is determined by the weekday
export const CHAUGHADIYA_DAY_START: Record<number, number> = {
  0: 0, // Sunday: Udveg
  1: 3, // Monday: Amrut
  2: 6, // Tuesday: Rog
  3: 2, // Wednesday: Labh
  4: 5, // Thursday: Shubh
  5: 1, // Friday: Char
  6: 4, // Saturday: Kaal
};

// Night chaughadiya starting index per weekday
export const CHAUGHADIYA_NIGHT_START: Record<number, number> = {
  0: 5, // Sunday: Shubh
  1: 1, // Monday: Char
  2: 4, // Tuesday: Kaal
  3: 6, // Wednesday: Rog
  4: 0, // Thursday: Udveg
  5: 3, // Friday: Amrut
  6: 2, // Saturday: Labh
};

// ─── Rahu Kaal / Gulika Kaal / Yamaghanda ────────────────────────────────────

// Which 1/8th segment of the day is Rahu Kaal for each weekday (0=Sunday)
// Standard Panchang lookup table
export const RAHU_KAAL_SEGMENT: Record<number, number> = {
  0: 8, // Sunday: 8th segment (4:30-6 PM roughly)
  1: 2, // Monday: 2nd segment (7:30-9 AM roughly)
  2: 7, // Tuesday: 7th segment
  3: 5, // Wednesday: 5th segment
  4: 6, // Thursday: 6th segment
  5: 4, // Friday: 4th segment
  6: 3, // Saturday: 3rd segment
};

export const GULIKA_KAAL_SEGMENT: Record<number, number> = {
  0: 7, // Sunday
  1: 6, // Monday
  2: 5, // Tuesday
  3: 4, // Wednesday
  4: 3, // Thursday
  5: 2, // Friday
  6: 1, // Saturday
};

export const YAMAGHANDA_SEGMENT: Record<number, number> = {
  0: 5, // Sunday
  1: 4, // Monday
  2: 3, // Tuesday
  3: 2, // Wednesday
  4: 1, // Thursday
  5: 7, // Friday
  6: 6, // Saturday
};

// ─── Dur Muhurat ─────────────────────────────────────────────────────────────

// Dur Muhurat muhurat indices per weekday (day is divided into 15 muhurats)
// Each weekday has 1–2 inauspicious muhurats
export const DUR_MUHURAT_INDICES: Record<number, number[]> = {
  0: [11, 15],  // Sunday
  1: [7, 12],   // Monday
  2: [5, 15],   // Tuesday
  3: [6, 11],   // Wednesday
  4: [10, 15],  // Thursday
  5: [4, 13],   // Friday
  6: [3, 14],   // Saturday
};

// ─── Amrit Kaal ──────────────────────────────────────────────────────────────

// Amrit Kaal is determined by the combination of Nakshatra and Weekday.
// The value is the muhurat number (1-based) within the day's 15 muhurats
// where Amrit Kaal falls. null = no Amrit Kaal for that combination.
// This is a 27×7 lookup table (Nakshatra × Weekday).
export const AMRIT_KAAL_TABLE: Record<number, Record<number, number | null>> = {
  // Nakshatra index → { weekday → muhurat_number }
  0:  { 0: 2, 1: 7, 2: 4, 3: 9, 4: 1, 5: 6, 6: 3 },   // Ashwini
  1:  { 0: 3, 1: 8, 2: 5, 3: 10, 4: 2, 5: 7, 6: 4 },   // Bharani
  2:  { 0: 4, 1: 9, 2: 6, 3: 11, 4: 3, 5: 8, 6: 5 },   // Krittika
  3:  { 0: 5, 1: 10, 2: 7, 3: 12, 4: 4, 5: 9, 6: 6 },  // Rohini
  4:  { 0: 6, 1: 11, 2: 8, 3: 13, 4: 5, 5: 10, 6: 7 }, // Mrigashirsha
  5:  { 0: 7, 1: 12, 2: 9, 3: 14, 4: 6, 5: 11, 6: 8 }, // Ardra
  6:  { 0: 8, 1: 13, 2: 10, 3: 15, 4: 7, 5: 12, 6: 9 },// Punarvasu
  7:  { 0: 9, 1: 14, 2: 11, 3: 1, 4: 8, 5: 13, 6: 10 },// Pushya
  8:  { 0: 10, 1: 15, 2: 12, 3: 2, 4: 9, 5: 14, 6: 11 },// Ashlesha
  9:  { 0: 11, 1: 1, 2: 13, 3: 3, 4: 10, 5: 15, 6: 12 },// Magha
  10: { 0: 12, 1: 2, 2: 14, 3: 4, 4: 11, 5: 1, 6: 13 }, // Purva Phalguni
  11: { 0: 13, 1: 3, 2: 15, 3: 5, 4: 12, 5: 2, 6: 14 }, // Uttara Phalguni
  12: { 0: 14, 1: 4, 2: 1, 3: 6, 4: 13, 5: 3, 6: 15 },  // Hasta
  13: { 0: 15, 1: 5, 2: 2, 3: 7, 4: 14, 5: 4, 6: 1 },   // Chitra
  14: { 0: 1, 1: 6, 2: 3, 3: 8, 4: 15, 5: 5, 6: 2 },    // Swati
  15: { 0: 2, 1: 7, 2: 4, 3: 9, 4: 1, 5: 6, 6: 3 },     // Vishakha
  16: { 0: 3, 1: 8, 2: 5, 3: 10, 4: 2, 5: 7, 6: 4 },    // Anuradha
  17: { 0: 4, 1: 9, 2: 6, 3: 11, 4: 3, 5: 8, 6: 5 },    // Jyeshtha
  18: { 0: 5, 1: 10, 2: 7, 3: 12, 4: 4, 5: 9, 6: 6 },   // Mula
  19: { 0: 6, 1: 11, 2: 8, 3: 13, 4: 5, 5: 10, 6: 7 },  // Purva Ashadha
  20: { 0: 7, 1: 12, 2: 9, 3: 14, 4: 6, 5: 11, 6: 8 },  // Uttara Ashadha
  21: { 0: 8, 1: 13, 2: 10, 3: 15, 4: 7, 5: 12, 6: 9 }, // Shravana
  22: { 0: 9, 1: 14, 2: 11, 3: 1, 4: 8, 5: 13, 6: 10 }, // Dhanishta
  23: { 0: 10, 1: 15, 2: 12, 3: 2, 4: 9, 5: 14, 6: 11 },// Shatabhisha
  24: { 0: 11, 1: 1, 2: 13, 3: 3, 4: 10, 5: 15, 6: 12 },// Purva Bhadrapada
  25: { 0: 12, 1: 2, 2: 14, 3: 4, 4: 11, 5: 1, 6: 13 }, // Uttara Bhadrapada
  26: { 0: 13, 1: 3, 2: 15, 3: 5, 4: 12, 5: 2, 6: 14 }, // Revati
};

// ─── Weekday Names ───────────────────────────────────────────────────────────

export const WEEKDAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
] as const;
