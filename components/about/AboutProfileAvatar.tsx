"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function AboutProfileAvatar() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative h-60 w-60 md:h-72 md:w-72">
      <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-cyan)]">
        <div className="h-full w-full rounded-full bg-[var(--space-bg)]" />
      </div>

      <motion.div
        className="absolute inset-[6px] overflow-hidden rounded-full"
        initial={{ y: 0 }}
        animate={reducedMotion ? { y: 0 } : { y: [0, 0, -12, 0] }}
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.12, 0.55, 1],
              }
        }
      >
        <div className="relative h-full w-full">
          <div
            className="absolute inset-0 opacity-20 blur-[1px]"
            aria-hidden
          >
            <Image
              src="/images/profile.png"
              alt=""
              fill
              className="rounded-full object-contain"
              sizes="(max-width: 768px) 240px, 288px"
            />
          </div>

          <div className="absolute inset-0">
            <Image
              src="/images/profile.png"
              alt="Profile photo"
              fill
              className="rounded-full object-contain"
              sizes="(max-width: 768px) 240px, 288px"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
