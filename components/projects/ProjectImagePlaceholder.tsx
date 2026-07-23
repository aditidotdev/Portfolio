import Image from "next/image";

type ProjectImagePlaceholderProps = {
  title: string;
  accent: string;
  image?: string;
  imageFit?: "cover" | "contain";
};

export function ProjectImagePlaceholder({
  title,
  accent,
  image,
  imageFit = "cover",
}: ProjectImagePlaceholderProps) {
  return (
    <div
      className="relative flex aspect-video w-full max-w-md items-center justify-center overflow-hidden rounded-sm bg-[#0a0a0a]"
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          className={imageFit === "contain" ? "object-contain" : "object-cover"}
          sizes="(max-width: 768px) 100vw, 448px"
        />
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundColor: accent }}
          />
          <p className="relative z-10 px-6 text-center text-xl font-semibold tracking-wide text-white md:text-2xl font-[family-name:var(--font-space-grotesk)]">
            {title}
          </p>
        </>
      )}
    </div>
  );
}
