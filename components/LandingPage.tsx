"use client";

import dynamic from "next/dynamic";
import { AboutSection } from "@/components/about/AboutSection";
import { JourneySection } from "@/components/journey/JourneySection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ConnectSection } from "@/components/connect/ConnectSection";
import { SiteFooter } from "@/components/connect/SiteFooter";
import { TechStackSection } from "@/components/techstack/TechStackSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { Navbar } from "@/components/nav/Navbar";

const SceneCanvas = dynamic(
  () => import("@/components/scene/SceneCanvas"),
  { ssr: false }
);

const HyperdriveBackground = dynamic(
  () => import("@/components/ui/hyperdrive-hero"),
  { ssr: false }
);

export function LandingPage() {
  return (
    <div className="bg-black">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 z-0">
        <HyperdriveBackground />
      </div>

      {/* 1. Intro (globe) */}
      <section
        id="home"
        className="relative min-h-dvh scroll-mt-4 overflow-hidden md:scroll-mt-8"
      >
        <div className="pointer-events-none absolute inset-x-0 top-12 z-0 h-[38dvh] overflow-hidden sm:h-[42dvh] lg:inset-0 lg:h-auto">
          <SceneCanvas />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />

        <main className="relative z-10 flex min-h-dvh w-full items-end justify-center px-8 pb-8 pt-[42dvh] sm:pt-[46dvh] md:px-16 lg:items-center lg:p-0">
          <div className="mx-auto grid w-full max-w-6xl items-center lg:min-h-dvh lg:grid-cols-2 lg:gap-20 lg:px-24">
            <div className="rounded-2xl bg-black/25 p-6 backdrop-blur-sm lg:p-8">
              <HeroSection />
            </div>
            <div className="hidden min-h-[400px] lg:block" aria-hidden="true" />
          </div>
        </main>
      </section>

      {/* 2. About Me */}
      <AboutSection />
      {/* 3. My Journey */}
      <JourneySection />
      {/* 4. Things I've Built */}
      <ProjectsSection />
      {/* 5. Tech Stack */}
      <TechStackSection />
      {/* 6. Let's Build Something Great */}
      <ConnectSection />
      <SiteFooter />
    </div>
  );
}
