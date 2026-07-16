export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: "email" | "linkedin" | "github";
  accent: string;
};

export const CONTACT = {
  heading: "Let's Build",
  headingAccent: "Something Great",
  email: "aditidotdev@gmail.com",
  location: "Based in India · Open to remote, hybrid & relocation",
  links: [
    {
      id: "email",
      label: "Email",
      value: "aditidotdev@gmail.com",
      href: "mailto:aditidotdev@gmail.com",
      icon: "email",
      accent: "#7f1d1d",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/aditidotdev",
      href: "https://www.linkedin.com/in/aditidotdev/",
      icon: "linkedin",
      accent: "#1e3a5f",
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/aditidotdev",
      href: "https://github.com/aditidotdev",
      icon: "github",
      accent: "#27272a",
    },
  ] satisfies ContactLink[],
  footer: {
    credit: "Designed & built by Aditi Gupta",
    githubLabel: "View on GitHub",
    githubUrl: "https://github.com/aditidotdev",
  },
} as const;
