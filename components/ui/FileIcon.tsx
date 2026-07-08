import React from "react";
import { FileIconType } from "@/lib/files";

interface FileIconProps {
  type: FileIconType;
  size?: number;
  className?: string;
}

export function FileIcon({ type, size = 14, className = "" }: FileIconProps) {
  const s = `${size}px`;

  switch (type) {
    case "react":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="2.5" fill="#56d4dd" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#56d4dd" strokeWidth="1.2" fill="none" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#56d4dd" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#56d4dd" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
        </svg>
      );

    case "html":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="#e5a663" />
          <path d="M12 19.5l4.5-1.3 1-12H12v13.3z" fill="#e5c093" />
          <path d="M12 9.5H8.5l.3 3H12v-3zM12 13.5H9.3l.3 3 2.4.7V13.5z" fill="#1e1e2e" />
          <path d="M12 9.5v3h3l-.3 3-2.7.7V19.5l4.5-1.3L17.5 9.5H12z" fill="#1e1e2e" fillOpacity="0.3" />
        </svg>
      );

    case "js":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#f1c76f" />
          <text x="4" y="18" fontSize="11" fontWeight="bold" fill="#1e1e2e" fontFamily="monospace">JS</text>
        </svg>
      );

    case "json":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#313244" />
          <text x="4" y="16" fontSize="9" fontWeight="bold" fill="#6c7086" fontFamily="monospace">{"{}"}</text>
        </svg>
      );

    case "ts":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#61afef" />
          <text x="4" y="18" fontSize="11" fontWeight="bold" fill="#1e1e2e" fontFamily="monospace">TS</text>
        </svg>
      );

    case "css":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="#61afef" />
          <path d="M12 9.5H8.3l.3 3H12v-3zM12 13.5H9.3l.3 3 2.4.7V13.5z" fill="#1e1e2e" fillOpacity="0.4" />
          <path d="M12 6.5v3h5.5L17 6.5H12z" fill="#1e1e2e" fillOpacity="0.4" />
        </svg>
      );

    case "md":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="#56d4dd" strokeWidth="1.5" fill="none" />
          <path d="M6 15V9l3 3 3-3v6M16 15v-4M14 13h4" stroke="#56d4dd" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "pdf":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M6 2h8l6 6v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" fill="#f38ba8" />
          <path d="M14 2v6h6" fill="none" stroke="#1e1e2e" strokeWidth="1.5" />
          <text x="5" y="18" fontSize="7" fontWeight="bold" fill="#1e1e2e" fontFamily="monospace">PDF</text>
        </svg>
      );

    default:
      return null;
  }
}
