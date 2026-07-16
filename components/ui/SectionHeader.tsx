"use client";

import { motion, useReducedMotion } from "framer-motion";

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staticHeaderVariants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

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
  const variants = reducedMotion ? staticHeaderVariants : headerVariants;

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
