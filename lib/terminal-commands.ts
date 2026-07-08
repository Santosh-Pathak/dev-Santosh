// ─────────────────────────────────────────────────────────────────────────────
// terminal-commands.ts  –  command engine for the portfolio terminal
// ─────────────────────────────────────────────────────────────────────────────

export type LineColor =
  | "green" | "blue" | "cyan" | "yellow" | "red"
  | "pink" | "orange" | "purple" | "muted" | "bright";

export interface OutputLine {
  text: string;
  color?: LineColor;
  bold?: boolean;
}

export interface CommandResult {
  lines: OutputLine[];
  newCwd?: string;
  clear?: boolean;
  openFile?: string; // triggers navigateToFile in the UI
}

// ─── Virtual filesystem ───────────────────────────────────────────────────────
const DIRS: Record<string, string[]> = {
  "~": [
    "home.tsx", "about.html", "projects.js", "skills.json", "blogs.md",
    "experience.ts", "contact.css", "README.md",
    "src/", "public/", "package.json", ".gitignore", ".eslintrc.json",
  ],
  "~/src": ["components/", "context/", "data/", "hooks/", "lib/"],
  "~/src/components": ["chrome/", "sections/", "ui/"],
  "~/src/components/chrome": [
    "TitleBar.tsx", "Sidebar.tsx", "TabBar.tsx", "Terminal.tsx",
    "StatusBar.tsx", "MenuBar.tsx", "Breadcrumb.tsx",
    "CommandPalette.tsx", "CopilotPanel.tsx",
  ],
  "~/src/components/sections": [
    "HomeSection.tsx", "AboutSection.tsx", "ProjectsSection.tsx",
    "SkillsSection.tsx", "ExperienceSection.tsx",
    "ContactSection.tsx", "ReadmeSection.tsx",
  ],
  "~/src/components/ui": [
    "FileIcon.tsx", "SkillBar.tsx", "ProjectCard.tsx",
    "CustomCursor.tsx", "SectionComment.tsx",
  ],
  "~/src/context": ["PortfolioContext.tsx", "ThemeContext.tsx"],
  "~/src/data": ["portfolio.ts"],
  "~/src/hooks": ["useClock.ts", "useCommandPalette.ts"],
  "~/src/lib": [
    "files.ts", "copilot-responses.ts", "parseBold.tsx", "terminal-commands.ts",
  ],
  "~/public": ["Santosh_Pathak_Resume.pdf", "favicon.ico", "icon.svg"],
};

