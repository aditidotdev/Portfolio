"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HERO_CTAS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import {
  fadeUpItem,
  staggerContainer,
  staticFadeUpItem,
  staticStaggerContainer,
} from "@/lib/motionVariants";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? staticStaggerContainer : staggerContainer(0.15, 0.2);
  const childVariants = reducedMotion ? staticFadeUpItem : fadeUpItem;

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
        className="mt-6 max-w-md whitespace-pre-line text-lg leading-relaxed text-white"
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
