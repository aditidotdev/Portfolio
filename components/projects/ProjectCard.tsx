import type { Project } from "@/lib/projects";
import { ProjectImagePlaceholder } from "./ProjectImagePlaceholder";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

function formatIndex(index: number): string {
  return String(index).padStart(2, "0");
}

function ProjectTextBlock({ project }: ProjectCardProps) {
  return (
    <div className="shrink-0">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-6">
          <span className="text-7xl font-bold leading-none text-white md:text-8xl font-[family-name:var(--font-space-grotesk)]">
            {formatIndex(project.index)}
          </span>

          <div className="text-right">
            <h3 className="text-xl font-semibold text-white md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-white md:text-base">
              {project.category}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white">
            Tools and features
          </p>
          <p className="text-sm leading-relaxed text-white md:text-base">
            {project.tools.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectImageWrapper({ project }: ProjectCardProps) {
  return (
    <div className="flex shrink-0 justify-center">
      <ProjectImagePlaceholder
        title={project.title}
        accent={project.imageAccent}
      />
    </div>
  );
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const imageFirst = project.index % 2 === 0;

  return (
    <article
      className={
        compact
          ? "flex w-full flex-col gap-6"
          : "flex min-w-[100vw] shrink-0 self-stretch flex-col gap-6 border-r border-white/10 px-8 pt-6 pb-6 md:min-w-[50vw] md:gap-8 md:px-12 md:pt-10 md:pb-10 lg:min-w-[45vw] lg:px-16"
      }
    >
      {imageFirst ? (
        <>
          <ProjectImageWrapper project={project} />
          <ProjectTextBlock project={project} />
        </>
      ) : (
        <>
          <ProjectTextBlock project={project} />
          <ProjectImageWrapper project={project} />
        </>
      )}
    </article>
  );
}
