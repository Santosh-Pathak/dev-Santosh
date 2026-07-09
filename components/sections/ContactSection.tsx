"use client";

import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { contactLinks } from "@/data/portfolio";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:pathaksantosh987@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailtoLink, "_blank");
    setSubmitted(true);
  };

  return (
    <section className="px-6 py-14 md:px-10 lg:px-14">
      {/* Comment */}
      <p className="font-mono text-sm italic mb-6" style={{ color: "#98c379" }}>
        {"/* contact.css — let's build something */"}
      </p>

      <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-2">Contact</h2>
      <p className="font-mono text-sm text-vscode-text-muted mb-10">
        {"// open to work, collabs & good conversations"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl">
        {/* Left: Find me on */}
        <div>
          <h3 className="font-mono text-xs font-semibold tracking-widest text-vscode-cyan uppercase mb-4">
            FIND ME ON
          </h3>
          <div className="flex flex-col gap-2">
            {contactLinks.map((link) => (
              <a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-vscode-border bg-vscode-sidebar rounded-lg px-4 py-3 hover:border-vscode-text-muted transition-colors group"
              >
                {/* Icon box */}
                <div className={`w-8 h-8 rounded flex items-center justify-center text-sm flex-shrink-0 ${link.iconBg}`}>
                  <span className={link.iconColor}>{link.icon}</span>
                </div>
                {/* Label + value */}
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10px] text-vscode-text-muted uppercase tracking-widest block">
                    {link.label}
                  </span>
                  <span className="font-mono text-[13px] text-vscode-text-primary truncate block">
                    {link.value}
                  </span>
                </div>
                <ExternalLink size={13} className="text-vscode-text-muted group-hover:text-vscode-text-primary flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Send a message */}
        <div>
          <h3 className="font-mono text-xs font-semibold tracking-widest text-vscode-cyan uppercase mb-4">
            SEND A MESSAGE
          </h3>

          {submitted ? (
            <div className="border border-vscode-green/40 bg-vscode-green/10 rounded-lg p-6 text-center">
              <p className="font-mono text-vscode-green text-sm mb-1">✓ Message sent!</p>
              <p className="text-vscode-text-muted text-sm">Your email client should have opened.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 font-mono text-xs text-vscode-text-muted hover:text-vscode-text-primary underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { id: "name", label: "// YOUR_NAME *", placeholder: "string", required: true, type: "text" },
                { id: "email", label: "// YOUR_EMAIL *", placeholder: "string", required: true, type: "email" },
                { id: "subject", label: "// SUBJECT", placeholder: "string", required: false, type: "text" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="font-mono text-[11px] text-vscode-text-muted block mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.id}
                    value={form[field.id as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full bg-vscode-sidebar border border-vscode-border rounded px-3 py-2 font-mono text-sm text-vscode-text-primary placeholder-vscode-text-muted focus:outline-none focus:border-vscode-blue transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="font-mono text-[11px] text-vscode-text-muted block mb-1">
                  {"// MESSAGE *"}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={"'''your message'''"}
                  required
                  rows={5}
                  className="w-full bg-vscode-sidebar border border-vscode-border rounded px-3 py-2 font-mono text-sm text-vscode-text-primary placeholder-vscode-text-muted focus:outline-none focus:border-vscode-blue transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-vscode-blue hover:bg-[#4fa3e0] text-[#1e1e2e] font-mono font-semibold py-2.5 rounded transition-colors"
              >
                → send_message()
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

