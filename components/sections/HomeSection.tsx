"use client";

import React from "react";
import { hero } from "@/data/portfolio";
import { parseBold } from "@/lib/parseBold";
import { usePortfolio } from "@/context/PortfolioContext";
import { useTypewriter } from "@/hooks/useTypewriter";

// Inline SVG icons for social links
function SocialIcon({ type, size = 16 }: { type: string; size?: number }) {
  const s = size;
  switch (type) {
    case "github":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.09.682-.218.682-.484 0-.236-.009-.866-.014-1.699-2.782.602-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.891 1.529 2.341 1.087 2.912.831.091-.646.349-1.086.635-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.022A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.291 2.747-1.022 2.747-1.022.547 1.376.203 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.307.679.917.679 1.852 0 1.335-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "medium":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      );
    case "tableau":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.5 2v4h-4v3h4v4h3v-4h4v-3h-4V2zm-5 8.5v3h-4v3h4v4h3v-4h4v-3h-4v-3zm10 0v3h4v3h-4v4h-3v-4h-4v-3h4v-3z" />
        </svg>
      );
    case "leetcode":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 00 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l1.998-2.134A1.5 1.5 0 0013.9.717l-.416-.717zM7.8 20.4a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "email":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
        </svg>
      );
    case "web":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      );
    case "hackerrank":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 11.885 0 13-.642 1.114-9.107 6-10.392 6-1.285 0-9.75-4.886-10.392-6C1.23 17.885 1.23 7.115 1.608 6 2.25 4.886 10.715 0 12 0zm2.295 7.651v1.69h-1.69V7.65h-.927v1.69h-1.69v.927h1.69v1.69h.927v-1.69h1.69v-.927h-1.69V8.578h1.69v-.927h-.927zm-4.58 0c-.908 0-1.64.733-1.64 1.64v5.418c0 .907.732 1.64 1.64 1.64.907 0 1.64-.733 1.64-1.64v-1.275h-.927v1.275c0 .395-.318.713-.713.713-.394 0-.713-.318-.713-.713V9.291c0-.395.319-.713.713-.713.395 0 .713.318.713.713v1.275h.927V9.291c0-.907-.733-1.64-1.64-1.64zm8.07 0c-.907 0-1.64.733-1.64 1.64v5.418c0 .907.733 1.64 1.64 1.64.908 0 1.64-.733 1.64-1.64v-1.275h-.926v1.275c0 .395-.319.713-.714.713-.394 0-.712-.318-.712-.713V9.291c0-.395.318-.713.712-.713.395 0 .714.318.714.713v1.275h.926V9.291c0-.907-.732-1.64-1.64-1.64z" />
        </svg>
      );
    default:
      return <span className="text-xs">{type[0].toUpperCase()}</span>;
  }
}

export function HomeSection() {
  const { navigateToFile } = usePortfolio();
  const typed = useTypewriter(hero.typewriterLines);

  return (
    <section className="min-h-full flex flex-col justify-center px-6 py-12 md:px-10 lg:px-14">
      {/* Comment */}
      <p className="font-mono text-sm italic mb-6" style={{ color: "#98c379" }}>
        {hero.comment}
      </p>

      {/* H1 */}
      <div className="mb-5">
        <h1
          className="font-display font-extrabold leading-none text-vscode-bright tracking-[-2.5px]"
          style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
        >
          <span className="shiver-on-hover">{hero.firstName}</span>
          <br />
          <em className="not-italic text-vscode-pink relative">
            {hero.lastName}
            <span
              className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-gradient-to-r from-vscode-pink to-transparent"
            />
          </em>
        </h1>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {hero.badges.map((badge) => (
          <span
            key={badge.label}
            className={`inline-flex items-center gap-1.5 font-mono text-[12px] px-3 py-1 rounded-full border ${badge.bg}`}
            style={{ color: "#cdd6f4" }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: badge.dot }} />
            {badge.label}
          </span>
        ))}
      </div>

      {/* Sub-line — typewriter */}
      <p className="font-mono text-sm text-vscode-cyan mb-4 h-5 flex items-center">
        <span>{typed}</span>
        <span className="typewriter-cursor" aria-hidden="true" />
      </p>

      {/* Paragraph */}
      <p className="text-vscode-text-primary text-base md:text-lg leading-relaxed max-w-xl mb-7">
        {parseBold(hero.paragraph)}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => navigateToFile("projects")}
          className="flex items-center gap-2 bg-vscode-blue hover:bg-[#4fa3e0] text-[#1e1e2e] font-mono font-semibold px-5 py-2.5 rounded transition-colors"
        >
          📁 Projects
        </button>
        <button
          onClick={() => navigateToFile("about")}
          className="flex items-center gap-2 border border-vscode-border hover:border-vscode-text-muted text-vscode-text-primary font-mono px-5 py-2.5 rounded transition-colors hover:bg-vscode-border/30"
        >
          👤 About Me
        </button>
        <button
          onClick={() => navigateToFile("contact")}
          className="flex items-center gap-2 border border-vscode-border hover:border-vscode-text-muted text-vscode-text-primary font-mono px-5 py-2.5 rounded transition-colors hover:bg-vscode-border/30"
        >
          ✉ Contact
        </button>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-stretch mb-8">
        {hero.stats.map((stat, i) => (
          <React.Fragment key={stat.label}>
            {i > 0 && <div className="w-px bg-vscode-border mx-4 my-1" />}
            <div className="flex flex-col items-center px-4 py-2">
              <span className="font-display font-black text-2xl md:text-3xl text-white">{stat.value}</span>
              <span className="font-mono text-[10px] text-vscode-text-muted tracking-widest mt-0.5">
                {stat.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Social links strip */}
      <div className="flex flex-wrap gap-2">
        {hero.socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-vscode-border bg-vscode-sidebar hover:bg-vscode-border/60 rounded-lg px-3 py-1.5 font-mono text-[11px] text-vscode-text-muted hover:text-vscode-text-primary transition-colors group"
          >
            <span className="flex-shrink-0 transition-colors" style={{ color: link.color }}>
              <SocialIcon type={link.icon} size={13} />
            </span>
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

