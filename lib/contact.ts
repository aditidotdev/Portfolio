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
  email: "svaditi029@gmail.com",
  location: "Based in India · Open to remote, hybrid & relocation",
  links: [
    {
      id: "email",
      label: "Email",
      value: "svaditi029@gmail.com",
      href: "mailto:svaditi029@gmail.com",
      icon: "email",
      accent: "#7f1d1d",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/guptaadiiti",
      href: "https://www.linkedin.com/in/guptaadiiti",
      icon: "linkedin",
      accent: "#1e3a5f",
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/Adi-bv",
      href: "https://github.com/Adi-bv",
      icon: "github",
      accent: "#27272a",
    },
  ] satisfies ContactLink[],
  footer: {
    credit: "Designed & built by Aditi Gupta",
    githubLabel: "View on GitHub",
    githubUrl: "https://github.com/Adi-bv",
  },
} as const;
