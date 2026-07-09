"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import type { LeetCodeResponse, LeetCodeStats } from "@/app/api/leetcode/route";

type Status = "loading" | "ok" | "error";

function StatPill({
  label, value, color,
}: { label: string; value: string | number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-display font-black text-2xl" style={{ color }}>
        {value}
      </span>
      <span className="font-mono text-[9px] text-vscode-text-muted uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function DiffBadge({
  count, label, color, bg,
}: { count: number; label: string; color: string; bg: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span
          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
          style={{ color, background: bg }}
        >
          {label}
        </span>
      </div>
      <span className="font-mono text-sm font-semibold text-vscode-text-primary">{count}</span>
    </div>
  );
}

export function LeetCodeCard() {
  const [status, setStatus] = useState<Status>("loading");
  const [data,   setData]   = useState<LeetCodeStats | null>(null);
  const [error,  setError]  = useState("");

  const fetchStats = () => {
    setStatus("loading");
    fetch("/api/leetcode")
      .then((r) => r.json() as Promise<LeetCodeResponse>)
      .then((res) => {
        if (res.status === "ok" && res.data) {
          setData(res.data);
          setStatus("ok");
        } else {
          setError(res.error ?? "Failed to load");
          setStatus("error");
        }
      })
      .catch((e) => { setError(e.message); setStatus("error"); });
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <div className="border border-vscode-border rounded-lg overflow-hidden bg-white/[0.02]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-vscode-border bg-vscode-sidebar">
        <div className="flex items-center gap-2">
          {/* LeetCode icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#f1c76f">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
          </svg>
          <span className="font-mono text-[11px] font-semibold text-vscode-text-primary tracking-wide">
            LeetCode Stats
          </span>
        </div>
        <a
          href="https://leetcode.com/u/21011177"
          target="_blank"
          rel="noopener noreferrer"
          className="text-vscode-text-muted hover:text-vscode-cyan transition-colors"
        >
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Loading skeleton */}
      {status === "loading" && (
        <div className="p-4 animate-pulse flex flex-col gap-3">
          <div className="flex justify-around">
            {[1,2,3].map(i => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="h-7 w-12 bg-vscode-border/40 rounded" />
                <div className="h-2 w-10 bg-vscode-border/30 rounded" />
              </div>
            ))}
          </div>
          <div className="h-px bg-vscode-border/40" />
          {[1,2,3].map(i => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-16 bg-vscode-border/40 rounded-full" />
              <div className="h-4 w-8 bg-vscode-border/30 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="p-4 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-xs text-vscode-text-muted">{error}</p>
          <button
            onClick={fetchStats}
            className="flex items-center gap-1 font-mono text-xs text-vscode-text-muted
                       hover:text-vscode-text-primary border border-vscode-border rounded px-2 py-1"
          >
            <RefreshCw size={10} /> Retry
          </button>
        </div>
      )}

      {/* Data */}
      {status === "ok" && data && (
        <div className="p-4 flex flex-col gap-4">
          {/* Top stats row */}
          <div className="flex justify-around">
            <StatPill label="Solved"   value={data.totalSolved}   color="#a6e3a1" />
            <StatPill label="Rating"   value={data.contestRating} color="#f1c76f" />
            <StatPill label="Contests" value={data.contestsAttended} color="#89b4fa" />
          </div>

          <div className="h-px bg-vscode-border" />

          {/* Difficulty breakdown */}
          <div className="flex flex-col gap-2">
            <DiffBadge count={data.easySolved}   label="Easy"   color="#a6e3a1" bg="rgba(166,227,161,0.12)" />
            <DiffBadge count={data.mediumSolved} label="Medium" color="#f9e2af" bg="rgba(249,226,175,0.12)" />
            <DiffBadge count={data.hardSolved}   label="Hard"   color="#f38ba8" bg="rgba(243,139,168,0.12)" />
          </div>

          {data.topPercentage > 0 && (
            <>
              <div className="h-px bg-vscode-border" />
              <p className="font-mono text-[10px] text-vscode-text-muted text-center">
                Top{" "}
                <span className="text-vscode-yellow font-semibold">{data.topPercentage}%</span>
                {" "}globally · Rank{" "}
                <span className="text-vscode-cyan font-semibold">
                  #{data.contestRank.toLocaleString()}
                </span>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
