// Type definitions + sample data for the North Indian (diamond) Kundli chart.

export type PlanetAbbr =
  | "As"
  | "Su"
  | "Mo"
  | "Ma"
  | "Me"
  | "Ju"
  | "Ve"
  | "Sa"
  | "Ra"
  | "Ke";

export interface Planet {
  /** Stable identity used for Framer Motion layout transitions. */
  id: PlanetAbbr;
  /** Display abbreviation rendered inside the brass orb. */
  abbr: string;
  /** Full name for accessibility. */
  name: string;
  /** House (1-12) the planet occupies in this varga. */
  house: number;
  /** Degree within the sign, for the mono data readout / a11y. */
  degree: number;
}

export type ChartVarga = "D1" | "D9";

/** Centroid of each house in the diamond layout, as % of container. */
export const HOUSE_CENTROIDS: Record<number, { left: number; top: number }> = {
  1: { left: 50, top: 25 },
  2: { left: 75, top: 8.33 },
  3: { left: 91.67, top: 25 },
  4: { left: 75, top: 50 },
  5: { left: 91.67, top: 75 },
  6: { left: 75, top: 91.67 },
  7: { left: 50, top: 75 },
  8: { left: 25, top: 91.67 },
  9: { left: 8.33, top: 75 },
  10: { left: 25, top: 50 },
  11: { left: 8.33, top: 25 },
  12: { left: 25, top: 8.33 },
};

// Sample / demo chart data — not empty, not real.
export const SAMPLE_CHART: Record<ChartVarga, Planet[]> = {
  D1: [
    { id: "As", abbr: "As", name: "Ascendant", house: 1, degree: 12.4 },
    { id: "Su", abbr: "Su", name: "Sun", house: 10, degree: 3.1 },
    { id: "Mo", abbr: "Mo", name: "Moon", house: 4, degree: 27.8 },
    { id: "Ma", abbr: "Ma", name: "Mars", house: 7, degree: 15.2 },
    { id: "Me", abbr: "Me", name: "Mercury", house: 10, degree: 19.6 },
    { id: "Ju", abbr: "Ju", name: "Jupiter", house: 2, degree: 8.9 },
    { id: "Ve", abbr: "Ve", name: "Venus", house: 11, degree: 22.3 },
    { id: "Sa", abbr: "Sa", name: "Saturn", house: 5, degree: 6.7 },
    { id: "Ra", abbr: "Ra", name: "Rahu", house: 3, degree: 18.0 },
    { id: "Ke", abbr: "Ke", name: "Ketu", house: 9, degree: 18.0 },
  ],
  D9: [
    { id: "As", abbr: "As", name: "Ascendant", house: 5, degree: 4.0 },
    { id: "Su", abbr: "Su", name: "Sun", house: 1, degree: 28.0 },
    { id: "Mo", abbr: "Mo", name: "Moon", house: 8, degree: 10.4 },
    { id: "Ma", abbr: "Ma", name: "Mars", house: 11, degree: 7.0 },
    { id: "Me", abbr: "Me", name: "Mercury", house: 3, degree: 26.5 },
    { id: "Ju", abbr: "Ju", name: "Jupiter", house: 6, degree: 19.4 },
    { id: "Ve", abbr: "Ve", name: "Venus", house: 2, degree: 1.9 },
    { id: "Sa", abbr: "Sa", name: "Saturn", house: 9, degree: 14.2 },
    { id: "Ra", abbr: "Ra", name: "Rahu", house: 12, degree: 18.0 },
    { id: "Ke", abbr: "Ke", name: "Ketu", house: 6, degree: 18.0 },
  ],
};

/** Group planets by house so co-located orbs can be offset. */
export function planetsByHouse(planets: Planet[]): Record<number, Planet[]> {
  return planets.reduce<Record<number, Planet[]>>((acc, p) => {
    (acc[p.house] ??= []).push(p);
    return acc;
  }, {});
}
