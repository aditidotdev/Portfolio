export type MilestoneType =
  | "experience"
  | "competition"
  | "opensource"
  | "education";

export interface JourneyMilestone {
  id: string;
  type: MilestoneType;
  title: string;
  org: string;
  startMonth: string;
  startYear: number;
  endMonth?: string;
  endYear?: number;
  isPresent?: boolean;
  isCurrent?: boolean;
  isSingleMonth?: boolean;
  isOngoing?: boolean;
  description: string;
}

export const JOURNEY = {
  heading: "My",
  headingAccent: "Journey",
  milestones: [
    {
      id: "adobe-intern",
      type: "experience",
      title: "Product Intern",
      org: "Adobe",
      startMonth: "May",
      startYear: 2026,
      endMonth: "Jul",
      endYear: 2026,
      isCurrent: true,
      description:
        "Built AI-powered creative workflows using multimodal AI and LLMs for Adobe Express.",
    },
    {
      id: "salesforce-challenge",
      type: "competition",
      title: "National Finalist",
      org: "Future Force AI Challenge — Salesforce",
      startMonth: "Jun",
      startYear: 2025,
      isSingleMonth: true,
      description:
        "Selected as a National Finalist in the Future Force AI Challenge by Salesforce, competing among top AI talent nationwide.",
    },
    {
      id: "doctalker-oss",
      type: "opensource",
      title: "Open Source Contributor",
      org: "Doctalker",
      startMonth: "Nov",
      startYear: 2024,
      isSingleMonth: true,
      description:
        "Implemented a guided onboarding system that streamlined first-time user navigation and improved feature discoverability in the Doctalker project.",
    },
    {
      id: "bobble-hackathon",
      type: "competition",
      title: "First Runner Up",
      org: "Bobble AI Hackathon",
      startMonth: "Aug",
      startYear: 2024,
      isSingleMonth: true,
      description:
        "Built Kaal Decode, a multimodal AI application that predicts sentence tense from text, audio, images, and emojis.",
    },
    {
      id: "banasthali-btech",
      type: "education",
      title: "B.Tech Computer Science",
      org: "Banasthali Vidyapeeth",
      startMonth: "Jul",
      startYear: 2023,
      endMonth: "Jul",
      endYear: 2027,
      isOngoing: true,
      description:
        "Pursuing a B.Tech in Computer Science with a CPI of 9.57/10, building a strong foundation in software engineering and AI.",
    },
  ] satisfies JourneyMilestone[],
} as const;

export function formatDateRange(milestone: JourneyMilestone): string {
  if (milestone.startMonth === "TBD" || milestone.startYear === 0) {
    return "TBD";
  }

  const start = `${milestone.startMonth} ${milestone.startYear}`;

  if (milestone.isSingleMonth) {
    return start;
  }

  if (milestone.endMonth && milestone.endYear) {
    return `${start} – ${milestone.endMonth} ${milestone.endYear}`;
  }

  if (milestone.isPresent) {
    return `${start} – Present`;
  }

  return start;
}

export function getMilestoneAccent(type: MilestoneType): string {
  switch (type) {
    case "competition":
    case "education":
      return "var(--accent-purple)";
    default:
      return "var(--accent-cyan)";
  }
}