// ─── File contents ────────────────────────────────────────────────────────────
const FILE_CONTENTS: Record<string, string> = {
  "home.tsx": `// home.tsx — Hero Section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const hero = {
  name:    "Santosh Pathak",
  role:    "Software Development Engineer @ Tedekstra",
  badges:  ["Software Engineer", "Full-Stack Dev", "Cloud & DevOps"],
  stats:   { projects: "6+", years: "1+", lcRating: "1800" },
  contact: "pathaksantosh987@gmail.com",
};`,
  "about.html": `<!-- about.html — About Section -->
<!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
Software Development Engineer with 1+ year of professional
and 3+ years of hands-on experience building scalable
full-stack web applications.

Currently: Software Development Engineer @ Tedekstra (Remote, UK)
Building:  Trak-Entries · Energised Earth CRM
Focus:     System Design · RBAC · High-concurrency backends`,
  "skills.json": `{
  "languages":   ["JavaScript", "TypeScript", "C++", "SQL", "Java"],
  "frontend":    ["React", "Next.js", "Tailwind CSS"],
  "backend":     ["Node.js", "Express.js", "NestJS", "REST APIs", "RBAC"],
  "databases":   ["MongoDB", "MySQL", "Redis"],
  "devops":      ["Docker", "Kubernetes", "Terraform", "AWS", "GitHub Actions"],
  "tools":       ["Git", "Linux", "Supabase", "Prometheus", "Grafana k6"]
}`,
  "experience.ts": `// experience.ts — Work History
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const experience = [
  {
    role:    "Software Development Engineer",
    company: "Tedekstra",
    period:  "July 2025 – Present",
    stack:   ["Node.js", "TypeScript", "MongoDB", "RBAC", "Docker"],
    note:    "Trak-Entries: 100+ clubs, 3000+ users, 98% uptime",
  },
  {
    role:    "Software Development Intern",
    company: "TBI-GEU",
    period:  "Jul 2024 – Oct 2024",
    stack:   ["MERN", "Docker", "Jest", "Agile/Scrum"],
  },
];`,
  "contact.css": `/* contact.css — Get In Touch */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.email     { content: "pathaksantosh987@gmail.com"; }
.github    { content: "github.com/Santosh-Pathak"; }
.linkedin  { content: "linkedin.com/in/santosh-pathak-dev"; }
.leetcode  { content: "leetcode.com/u/21011177"; }
.medium    { content: "medium.com/@pathaksantosh987"; }

/* Response time : ~24 hours */
/* Open to       : full-time · freelance · collab */`,
  "README.md": `# Santosh Pathak — Portfolio
> "Building systems that scale."

## About
Software Development Engineer @ Tedekstra (Remote, UK)
Specialising in Full-Stack Engineering, Cloud & DevOps, System Design.

## Quick Links
- 📧  pathaksantosh987@gmail.com
- 🐙  github.com/Santosh-Pathak
- 💼  linkedin.com/in/santosh-pathak-dev
- 🟡  leetcode.com/u/21011177 (1200+ solved, 1800 max)

## Stack
TypeScript · Next.js · Node.js · MongoDB · Docker · AWS · Terraform`,
  "package.json": `{
  "name": "santosh-pathak-portfolio",
  "version": "1.0.0",
  "description": "VS Code-themed portfolio — Santosh Pathak",
  "scripts": {
    "dev":   "next dev",
    "build": "next build",
    "start": "next start",
    "lint":  "next lint"
  },
  "dependencies": {
    "next":         "^14.2.0",
    "react":        "^18.3.1",
    "tailwindcss":  "^3.4.0",
    "lucide-react": "^0.400.0"
  }
}`,
  ".gitignore": `# Dependencies
node_modules/
.pnp
.pnp.js

# Build
.next/
out/
build/

# Env
.env
.env.local

# OS
.DS_Store
Thumbs.db`,
  ".eslintrc.json": `{
  "extends": ["next/core-web-vitals", "next/typescript"]
}`,
};

// ─── Resolve absolute-ish paths ──────────────────────────────────────────────
function resolvePath(cwd: string, target: string): string {
  if (target === "~" || target === "") return "~";
  if (target.startsWith("~/")) return target;
  if (target === "..") {
    const parts = cwd.split("/");
    parts.pop();
    return parts.join("/") || "~";
  }
  if (target === ".") return cwd;
  const candidate = `${cwd}/${target}`.replace("~/~/", "~/");
  return candidate;
}

function getFilesInDir(cwd: string): string[] {
  return DIRS[cwd] ?? [];
}

// ─── Individual commands ──────────────────────────────────────────────────────

function cmdHelp(): CommandResult {
  return {
    lines: [
      { text: "┌─────────────────────────────────────────────────┐", color: "muted" },
      { text: "│          Available Commands                      │", color: "cyan", bold: true },
      { text: "└─────────────────────────────────────────────────┘", color: "muted" },
      { text: "" },
      { text: "  Navigation", color: "yellow", bold: true },
      { text: "    ls           List directory contents" },
      { text: "    ls -la       List with details" },
      { text: "    cd <dir>     Change directory  (cd .., cd ~, cd src)" },
      { text: "    pwd          Print working directory" },
      { text: "" },
      { text: "  File Operations", color: "yellow", bold: true },
      { text: "    cat <file>   Display file contents" },
      { text: "    open <file>  Open file in the editor" },
      { text: "" },
      { text: "  Info", color: "yellow", bold: true },
      { text: "    whoami       Who is Santosh?" },
      { text: "    neofetch     System info (portfolio edition)" },
      { text: "    date         Current date & time" },
      { text: "    history      Command history" },
      { text: "    echo <text>  Print text" },
      { text: "" },
      { text: "  Git", color: "yellow", bold: true },
      { text: "    git log      Commit history" },
      { text: "    git status   Working tree status" },
      { text: "    git branch   Branch list" },
      { text: "" },
      { text: "  Dev Tools", color: "yellow", bold: true },
      { text: "    node -v      Node version" },
      { text: "    npm -v       npm version" },
      { text: "    curl <url>   Fetch a URL (fun easter eggs)" },
      { text: "" },
      { text: "  Misc", color: "yellow", bold: true },
      { text: "    clear / cls  Clear terminal" },
      { text: "    help         Show this help" },
      { text: "" },
      { text: "  Tip: ↑ / ↓ to navigate command history", color: "muted" },
    ],
  };
}

