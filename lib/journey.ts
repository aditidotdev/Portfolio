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
        "Built an AI-powered SceneLine Generator Agent supporting image, audio, and natural language prompts. Engineered an end-to-end LLM pipeline and designed an agentic editing framework for Adobe Express integration.",
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
        "Contributed to open source by integrating an interactive tour guide in the Doctalker project using Driver.js, enhancing user onboarding and navigation.",
    },
    {
      id: "bobble-hackathon",
      type: "competition",
      title: "2nd Place",
      org: "Bobble AI Hackathon",
      startMonth: "Aug",
      startYear: 2024,
      isSingleMonth: true,
      description:
        "Secured 2nd place by developing Kaal Decode, a web application that predicts sentence tenses from text, audio, images, and emojis, leveraging NLP and spaCy for precise linguistic analysis.",
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
        "Pursuing Computer Science Engineering with a CPI of 9.57/10. Core coursework in Data Structures & Algorithms, Database Management, and Object-Oriented Programming.",
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
