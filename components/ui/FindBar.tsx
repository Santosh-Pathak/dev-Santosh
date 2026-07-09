"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronUp, ChevronDown, CaseSensitive } from "lucide-react";

// CSS Custom Highlight API type augmentation
declare global {
  interface Window {
    Highlight?: new (...ranges: Range[]) => {
      [Symbol.iterator](): Iterator<Range>;
    };
    CSS: typeof CSS & {
      highlights?: Map<string, unknown>;
    };
  }
}

interface FindBarProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onClose:      () => void;
}

function getAllTextNodes(root: Node): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) nodes.push(n as Text);
  return nodes;
}

function findRanges(textNodes: Text[], query: string, caseSensitive: boolean): Range[] {
  if (!query) return [];
  const ranges: Range[] = [];
  const q = caseSensitive ? query : query.toLowerCase();

  for (const node of textNodes) {
    const text = caseSensitive ? node.nodeValue ?? "" : (node.nodeValue ?? "").toLowerCase();
    let idx = 0;
    while (true) {
      const pos = text.indexOf(q, idx);
      if (pos === -1) break;
      const range = new Range();
      range.setStart(node, pos);
      range.setEnd(node, pos + query.length);
      ranges.push(range);
      idx = pos + 1;
    }
  }
  return ranges;
}

const HIGHLIGHT_KEY     = "find-matches";
const HIGHLIGHT_CURRENT = "find-current";

function applyHighlights(ranges: Range[], currentIdx: number) {
  if (!window.CSS?.highlights || !window.Highlight) return;
  window.CSS.highlights.delete(HIGHLIGHT_KEY);
  window.CSS.highlights.delete(HIGHLIGHT_CURRENT);
  if (!ranges.length) return;

  const others  = ranges.filter((_, i) => i !== currentIdx);
  const current = ranges[currentIdx];

  if (others.length)  window.CSS.highlights.set(HIGHLIGHT_KEY,     new window.Highlight!(...others));
  if (current)        window.CSS.highlights.set(HIGHLIGHT_CURRENT, new window.Highlight!(current));
}

function clearHighlights() {
  if (!window.CSS?.highlights) return;
  window.CSS.highlights.delete(HIGHLIGHT_KEY);
  window.CSS.highlights.delete(HIGHLIGHT_CURRENT);
}

export function FindBar({ containerRef, onClose }: FindBarProps) {
  const [query,         setQuery]         = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [ranges,        setRanges]        = useState<Range[]>([]);
  const [currentIdx,    setCurrentIdx]    = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  // Run search whenever query or caseSensitive changes
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !query.trim()) {
      clearHighlights();
      setRanges([]);
      setCurrentIdx(0);
      return;
    }

    const textNodes = getAllTextNodes(root);
    const found     = findRanges(textNodes, query, caseSensitive);
    setRanges(found);
    setCurrentIdx(0);
    applyHighlights(found, 0);
  }, [query, caseSensitive, containerRef]);

  // Update highlight when currentIdx changes
  useEffect(() => {
    applyHighlights(ranges, currentIdx);

    // Scroll current match into view
    if (ranges[currentIdx]) {
      const el = ranges[currentIdx].startContainer.parentElement;
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [currentIdx, ranges]);

  // Cleanup on unmount
  useEffect(() => () => clearHighlights(), []);

  const goNext = useCallback(() => {
    if (!ranges.length) return;
    setCurrentIdx((i) => (i + 1) % ranges.length);
  }, [ranges]);

  const goPrev = useCallback(() => {
    if (!ranges.length) return;
    setCurrentIdx((i) => (i - 1 + ranges.length) % ranges.length);
  }, [ranges]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape")         { onClose(); return; }
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); goNext(); }
    if (e.key === "Enter" &&  e.shiftKey) { e.preventDefault(); goPrev(); }
  };

  const hasMatches   = ranges.length > 0;
  const noMatch      = query.trim() !== "" && !hasMatches;
  const matchLabel   = !query.trim() ? "" : hasMatches
    ? `${currentIdx + 1} of ${ranges.length}`
    : "No results";

  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 bg-vscode-sidebar border-b border-vscode-border font-mono text-[12px] flex-shrink-0 animate-tab-enter"
      style={{ zIndex: 20 }}
    >
      {/* Search input */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Find"
          className={`w-48 bg-vscode-bg border rounded px-2 py-1 text-vscode-text-primary placeholder-vscode-text-muted outline-none text-[12px] font-mono transition-colors ${
            noMatch
              ? "border-vscode-red/60 bg-vscode-red/5"
              : "border-vscode-border focus:border-vscode-blue"
          }`}
        />
        {/* Case-sensitive toggle */}
        <button
          onClick={() => setCaseSensitive((v) => !v)}
          title="Match case (Alt+C)"
          className={`absolute right-1 p-0.5 rounded transition-colors ${
            caseSensitive
              ? "text-vscode-cyan bg-vscode-cyan/15"
              : "text-vscode-text-muted hover:text-vscode-text-primary"
          }`}
        >
          <CaseSensitive size={12} />
        </button>
      </div>

      {/* Match counter */}
      <span
        className={`text-[11px] min-w-[6rem] ${
          noMatch ? "text-vscode-red" : "text-vscode-text-muted"
        }`}
      >
        {matchLabel}
      </span>

      {/* Prev / Next */}
      <button
        onClick={goPrev}
        disabled={!hasMatches}
        title="Previous match (Shift+Enter)"
        className="p-1 rounded text-vscode-text-muted hover:text-vscode-text-primary hover:bg-vscode-border/50 disabled:opacity-30 transition-colors"
      >
        <ChevronUp size={13} />
      </button>
      <button
        onClick={goNext}
        disabled={!hasMatches}
        title="Next match (Enter)"
        className="p-1 rounded text-vscode-text-muted hover:text-vscode-text-primary hover:bg-vscode-border/50 disabled:opacity-30 transition-colors"
      >
        <ChevronDown size={13} />
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        title="Close (Escape)"
        className="ml-1 p-1 rounded text-vscode-text-muted hover:text-vscode-red hover:bg-vscode-border/50 transition-colors"
      >
        <X size={13} />
      </button>
    </div>
  );
}
