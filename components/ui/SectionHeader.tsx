"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpItem, staticFadeUpItem } from "@/lib/motionVariants";

type SectionHeaderProps = {
  heading: string;
  headingAccent: string;
  className?: string;
};

export function SectionHeader({
  heading,
  headingAccent,
  className = "mb-12 text-center md:mb-16",
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? staticFadeUpItem : fadeUpItem;

  return (
    <motion.header
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
        {heading}{" "}
        <span className="text-[var(--accent-cyan)]">{headingAccent}</span>
      </h2>
    </motion.header>
  );
}
