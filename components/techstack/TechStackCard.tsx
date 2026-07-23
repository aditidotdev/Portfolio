"use client";

import { motion, type Variants } from "framer-motion";
import type { TechStackItem } from "@/lib/techStack";

type TechStackCardProps = {
  item: TechStackItem;
  variants: Variants;
};

export function TechStackCard({ item, variants }: TechStackCardProps) {
  const Icon = item.icon;

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Learn more about ${item.name}`}
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group block rounded-xl border border-[var(--accent-cyan)]"
    >
      <div className="flex aspect-square w-[72px] flex-col items-center justify-center gap-1.5 rounded-[11px] bg-[var(--space-bg)] p-2 backdrop-blur-md transition-colors hover:bg-white/10 md:w-20 md:gap-2 md:p-3">
        <Icon
          aria-hidden="true"
          className="h-7 w-7 shrink-0 text-white/90 transition-colors group-hover:text-white md:h-8 md:w-8"
        />
        <span className="line-clamp-2 text-center text-[10px] leading-tight text-white/60 transition-colors group-hover:text-white/80 md:text-xs">
          {item.name}
        </span>
      </div>
    </motion.a>
  );
}
