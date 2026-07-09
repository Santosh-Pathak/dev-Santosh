// ============================================================
// portfolio.ts — all editable content for Santosh's portfolio
// ============================================================

// ─── Hero ────────────────────────────────────────────────────
export const hero = {
  comment: "// hello world !! Welcome to my portfolio",
  firstName: "Santosh",
  lastName: "Pathak",
  badges: [
    { label: "Software Engineer",  dot: "#ff5fbf", bg: "bg-[#ff5fbf]/10 border-[#ff5fbf]/30" },
    { label: "Full-Stack Dev",     dot: "#c586c0", bg: "bg-[#c586c0]/10 border-[#c586c0]/30" },
    { label: "Cloud & DevOps",     dot: "#56d4dd", bg: "bg-[#56d4dd]/10 border-[#56d4dd]/30" },
    { label: "@ Tedekstra",        dot: "#ff5fbf", bg: "bg-[#ff5fbf]/20 border-[#ff5fbf]/50" },
  ],
  subline: "Building scalable full-stack systems",
  typewriterLines: [
    "Building scalable full-stack systems",
    "Shipping production-grade platforms",
    "Optimizing backend performance ⚡",
    "Cloud · DevOps · System Design",
    "Always learning, always shipping ✨",
  ],
  paragraph:
    "I live at the crossroads of **full-stack engineering**, **cloud infrastructure**, and **system design**. I build systems that are genuinely **scalable and production-ready**.",
  stats: [
    { value: "1.5+",   label: "YEARS EXP"       },
    { value: "20+",   label: "PROJECTS"         },
    { value: "1800", label: "MAX LC RATING"    },
    { value: "↑",    label: "ALWAYS LEARNING"  },
  ],
  socialLinks: [
    { label: "GitHub",     icon: "github",     href: "https://github.com/Santosh-Pathak",                                   color: "#cdd6f4" },
    { label: "LinkedIn",   icon: "linkedin",   href: "https://www.linkedin.com/in/santosh-pathak-dev/",                     color: "#61afef" },
    { label: "Portfolio",  icon: "web",        href: "https://santosh-pathak-portfolio.vercel.app/",                        color: "#98c379" },
    { label: "LeetCode",   icon: "leetcode",   href: "https://leetcode.com/u/21011177",                                     color: "#f1c76f" },
    { label: "HackerRank", icon: "hackerrank", href: "https://www.hackerrank.com/certificates/iframe/fa2408728647",         color: "#00ea64" },
    { label: "Medium",     icon: "medium",     href: "https://medium.com/@pathaksantosh987",                                color: "#cdd6f4" },
    { label: "Email",      icon: "email",      href: "mailto:pathaksantosh987@gmail.com",                                   color: "#f38ba8" },
  ],
};

// ─── About ───────────────────────────────────────────────────
export const about = {
  paragraph:
    "Software Development Engineer with **1+ year** of professional and **3+ years** of hands-on experience designing, developing, and maintaining scalable full-stack web applications using **TypeScript**, **Next.js**, **Node.js**, **Express.js**, **MongoDB** and **Docker**. Strong foundation in **Data Structures & Algorithms**, **Object-Oriented Programming**, and **System Design**. Passionate about writing clean, well-tested, maintainable code.", // TODO: verify wording
  focusItems: [
    { emoji: "🧭", bold: "Building production-grade platforms",    rest: " at Tedekstra (Trak-Entries, Energised Earth CRM)" },
    { emoji: "🤖", bold: "Deep interest in system design",         rest: ", RBAC & high-concurrency backend systems" },
    { emoji: "🎯", bold: "Currently exploring",                    rest: " Kubernetes, Terraform & CI/CD pipelines" },
    { emoji: "💬", bold: "Talk to me about",                       rest: " Next.js, Node.js, MongoDB, AWS" },
    { emoji: "⚡", bold: "Optimizing database queries",            rest: " & cutting latency at scale" },
    { emoji: "✨", bold: "Always learning",                        rest: ", always shipping" },
  ],
};

// ─── Education ───────────────────────────────────────────────
export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  years: string;
  grade?: string;
}

export const education: Education[] = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science Engineering",
    institution: "Graphic Era Hill University",
    location: "Dehradun, India",
    years: "2021 – 2025",
  },
  {
    degree: "12th — Senior Secondary",
    field: "Science (PCM)",
    institution: "Kids Paradise Public School",
    location: "India",
    years: "2021",
    grade: "95.4%",
  },
];

