import React from "react";
import { skillCategories } from "@/data/portfolio";
import { SkillBar } from "@/components/ui/SkillBar";
import { LeetCodeCard } from "@/components/ui/LeetCodeCard";

export function SkillsSection() {
  return (
    <section className="px-6 py-14 md:px-10 lg:px-14">
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

      <div className="flex flex-col xl:flex-row gap-10 max-w-6xl">
        {/* ── Skill bars ───────────────────────── */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-10">
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

        {/* ── LeetCode card ─────────────────────── */}
        <div className="w-full xl:w-64 flex-shrink-0">
          <h3 className="font-mono text-[11px] font-semibold tracking-widest text-vscode-text-muted uppercase border-b border-vscode-border pb-2 mb-3">
            Competitive Programming
          </h3>
          <LeetCodeCard />
        </div>
      </div>
    </section>
  );
}

