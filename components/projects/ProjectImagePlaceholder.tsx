type ProjectImagePlaceholderProps = {
  title: string;
  accent: string;
};

export function ProjectImagePlaceholder({
  title,
  accent,
}: ProjectImagePlaceholderProps) {
  return (
    <div
      className="relative flex aspect-[16/10] w-full max-w-md items-center justify-center overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a]"
      style={{
        borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundColor: accent }}
      />
      <p className="relative z-10 px-6 text-center text-xl font-semibold tracking-wide text-white md:text-2xl">
        {title}
      </p>
    </div>
  );
}
