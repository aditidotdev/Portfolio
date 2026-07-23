"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { JOURNEY } from "@/lib/journey";
import { JourneyTimelineItem } from "./JourneyTimelineItem";
import { useViewportTimelineScroll } from "./useViewportTimelineScroll";

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [itemCenterYs, setItemCenterYs] = useState<number[]>([]);
  const reducedMotion = useReducedMotion();
  const milestoneCount = JOURNEY.milestones.length;

  const handleCentersMeasured = useCallback((centers: number[]) => {
    setItemCenterYs(centers);
  }, []);

  const { lineHeight, remeasure } = useViewportTimelineScroll({
    containerRef,
    itemRefs,
    itemCount: milestoneCount,
    reducedMotion,
    onCentersMeasured: handleCentersMeasured,
  });

  const itemRefCallbacks = useMemo(
    () =>
      Array.from({ length: milestoneCount }, (_, index) => (el: HTMLLIElement | null) => {
        itemRefs.current[index] = el;
        if (el) requestAnimationFrame(remeasure);
      }),
    [milestoneCount, remeasure],
  );

  return (
    <div ref={containerRef} className="relative mx-auto max-w-5xl">
      {/* Desktop center spine — background track */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/10 md:block"
        aria-hidden="true"
      />
      {/* Desktop center spine — scroll progress */}
      <motion.div
        className="journey-timeline-line pointer-events-none absolute top-0 left-1/2 hidden w-px -translate-x-1/2 md:block"
        style={{ height: lineHeight }}
        aria-hidden="true"
      />

      {/* Mobile left spine — background track */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-[27px] w-px bg-white/10 md:hidden"
        aria-hidden="true"
      />
      {/* Mobile left spine — scroll progress */}
      <motion.div
        className="journey-timeline-line pointer-events-none absolute top-0 left-[27px] w-px md:hidden"
        style={{ height: lineHeight }}
        aria-hidden="true"
      />

      <ol className="relative list-none">
        {JOURNEY.milestones.map((milestone, index) => (
          <JourneyTimelineItem
            key={milestone.id}
            ref={itemRefCallbacks[index]}
            milestone={milestone}
            index={index}
            lineHeight={lineHeight}
            centerY={itemCenterYs[index] ?? 0}
          />
        ))}
      </ol>
    </div>
  );
}
