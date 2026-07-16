"use client";

import { useEffect, useRef, useState } from "react";
import { useHasCoarsePointer, useIsMobile } from "@/hooks/useMediaQuery";

const RING_LERP = 0.14;

export function CustomCursor() {
  const isMobile = useIsMobile();
  const isCoarsePointer = useHasCoarsePointer();
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const hasInitializedRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const enabled = !isMobile && !isCoarsePointer;

  useEffect(() => {
    if (!enabled) return;

    hasInitializedRef.current = false;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const animate = () => {
      const { x: tx, y: ty } = targetRef.current;
      const ring = ringPosRef.current;

      ring.x += (tx - ring.x) * RING_LERP;
      ring.y += (ty - ring.y) * RING_LERP;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };

      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true;
        ringPosRef.current = { x: event.clientX, y: event.clientY };
        setIsVisible(true);
      }
    };

    frameRef.current = window.requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <span
        ref={ringRef}
        className={`custom-cursor__ring${isVisible ? " custom-cursor__ring--visible" : ""}`}
        aria-hidden="true"
      />
      <span
        ref={dotRef}
        className={`custom-cursor__dot${isVisible ? " custom-cursor__dot--visible" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}
