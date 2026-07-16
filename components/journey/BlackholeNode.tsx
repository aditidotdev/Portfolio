"use client";

type BlackholeNodeProps = {
  id: string;
  accent: string;
  className?: string;
};

export function BlackholeNode({
  accent,
  className = "",
}: BlackholeNodeProps) {
  return (
    <div
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 56 56"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="28" cy="28" r="5" fill={accent} />
      </svg>
    </div>
  );
}