function cmdLs(args: string[], cwd: string): CommandResult {
  const showAll = args.includes("-la") || args.includes("-l") || args.includes("-a");
  const files = getFilesInDir(cwd);
  if (!files.length) {
    return { lines: [{ text: "No files found.", color: "muted" }] };
  }

  if (showAll) {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    const lines: OutputLine[] = [
      { text: `total ${files.length}`, color: "muted" },
    ];
    files.forEach((f) => {
      const isDir = f.endsWith("/");
      const size = isDir ? "4096" : String(Math.floor(Math.random() * 8000) + 512);
      const name = f.replace(/\/$/, "");
      const color: LineColor = isDir ? "blue"
        : f.endsWith(".tsx") || f.endsWith(".ts") ? "cyan"
        : f.endsWith(".js") ? "yellow"
        : f.endsWith(".json") ? "green"
        : f.endsWith(".md") ? "bright"
        : f.endsWith(".html") ? "orange"
        : f.endsWith(".css") ? "pink"
        : f.endsWith(".pdf") ? "red"
        : undefined as unknown as LineColor;
      const perm = isDir ? "drwxr-xr-x" : "-rw-r--r--";
      lines.push({
        text: `${perm}  1  santosh santosh ${size.padStart(6)}  ${dateStr}  ${isDir ? name + "/" : name}`,
        color,
      });
    });
    return { lines };
  }

  // Compact columnar output
  const cols = 4;
  const lines: OutputLine[] = [];
  for (let i = 0; i < files.length; i += cols) {
    const row = files.slice(i, i + cols);
    const text = row.map((f) => f.replace(/\/$/, "").padEnd(22)).join("  ");
    lines.push({ text });
  }
  return { lines };
}

function cmdCd(args: string[], cwd: string): CommandResult {
  const target = args[0] ?? "~";
  const resolved = resolvePath(cwd, target);
  if (resolved === "~" || DIRS[resolved]) {
    return { lines: [], newCwd: resolved };
  }
  return {
    lines: [{ text: `bash: cd: ${target}: No such directory`, color: "red" }],
  };
}

function cmdPwd(cwd: string): CommandResult {
  const full = cwd.replace("~", "/home/santosh");
  return { lines: [{ text: full }] };
}

function cmdCat(args: string[], cwd: string): CommandResult {
  if (!args[0]) {
    return { lines: [{ text: "usage: cat <filename>", color: "muted" }] };
  }
  const filename = args[0];
  const content =
    FILE_CONTENTS[filename] ??
    FILE_CONTENTS[filename.replace(/^.*\//, "")]; // strip path

  if (!content) {
    // Check if it's a directory
    const resolved = resolvePath(cwd, filename);
    if (DIRS[resolved]) {
      return { lines: [{ text: `cat: ${filename}: Is a directory`, color: "red" }] };
    }
    return { lines: [{ text: `cat: ${filename}: No such file`, color: "red" }] };
  }

  const lines: OutputLine[] = content
    .split("\n")
    .map((text) => ({ text }));
  return { lines };
}

function cmdWhoami(): CommandResult {
  return {
    lines: [
      { text: "santosh" },
      { text: "" },
      { text: "  Name    : Santosh Pathak", color: "cyan" },
      { text: "  Role    : Software Development Engineer @ Tedekstra", color: "green" },
      { text: "  Focus   : Full-Stack · Cloud & DevOps · System Design", color: "blue" },
      { text: "  Email   : pathaksantosh987@gmail.com", color: "yellow" },
      { text: "  GitHub  : github.com/Santosh-Pathak", color: "muted" },
      { text: "  LinkedIn: linkedin.com/in/santosh-pathak-dev", color: "muted" },
    ],
  };
}

function cmdDate(): CommandResult {
  const now = new Date();
  return {
    lines: [
      {
        text: now.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }),
      },
    ],
  };
}