// ─── Projects ────────────────────────────────────────────────
export interface Project {
  emoji: string;
  accentColor: string; // hex — used for category label color & card accent
  categoryLabel: string;
  categoryColor: string;
  categoryBg: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    emoji: "🛒",
    accentColor: "#e5a663",
    categoryLabel: "FULL STACK · E-COMMERCE · DEVOPS",
    categoryColor: "text-vscode-orange",
    categoryBg: "bg-[#e5a663]/10 border-[#e5a663]/30",
    title: "EasyShop — E-Commerce Platform",
    description:
      "Designed and developed a full-stack e-commerce platform with RESTful backend services for authentication, product search, cart management, and order tracking backed by MongoDB. Containerized with Docker, reducing image size by 70% via multi-stage builds; deployed to AWS EKS with a Jenkins CI/CD pipeline using Groovy-based shared libraries to automate build, test, and Trivy security scanning stages.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Docker", "Terraform", "Kubernetes", "AWS EC2"],
    githubUrl: "https://github.com/Santosh-Pathak/E-Commerce-App",
  },
  {
    emoji: "🌍",
    accentColor: "#56d4dd",
    categoryLabel: "FULL STACK · MERN · CLOUD STORAGE",
    categoryColor: "text-vscode-cyan",
    categoryBg: "bg-[#56d4dd]/10 border-[#56d4dd]/30",
    title: "WanderLust — Travel Blogging Platform",
    description:
      "Developed a full-stack MERN travel blogging platform with user authentication, image upload and storage, and full CRUD operations for travel listings, structured with clean MVC architecture. Optimized image storage by integrating Cloudinary, improved MongoDB query performance by solving the N+1 Query Problem, and containerized the application with automated CI/CD workflows.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Cloudinary", "Docker"],
    githubUrl: "https://github.com/Santosh-Pathak/WanderLust",
  },
  {
    emoji: "📊",
    accentColor: "#61afef",
    categoryLabel: "FRONTEND · DATA VIZ · REACT",
    categoryColor: "text-vscode-blue",
    categoryBg: "bg-[#61afef]/10 border-[#61afef]/30",
    title: "Codeforces Insights — Analytics Dashboard",
    description:
      "Built a responsive, performant React SPA that consumes the Codeforces REST API to visualize rating history, contest analytics, submission heatmaps, and tag strengths across 20+ interactive Chart.js sections. Optimized via lazy-loaded routes, memoized charts, and virtualized tables (react-window); wrote unit and property-based tests (Vitest + fast-check); deployed live on Vercel.",
    tags: ["React", "Chart.js", "Vitest", "fast-check", "react-window", "Vercel"],
    githubUrl: "https://github.com/Santosh-Pathak/Codeforces-Profile-Visualizer",
  },
  {
    emoji: "💼",
    accentColor: "#ff5fbf",
    categoryLabel: "FULL STACK · MERN · JOB PORTAL",
    categoryColor: "text-vscode-pink",
    categoryBg: "bg-[#ff5fbf]/10 border-[#ff5fbf]/30",
    title: "JobHunt — MERN Job Portal",
    description:
      "Contributed to a full-stack job portal enabling recruiters to post, manage, and track job listings, and jobseekers to search, filter, and apply to roles in real time. Containerized the application using a multi-stage Docker build for optimized image size, wrote unit tests with Jest, and followed Agile/Scrum practices with regular code reviews and sprint planning.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Docker", "Jest", "Agile/Scrum"],
    githubUrl: "https://github.com/Santosh-Pathak/jobHunt",
  },
];

// ─── Skills ──────────────────────────────────────────────────
export interface Skill {
  name: string;
  level: number; // 0-100
  color: string; // hex
  tailwindColor: string;
}

