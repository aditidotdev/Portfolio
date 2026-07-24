"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { BLOG, NAV_ITEMS, RESUME, SITE } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Button } from "@/components/ui/Button";

function getSectionId(href: string) {
  return href.replace("#", "");
}

type NavLinkProps = {
  label: string;
  href: string;
  isActive: boolean;
  onNavigate: (id: string) => void;
  className?: string;
};

function NavLink({ label, href, isActive, onNavigate, className = "" }: NavLinkProps) {
  const sectionId = getSectionId(href);

  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(sectionId);
      }}
      className={`text-sm tracking-wide transition-colors ${
        isActive
          ? "text-[var(--accent-cyan)] border-b border-[var(--accent-cyan)] pb-0.5"
          : "text-white/70 hover:text-[var(--accent-cyan)]"
      } ${className}`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </a>
  );
}

function BlogButton({ className = "" }: { className?: string }) {
  const buttonClassName = `!rounded-lg !border-white/30 !px-4 !py-2 text-xs md:text-sm whitespace-nowrap ${className}`;

  if (BLOG.href) {
    return (
      <Button href={BLOG.href} variant="secondary" className={buttonClassName}>
        {BLOG.label}
      </Button>
    );
  }

  return (
    <span
      aria-disabled="true"
      className={`inline-flex items-center justify-center rounded-lg border border-white/30 px-4 py-2 text-xs font-medium tracking-wide text-white md:text-sm ${className}`}
    >
      {BLOG.label}
    </span>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    const handleScroll = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setScrolled(y > 40);
    };
    handleScroll();
    document.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    return () =>
      document.removeEventListener("scroll", handleScroll, { capture: true });
  }, []);

  const handleNavigate = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className="pointer-events-auto fixed inset-x-0 top-4 z-50 px-4 md:top-6 md:px-8">
      <div
        className="relative mx-auto w-full transition-[max-width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ maxWidth: scrolled ? "46rem" : "72rem" }}
      >
        <nav
          className="flex h-14 items-center justify-between gap-4 rounded-full border border-white/10 bg-black/60 px-4 shadow-lg backdrop-blur-md md:h-16 md:px-6"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleNavigate("home");
            }}
            className="shrink-0 text-sm font-semibold tracking-tight text-white transition-colors hover:text-[var(--accent-cyan)] md:text-base"
          >
            {SITE.name}
          </a>

          <ul className="hidden flex-1 items-center justify-center gap-5 md:flex md:gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink
                  label={item.label}
                  href={item.href}
                  isActive={activeSection === getSectionId(item.href)}
                  onNavigate={handleNavigate}
                />
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <BlogButton />
            </div>

            <Button
              href={RESUME.href}
              variant="primary"
              className="!px-4 !py-2 text-xs md:!px-5 md:text-sm"
            >
              {RESUME.label}
            </Button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-lg backdrop-blur-md md:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 py-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      label={item.label}
                      href={item.href}
                      isActive={activeSection === getSectionId(item.href)}
                      onNavigate={handleNavigate}
                      className="block rounded-lg px-2 py-3"
                    />
                  </li>
                ))}
                <li className="mt-2 border-t border-white/10 pt-3">
                  <BlogButton className="w-full" />
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
