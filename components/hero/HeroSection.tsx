"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HERO_CTAS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staticContainer = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};

const staticItem = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? staticContainer : container;
  const childVariants = reducedMotion ? staticItem : item;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      className="pointer-events-auto relative z-10 flex max-w-lg flex-col justify-center"
    >
      <motion.p
        variants={childVariants}
        className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[var(--accent-cyan)]"
      >
        {SITE.eyebrow}
      </motion.p>

      <motion.h1
        variants={childVariants}
        className="whitespace-nowrap text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl"
      >
        {SITE.name}
      </motion.h1>

      <motion.p
        variants={childVariants}
        className="mt-6 max-w-md text-lg leading-relaxed text-white"
      >
        {SITE.tagline}
      </motion.p>

      <motion.div
        variants={childVariants}
        className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
      >
        {HERO_CTAS.map((cta) => (
          <Button key={cta.label} href={cta.href} variant={cta.variant}>
            {cta.label}
          </Button>
        ))}
      </motion.div>
    </motion.div>
  );
}
