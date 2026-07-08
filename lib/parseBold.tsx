import React from "react";

/**
 * Converts **bold** markers in a string to styled <span> elements
 * with the vscode-blue accent color.
 */
export function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-vscode-blue font-semibold">
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}
