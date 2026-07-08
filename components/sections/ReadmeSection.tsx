import React from "react";
import Image from "next/image";
import { readme } from "@/data/portfolio";

export function ReadmeSection() {
  return (
    <section className="px-8 py-12 md:px-12 lg:px-16 pb-24 max-w-4xl">

      {/* ── Cover image ─────────────────────────────────────── */}
      <div className="relative w-full rounded-lg overflow-hidden border border-vscode-border mb-8 shadow-2xl">
        <Image
          src="/image.png"
          alt="Santosh Pathak Portfolio Preview"
          width={1024}
          height={512}
          className="w-full h-auto object-cover"
          priority
        />
        {/* Subtle bottom-fade overlay so the content below blends in */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-vscode-bg to-transparent" />
      </div>

      {/* ── Name + subline ──────────────────────────────────── */}
      <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-2">
        {readme.name}
      </h2>
      <p className="font-mono text-sm text-vscode-text-muted mb-6">{readme.subline}</p>

      {/* ── Tech badge pills ────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-10">
        {readme.techBadges.map((badge) => (
          <span
            key={badge.label}
            className={`inline-flex items-center gap-1.5 font-mono text-[12px] px-3 py-1 rounded-full border ${badge.color}`}
          >
            <span>{badge.icon}</span>
            {badge.label}
          </span>
        ))}
      </div>

      {/* ── Horizontal divider (GitHub README style) ─────────── */}
      <div className="border-t border-vscode-border mb-8" />

      {/* ── About ───────────────────────────────────────────── */}
      <h3 className="font-display font-bold text-xl text-vscode-text-primary mb-3 flex items-center gap-2">
        <span>💜</span> About
      </h3>
      <div className="border border-vscode-border bg-vscode-sidebar rounded-lg p-5 mb-8">
        <p className="text-vscode-text-muted leading-relaxed text-sm">{readme.bio}</p>
      </div>

      {/* ── Bullet list ─────────────────────────────────────── */}
      <div className="flex flex-col gap-2 mb-10">
        {readme.bullets.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <span className="text-base leading-5 flex-shrink-0">{item.emoji}</span>
            <span className="text-vscode-text-muted">
              <span className="text-vscode-text-primary font-semibold">{item.bold}</span>
              {item.rest}
            </span>
          </div>
        ))}
      </div>

      {/* ── Horizontal divider ───────────────────────────────── */}
      <div className="border-t border-vscode-border mb-8" />

      {/* ── Stack ───────────────────────────────────────────── */}
      <h3 className="font-display font-bold text-xl text-vscode-text-primary mb-4 flex items-center gap-2">
        <span>🛠️</span> Stack
      </h3>
      <div className="flex flex-wrap gap-3">
        {readme.stackIcons.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1 border border-vscode-border bg-vscode-sidebar
                       rounded-lg px-4 py-3 hover:border-vscode-text-muted transition-colors"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-mono text-[11px] text-vscode-text-muted">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      <div className="border-t border-vscode-border mt-10 pt-6">
        <p className="font-mono text-[11px] text-vscode-text-muted text-center">
          Built with Next.js 14 · TypeScript · Tailwind CSS · Deployed on Vercel
        </p>
      </div>

    </section>
  );
}
