"use client";

import { useCallback, useLayoutEffect, useRef, type RefObject } from "react";

type UseProjectsScrollOptions = {
  trackRef: RefObject<HTMLElement | null>;
  stickyRef: RefObject<HTMLElement | null>;
  railRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean | null;
};

type UseProjectsScrollResult = {
  maxOffset: number;
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
}: UseProjectsScrollOptions): UseProjectsScrollResult {
  const maxOffsetRef = useRef(0);
  const rafId = useRef<number | null>(null);

  const updateScroll = useCallback(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const rail = railRef.current;
    if (!track || !sticky || !rail) return;

    const stickyHeight = sticky.offsetHeight;
    const maxOffset = Math.max(0, rail.scrollWidth - window.innerWidth);
    const horizontalScrollDistance = maxOffset;
    const trackHeight = stickyHeight + horizontalScrollDistance;

    track.style.height = `${trackHeight}px`;
    maxOffsetRef.current = maxOffset;

    const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const progress = getScrollProgress(track, stickyHeight, stickyTop);
    const translateX = -maxOffset * progress;
    rail.style.transform = `translate3d(${translateX}px, 0, 0)`;
  }, [trackRef, stickyRef, railRef]);

  const scheduleUpdate = useCallback(() => {
    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      updateScroll();
    });
  }, [updateScroll]);

  useLayoutEffect(() => {
    if (reducedMotion) {
      maxOffsetRef.current = 0;
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

    const measureAndUpdate = () => {
      updateScroll();
    };

    let initRaf1 = 0;
    let initRaf2 = 0;
    initRaf1 = requestAnimationFrame(() => {
      initRaf2 = requestAnimationFrame(measureAndUpdate);
    });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(sticky);
    resizeObserver.observe(rail);
    resizeObserver.observe(track);

    document.addEventListener("scroll", scheduleUpdate, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      cancelAnimationFrame(initRaf1);
      cancelAnimationFrame(initRaf2);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      resizeObserver.disconnect();
      document.removeEventListener("scroll", scheduleUpdate, { capture: true });
      window.removeEventListener("resize", scheduleUpdate);
      rail.style.transform = "";
      track.style.height = "";
    };
  }, [trackRef, stickyRef, railRef, reducedMotion, updateScroll, scheduleUpdate]);

  return {
    maxOffset: maxOffsetRef.current,
  };
}
