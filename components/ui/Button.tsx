"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type ButtonProps = {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
};

export function Button({ href, variant, children, className = "" }: ButtonProps) {
  const scrollToSection = useScrollToSection();
  const { isCopied, copy } = useCopyToClipboard();
  const isSectionAnchor = href.startsWith("#") && href.length > 1;
  const isMailto = href.startsWith("mailto:");
  const mailtoAddress = isMailto ? href.slice("mailto:".length).split("?")[0] : "";
  const isExternal = href.startsWith("http");

  const base =
    "inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-medium tracking-wide transition-colors";

  const variants = {
    primary:
      "bg-[var(--accent-cyan)] text-black hover:bg-[var(--accent-cyan-bright)]",
    secondary:
      "border border-white/30 text-white hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] bg-transparent",
  };

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> | undefined =
    isSectionAnchor
      ? (event) => {
          event.preventDefault();
          scrollToSection(href.slice(1));
        }
      : isMailto
        ? () => {
            copy(mailtoAddress);
          }
        : undefined;

  const link = (
    <Link
      href={href}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );

  if (!isMailto) {
    return (
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
        {link}
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      {link}
      <AnimatePresence>
        {isCopied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            role="status"
            aria-live="polite"
            className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-3 py-1 text-xs text-white shadow-lg"
          >
            Copied to clipboard
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
