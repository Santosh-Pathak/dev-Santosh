import React from "react";
import { skillCategories } from "@/data/portfolio";
import { SkillBar } from "@/components/ui/SkillBar";

export function SkillsSection() {
  return (
    <section className="px-8 py-16 md:px-12 lg:px-16">
      {/* Comment */}
      <p className="font-mono text-sm italic mb-6" style={{ color: "#98c379" }}>
        {"// skills.json — tech stack & tools I actually use"}
      </p>

      <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-4">Skills</h2>

      {/* Inline JSON line */}
      <p className="font-mono text-sm mb-10">
        <span className="text-vscode-text-muted">{"{ "}</span>
        <span className="text-vscode-cyan">&quot;status&quot;</span>
        <span className="text-vscode-text-primary">{": "}</span>
        <span className="text-vscode-green">&quot;always_learning&quot;</span>
        <span className="text-vscode-text-muted">{", "}</span>
        <span className="text-vscode-cyan">&quot;passion&quot;</span>
        <span className="text-vscode-text-primary">{": "}</span>
        <span className="text-vscode-yellow">&quot;immeasurable&quot;</span>
        <span className="text-vscode-text-muted">{" }"}</span>
      </p>

      {/* Two-column grid of skill categories */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 max-w-5xl">
        {skillCategories.map((cat) => (
          <div key={cat.heading}>
            <h3 className="font-mono text-[11px] font-semibold tracking-widest text-vscode-text-muted uppercase border-b border-vscode-border pb-2 mb-3">
              {cat.heading}
            </h3>
            <div className="flex flex-col">
              {cat.skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
