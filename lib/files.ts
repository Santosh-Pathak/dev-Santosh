export type FileIconType = "react" | "html" | "js" | "json" | "ts" | "css" | "md" | "pdf";

export type PortfolioFile = {
  id: string;
  filename: string;
  icon: FileIconType;
  accentColor: string; // Tailwind color value (hex) for top border accent
  tailwindAccent: string; // Tailwind class suffix used in dynamic classes
  breadcrumbPath: string; // e.g. "src" or "data" or ""
  languageLabel: string; // e.g. "React", "HTML", "JavaScript"
  sectionId: string;
  externalHref?: string;
};

export const portfolioFiles: PortfolioFile[] = [
  {
    id: "home",
    filename: "home.tsx",
    icon: "react",
    accentColor: "#56d4dd",
    tailwindAccent: "vscode-cyan",
    breadcrumbPath: "src",
    languageLabel: "React",
    sectionId: "home",
  },
  {
    id: "about",
    filename: "about.html",
    icon: "html",
    accentColor: "#e5a663",
    tailwindAccent: "vscode-orange",
    breadcrumbPath: "src",
    languageLabel: "HTML",
    sectionId: "about",
  },
  {
    id: "projects",
    filename: "projects.js",
    icon: "js",
    accentColor: "#f1c76f",
    tailwindAccent: "vscode-yellow",
    breadcrumbPath: "src",
    languageLabel: "JavaScript",
    sectionId: "projects",
  },
  {
    id: "skills",
    filename: "skills.json",
    icon: "json",
    accentColor: "#6c7086",
    tailwindAccent: "vscode-text-muted",
    breadcrumbPath: "data",
    languageLabel: "JSON",
    sectionId: "skills",
  },
  {
    id: "experience",
    filename: "experience.ts",
    icon: "ts",
    accentColor: "#61afef",
    tailwindAccent: "vscode-blue",
    breadcrumbPath: "src",
    languageLabel: "TypeScript",
    sectionId: "experience",
  },
  {
    id: "contact",
    filename: "contact.css",
    icon: "css",
    accentColor: "#61afef",
    tailwindAccent: "vscode-blue",
    breadcrumbPath: "src",
    languageLabel: "CSS",
    sectionId: "contact",
  },
  {
    id: "readme",
    filename: "README.md",
    icon: "md",
    accentColor: "#56d4dd",
    tailwindAccent: "vscode-cyan",
    breadcrumbPath: "",
    languageLabel: "Markdown",
    sectionId: "readme",
  },
  {
    id: "resume",
    filename: "Santosh_Pathak_Resume.pdf",
    icon: "pdf",
    accentColor: "#f38ba8",
    tailwindAccent: "vscode-red",
    breadcrumbPath: "",
    languageLabel: "PDF",
    sectionId: "",
    externalHref: "/Santosh_Pathak_Resume.pdf",
  },
];

/** Files that appear as sections (no externalHref) */
export const sectionFiles = portfolioFiles.filter((f) => !f.externalHref);

/** All navigable files including PDF */
export const allFiles = portfolioFiles;

export function getFileById(id: string): PortfolioFile | undefined {
  return portfolioFiles.find((f) => f.id === id);
}