function cmdHistoryCmd(history: string[]): CommandResult {
  if (!history.length) return { lines: [{ text: "No history yet.", color: "muted" }] };
  return {
    lines: history.map((cmd, i) => ({
      text: `  ${String(i + 1).padStart(4, " ")}  ${cmd}`,
      color: "muted" as LineColor,
    })),
  };
}

const GIT_COMMITS = [
  { hash: "a3f92c1", msg: "feat: add theme switcher with 6 colour palettes",         date: "2 hours ago"  },
  { hash: "b7e4d88", msg: "feat: implement custom cursor (dot + ring + trail)",       date: "5 hours ago"  },
  { hash: "c1a9f33", msg: "feat: resizable sidebar and Copilot panel",               date: "1 day ago"    },
  { hash: "d0bc741", msg: "feat: source control panel with dummy git history",       date: "2 days ago"   },
  { hash: "e5f2309", msg: "feat: resume download via sidebar Extensions icon",       date: "2 days ago"   },
  { hash: "f8c4a17", msg: "feat: inline file search in sidebar explorer",            date: "3 days ago"   },
  { hash: "091b2e6", msg: "fix: JSX comment rendering — use string literals",        date: "4 days ago"   },
  { hash: "1d3e7a5", msg: "feat: tab-based navigation, each section closable",       date: "5 days ago"   },
  { hash: "27f6c94", msg: "feat: AI Copilot panel with mock chat + chips",           date: "6 days ago"   },
  { hash: "38ac012", msg: "feat: command palette Ctrl+P with keyboard nav",          date: "1 week ago"   },
  { hash: "4bc1953", msg: "feat: bottom status bar with live clock",                 date: "1 week ago"   },
  { hash: "5d7e834", msg: "feat: VS Code sidebar — explorer, search, git, resume",  date: "1 week ago"   },
  { hash: "6ef0b25", msg: "chore: scaffold Next.js 14 + TypeScript + Tailwind",     date: "2 weeks ago"  },
  { hash: "7fa2c16", msg: "init: initial commit 🚀",                                 date: "2 weeks ago"  },
];

function cmdGit(args: string[]): CommandResult {
  const sub = args[0];
  if (!sub) {
    return {
      lines: [
        { text: "usage: git <command> [<args>]", color: "muted" },
        { text: "" },
        { text: "  log     Show commit history" },
        { text: "  status  Show working tree status" },
        { text: "  branch  List branches" },
        { text: "  diff    Show changes" },
      ],
    };
  }

  if (sub === "log") {
    const lines: OutputLine[] = [];
    GIT_COMMITS.forEach((c) => {
      lines.push({ text: `commit ${c.hash}`, color: "yellow" });
      lines.push({ text: `Date:   ${c.date}`, color: "muted" });
      lines.push({ text: `    ${c.msg}` });
      lines.push({ text: "" });
    });
    return { lines };
  }

  if (sub === "status") {
    return {
      lines: [
        { text: "On branch main", color: "green" },
        { text: "Your branch is up to date with 'origin/main'.", color: "muted" },
        { text: "" },
        { text: "Changes not staged for commit:", color: "yellow" },
        { text: "  (use \"git add <file>\" to update)" },
        { text: "" },
        { text: "        modified:   components/chrome/Terminal.tsx", color: "red" },
        { text: "" },
        { text: "Untracked files:", color: "yellow" },
        { text: "  (use \"git add <file>\" to track)" },
        { text: "" },
        { text: "        lib/terminal-commands.ts", color: "red" },
        { text: "" },
        { text: "no changes added to commit", color: "muted" },
      ],
    };
  }

  if (sub === "branch") {
    return {
      lines: [
        { text: "* main", color: "green" },
        { text: "  feat/theme-switcher", color: "muted" },
        { text: "  feat/terminal-panel", color: "muted" },
        { text: "  fix/custom-cursor-visibility", color: "muted" },
      ],
    };
  }

  if (sub === "diff") {
    return {
      lines: [
        { text: "diff --git a/components/chrome/Terminal.tsx b/components/chrome/Terminal.tsx", color: "muted" },
        { text: "--- a/components/chrome/Terminal.tsx", color: "red" },
        { text: "+++ b/components/chrome/Terminal.tsx", color: "green" },
        { text: "@@ -0,0 +1,200 @@", color: "cyan" },
        { text: "+  // Terminal panel — interactive portfolio shell", color: "green" },
      ],
    };
  }

  return { lines: [{ text: `git: '${sub}' is not a git command. See 'git help'.`, color: "red" }] };
}

