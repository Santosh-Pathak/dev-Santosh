import React from "react";

interface SectionCommentProps {
  text: string;
}

export function SectionComment({ text }: SectionCommentProps) {
  return (
    <p className="font-mono text-sm italic mb-4" style={{ color: "#98c379" }}>
      {text}
    </p>
  );
}
