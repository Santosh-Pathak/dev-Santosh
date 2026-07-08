"use client";

import React, { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
}

export function SkillBar({ name, level, color }: SkillBarProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center gap-3 py-1">
      <span className="font-mono text-[13px] text-vscode-text-primary w-44 flex-shrink-0 truncate">
        {name}
      </span>
      <div className="flex-1 h-1.5 bg-vscode-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${level}%` : "0%",
            backgroundColor: color,
          }}
        />
      </div>
      <span className="font-mono text-[12px] w-10 text-right flex-shrink-0" style={{ color }}>
        {level}%
      </span>
    </div>
  );
}