export interface SkillCategory {
  heading: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    heading: "LANGUAGES",
    skills: [
      { name: "JavaScript",  level: 92, color: "#f1c76f", tailwindColor: "vscode-yellow" },
      { name: "C++",         level: 90, color: "#ff5fbf", tailwindColor: "vscode-pink"   },
      { name: "TypeScript",  level: 88, color: "#61afef", tailwindColor: "vscode-blue"   },
      { name: "SQL",         level: 80, color: "#c586c0", tailwindColor: "vscode-purple" },
      { name: "Java",        level: 70, color: "#e5a663", tailwindColor: "vscode-orange" },
    ],
  },
  {
    heading: "DEVELOPMENT",
    skills: [
      { name: "REST APIs",      level: 92, color: "#56d4dd", tailwindColor: "vscode-cyan"   },
      { name: "React",          level: 90, color: "#61afef", tailwindColor: "vscode-blue"   },
      { name: "Node.js",        level: 90, color: "#98c379", tailwindColor: "vscode-green"  },
      { name: "Next.js",        level: 88, color: "#cdd6f4", tailwindColor: "vscode-bright" },
      { name: "Express.js",     level: 85, color: "#f1c76f", tailwindColor: "vscode-yellow" },
      { name: "Tailwind CSS",   level: 85, color: "#56d4dd", tailwindColor: "vscode-cyan"   },
      { name: "JWT / OAuth 2.0",level: 82, color: "#c586c0", tailwindColor: "vscode-purple" },
      { name: "RBAC",           level: 80, color: "#e5a663", tailwindColor: "vscode-orange" },
      { name: "NestJS",         level: 70, color: "#f38ba8", tailwindColor: "vscode-red"    },
    ],
  },
  {
    heading: "DATABASES",
    skills: [
      { name: "MongoDB", level: 88, color: "#98c379", tailwindColor: "vscode-green"  },
      { name: "MySQL",   level: 78, color: "#61afef", tailwindColor: "vscode-blue"   },
      { name: "Redis",   level: 72, color: "#f38ba8", tailwindColor: "vscode-red"    },
    ],
  },
  {
    heading: "CLOUD & DEVOPS",
    skills: [
      { name: "Docker",           level: 88, color: "#61afef", tailwindColor: "vscode-blue"   },
      { name: "Git",              level: 92, color: "#e5a663", tailwindColor: "vscode-orange" },
      { name: "GitHub Actions",   level: 82, color: "#cdd6f4", tailwindColor: "vscode-bright" },
      { name: "AWS (EC2/EKS/VPC)",level: 80, color: "#f1c76f", tailwindColor: "vscode-yellow" },
      { name: "Linux",            level: 80, color: "#98c379", tailwindColor: "vscode-green"  },
      { name: "Terraform",        level: 75, color: "#c586c0", tailwindColor: "vscode-purple" },
      { name: "Supabase",         level: 70, color: "#56d4dd", tailwindColor: "vscode-cyan"   },
      { name: "Prometheus",       level: 65, color: "#ff5fbf", tailwindColor: "vscode-pink"   },
    ],
  },
];

// ─── Experience ──────────────────────────────────────────────
export interface ExperienceProject {
  name: string;
  bullets: string[];
}

export interface Experience {
  dateRange: string;
  role: string;
  company: string;
  companyUrl?: string;
  description?: string;
  projects?: ExperienceProject[];
  tags: string[];
  isCurrent: boolean;
}

export const experience: Experience[] = [
  {
    dateRange: "July 2025 — Present",
    role: "Software Development Engineer",
    company: "Tedekstra",
    companyUrl: "https://tedekstra.com/",
    projects: [
      {
        name: "Trak-Entries — Motorsport Event & Club Management",
        bullets: [
          "Production-grade platform serving 100+ racing clubs and 3,000+ users across 12+ event types.",
          "Handled 1,000+ entries per event at 98% uptime in high-concurrency scenarios.",
          "Built RESTful backend services with RBAC and a resource reservation/locking mechanism to prevent double-booking.",
          "Optimized database queries, cutting data-retrieval latency by 60% through compound indexing, MongoDB aggregation pipeline tuning, and explicit projections.",
        ],
      },
      {
        name: "Energised Earth CRM — Internal Full-Stack CRM",
        bullets: [
          "Collaborated cross-functionally on a full-stack CRM consolidating opportunity, job, contact, and task-management workflows.",
          "Supported 1,000+ opportunities and 200+ contacts across internal teams.",
          "Contributed to CI/CD pipelines using GitHub Actions, Docker, and Git-based workflows.",
          "API load testing via Grafana k6 and Artillery to validate performance under traffic spikes.",
        ],
      },
    ],
    tags: ["Node.js", "TypeScript", "MongoDB", "RBAC", "Docker", "GitHub Actions", "Grafana k6", "React"],
    isCurrent: true,
  },
  {
    dateRange: "Jul 2024 — Oct 2024",
    role: "Software Development Intern",
    company: "TBI-GEU",
    companyUrl: "https://tbi.geu.ac.in/",
    description:
      "Contributed to JobHunt, a full-stack MERN job portal enabling recruiters to post, manage, and track job listings, and jobseekers to search, filter, and apply to roles in real time. Containerized the application using a multi-stage Docker build for optimized image size, wrote unit tests with Jest, and followed Agile/Scrum practices with regular code reviews and sprint planning.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Docker", "Jest", "Agile/Scrum"],
    isCurrent: false,
  },
];

// ─── Contact Links ────────────────────────────────────────────
export interface ContactLink {
  icon: string;
  platform: string;
  label: string;
  value: string;
  href: string;
  iconBg: string;
  iconColor: string;
}

