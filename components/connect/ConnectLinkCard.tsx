"use client";

import { motion, type Variants } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import type { ContactLink } from "@/lib/contact";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type ConnectLinkCardProps = {
  link: ContactLink;
  variants: Variants;
};

const ICONS = {
  email: HiOutlineMail,
  linkedin: FaLinkedinIn,
  github: SiGithub,
} as const;

export function ConnectLinkCard({ link, variants }: ConnectLinkCardProps) {
  const Icon = ICONS[link.icon];
  const isExternal = link.href.startsWith("http");
  const isEmail = link.icon === "email";
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <motion.a
      href={link.href}
      variants={variants}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      onClick={
        isEmail
          ? () => {
              copy(link.value);
            }
          : undefined
      }
      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: link.accent }}
      >
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-white/50">{link.label}</p>
        <p className="truncate text-sm text-white group-hover:text-[var(--accent-cyan)]">
          {isEmail && isCopied ? "Copied to clipboard!" : link.value}
        </p>
      </div>

      {isEmail && isCopied && (
        <span className="sr-only" role="status" aria-live="polite">
          Copied to clipboard
        </span>
      )}
    </motion.a>
  );
}
