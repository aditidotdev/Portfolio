import type { Variants } from "framer-motion";

export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: REVEAL_EASE } },
};
export const staticFadeUpItem: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export const fadeUpItemCompact: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: REVEAL_EASE } },
};
export const staticFadeUpItemCompact: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export function staggerContainer(
  staggerChildren = 0.12,
  delayChildren = 0.1,
): Variants {
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren, delayChildren } },
  };
}
export const staticStaggerContainer: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};
