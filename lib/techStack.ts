import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiOpenjdk,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiGnubash,
  SiReact,
  SiGsap,
  SiNodedotjs,
  SiExpress,
  SiBootstrap,
  SiFastapi,
  SiNumpy,
  SiPandas,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  SiLinux,
  SiVercel,
  SiPostman,
} from "react-icons/si";
import { VscAzure, VscVscode } from "react-icons/vsc";
import { TbBrain, TbAiAgent, TbPrompt } from "react-icons/tb";

export type TechStackItem = {
  id: string;
  name: string;
  url: string;
  icon: IconType;
};

export const TECH_STACK = {
  heading: "Tech",
  headingAccent: "Stack",
  rowSizes: [8, 7, 6, 5, 4] as const,
  items: [
    {
      id: "c",
      name: "C",
      url: "https://en.cppreference.com/w/c",
      icon: SiC,
    },
    {
      id: "cpp",
      name: "C++",
      url: "https://en.cppreference.com/w/cpp",
      icon: SiCplusplus,
    },
    {
      id: "java",
      name: "Java",
      url: "https://docs.oracle.com/en/java/",
      icon: SiOpenjdk,
    },
    {
      id: "python",
      name: "Python",
      url: "https://docs.python.org/3/",
      icon: SiPython,
    },
    {
      id: "javascript",
      name: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      icon: SiJavascript,
    },
    {
      id: "typescript",
      name: "TypeScript",
      url: "https://www.typescriptlang.org/docs/",
      icon: SiTypescript,
    },
    {
      id: "html",
      name: "HTML",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      icon: SiHtml5,
    },
    {
      id: "css",
      name: "CSS",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      icon: SiCss,
    },
    {
      id: "bash",
      name: "Bash",
      url: "https://www.gnu.org/software/bash/manual/",
      icon: SiGnubash,
    },
    {
      id: "react",
      name: "React.js",
      url: "https://react.dev/",
      icon: SiReact,
    },
    {
      id: "gsap",
      name: "GSAP",
      url: "https://gsap.com/docs/",
      icon: SiGsap,
    },
    {
      id: "nodejs",
      name: "Node.js",
      url: "https://nodejs.org/docs/latest/api/",
      icon: SiNodedotjs,
    },
    {
      id: "express",
      name: "Express",
      url: "https://expressjs.com/",
      icon: SiExpress,
    },
    {
      id: "bootstrap",
      name: "Bootstrap",
      url: "https://getbootstrap.com/docs/",
      icon: SiBootstrap,
    },
    {
      id: "fastapi",
      name: "FastAPI",
      url: "https://fastapi.tiangolo.com/",
      icon: SiFastapi,
    },
    {
      id: "numpy",
      name: "Numpy",
      url: "https://numpy.org/doc/stable/",
      icon: SiNumpy,
    },
    {
      id: "pandas",
      name: "Pandas",
      url: "https://pandas.pydata.org/docs/",
      icon: SiPandas,
    },
    {
      id: "mysql",
      name: "MySQL",
      url: "https://dev.mysql.com/doc/",
      icon: SiMysql,
    },
    {
      id: "mongodb",
      name: "MongoDB",
      url: "https://www.mongodb.com/docs/",
      icon: SiMongodb,
    },
    {
      id: "firebase",
      name: "Firebase",
      url: "https://firebase.google.com/docs",
      icon: SiFirebase,
    },
    {
      id: "azure",
      name: "Azure",
      url: "https://learn.microsoft.com/en-us/azure/",
      icon: VscAzure,
    },
    {
      id: "git",
      name: "Git",
      url: "https://git-scm.com/doc",
      icon: SiGit,
    },
    {
      id: "github",
      name: "Github",
      url: "https://docs.github.com/",
      icon: SiGithub,
    },
    {
      id: "linux",
      name: "Linux",
      url: "https://www.kernel.org/doc/html/latest/",
      icon: SiLinux,
    },
    {
      id: "vscode",
      name: "VSCode",
      url: "https://code.visualstudio.com/docs",
      icon: VscVscode,
    },
    {
      id: "vercel",
      name: "Vercel",
      url: "https://vercel.com/docs",
      icon: SiVercel,
    },
    {
      id: "postman",
      name: "Postman",
      url: "https://learning.postman.com/docs/",
      icon: SiPostman,
    },
    {
      id: "llm",
      name: "LLM",
      url: "https://platform.openai.com/docs/guides/llms",
      icon: TbBrain,
    },
    {
      id: "agents",
      name: "Agents",
      url: "https://platform.openai.com/docs/guides/agents",
      icon: TbAiAgent,
    },
    {
      id: "prompt",
      name: "Prompt",
      url: "https://platform.openai.com/docs/guides/prompt-engineering",
      icon: TbPrompt,
    },
  ] satisfies TechStackItem[],
} as const;

export function splitIntoRows(
  items: TechStackItem[],
  rowSizes: readonly number[]
): TechStackItem[][] {
  const rows: TechStackItem[][] = [];
  let offset = 0;

  for (const size of rowSizes) {
    rows.push(items.slice(offset, offset + size));
    offset += size;
  }

  return rows;
}
