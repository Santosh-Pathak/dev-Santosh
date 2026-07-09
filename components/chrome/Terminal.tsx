"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import { X, Plus, ChevronDown, Trash2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { executeCommand, OutputLine, LineColor } from "@/lib/terminal-commands";
import { usePortfolio } from "@/context/PortfolioContext";
import { problems, errorCount, warningCount, infoCount, type Problem } from "@/lib/problems";

// ─── Types ────────────────────────────────────────────────────────────────────
interface HistoryEntry {
  id: number;
  prompt: string;      // displayed prompt text (e.g. santosh@portfolio:~$)
  command: string;     // what the user typed
  output: OutputLine[];
}

// ─── Color map ────────────────────────────────────────────────────────────────
const COLOR: Record<LineColor, string> = {
  green:  "text-vscode-green",
  blue:   "text-vscode-blue",
  cyan:   "text-vscode-cyan",
  yellow: "text-vscode-yellow",
  red:    "text-vscode-red",
  pink:   "text-vscode-pink",
  orange: "text-vscode-orange",
  purple: "text-vscode-purple",
  muted:  "text-vscode-text-muted",
  bright: "text-vscode-bright",
};

// ─── Prompt component ─────────────────────────────────────────────────────────
function Prompt({ cwd }: { cwd: string }) {
  const dir = cwd === "~" ? "~" : cwd.replace("~/", "");
  return (
    <span className="shrink-0 select-none">
      <span className="text-vscode-green font-bold">santosh</span>
      <span className="text-vscode-text-muted">@</span>
      <span className="text-vscode-cyan font-bold">portfolio</span>
      <span className="text-vscode-text-muted">:</span>
      <span className="text-vscode-blue font-bold">~{dir !== "~" ? `/${dir}` : ""}</span>
      <span className="text-vscode-text-muted">$ </span>
    </span>
  );
}

// ─── Severity config ──────────────────────────────────────────────────────────
const SEV = {
  error:   { icon: AlertCircle,   color: "text-vscode-red",    label: "error"   },
  warning: { icon: AlertTriangle, color: "text-vscode-yellow", label: "warning" },
  info:    { icon: Info,          color: "text-vscode-blue",   label: "info"    },
} as const;

