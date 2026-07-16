"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import {
  formatDateRange,
  getMilestoneAccent,
  type JourneyMilestone,
} from "@/lib/journey";
import { BlackholeNode } from "./BlackholeNode";
import { useMilestoneReveal } from "./useMilestoneReveal";

type JourneyTimelineItemProps = {
  milestone: JourneyMilestone;
  index: number;
  lineHeight: MotionValue<number>;
  centerY: number;
};

function DescriptionCard({ milestone }: { milestone: JourneyMilestone }) {
  const accent = getMilestoneAccent(milestone.type);

  return (
    <div className="max-w-md">
      <h3
        className="text-xl font-semibold md:text-2xl"
        style={{ color: accent }}
      >
        {milestone.title}
      </h3>

      <p className="mt-1 text-base font-medium text-white md:text-lg">
        {milestone.org}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-white md:text-base">
        {milestone.description}
      </p>
    </div>
  );
}

function DateLabel({
  milestone,
  align = "start",
}: {
  milestone: JourneyMilestone;
  align?: "start" | "end" | "center";
}) {
  const dateStr = formatDateRange(milestone);
  const isActive = milestone.isCurrent || milestone.isOngoing;

  const alignClass =
    align === "end"
      ? "items-end text-right"
      : align === "center"
        ? "items-center text-center"
        : "items-start text-left";

  return (
    <div className={`flex flex-col justify-center ${alignClass}`}>
      <time
        dateTime={dateStr}
        className="text-xs font-medium uppercase tracking-[0.2em] text-white md:text-sm"
      >
        {dateStr}
      </time>
      {isActive && (
        <span className="mt-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" />
          {milestone.isCurrent ? "Current" : "Ongoing"}
        </span>
      )}
    </div>
  );
}

export const JourneyTimelineItem = forwardRef<
  HTMLLIElement,
  JourneyTimelineItemProps
>(function JourneyTimelineItem(
  { milestone, index, lineHeight, centerY },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const { opacity, y, nodeScale } = useMilestoneReveal({
    lineHeight,
    centerY,
    reducedMotion,
  });

  const isLeft = index % 2 === 0;
  const accent = getMilestoneAccent(milestone.type);

  const nodeWrapper = (
    <motion.div style={{ scale: nodeScale, opacity }}>
      <BlackholeNode id={milestone.id} accent={accent} />
    </motion.div>
  );

  const mobileNodeWrapper = (
    <motion.div style={{ scale: nodeScale, opacity }}>
      <BlackholeNode
        id={milestone.id}
        accent={accent}
        className="h-12 w-12"
      />
    </motion.div>
  );

  return (
    <li ref={ref} className="relative list-none">
      {/* Desktop alternating layout */}
      <motion.div
        className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 md:py-14"
        style={{ opacity, y }}
      >
        {isLeft ? (
          <>
            <div className="flex justify-end pr-6">
              <DescriptionCard milestone={milestone} />
            </div>
            {nodeWrapper}
            <div className="flex justify-start pl-6">
              <DateLabel milestone={milestone} align="start" />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-end pr-6">
              <DateLabel milestone={milestone} align="end" />
            </div>
            {nodeWrapper}
            <div className="flex justify-start pl-6">
              <DescriptionCard milestone={milestone} />
            </div>
          </>
        )}
      </motion.div>

      {/* Mobile: spine left, content right */}
      <motion.div
        className="flex items-start gap-5 py-10 pl-0 md:hidden"
        style={{ opacity, y }}
      >
        <div className="relative z-10 shrink-0">{mobileNodeWrapper}</div>
        <div className="min-w-0 flex-1 pt-1">
          <DateLabel milestone={milestone} align="start" />
          <div className="mt-4">
            <DescriptionCard milestone={milestone} />
          </div>
        </div>
      </motion.div>
    </li>
  );
});
