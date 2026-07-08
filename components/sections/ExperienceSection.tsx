import React from "react";
import { experience } from "@/data/portfolio";
import { Folder } from "lucide-react";

export function ExperienceSection() {
  return (
    <section className="px-8 py-16 md:px-12 lg:px-16">
      {/* Comment */}
      <p className="font-mono text-sm italic mb-6" style={{ color: "#98c379" }}>
        {"// experience.ts - professional journey"}
      </p>

      <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-2">Experience</h2>

      <p className="font-mono text-sm text-vscode-text-muted mb-10">
        <span className="text-vscode-purple">interface</span>{" "}
        <span className="text-vscode-cyan">Career</span>{" "}
        <span className="text-vscode-text-primary">extends</span>{" "}
        <span className="text-vscode-cyan">Timeline</span>{" "}
        <span className="text-vscode-text-primary">{"{}"}</span>
      </p>

      {/* Timeline */}
      <div className="flex flex-col max-w-2xl">
        {experience.map((entry, i) => (
          <div key={i} className="flex gap-5">
            {/* Timeline line and dot */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 ${
                  entry.isCurrent
                    ? "bg-vscode-blue border-vscode-blue shadow-[0_0_8px_#61afef80]"
                    : "bg-vscode-bg border-vscode-text-muted"
                }`}
              />
              {i < experience.length - 1 && (
                <div className="w-px flex-1 bg-vscode-border mt-1 mb-0" style={{ minHeight: 40 }} />
              )}
            </div>

            {/* Content */}
            <div className="pb-10 flex-1">
              <span className="font-mono text-[11px] text-vscode-text-muted block mb-1">
                {entry.dateRange}
              </span>
              <h3 className="font-display font-bold text-xl text-vscode-text-primary mb-0.5">
                {entry.role}
              </h3>
              {entry.companyUrl ? (
                <a
                  href={entry.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-vscode-blue hover:underline mb-3 block"
                >
                  @ {entry.company}
                </a>
              ) : (
                <span className="font-mono text-sm text-vscode-blue mb-3 block">
                  @ {entry.company}
                </span>
              )}
              {/* Structured projects with bullet points */}
              {entry.projects ? (
                <div className="flex flex-col gap-5 mb-3">
                  {entry.projects.map((proj, pi) => (
                    <div key={pi}>
                      <div className="flex items-center gap-2 mb-2">
                        <Folder size={13} className="text-vscode-yellow flex-shrink-0" />
                        <span className="font-mono text-[12px] font-semibold text-vscode-yellow">
                          {proj.name}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1.5 pl-5">
                        {proj.bullets.map((b, bi) => (
                          <li key={bi} className="relative text-vscode-text-muted text-sm leading-relaxed">
                            <span
                              className="absolute -left-4 top-[0.55em] w-1.5 h-1.5 rounded-full bg-vscode-blue/60 flex-shrink-0"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-vscode-text-muted text-sm leading-relaxed mb-3">
                  {entry.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-vscode-blue border border-vscode-blue/40 bg-vscode-blue/10 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
