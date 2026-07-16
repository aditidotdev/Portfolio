import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";

type GitHubMoreCardProps = {
  index: number;
  compact?: boolean;
};

export function GitHubMoreCard({ compact = false }: GitHubMoreCardProps) {
  return (
    <article
      className={
        compact
          ? "flex w-full flex-col items-center justify-center text-center"
          : "flex min-w-[100vw] shrink-0 self-stretch flex-col items-center justify-center border-r border-white/10 px-8 py-6 text-center md:min-w-[50vw] md:px-12 md:py-10 lg:min-w-[45vw] lg:px-16"
      }
    >
      <div className="flex max-w-md flex-col items-center gap-6 md:gap-8">
        <h3 className="text-2xl font-semibold text-white md:text-3xl">
          {PROJECTS.moreCard.heading}
        </h3>

        <p className="text-sm leading-relaxed text-white/50 md:text-base">
          {PROJECTS.moreCard.subtext}
        </p>

        <motion.a
          href={PROJECTS.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent-cyan)] px-8 py-3 text-sm font-medium tracking-wide text-black transition-colors hover:bg-[var(--accent-cyan-bright)]"
        >
          {PROJECTS.moreCard.ctaLabel}
        </motion.a>
      </div>
    </article>
  );
}
