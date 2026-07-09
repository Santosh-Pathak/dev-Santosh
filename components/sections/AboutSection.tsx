import React from "react";
import { about, education } from "@/data/portfolio";
import { parseBold } from "@/lib/parseBold";

export function AboutSection() {
  return (
    <section className="min-h-full px-6 py-14 md:px-10 lg:px-14">
      {/* HTML-style comment with arrows */}
      <p className="font-mono text-sm italic mb-6 flex items-center gap-2 text-vscode-cyan">
        <span>←</span>
        <span>&lt;!-- about.html - Santosh Pathak --&gt;</span>
        <span>→</span>
      </p>

      {/* Heading */}
      <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-2">About Me</h2>
      <p className="font-mono text-sm text-vscode-text-muted mb-8">
        {"// who I am · what I do · where I build"}
      </p>

      {/* Bio card */}
      <div className="border border-vscode-border rounded-lg p-5 bg-vscode-sidebar mb-10 max-w-3xl">
        <p className="text-vscode-text-primary leading-relaxed">{parseBold(about.paragraph)}</p>
      </div>

      {/* Current Focus */}
      <h3 className="font-mono text-xs font-semibold tracking-widest text-vscode-cyan uppercase mb-4">
        CURRENT FOCUS
      </h3>
      <div className="border border-vscode-border rounded-lg p-5 bg-vscode-sidebar mb-10 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {about.focusItems.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="text-base leading-5 flex-shrink-0">{item.emoji}</span>
              <span className="text-vscode-text-muted">
                <span className="text-vscode-text-primary font-semibold">{item.bold}</span>
                {item.rest}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <h3 className="font-mono text-xs font-semibold tracking-widest text-vscode-cyan uppercase mb-4">
        EDUCATION
      </h3>
      <div className="flex flex-col gap-4 max-w-3xl">
        {education.map((edu, i) => (
          <div key={i} className="border border-vscode-border rounded-lg p-5 bg-vscode-sidebar flex gap-4 items-start">
            <div className="flex flex-col items-center pt-1">
              <div className="w-3 h-3 rounded-full bg-vscode-blue border-2 border-vscode-blue flex-shrink-0" />
              <div className="w-px flex-1 bg-vscode-border mt-1" style={{ minHeight: 20 }} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
                <h4 className="font-display font-bold text-vscode-text-primary">
                  {edu.degree} <span className="text-vscode-blue">in {edu.field}</span>
                </h4>
                <span className="font-mono text-xs text-vscode-text-muted">{edu.years}</span>
              </div>
              <p className="text-vscode-text-muted text-sm">{edu.institution}</p>
              <p className="text-vscode-text-muted text-xs mt-0.5">{edu.location}</p>
              {edu.grade && (
                <span className="inline-block mt-2 font-mono text-[11px] text-vscode-green border border-vscode-green/30 bg-vscode-green/10 px-2 py-0.5 rounded">
                  {edu.grade}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

