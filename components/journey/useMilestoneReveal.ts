"use client";

import { useLayoutEffect, useRef } from "react";
import {
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { computeReveal } from "./useViewportTimelineScroll";

type MilestoneRevealValues = {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  nodeScale: MotionValue<number>;
};

type UseMilestoneRevealOptions = {
  lineHeight: MotionValue<number>;
  centerY: number;
  reducedMotion: boolean | null;
};

export function useMilestoneReveal({
  lineHeight,
  centerY,
  reducedMotion,
}: UseMilestoneRevealOptions): MilestoneRevealValues {
  const staticOpacity = useMotionValue(1);
  const staticY = useMotionValue(0);
  const staticScale = useMotionValue(1);

  const centerYRef = useRef(centerY);
  useLayoutEffect(() => {
    centerYRef.current = centerY;
  }, [centerY]);

  const reveal = useTransform(lineHeight, (height) =>
    computeReveal(height, centerYRef.current),
  );
  const opacity = reveal;
  const y = useTransform(reveal, (value) => (1 - value) * 24);
  const nodeScale = useTransform(reveal, (value) => 0.6 + value * 0.4);

  if (reducedMotion) {
    return {
      opacity: staticOpacity,
      y: staticY,
      nodeScale: staticScale,
    };
  }

  return { opacity, y, nodeScale };
}
