"use client";

import { useCallback, useLayoutEffect, useRef, type RefObject } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

const VIEWPORT_ANCHOR = 0.85;
const REVEAL_LEAD = 48;
const REVEAL_RANGE = 64;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function computeLineHeight(container: HTMLElement): number {
  const rect = container.getBoundingClientRect();
  const anchorY = window.innerHeight * VIEWPORT_ANCHOR;
  return clamp(anchorY - rect.top, 0, rect.height);
}

export function computeReveal(lineHeight: number, centerY: number): number {
  return clamp((lineHeight - (centerY - REVEAL_LEAD)) / REVEAL_RANGE, 0, 1);
}

type UseViewportTimelineScrollOptions = {
  containerRef: RefObject<HTMLDivElement | null>;
  itemRefs: RefObject<(HTMLLIElement | null)[]>;
  itemCount: number;
  reducedMotion: boolean | null;
  onCentersMeasured?: (centers: number[]) => void;
};

type ViewportTimelineScrollResult = {
  lineHeight: MotionValue<number>;
  remeasure: () => void;
};

export function useViewportTimelineScroll({
  containerRef,
  itemRefs,
  itemCount,
  reducedMotion,
  onCentersMeasured,
}: UseViewportTimelineScrollOptions): ViewportTimelineScrollResult {
  const lineHeight = useMotionValue(0);
  const containerHeightRef = useRef(0);
  const rafId = useRef<number | null>(null);
  const onCentersMeasuredRef = useRef(onCentersMeasured);
  onCentersMeasuredRef.current = onCentersMeasured;

  const measureCenters = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    containerHeightRef.current = container.offsetHeight;

    const centers = Array.from({ length: itemCount }, (_, i) => {
      const item = itemRefs.current[i];
      if (!item) return 0;

      const itemRect = item.getBoundingClientRect();
      return itemRect.top - containerRect.top + itemRect.height / 2;
    });

    onCentersMeasuredRef.current?.(centers);
  }, [containerRef, itemRefs, itemCount]);

  const updateScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (reducedMotion) {
      lineHeight.set(containerHeightRef.current || container.offsetHeight);
      return;
    }

    lineHeight.set(computeLineHeight(container));
  }, [containerRef, lineHeight, reducedMotion]);

  const scheduleUpdate = useCallback(() => {
    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      updateScroll();
    });
  }, [updateScroll]);

  const handleResize = useCallback(() => {
    measureCenters();
    scheduleUpdate();
  }, [measureCenters, scheduleUpdate]);

  const remeasure = useCallback(() => {
    measureCenters();
    updateScroll();
  }, [measureCenters, updateScroll]);

  useLayoutEffect(() => {
    remeasure();

    const observer = new ResizeObserver(handleResize);
    const container = containerRef.current;
    if (container) observer.observe(container);

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    document.addEventListener("scroll", scheduleUpdate, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("scroll", scheduleUpdate, { capture: true });
      window.removeEventListener("resize", handleResize);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [
    containerRef,
    itemRefs,
    handleResize,
    measureCenters,
    scheduleUpdate,
    updateScroll,
    remeasure,
  ]);

  return { lineHeight, remeasure };
}