export const contactLinks: ContactLink[] = [
  {
    icon: "📧",
    platform: "EMAIL",
    label: "EMAIL",
    value: "pathaksantosh987@gmail.com",
    href: "mailto:pathaksantosh987@gmail.com",
    iconBg: "bg-[#f38ba8]/20",
    iconColor: "text-vscode-red",
  },
  {
    icon: "💼",
    platform: "LINKEDIN",
    label: "LINKEDIN",
    value: "linkedin.com/in/santosh-pathak-dev",
    href: "https://www.linkedin.com/in/santosh-pathak-dev/",
    iconBg: "bg-[#61afef]/20",
    iconColor: "text-vscode-blue",
  },
  {
    icon: "🐙",
    platform: "GITHUB",
    label: "GITHUB",
    value: "github.com/Santosh-Pathak",
    href: "https://github.com/Santosh-Pathak",
    iconBg: "bg-[#cdd6f4]/10",
    iconColor: "text-vscode-text-primary",
  },
  {
    icon: "🌐",
    platform: "PORTFOLIO",
    label: "PORTFOLIO",
    value: "santosh-pathak-portfolio.vercel.app",
    href: "https://santosh-pathak-portfolio.vercel.app/",
    iconBg: "bg-[#98c379]/20",
    iconColor: "text-vscode-green",
  },
  {
    icon: "🟡",
    platform: "LEETCODE",
    label: "LEETCODE",
    value: "leetcode.com/u/21011177 · 1200+ solved · 1800 max",
    href: "https://leetcode.com/u/21011177",
    iconBg: "bg-[#f1c76f]/20",
    iconColor: "text-vscode-yellow",
  },
  {
    icon: "🟢",
    platform: "HACKERRANK",
    label: "HACKERRANK",
    value: "JS Certified (ID: FA2408728647)",
    href: "https://www.hackerrank.com/certificates/iframe/fa2408728647",
    iconBg: "bg-[#98c379]/20",
    iconColor: "text-vscode-green",
  },
  {
    icon: "Ⓜ️",
    platform: "MEDIUM",
    label: "MEDIUM",
    value: "medium.com/@pathaksantosh987",
    href: "https://medium.com/@pathaksantosh987",
    iconBg: "bg-[#cdd6f4]/10",
    iconColor: "text-vscode-text-primary",
  },
];

// ─── README / Bio ─────────────────────────────────────────────
export const readme = {
  name: "Santosh Pathak",
  subline: "Software Development Engineer @ Tedekstra · India 🇮🇳",
  techBadges: [
    { icon: "🔷", label: "TypeScript",  color: "border-[#61afef] text-[#61afef]" },
    { icon: "🟩", label: "Node.js",     color: "border-[#98c379] text-[#98c379]" },
    { icon: "⚡",  label: "Next.js",    color: "border-[#cdd6f4] text-[#cdd6f4]" },
    { icon: "🍃", label: "MongoDB",     color: "border-[#98c379] text-[#98c379]" },
    { icon: "🐳", label: "Docker",      color: "border-[#61afef] text-[#61afef]" },
  ],
  // TODO: verify personal bio tone — drafted based on resume
  bio: "Hi, Santosh here! I'm a software engineer who loves turning complex backend problems into clean, scalable systems. I care about performance, clean architecture, and code that's easy for the next person to read. Outside of engineering, I enjoy competitive programming — I've solved 1,200+ problems on LeetCode and hold a max rating of 1800. Always building, always shipping.",
  bullets: [
    { emoji: "🧭", bold: "Building production-grade platforms",    rest: " at Tedekstra" },
    { emoji: "🤖", bold: "RBAC, system design",                    rest: ", high-concurrency backend systems" },
    { emoji: "⚡", bold: "Cutting latency",                        rest: " through query & index optimization" },
    { emoji: "✨", bold: "Always learning",                        rest: ", always shipping" },
  ],
  stackIcons: [
    { icon: "🔷", label: "TypeScript"       },
    { icon: "⚡",  label: "Next.js"         },
    { icon: "🟩", label: "Node.js"          },
    { icon: "🔧", label: "Express.js"       },
    { icon: "🍃", label: "MongoDB"          },
    { icon: "🐳", label: "Docker"           },
    { icon: "☁️", label: "AWS"             },
    { icon: "🏗️", label: "Terraform"       },
    { icon: "⚙️", label: "GitHub Actions"  },
  ],
};

// ─── Availability ─────────────────────────────────────────────
// Change `status` to control the pulsing dot in the status bar.
// "open"        → green  — actively looking for new roles
// "passive"     → yellow — open to great opportunities
// "unavailable" → red    — not looking right now
export const availability = {
  status: "open" as "open" | "passive" | "unavailable",
  label:  "Open to Work",
};
