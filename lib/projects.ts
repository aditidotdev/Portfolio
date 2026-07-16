export type Project = {
  id: string;
  index: number;
  title: string;
  category: string;
  tools: string[];
  imageAccent: string;
};

export const PROJECTS = {
  heading: "Things I've",
  headingAccent: "Built",
  githubUrl: "https://github.com/Adi-bv",
  moreCard: {
    heading: "Want to see more?",
    subtext: "Explore all of my projects and creations",
    ctaLabel: "See All Works →",
  },
  items: [
    {
      id: "commandpilot",
      index: 1,
      title: "CommandPilot",
      category: "CLI / AI",
      tools: ["Node.js", "Google Generative AI", "Bash", "CLI"],
      imageAccent: "#22d3ee",
    },
    {
      id: "kaal-decode",
      index: 2,
      title: "Kaal Decode",
      category: "NLP",
      tools: [
        "Python",
        "Flask",
        "spaCy",
        "Google Translate API",
        "OCR",
        "Speech-to-Text",
      ],
      imageAccent: "#a855f7",
    },
    {
      id: "churn-prediction",
      index: 3,
      title: "Customer Churn Prediction",
      category: "ML",
      tools: [
        "Python",
        "scikit-learn",
        "Flask",
        "Random Forest",
        "Pandas",
      ],
      imageAccent: "#34d399",
    },
    {
      id: "nebula-ui",
      index: 4,
      title: "Nebula UI",
      category: "Design System",
      tools: [
        "React",
        "TypeScript",
        "Storybook",
        "Tailwind",
        "Figma",
        "Radix UI",
      ],
      imageAccent: "#f472b6",
    },
  ] satisfies Project[],
} as const;

export const TOTAL_PROJECT_CARDS = PROJECTS.items.length + 1;
