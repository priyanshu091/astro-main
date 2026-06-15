"use client";

import { motion } from "framer-motion";
import { HOUSE_CENTROIDS, planetsByHouse, type Planet } from "./chartData";

const ORB = 32; // px

/**
 * Planets are HTML elements overlaid on the SVG (NOT svg <text>) so they stay
 * pixel-perfect at any chart size. Centering is done with negative margins so
 * Framer's `layout` is free to own the `transform` — switching vargas
 * (D1 <-> D9) then springs each orb to its new house with physical weight.
 */
export default function PlanetOverlay({
  planets,
  reducedMotion,
}: {
  planets: Planet[];
  reducedMotion: boolean;
}) {
  const grouped = planetsByHouse(planets);

  return (
    <div className="pointer-events-none absolute inset-0">
      {planets.map((planet) => {
        const centroid = HOUSE_CENTROIDS[planet.house];
        const housemates = grouped[planet.house];
        const index = housemates.indexOf(planet);
        const count = housemates.length;

        // Fan multiple orbs in one house horizontally around the centroid.
        const step = ORB * 0.62;
        const offsetX = index * step - ((count - 1) * step) / 2;

        return (
          <motion.div
            key={planet.id}
            layout={!reducedMotion}
            layoutId={`planet-${planet.id}`}
            title={`${planet.name} — house ${planet.house}, ${planet.degree.toFixed(1)}°`}
            className="brass-orb absolute flex items-center justify-center rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,248,231,0.55)]"
            style={{
              width: ORB,
              height: ORB,
              left: `${centroid.left}%`,
              top: `${centroid.top}%`,
              marginLeft: -ORB / 2 + offsetX,
              marginTop: -ORB / 2,
            }}
            initial={
              reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.5, delay: 2.0 },
                    scale: {
                      type: "spring",
                      stiffness: 200,
                      damping: 22,
                      delay: 2.0,
                    },
                    layout: { type: "spring", stiffness: 200, damping: 20 },
                  }
            }
          >
            <span
              className="select-none font-sans font-semibold text-text-on-gold"
              style={{ fontSize: 11, lineHeight: 1 }}
            >
              {planet.abbr}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
