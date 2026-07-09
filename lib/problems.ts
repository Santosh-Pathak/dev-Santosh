export type ProblemSeverity = "error" | "warning" | "info";

export interface Problem {
  severity: ProblemSeverity;
  message:  string;
  file:     string;
  line:     number;
  col:      number;
  source:   string;
}

export const problems: Problem[] = [
  // errors
  {
    severity: "error",
    message:  "sleep() is not defined in recent git commits",
    file:     "experience.ts",
    line:     7,
    col:      1,
    source:   "eslint",
  },
  {
    severity: "error",
    message:  "Cannot find module 'free-time' — did you mean 'side-project'?",
    file:     "skills.json",
    line:     99,
    col:      3,
    source:   "ts(2307)",
  },
  {
    severity: "error",
    message:  "Unreachable code detected after 'one more feature()'",
    file:     "home.tsx",
    line:     3,
    col:      12,
    source:   "ts(7027)",
  },

  // warnings
  {
    severity: "warning",
    message:  "too_many_side_projects — consider shipping one first",
    file:     "skills.json",
    line:     42,
    col:      1,
    source:   "eslint",
  },
  {
    severity: "warning",
    message:  "Possible infinite loop: 'keep learning' has no exit condition",
    file:     "about.html",
    line:     21,
    col:      5,
    source:   "eslint",
  },
  {
    severity: "warning",
    message:  "'coffee' dependency may cause performance bottleneck at 3 AM",
    file:     "package.json",
    line:     14,
    col:      3,
    source:   "npm-audit",
  },
  {
    severity: "warning",
    message:  "Stack trace leads to Stack Overflow (intentional)",
    file:     "experience.ts",
    line:     58,
    col:      9,
    source:   "eslint",
  },
  {
    severity: "warning",
    message:  "Variable 'imposter_syndrome' assigned but never resolved",
    file:     "about.html",
    line:     66,
    col:      7,
    source:   "ts(6133)",
  },

  // info
  {
    severity: "info",
    message:  "Consider adding 'sleep: 8h' to daily schedule — currently missing",
    file:     "README.md",
    line:     1,
    col:      1,
    source:   "life-lint",
  },
  {
    severity: "info",
    message:  "'git push --force' urge detected — suppressed by senior dev",
    file:     "experience.ts",
    line:     33,
    col:      1,
    source:   "git-hook",
  },
  {
    severity: "info",
    message:  "Refactor opportunity: rename 'quick fix' → 'tech debt'",
    file:     "projects.js",
    line:     77,
    col:      4,
    source:   "sonar",
  },
];

export const errorCount   = problems.filter((p) => p.severity === "error").length;
export const warningCount = problems.filter((p) => p.severity === "warning").length;
export const infoCount    = problems.filter((p) => p.severity === "info").length;
