export const SITE = {
  name: "Aditi Gupta",
  eyebrow: "Hello, I'm",
  tagline:
    "Developer who builds things that work — LLM agents, NLP pipelines, and full-stack apps, end to end.",
  description:
    "Aditi Gupta — developer building AI agents, NLP tools, and full-stack apps.",
} as const;

export const ABOUT = {
  heading: "About",
  headingAccent: "Me",
  paragraphs: [
    "I'm a Product Intern at Adobe right now, working on the SceneLine Generator Agent — an AI tool that takes image, audio, and natural language prompts and turns them into structured video plans. I've been building the LLM pipeline and an agentic editing framework that plugs into Adobe Express.",
    "B.Tech in Computer Science at Banasthali Vidyapeeth, CPI 9.57. I spend most of my time on DSA, system design, and shipping projects — CommandPilot turns natural language into Linux commands (cut search time by ~80%), and Kaal Decode predicts sentence tense across 15+ languages with ~90% accuracy.",
    "Competitive programmer at heart. I care about clean architecture, measurable impact, and code that doesn't need a paragraph of fluff to explain what it does.",
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
