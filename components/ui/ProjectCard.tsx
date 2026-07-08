"use client";

import React, { useState } from "react";
import { Project } from "@/data/portfolio";

const CLAMP_LINES = 3;
const APPROX_CHARS_PER_LINE = 72; // rough threshold for "long" description

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isLong = project.description.length > APPROX_CHARS_PER_LINE * CLAMP_LINES;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative bg-white/[0.02] border border-vscode-border rounded p-5 overflow-hidden
                 hover:border-white/[0.14] hover:-translate-y-0.5 hover:bg-white/[0.03]
                 transition-all duration-200 flex flex-col"
      style={{ "--card-accent": project.accentColor } as React.CSSProperties}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
        style={{ background: project.accentColor }}
      />

      {/* Emoji */}
      <div className="mb-3">
        <span className="text-[22px]">{project.emoji}</span>
      </div>

      {/* Category row + links */}
      <div className="flex justify-between items-center mb-1.5 gap-2 flex-wrap">
        <div
          className="text-[12px] uppercase tracking-[0.15em] font-medium"
          style={{ color: project.accentColor }}
        >
          {project.categoryLabel}
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-vscode-text-muted no-underline px-2 py-0.5
                         border border-vscode-border rounded-sm
                         hover:text-vscode-text-primary hover:border-white/[0.28] transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-vscode-text-muted no-underline px-2 py-0.5
                         border border-vscode-border rounded-sm
                         hover:text-vscode-text-primary hover:border-white/[0.28] transition-colors"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="font-display text-[18px] font-extrabold text-vscode-bright mb-2.5 leading-snug">
        {project.title}
      </div>

      {/* Description */}
      <div className="mb-3 flex-1">
        <p
          className="text-xs text-vscode-text-muted leading-[1.75] transition-all duration-300"
          style={!expanded && isLong ? {
            display: "-webkit-box",
            WebkitLineClamp: CLAMP_LINES,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          } : undefined}
        >
          {project.description}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1.5 text-[11px] font-mono transition-colors"
            style={{ color: project.accentColor }}
          >
            {expanded ? "Show less ↑" : "Read more ↓"}
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-1.5 py-0.5 bg-white/[0.04]
                       border border-white/[0.07] rounded-sm text-vscode-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
