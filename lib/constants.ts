export const SITE = {
  name: "Aditi Gupta",
  eyebrow: "Hello, I'm",
  tagline:
    "Developer building intelligent products with AI and full-stack engineering.",
  description:
    "Aditi Gupta — developer building AI agents, NLP tools, and full-stack apps.",
} as const;

export const ABOUT = {
  heading: "About",
  headingAccent: "Me",
  paragraphs: [
    "I enjoy building software that solves real problems. Over the past few years, I've worked on AI applications, full-stack projects, and developer tools, with a focus on creating products that are both useful and reliable. During my internship at Adobe, I worked on multimodal AI and LLM-powered creative workflows, building systems that transformed images, audio, and natural language into structured, editable video plans.",
    "Outside of work, I enjoy building projects, participating in hackathons, contributing to open source, and sharpening my problem-solving skills through competitive programming. I'm always looking for opportunities to learn, build, and create software that makes an impact.",
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
  href: "#",
} as const;

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
  positionDesktop: [0.85, 0, 0] as const,
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
