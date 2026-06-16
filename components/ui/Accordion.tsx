"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconChevronDown } from "@/components/ui/Icon";

export type AccordionItem = { q: string; a: string };

/** Single-open accordion. Entire row is the toggle; chevron rotates 180°. */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion() ?? false;
  const baseId = useId();

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <div
            key={item.q}
            className="border-b border-[rgba(184,146,40,0.06)] first:border-t"
          >
            <h3>
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-sp-4 py-sp-5 text-left"
              >
                <span className="font-sans text-base font-medium text-text-primary">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.3, ease: "easeInOut" }}
                  className="shrink-0 text-gold-400"
                >
                  <IconChevronDown size={20} />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-sp-5 pr-sp-8 font-sans text-[15px] leading-[1.7] text-text-secondary">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
