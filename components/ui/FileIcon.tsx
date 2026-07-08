import React from "react";
import { FileIconType } from "@/lib/files";

interface FileIconProps {
  type: FileIconType;
  size?: number;
  className?: string;
}

export function FileIcon({ type, size = 14, className = "" }: FileIconProps) {
  const s = size;

  switch (type) {
    /* ── React (cyan spinning atoms) ───────────────────────────── */
    case "react":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="2.4" fill="#61dafb" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.5" stroke="#61dafb" strokeWidth="1.3" fill="none" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.5" stroke="#61dafb" strokeWidth="1.3" fill="none" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.5" stroke="#61dafb" strokeWidth="1.3" fill="none" transform="rotate(120 12 12)" />
        </svg>
      );

    /* ── HTML5 (orange shield) ──────────────────────────────────── */
    case "html":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <path d="M3 2h18l-1.6 18L12 22l-7.4-2L3 2z" fill="#e34f26" />
          <path d="M12 4v15.4l5.3-1.5 1.3-14.9H12z" fill="#ef652a" />
          <path d="M12 9H8.5l.2 2H12V9zM12 13H9.2l.2 2 2.6.7V13z" fill="#fff" fillOpacity="0.9" />
          <path d="M12 9v2h3l-.2 2H12v2.7l2.8-.8.4-5.9H12z" fill="#fff" />
        </svg>
      );

    /* ── JavaScript (yellow badge) ──────────────────────────────── */
    case "js":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#f7df1e" />
          <path d="M7.5 14.5c0 1.2.6 2 1.8 2 1.1 0 1.8-.6 1.8-2.8V9h2v4.8c0 3-1.5 4.2-3.7 4.2-2 0-3.2-1.1-3.5-2.4l1.6-.6zM14 16.3c.6.4 1.5.7 2.5.7 1 0 1.6-.5 1.6-1.2 0-.8-.5-1.1-1.7-1.6-1.7-.6-2.8-1.4-2.8-3 0-1.7 1.4-3 3.5-3 1 0 1.8.2 2.4.5l-.5 1.6c-.4-.2-1-.5-2-.5-.9 0-1.4.5-1.4 1.1 0 .7.6 1 1.9 1.6 1.8.7 2.6 1.6 2.6 3 0 1.7-1.3 3.1-3.7 3.1-1.1 0-2.1-.3-2.8-.7l.4-1.6z" fill="#1a1a1a" />
        </svg>
      );

    /* ── JSON (colourful braces) ────────────────────────────────── */
    case "json":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#1e1e2e" stroke="#a6e3a1" strokeWidth="1" />
          <text x="3.5" y="12" fontSize="7.5" fontWeight="bold" fill="#a6e3a1" fontFamily="monospace">{"{"}</text>
          <text x="8" y="12" fontSize="5.5" fill="#f9e2af" fontFamily="monospace">k:v</text>
          <text x="16.5" y="12" fontSize="7.5" fontWeight="bold" fill="#a6e3a1" fontFamily="monospace">{"}"}</text>
          <text x="7" y="17" fontSize="5" fill="#89b4fa" fontFamily="monospace">json</text>
        </svg>
      );

    /* ── TypeScript (blue badge with TS) ────────────────────────── */
    case "ts":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178c6" />
          <path d="M13 11h-4v1.5h1.4V18H12v-5.5H13.5c.5 0 .8.3.8.7v.3c0 .4-.3.7-.8.7H13V15.5h.5c1.5 0 2.5-.9 2.5-2.2S15 11 13.5 11H13z" fill="#fff" />
          <path d="M7 11v1.5H9V18h1.5v-5.5H13V11H7z" fill="#fff" />
        </svg>
      );

    /* ── CSS (blue wave / CSS3-style) ───────────────────────────── */
    case "css":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <path d="M3 2h18l-1.6 18L12 22l-7.4-2L3 2z" fill="#264de4" />
          <path d="M12 4v15.4l5.3-1.5 1.3-14.9H12z" fill="#2965f1" />
          <path d="M12 7H7.5l.3 3H12V7zM12 14.5H9.4l.3 2.5 2.3.7v-3.2z" fill="#fff" fillOpacity="0.9" />
          <path d="M12 7v3h4l-.3 4.5H12v3.2l4-1.2.5-7.5H12z" fill="#fff" />
        </svg>
      );

    /* ── Markdown (M↓ document) ─────────────────────────────────── */
    case "md":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect x="2" y="3" width="20" height="18" rx="2.5" fill="#1e1e2e" stroke="#cba6f7" strokeWidth="1.2" />
          <text x="3.5" y="13" fontSize="8" fontWeight="900" fill="#cba6f7" fontFamily="monospace">M</text>
          <path d="M13 9v6m0-6l2 3 2-3v6" stroke="#cba6f7" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 15h4" stroke="#cba6f7" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );

    /* ── Blog / Medium (pen + lines) ────────────────────────────── */
    case "blog":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#1e1e2e" stroke="#fab387" strokeWidth="1" />
          {/* Pen nib */}
          <path d="M15 5l3 3-8 8H7v-3l8-8z" fill="none" stroke="#fab387" strokeWidth="1.3" strokeLinejoin="round" />
          {/* Text lines */}
          <line x1="5" y1="17" x2="9" y2="17" stroke="#fab387" strokeWidth="1" strokeLinecap="round" />
          <line x1="5" y1="19" x2="12" y2="19" stroke="#fab387" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );

    /* ── PDF (red document) ─────────────────────────────────────── */
    case "pdf":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <path d="M6 2h9l5 5v15a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" fill="#f38ba8" />
          <path d="M15 2v5h5" fill="none" stroke="#1e1e2e" strokeWidth="1.4" />
          <rect x="5" y="13" width="14" height="5" rx="1" fill="#1e1e2e" fillOpacity="0.35" />
          <text x="6" y="17" fontSize="5.5" fontWeight="bold" fill="#1e1e2e" fontFamily="monospace">PDF</text>
        </svg>
      );

    default:
      return null;
  }
}