function cmdNode(args: string[]): CommandResult {
  if (args[0] === "-v" || args[0] === "--version") {
    return { lines: [{ text: "v20.11.0" }] };
  }
  return { lines: [{ text: "usage: node -v", color: "muted" }] };
}

function cmdNpm(args: string[]): CommandResult {
  if (args[0] === "-v" || args[0] === "--version") {
    return { lines: [{ text: "10.2.4" }] };
  }
  if (args[0] === "run" && args[1]) {
    if (args[1] === "dev") {
      return {
        lines: [
          { text: "> santosh-pathak-portfolio@1.0.0 dev", color: "muted" },
          { text: "> next dev", color: "muted" },
          { text: "" },
          { text: "   ▲ Next.js 14.2.0", color: "blue" },
          { text: "   - Local:  http://localhost:3000", color: "green" },
          { text: "   ✓ Ready in 1.2s", color: "green" },
        ],
      };
    }
    return { lines: [{ text: `npm run ${args[1]}: script not available here`, color: "muted" }] };
  }
  return { lines: [{ text: "usage: npm -v  |  npm run dev", color: "muted" }] };
}

function cmdOpen(args: string[], navigateToFile?: (id: string) => void): CommandResult {
  if (!args[0]) {
    return { lines: [{ text: "usage: open <filename>", color: "muted" }] };
  }
  const fileMap: Record<string, string> = {
    "home.tsx": "home",
    "about.html": "about",
    "projects.js": "projects",
    "skills.json": "skills",
    "experience.ts": "experience",
    "contact.css": "contact",
    "README.md": "readme",
    "readme.md": "readme",
  };
  const fileId = fileMap[args[0]] ?? fileMap[args[0].toLowerCase()];
  if (!fileId) {
    return {
      lines: [
        { text: `open: ${args[0]}: no editor mapping`, color: "red" },
        { text: "Openable files: home.tsx, about.html, projects.js, skills.json, blogs.md,", color: "muted" },
        { text: "                experience.ts, contact.css, README.md", color: "muted" },
      ],
    };
  }
  if (navigateToFile) navigateToFile(fileId);
  return {
    lines: [
      { text: `Opening ${args[0]} in the editor…`, color: "green" },
    ],
    openFile: fileId,
  };
}

function cmdNeofetch(): CommandResult {
  return {
    lines: [
      { text: "" },
      { text: "          ███████████         santosh@portfolio", color: "cyan" },
      { text: "         ███       ███        ─────────────────────────", color: "cyan" },
      { text: "        ███  ◈  ◈  ███        OS       : Santosh Dark 1.0", color: "cyan" },
      { text: "        ███   ▼    ███        Shell    : bash (portfolio edition)", color: "cyan" },
      { text: "         ███ ╰──╯ ███         Theme    : Santosh Dark", color: "cyan" },
      { text: "          ███████████         Editor   : VS Code (simulated)", color: "cyan" },
      { text: "         ███████████          Stack    : Next.js · Node.js · TypeScript", color: "blue" },
      { text: "        █████████████         DevOps   : Docker · Kubernetes · Terraform", color: "blue" },
      { text: "       ███████████████        Cloud    : AWS EC2 · EKS · GitHub Actions", color: "blue" },
      { text: "      █████████████████       Node     : v20.11.0", color: "blue" },
      { text: "     ███████████████████      npm      : 10.2.4", color: "blue" },
      { text: "    █████████████████████     GitHub   : github.com/Santosh-Pathak", color: "purple" },
      { text: "   ███████████████████████    Email    : pathaksantosh987@gmail.com", color: "purple" },
      { text: "" },
      { text: "  ████  ████  ████  ████  ████  ████  ████  ████", color: "muted" },
      { text: "" },
    ],
  };
}

