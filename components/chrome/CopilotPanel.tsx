"use client";

import React, { useState } from "react";
import { X, Pencil, Send, Sparkles } from "lucide-react";
import { copilotChips, CopilotChip } from "@/lib/copilot-responses";
import { usePortfolio } from "@/context/PortfolioContext";
import { useResizable } from "@/hooks/useResizable";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function CopilotPanel() {
  const { copilotOpen, closeCopilot } = usePortfolio();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const msgsLeft = Math.max(0, 2 - messages.filter((m) => m.role === "user").length);

  const { width: panelWidth, onMouseDown: onResizeMouseDown } = useResizable({
    defaultWidth: 380,
    minWidth: 260,
    maxWidth: 600,
    direction: "left",
    storageKey: "copilot-panel-width",
  });

  if (!copilotOpen) return null;

  const handleChip = (chip: CopilotChip) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: chip.label },
      { role: "assistant", content: chip.response },
    ]);
  };

  const handleSend = () => {
    if (!input.trim() || msgsLeft <= 0) return;
    const userMsg = input.trim();
    setInput("");

    // Try to match against chip labels
    const match = copilotChips.find((c) =>
      c.label.toLowerCase().includes(userMsg.toLowerCase()) ||
      userMsg.toLowerCase().includes(c.id.toLowerCase())
    );

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMsg },
      {
        role: "assistant",
        content:
          match?.response ??
          "I can answer questions about Santosh's projects, skills, experience, and how to contact him. Try one of the suggestion chips above!",
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showIntro = messages.length === 0;

  return (
    <div
      className="flex-shrink-0 border-l border-vscode-border bg-vscode-sidebar flex flex-col overflow-hidden md:relative fixed inset-0 md:inset-auto z-40 md:z-auto"
      style={{ width: panelWidth }}
    >
      {/* Resize handle — left edge */}
      <div
        onMouseDown={onResizeMouseDown}
        className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize z-10 group hidden md:block"
        title="Drag to resize"
      >
        <div className="h-full w-px bg-vscode-border group-hover:bg-vscode-pink transition-colors" />
      </div>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-vscode-border flex-shrink-0">
        <Sparkles size={15} className="text-vscode-pink" />
        <span className="font-mono text-sm font-semibold text-vscode-text-primary flex-1">
          ✨ Santosh&apos;s AI Assistant
        </span>
        <button className="p-1 rounded hover:bg-vscode-border text-vscode-text-muted">
          <Pencil size={13} />
        </button>
        <button
          onClick={closeCopilot}
          className="p-1 rounded hover:bg-vscode-border text-vscode-text-muted"
        >
          <X size={13} />
        </button>
      </div>

      {/* Workspace pill */}
      <div className="px-4 py-2 border-b border-vscode-border flex-shrink-0">
        <span className="font-mono text-[11px] text-vscode-text-muted uppercase tracking-widest block mb-1">
          WORKSPACE
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-vscode-text-primary border border-vscode-border rounded-full px-2.5 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-vscode-green" />
          portfolio · santosh-pathak
        </span>
      </div>

      {/* Messages / intro */}
      <div className="flex-1 overflow-y-auto thin-scrollbar p-4 flex flex-col gap-3">
        {showIntro ? (
          <div className="flex flex-col items-center text-center py-4">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, #ff5fbf, #c586c0, #61afef)",
              }}
            >
              🙂
            </div>
            <p className="font-mono text-sm font-semibold text-vscode-text-primary mb-1">
              Hi! I&apos;m Santosh&apos;s Copilot 👋
            </p>
            <p className="text-vscode-text-muted text-xs leading-relaxed max-w-xs">
              Ask me anything about his projects, skills, experience, or achievements.
            </p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              {msg.role === "user" ? (
                <div className="bg-vscode-blue/20 border border-vscode-blue/30 rounded-lg px-3 py-2 max-w-[85%]">
                  <p className="font-mono text-sm text-vscode-text-primary">{msg.content}</p>
                </div>
              ) : (
                <div className="bg-vscode-border/40 rounded-lg px-3 py-2 max-w-[95%]">
                  <p className="font-mono text-[12px] text-vscode-text-primary whitespace-pre-line leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              )}
            </div>
          ))
        )}

        {/* Suggestion chips (always shown when intro visible) */}
        {showIntro && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {copilotChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleChip(chip)}
                className="flex items-start gap-1.5 text-left border border-vscode-border bg-vscode-bg hover:bg-vscode-border/50 rounded-lg px-3 py-2 font-mono text-[11px] text-vscode-text-muted hover:text-vscode-text-primary transition-colors"
              >
                <Sparkles size={10} className="text-vscode-pink mt-0.5 flex-shrink-0" />
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-vscode-border p-3 flex-shrink-0">
        <p className="font-mono text-[10px] text-vscode-text-muted text-center mb-2">
          {msgsLeft} msgs left
        </p>
        <div className="flex items-end gap-2 bg-vscode-bg border border-vscode-border rounded-lg px-3 py-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Santosh's projects, experience, skills..."
            rows={2}
            disabled={msgsLeft <= 0}
            className="flex-1 bg-transparent font-mono text-[12px] text-vscode-text-primary placeholder-vscode-text-muted resize-none outline-none disabled:opacity-40"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || msgsLeft <= 0}
            className="p-1.5 rounded text-vscode-blue hover:bg-vscode-blue/20 disabled:opacity-30 transition-colors flex-shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
        <p className="font-mono text-[10px] text-vscode-text-muted text-center mt-2">
          AI can make mistakes · Contact Santosh directly for important info
        </p>
      </div>
    </div>
  );
}

