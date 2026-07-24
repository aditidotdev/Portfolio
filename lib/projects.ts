export type Project = {
  id: string;
  index: number;
  title: string;
  category: string;
  tools: string[];
  imageAccent: string;
  image?: string;
  imageUrl?: string;
  description: string;
};

export const PROJECTS = {
  heading: "Things I've",
  headingAccent: "Built",
  githubUrl: "https://github.com/aditidotdev",
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
      tools: ["Node.js", "Bash", "Google Generative AI API", "JavaScript",],
      imageAccent: "#22d3ee",
      image: "/images/projects/commandpilot.jpeg",
      imageUrl: "https://github.com/aditidotdev/CommandPilot-",
      description:
        "An AI-powered CLI tool that generates accurate Linux commands instantly using natural language and AI.",
    },
    {
      id: "kaal-decode",
      index: 2,
      title: "Kaal Decode",
      category: "NLP",
      tools: [
        "Python", "Flask", "spaCy", "Google Translate API", "OCR", "Speech-to-Text API",
      ],
      imageAccent: "#a855f7",
      image: "/images/projects/kaal-decode.jpeg",
      imageUrl: "https://kaal-decode-1.onrender.com/",
      description:
        "A multimodal AI application that identifies tense from text, speech, and images.",
    },
    {
      id: "churn-prediction",
      index: 3,
      title: "Customer Churn Prediction",
      category: "ML",
      tools: [
        "Python", "scikit-learn", "pandas", "NumPy", "matplotlib", "seaborn", "Flask", "joblib",
      ],
      imageAccent: "#34d399",
      image: "/images/projects/churn-prediction.jpeg",
      imageUrl:
        "https://github.com/aditidotdev/Customer_Churn_Prediction_System",
      description:
        "An end-to-end machine learning application for predicting customer churn in real time.",
    },
    {
      id: "invoice-generator",
      index: 4,
      title: "Invoice Generator",
      category: "Full Stack",
      tools: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
      ],
      imageAccent: "#f472b6",
      image: "/images/projects/invoice-generator.jpeg",
      imageUrl: "https://invoice-generator-rho-neon.vercel.app/",
      description:
        "A full-stack invoice management platform with secure authentication and dynamic invoice generation.",
    },
  ] satisfies Project[],
} as const;

export const TOTAL_PROJECT_CARDS = PROJECTS.items.length + 1;
