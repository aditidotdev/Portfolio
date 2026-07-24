export const SITE = {
  name: "Aditi Gupta",
  eyebrow: "Hello, I'm",
  tagline:
    "I build products where AI meets thoughtful engineering, transforming ideas into experiences people genuinely enjoy using.",
  description:
    "Aditi Gupta — developer building AI agents, NLP tools, and full-stack apps.",
} as const;

export const ABOUT = {
  heading: "About",
  headingAccent: "Me",
  paragraphs: [
    "I've always enjoyed building things, not just because I like coding, but because I like turning ideas into products people can actually use. Over the years, I've worked on AI applications, full-stack products, and developer tools. During my internship at Adobe, I built multimodal AI and LLM-powered creative workflows that transformed images, audio, and natural language into structured, editable video plans.",
    "Outside of work, you'll usually find me building side projects, participating in hackathons, contributing to open source, or solving problems through competitive programming. I'm driven by curiosity and enjoy creating software that's thoughtful, reliable, and genuinely useful.",
  ],
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Contact", href: "#contact" },
] as const;

export const RESUME = {
  label: "Resume",
  href: "https://drive.google.com/file/d/1amSq5yB4Ny_CIuy7Qi4vZDbXKAjZTZcz/view?usp=drivesdk",
} as const;

export const BLOG: {
  label: string;
  href: string | null;
} = {
  label: "Writing ↗",
  href: "https://medium.com/@svaditi029/f83bd82ad9f0",
};

export const HERO_CTAS = [
  { label: "View Work", href: "#projects", variant: "primary" as const },
  { label: "Get in Touch", href: "#contact", variant: "secondary" as const },
] as const;

export const COLORS = {
  accentCyan: "#22d3ee",
  landFill: "#5eead4",
} as const;

export const ANIMATION = {
  globeRotationSpeed: 0.07,
} as const;

export const GLOBE = {
  radiusDesktop: 0.85,
  radiusMobile: 0.8,
  positionDesktop: [1.4, 0, 0] as const,
  positionMobile: [0, -0.15, 0] as const,
  initialRotation: [0.1, -0.5, 0] as const,
  cameraPositionDesktop: [-0.15, 0, 6] as const,
  cameraPositionMobile: [0, 0, 5.5] as const,
  cameraFov: 42,
  borderOffset: 0.005,
  fillOffset: 0.002,
  landFillOpacity: 0.25,
  borderOpacity: 0.85,
  graticuleOpacity: 0.18,
} as const;

export const MARKER = {
  jhansi: { lat: 25.4484, lng: 78.5685 },
  surfaceOffset: 0.012,
  dotRadius: 0.014,
  ring1: { inner: 0.018, outer: 0.024 },
  ring2: { inner: 0.03, outer: 0.036 },
  pulseRing: { inner: 0.04, outer: 0.046 },
  pulseDuration: 2.5,
  colors: {
    dot: "#ff4040",
    ring: "#ef4444",
    pulse: "#ff5555",
  },
} as const;
