import { CONTACT } from "@/lib/contact";

export function SiteFooter() {
  const { footer } = CONTACT;

  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-white/[0.04] py-8 text-center md:py-10">
      <p className="text-sm text-white/50">{footer.credit}</p>

      <a
        href={footer.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm text-white/50 transition-colors hover:text-[var(--accent-cyan)]"
      >
        {footer.githubLabel} →
      </a>
    </footer>
  );
}
