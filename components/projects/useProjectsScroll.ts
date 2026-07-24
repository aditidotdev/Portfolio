"use client";

import { useCallback, useLayoutEffect, useRef, type RefObject } from "react";

type UseProjectsScrollOptions = {
  trackRef: RefObject<HTMLElement | null>;
  stickyRef: RefObject<HTMLElement | null>;
  railRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean | null;
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function getScrollProgress(
  track: HTMLElement,
  stickyHeight: number,
  offset: number,
): number {
  const scrollableDistance = Math.max(0, track.offsetHeight - stickyHeight);
  if (scrollableDistance <= 0) return 0;

  const trackTop = track.getBoundingClientRect().top;
  const scrolledPastStart = Math.max(0, offset - trackTop);

  return clamp(scrolledPastStart / scrollableDistance, 0, 1);
}

export function useProjectsScroll({
  trackRef,
  stickyRef,
  railRef,
  reducedMotion,
}: UseProjectsScrollOptions): void {
  const maxOffsetRef = useRef(0);
  const stickyHeightRef = useRef(0);
  const stickyTopRef = useRef(0);
  const rafId = useRef<number | null>(null);
  const measureRafId = useRef<number | null>(null);

  // Runs on every scroll-driven frame. Only reads track.getBoundingClientRect()
  // (via getScrollProgress) and writes rail.style.transform — no layout-dirtying
  // write happens beforehand, so this read stays cheap and never forces a
  // synchronous reflow. This is what keeps scroll frames light on mobile.
  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    const rail = railRef.current;
    if (!track || !rail) return;

    const progress = getScrollProgress(
      track,
      stickyHeightRef.current,
      stickyTopRef.current,
    );
    const translateX = -maxOffsetRef.current * progress;
    rail.style.transform = `translate3d(${translateX}px, 0, 0)`;
  }, [trackRef, railRef]);

  // Runs only on mount/resize/content-size change. Does the expensive
  // read-write-read work (including the track.style.height write) and caches
  // the results so applyTransform never needs to touch them on scroll.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const rail = railRef.current;
    if (!track || !sticky || !rail) return;

    const stickyHeight = sticky.offsetHeight;
    const maxOffset = Math.max(0, rail.scrollWidth - window.innerWidth);
    const trackHeight = stickyHeight + maxOffset;

    track.style.height = `${trackHeight}px`;

    const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;

    stickyHeightRef.current = stickyHeight;
    maxOffsetRef.current = maxOffset;
    stickyTopRef.current = stickyTop;

    applyTransform();
  }, [trackRef, stickyRef, railRef, applyTransform]);

  const scheduleApply = useCallback(() => {
    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      applyTransform();
    });
  }, [applyTransform]);

  const scheduleMeasure = useCallback(() => {
    if (measureRafId.current !== null) return;

    measureRafId.current = requestAnimationFrame(() => {
      measureRafId.current = null;
      measure();
    });
  }, [measure]);

  useLayoutEffect(() => {
    if (reducedMotion) {
      maxOffsetRef.current = 0;
      stickyHeightRef.current = 0;
      stickyTopRef.current = 0;
      if (railRef.current) {
        railRef.current.style.transform = "";
      }
      if (trackRef.current) {
        trackRef.current.style.height = "";
      }
      return;
    }

    const track = trackRef.current;
    const sticky = stickyRef.current;
    const rail = railRef.current;
    if (!track || !sticky || !rail) return;

    let initRaf1 = 0;
    let initRaf2 = 0;
    initRaf1 = requestAnimationFrame(() => {
      initRaf2 = requestAnimationFrame(measure);
    });

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(sticky);
    resizeObserver.observe(rail);
    resizeObserver.observe(track);

    document.addEventListener("scroll", scheduleApply, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", scheduleMeasure, { passive: true });

    return () => {
      cancelAnimationFrame(initRaf1);
      cancelAnimationFrame(initRaf2);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      if (measureRafId.current !== null) {
        cancelAnimationFrame(measureRafId.current);
      }
      resizeObserver.disconnect();
      document.removeEventListener("scroll", scheduleApply, { capture: true });
      window.removeEventListener("resize", scheduleMeasure);
      rail.style.transform = "";
      track.style.height = "";
    };
  }, [trackRef, stickyRef, railRef, reducedMotion, measure, scheduleMeasure, scheduleApply]);
}
