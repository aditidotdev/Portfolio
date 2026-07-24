"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TECH_STACK, splitIntoRows } from "@/lib/techStack";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechStackCard } from "./TechStackCard";
import {
  fadeUpItemCompact,
  staggerContainer,
  staticFadeUpItemCompact,
  staticStaggerContainer,
} from "@/lib/motionVariants";

const TECH_STAGGER_BUDGET = 0.6;
const TECH_STAGGER_STEP = Math.min(
  0.035,
  TECH_STAGGER_BUDGET / TECH_STACK.items.length,
);

export function TechStackSection() {
  const reducedMotion = useReducedMotion();
  const gridMotionVariants = reducedMotion
    ? staticStaggerContainer
    : staggerContainer(TECH_STAGGER_STEP, 0.1);
  const cardVariants = reducedMotion ? staticFadeUpItemCompact : fadeUpItemCompact;
  const rows = splitIntoRows(TECH_STACK.items, TECH_STACK.rowSizes);

  return (
    <section
      id="techstack"
      className="content-section relative !scroll-mt-4 !pt-14 md:!scroll-mt-8 md:!pt-16"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-16 lg:px-24">
        <SectionHeader
          heading={TECH_STACK.heading}
          headingAccent={TECH_STACK.headingAccent}
        />

        <motion.div
          variants={gridMotionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-60px" }}
        >
          {/* Mobile: simple 3-column grid */}
          <div className="grid grid-cols-3 place-items-center gap-3 md:hidden">
            {TECH_STACK.items.map((item) => (
              <TechStackCard key={item.id} item={item} variants={cardVariants} />
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
                  <TechStackCard key={item.id} item={item} variants={cardVariants} />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
