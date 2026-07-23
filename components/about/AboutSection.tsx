"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ABOUT } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AboutProfileAvatar } from "./AboutProfileAvatar";
import {
  fadeUpItem,
  fadeUpItemCompact,
  REVEAL_EASE,
  staggerContainer,
  staticFadeUpItem,
  staticFadeUpItemCompact,
  staticStaggerContainer,
} from "@/lib/motionVariants";

const textBlockVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: REVEAL_EASE,
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

export function AboutSection() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? staticStaggerContainer : staggerContainer(0.12, 0.1);
  const childVariants = reducedMotion ? staticFadeUpItem : fadeUpItem;
  const paragraphVariants = reducedMotion ? staticFadeUpItemCompact : fadeUpItemCompact;
  const nestedTextVariants = reducedMotion ? staticStaggerContainer : textBlockVariants;

  return (
    <section id="about" className="content-section relative">
      <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-16 lg:px-24">
        <SectionHeader
          heading={ABOUT.heading}
          headingAccent={ABOUT.headingAccent}
        />

        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center gap-16 md:flex-row md:items-center md:gap-24 lg:gap-32"
        >
          <motion.div
            variants={childVariants}
            className="flex shrink-0 items-center justify-center md:w-[38%] md:pr-4"
          >
            <AboutProfileAvatar />
          </motion.div>

          <motion.div
            variants={nestedTextVariants}
            className="md:w-[62%] md:pl-4"
          >
            <div className="space-y-4">
              {ABOUT.paragraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={paragraphVariants}
                  className="text-base leading-relaxed text-white md:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
