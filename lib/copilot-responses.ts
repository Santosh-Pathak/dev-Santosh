export interface CopilotChip {
  id: string;
  label: string;
  response: string;
}

export const copilotChips: CopilotChip[] = [
  {
    id: "about",
    label: "Tell me about Santosh?",
    response:
      "Santosh Pathak is a Software Development Engineer at Tedekstra (Remote, UK), based in India 🇮🇳. He lives at the crossroads of full-stack engineering, cloud infrastructure, and system design — building platforms that are scalable and production-ready. B.Tech in Computer Science Engineering from Graphic Era Hill University, Dehradun (2021–2025).",
  },
  {
    id: "projects",
    label: "What projects has Santosh built?",
    response:
      "Santosh has shipped some solid projects:\n\n• **EasyShop** — Full-stack e-commerce platform with Docker, Kubernetes, AWS EKS & Jenkins CI/CD\n• **WanderLust** — MERN travel blogging platform with Cloudinary image storage & N+1 query fix\n• **Codeforces Insights** — React SPA with 20+ Chart.js visualizations, Vitest tests, deployed on Vercel\n• **JobHunt** — Full-stack MERN job portal with multi-stage Docker build & Jest tests\n\nAll open-source — check the GitHub links in the Projects section!",
  },
  {
    id: "experience",
    label: "Tell me about his work experience",
    response:
      "Santosh's professional journey:\n\n• **Software Development Engineer @ Tedekstra** (July 2025–Present) — Building Trak-Entries (100+ racing clubs, 3,000+ users, 98% uptime), cut DB latency by 60% via compound indexing & aggregation tuning. Also worked on Energised Earth CRM.\n\n• **Software Development Intern @ TBI-GEU** (Jul–Oct 2024) — Contributed to JobHunt MERN job portal, multi-stage Docker builds, Jest unit tests, Agile/Scrum.",
  },
  {
    id: "stack",
    label: "What's his tech stack?",
    response:
      "Santosh's core tech stack:\n\n🔷 **Languages:** JavaScript (92%), C++ (90%), TypeScript (88%), SQL, Java\n⚡ **Backend:** Node.js, Express.js, Next.js, REST APIs, RBAC, JWT/OAuth\n🍃 **Databases:** MongoDB (88%), MySQL, Redis\n🐳 **Cloud & DevOps:** Docker, GitHub Actions, AWS (EC2/EKS/VPC), Terraform, Linux\n\nHis strongest area is the intersection of scalable backend systems and cloud/DevOps automation.",
  },
  {
    id: "contact",
    label: "How can I contact Santosh?",
    response:
      "You can reach Santosh through several channels:\n\n📧 **Email:** pathaksantosh987@gmail.com\n💼 **LinkedIn:** linkedin.com/in/santosh-pathak-dev\n🐙 **GitHub:** github.com/Santosh-Pathak\n🌐 **Portfolio:** santosh-pathak-portfolio.vercel.app\n✍️ **Medium:** medium.com/@pathaksantosh987\n\nOr use the **Contact section** of this portfolio to send him a message directly!",
  },
  {
    id: "blogs",
    label: "Does Santosh write blogs?",
    response:
      "Yes! Santosh writes on Medium at **medium.com/@pathaksantosh987** ✍️\n\nHis posts cover full-stack engineering, cloud/DevOps, system design, and LeetCode insights. You can read them live in the **Blogs** tab of this portfolio — posts are pulled directly from his Medium feed with cover images.\n\nClick any post card to open the full article on Medium.",
  },
  {
    id: "support",
    label: "How can I support Santosh?",
    response:
      "Great question! Here are some ways to support Santosh:\n\n⭐ Star his projects on GitHub\n🔗 Connect with him on LinkedIn\n🟡 Check out his LeetCode profile (1,200+ problems, 1800 max rating!)\n💼 Reach out for collaboration on full-stack or DevOps projects\n🤝 If you're hiring — he's open to exciting opportunities!\n\nHe's always up for good conversations and meaningful work. 🚀",
  },
];
