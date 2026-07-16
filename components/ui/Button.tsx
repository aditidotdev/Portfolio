"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type ButtonProps = {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
};

export function Button({ href, variant, children, className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-medium tracking-wide transition-colors";

  const variants = {
    primary:
      "bg-[var(--accent-cyan)] text-black hover:bg-[var(--accent-cyan-bright)]",
    secondary:
      "border border-white/30 text-white hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] bg-transparent",
  };

  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
