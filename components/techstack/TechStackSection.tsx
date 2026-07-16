"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TECH_STACK, splitIntoRows } from "@/lib/techStack";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechStackCard } from "./TechStackCard";

const gridVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.15,
    },
  },
};

const staticGridVariants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export function TechStackSection() {
  const reducedMotion = useReducedMotion();
  const gridMotionVariants = reducedMotion ? staticGridVariants : gridVariants;
  const rows = splitIntoRows(TECH_STACK.items, TECH_STACK.rowSizes);

  return (
    <section id="techstack" className="content-section relative">
      <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-16 lg:px-24">
        <SectionHeader
          heading={TECH_STACK.heading}
          headingAccent={TECH_STACK.headingAccent}
        />

        <motion.div
          variants={gridMotionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Mobile: simple 3-column grid */}
          <div className="grid grid-cols-3 place-items-center gap-3 md:hidden">
            {TECH_STACK.items.map((item) => (
              <TechStackCard key={item.id} item={item} />
            ))}
          </div>

          {/* Desktop: tapered centered rows */}
          <div className="hidden flex-col items-center gap-3 md:flex md:gap-5">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap justify-center gap-3 md:gap-5"
              >
                {row.map((item) => (
                  <TechStackCard key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
