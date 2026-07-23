"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RESET_DELAY_MS = 2000;

export function useCopyToClipboard(resetDelay: number = RESET_DELAY_MS) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(
    (text: string) => {
      if (
        typeof navigator === "undefined" ||
        !navigator.clipboard ||
        typeof navigator.clipboard.writeText !== "function"
      ) {
        return;
      }

      try {
        navigator.clipboard.writeText(text).then(
          () => {
            setIsCopied(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setIsCopied(false), resetDelay);
          },
          () => {
            // Write rejected (permissions/insecure context) — no-op, mailto is the fallback.
          }
        );
      } catch {
        // Some environments throw synchronously instead of rejecting.
      }
    },
    [resetDelay]
  );

  return { isCopied, copy } as const;
}
