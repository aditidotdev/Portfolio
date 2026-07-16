"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GitHubMoreCard } from "./GitHubMoreCard";
import { ProjectCard } from "./ProjectCard";
import { useProjectsScroll } from "./useProjectsScroll";

function ProjectsHeader() {
  return (
    <SectionHeader
      heading={PROJECTS.heading}
      headingAccent={PROJECTS.headingAccent}
      className="mx-auto mb-16 max-w-6xl px-8 text-center md:mb-20 md:px-16 lg:px-24"
    />
  );
}

function ProjectsReducedMotionList() {
  return (
    <div className="flex flex-col gap-12">
      {PROJECTS.items.map((project) => (
        <div
          key={project.id}
          className="rounded-sm border border-white/10 bg-black/40 p-8 md:p-12"
        >
          <ProjectCard project={project} compact />
        </div>
      ))}

      <div className="flex min-h-80 items-center justify-center rounded-sm border border-white/10 bg-black/40 p-8 md:min-h-96 md:p-12">
        <GitHubMoreCard index={PROJECTS.items.length + 1} compact />
      </div>
    </div>
  );
}

function ProjectsHorizontalScroll({ reducedMotion }: { reducedMotion: boolean | null }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  useProjectsScroll({
    trackRef,
    stickyRef,
    railRef,
    reducedMotion,
  });

  return (
    <div ref={trackRef} className="relative">
      <div
        ref={stickyRef}
        className="sticky top-[7rem] md:top-[8rem] flex min-h-[80vh] flex-col overflow-hidden"
      >
        <ProjectsHeader />
        <div
          ref={railRef}
          className="relative flex min-h-0 flex-1 w-max items-stretch will-change-transform"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10"
          />
          {PROJECTS.items.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <GitHubMoreCard index={PROJECTS.items.length + 1} />
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className={
        reducedMotion
          ? "content-section relative"
          : "relative scroll-mt-[7rem] md:scroll-mt-[8rem]"
      }
    >
      {reducedMotion ? (
        <div className="relative z-10 mx-auto max-w-6xl px-8 md:px-16 lg:px-24">
          <ProjectsHeader />
          <ProjectsReducedMotionList />
        </div>
      ) : (
        <ProjectsHorizontalScroll reducedMotion={reducedMotion} />
      )}
    </section>
  );
}