function cmdCurl(args: string[]): CommandLine {
  const url = args[0] ?? "";
  if (url.includes("resume") || url.includes("pdf")) {
    return {
      lines: [
        { text: "  % Total    % Received  Xferd  Average Speed", color: "muted" },
        { text: "100  245k  100  245k    0     0  1200k      0", color: "muted" },
        { text: "" },
        { text: "Resume: https://drive.google.com/file/d/1lnHV6Ha3fpR1sQ45y8JJ9iXXKd427dZv/view", color: "green" },
        { text: "Tip: run  open README.md  to learn more about Santosh.", color: "cyan" },
      ],
    };
  }
  if (url === "wttr.in" || url.includes("wttr")) {
    return {
      lines: [
        { text: "Weather for Portfolio World:", color: "cyan" },
        { text: "  ⛅  +∞° (always sunny when shipping code)", color: "yellow" },
        { text: "  Wind: 42km/h Caffeine-Fuelled", color: "muted" },
        { text: "  Humidity: 100% (code comments)", color: "muted" },
      ],
    };
  }
  return {
    lines: [
      { text: `curl: (6) Could not resolve host: ${url || "<no url>"}`, color: "red" },
      { text: "Try: curl resume  |  curl wttr.in", color: "muted" },
    ],
  };
}

function cmdMan(args: string[]): CommandResult {
  const cmd = args[0];
  if (!cmd) return { lines: [{ text: "What manual page do you want?", color: "muted" }] };
  return {
    lines: [
      { text: `MAN(1)   Santosh Portfolio Shell   MAN(1)`, color: "yellow" },
      { text: "" },
      { text: `NAME`, color: "cyan", bold: true },
      { text: `       ${cmd} – portfolio shell command` },
      { text: "" },
      { text: `DESCRIPTION`, color: "cyan", bold: true },
      { text: `       Run 'help' for a full list of available commands.` },
      { text: "" },
      { text: `AUTHOR`, color: "cyan", bold: true },
      { text: `       Santosh Pathak <pathaksantosh987@gmail.com>` },
    ],
  };
}

// ─── Suppress unused alias type error ────────────────────────────────────────
type CommandLine = CommandResult;

// ─── Main entry point ─────────────────────────────────────────────────────────
export function executeCommand(
  input: string,
  cwd: string,
  inputHistory: string[],
  navigateToFile?: (id: string) => void
): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [] };

  const parts = trimmed.split(/\s+/);
  const cmd   = parts[0].toLowerCase();
  const args  = parts.slice(1);

  switch (cmd) {
    case "help":    return cmdHelp();
    case "ls":      return cmdLs(args, cwd);
    case "cd":      return cmdCd(args, cwd);
    case "pwd":     return cmdPwd(cwd);
    case "cat":     return cmdCat(args, cwd);
    case "whoami":  return cmdWhoami();
    case "clear":
    case "cls":     return { lines: [], clear: true };
    case "echo":    return { lines: [{ text: args.join(" ") }] };
    case "date":    return cmdDate();
    case "history": return cmdHistoryCmd(inputHistory);
    case "git":     return cmdGit(args);
    case "node":    return cmdNode(args);
    case "npm":     return cmdNpm(args);
    case "open":    return cmdOpen(args, navigateToFile);
    case "neofetch":return cmdNeofetch();
    case "curl":    return cmdCurl(args);
    case "man":     return cmdMan(args);
    case "exit":
    case "quit":
      return { lines: [{ text: "Use the × button to close the terminal.", color: "muted" }] };
    case "python":
    case "python3":
      return { lines: [{ text: "Python 3.11.7 (portfolio shell — no interactive mode)", color: "muted" }, { text: ">>> print('Hello, Santosh!')", color: "muted" }, { text: "Hello, Santosh!" }] };
    default:
      return {
        lines: [
          { text: `bash: ${cmd}: command not found`, color: "red" },
          { text: `Type 'help' for available commands.`, color: "muted" },
        ],
      };
  }
}
