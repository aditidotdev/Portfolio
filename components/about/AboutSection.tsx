"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ABOUT } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AboutProfileAvatar } from "./AboutProfileAvatar";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

export function AboutSection() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? staticContainer : container;
  const childVariants = reducedMotion ? staticItem : item;

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

          <motion.div variants={childVariants} className="md:w-[62%] md:pl-4">
            <div className="space-y-4">
              {ABOUT.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-white md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
