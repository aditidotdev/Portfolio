"use client";

import { useCallback } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function useScrollToSection() {
  const reducedMotion = usePrefersReducedMotion();

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;

      element.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });

      history.replaceState(null, "", `#${id}`);
    },
    [reducedMotion]
  );

  return scrollToSection;
}