// ─── Problems panel ───────────────────────────────────────────────────────────
function ProblemsPanel() {
  return (
    <div className="flex-1 overflow-y-auto thin-scrollbar text-[12px] font-mono">
      {problems.map((p: Problem, i) => {
        const { icon: Icon, color } = SEV[p.severity];
        return (
          <div
            key={i}
            className="flex items-start gap-2 px-3 py-1.5 hover:bg-white/[0.04] border-b border-vscode-border/30 group cursor-default"
          >
            <Icon size={13} className={`${color} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <span className="text-vscode-text-primary">{p.message}</span>
              <span className="text-vscode-text-muted ml-2 text-[11px]">
                {p.file}:{p.line}:{p.col}
              </span>
            </div>
            <span className="text-vscode-text-muted text-[10px] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              {p.source}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Terminal component ───────────────────────────────────────────────────────
export function Terminal() {
  const { closeTerminal, navigateToFile } = usePortfolio();

  const [activeTab, setActiveTab] = useState<"terminal" | "problems">("terminal");
  const [cwd, setCwd] = useState("~");
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<HistoryEntry[]>([
    {
      id: 0,
      prompt: "",
      command: "",
      output: [
        { text: "  ___  ___  ___  _  _  ___  ___  _  _  ___  ___" },
        { text: " / __||   \\| __|| \\| || __||   \\| || ||  _|| __|" },
        { text: "| (__ | |) || _| | .` || _| | |) | || || |  | _|" },
        { text: " \\___||___/|___||_|\\_||___||___/|_||_||_|  |___|" },
        { text: "" },
        { text: "  Santosh Pathak's Portfolio Terminal  v1.0.0", color: "cyan" as LineColor },
        { text: "  Type 'help' for available commands.", color: "muted" as LineColor },
        { text: "" },
      ],
    },
  ]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [termHeight, setTermHeight] = useState(260);

  const inputRef    = useRef<HTMLInputElement>(null);
  const inputRowRef = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const idCounter   = useRef(1);

  // ── drag-to-resize ──────────────────────────────────────────────────────────
  const dragging   = useRef(false);
  const dragStartY = useRef(0);
  const dragStartH = useRef(0);

  const onDragStart = useCallback((e: React.MouseEvent) => {
    dragging.current   = true;
    dragStartY.current = e.clientY;
    dragStartH.current = termHeight;
    e.preventDefault();
  }, [termHeight]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = dragStartY.current - e.clientY;
      setTermHeight(Math.max(120, Math.min(600, dragStartH.current + delta)));
    };
    const onUp = () => { dragging.current = false; };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup",   onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup",   onUp);
    };
  }, []);

  // ── auto-scroll — always bring the input line into view ─────────────────────
  const scrollToInput = useCallback(() => {
    requestAnimationFrame(() => {
      inputRowRef.current?.scrollIntoView({ block: "end" });
      inputRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    scrollToInput();
  }, [entries, scrollToInput]);

  // ── focus + scroll input into view on click anywhere in terminal ────────────
  const focusInput = () => scrollToInput();

  // ── run command ─────────────────────────────────────────────────────────────
  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const result  = executeCommand(trimmed, cwd, inputHistory, navigateToFile);

      // Add to input history (skip empty)
      if (trimmed) {
        setInputHistory((prev) => [...prev, trimmed]);
      }
      setHistIdx(-1);

      if (result.clear) {
        setEntries([]);
        return;
      }

      if (result.newCwd) {
        setCwd(result.newCwd);
      }

      setEntries((prev) => [
        ...prev,
        {
          id:      idCounter.current++,
          prompt:  cwd,
          command: raw,
          output:  result.lines,
        },
      ]);
    },
    [cwd, inputHistory, navigateToFile]
  );

  // ── keyboard handler ────────────────────────────────────────────────────────
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        runCommand(input);
        setInput("");
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const newIdx = Math.min(histIdx + 1, inputHistory.length - 1);
        setHistIdx(newIdx);
        setInput(inputHistory[inputHistory.length - 1 - newIdx] ?? "");
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const newIdx = Math.max(histIdx - 1, -1);
        setHistIdx(newIdx);
        setInput(newIdx === -1 ? "" : inputHistory[inputHistory.length - 1 - newIdx] ?? "");
        return;
      }
      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setEntries([]);
        return;
      }
      if (e.key === "c" && e.ctrlKey) {
        e.preventDefault();
        setEntries((prev) => [
          ...prev,
          { id: idCounter.current++, prompt: cwd, command: input, output: [{ text: "^C", color: "red" as LineColor }] },
        ]);
        setInput("");
        return;
      }
    },
    [input, inputHistory, histIdx, runCommand, cwd]
  );

  // ── clear handler ───────────────────────────────────────────────────────────
  const clearTerminal = () => {
    setEntries([]);
    scrollToInput();
  };

  return (
    <div
      className="flex flex-col border-t border-vscode-border bg-vscode-titlebar font-mono text-[12.5px] select-text"
      style={{ height: termHeight, flexShrink: 0 }}
      onClick={focusInput}
    >
      {/* ── Drag handle ──────────────────────────────────────────────────── */}
      <div
        className="h-1 w-full shrink-0 hover:bg-vscode-blue/50 transition-colors"
        style={{ cursor: "row-resize" }}
        onMouseDown={onDragStart}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between h-8 px-3 border-b border-vscode-border bg-vscode-sidebar shrink-0">
        {/* Left: panel tabs */}
        <div className="flex items-center h-full">
          {/* Terminal tab */}
          <button
            onClick={(e) => { e.stopPropagation(); setActiveTab("terminal"); }}
            className={`flex items-center gap-1.5 h-full px-3 text-[11px] font-mono border-b-2 transition-colors ${
              activeTab === "terminal"
                ? "border-vscode-blue text-vscode-text-primary"
                : "border-transparent text-vscode-text-muted hover:text-vscode-text-primary"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-vscode-green inline-block" />
            bash
            <button
              onClick={(e) => { e.stopPropagation(); closeTerminal(); }}
              className="ml-0.5 text-vscode-text-muted hover:text-vscode-red"
            >
              <X size={10} />
            </button>
          </button>

          {/* Problems tab */}
          <button
            onClick={(e) => { e.stopPropagation(); setActiveTab("problems"); }}
            className={`flex items-center gap-1.5 h-full px-3 text-[11px] font-mono border-b-2 transition-colors ${
              activeTab === "problems"
                ? "border-vscode-blue text-vscode-text-primary"
                : "border-transparent text-vscode-text-muted hover:text-vscode-text-primary"
            }`}
          >
            <AlertTriangle size={11} className="text-vscode-yellow" />
            Problems
            <span className="ml-0.5 text-[10px] text-vscode-red font-semibold">{errorCount}</span>
            <span className="text-[10px] text-vscode-yellow font-semibold">{warningCount}</span>
          </button>

          {/* New terminal (+) */}
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="ml-1 text-vscode-text-muted hover:text-vscode-text-primary"
            title="New Terminal"
          >
            <Plus size={13} />
          </button>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {activeTab === "terminal" && (
            <button
              onClick={(e) => { e.stopPropagation(); clearTerminal(); }}
              className="text-vscode-text-muted hover:text-vscode-text-primary"
              title="Clear Terminal (Ctrl+L)"
            >
              <Trash2 size={13} />
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); closeTerminal(); }}
            className="text-vscode-text-muted hover:text-vscode-red"
            title="Close Panel"
          >
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* ── Problems panel ───────────────────────────────────────────────── */}
      {activeTab === "problems" && <ProblemsPanel />}

      {/* ── Terminal Body ─────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto thin-scrollbar px-3 pt-2 pb-1 leading-relaxed"
        style={{ overscrollBehavior: "contain", display: activeTab === "terminal" ? undefined : "none" }}
      >
        {entries.map((entry) => (
          <div key={entry.id}>
            {/* Prompt + command line (skip for the welcome entry) */}
            {entry.command !== "" && (
              <div className="flex items-start gap-0 whitespace-pre-wrap break-all">
                <Prompt cwd={entry.prompt} />
                <span className="text-vscode-bright">{entry.command}</span>
              </div>
            )}

            {/* Output lines */}
            {entry.output.map((line, li) => (
              <div
                key={li}
                className={`whitespace-pre-wrap break-all ${
                  line.color ? COLOR[line.color] : "text-vscode-text-primary"
                } ${line.bold ? "font-bold" : ""}`}
              >
                {line.text || "\u00A0"}
              </div>
            ))}
          </div>
        ))}

        {/* ── Current input line ──────────────────────────────────────── */}
        <div
          ref={inputRowRef}
          className="flex items-center gap-0 whitespace-nowrap"
        >
          <Prompt cwd={cwd} />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-vscode-bright caret-vscode-green"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
        {/* Spacer so the input row is never flush at the very bottom */}
        <div className="h-2 shrink-0" />
      </div>
    </div>
  );
}
