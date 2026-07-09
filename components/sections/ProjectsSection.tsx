import React from "react";
import { projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectsSection() {
  return (
    <section className="px-6 py-14 md:px-10 lg:px-14">
      {/* Comment */}
      <p className="font-mono text-sm italic mb-6" style={{ color: "#98c379" }}>
        {"// projects.js : things I've built & shipped"}
      </p>

      <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-2">Projects</h2>

      <p className="font-mono text-sm text-vscode-text-muted mb-8">
        <span className="text-vscode-blue">const</span>{" "}
        <span className="text-vscode-cyan">projects</span>{" "}
        <span className="text-vscode-text-primary">= [</span>{" "}
        <span className="text-vscode-text-muted">...shipped, ...building</span>{" "}
        <span className="text-vscode-text-primary">]</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </section>
  );
}

