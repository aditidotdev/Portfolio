"use client";

import { motion, useReducedMotion } from "framer-motion";
import { JOURNEY } from "@/lib/journey";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JourneyTimeline } from "./JourneyTimeline";

export function JourneySection() {
  return (
    <section id="journey" className="content-section relative">
      <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-16 lg:px-24">
        <SectionHeader
          heading={JOURNEY.heading}
          headingAccent={JOURNEY.headingAccent}
        />

        <JourneyTimeline />
      </div>
    </section>
  );
}
