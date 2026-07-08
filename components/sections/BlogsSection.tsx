"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, Clock, Tag, RefreshCw } from "lucide-react";
import type { MediumPost, MediumFeedResponse } from "@/app/api/medium/route";

type Status = "loading" | "ok" | "error";

function formatDate(raw: string): string {
  if (!raw) return "";
  const d = new Date(raw);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function BlogCard({ post }: { post: MediumPost }) {
  return (
    <div className="relative bg-white/[0.02] border border-vscode-border rounded overflow-hidden
                    hover:border-white/[0.14] hover:-translate-y-0.5 hover:bg-white/[0.03]
                    transition-all duration-200 flex flex-col group">

      {/* Thumbnail */}
      <div className="w-full h-44 bg-vscode-sidebar overflow-hidden relative flex-shrink-0">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
            unoptimized // external URL
          />
        ) : (
          /* Placeholder when no thumbnail */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-vscode-sidebar to-vscode-bg">
            <span className="font-mono text-4xl opacity-20">✍️</span>
          </div>
        )}
        {/* Reading time badge */}
        <span className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[10px]
                         bg-vscode-bg/80 border border-vscode-border rounded px-1.5 py-0.5
                         text-vscode-text-muted backdrop-blur-sm">
          <Clock size={9} />
          {post.readingTime} min read
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Tags */}
        {post.categories.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <Tag size={10} className="text-vscode-text-muted flex-shrink-0" />
            {post.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-mono text-vscode-cyan border border-vscode-cyan/30
                           bg-vscode-cyan/5 px-1.5 py-0.5 rounded-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-display font-bold text-[16px] text-vscode-bright leading-snug mb-2 flex-1">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-vscode-text-muted leading-[1.75] mb-3 line-clamp-3">
          {post.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-vscode-border">
          <span className="font-mono text-[10px] text-vscode-text-muted">
            {formatDate(post.pubDate)}
          </span>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-mono text-[11px] text-vscode-text-muted
                       hover:text-vscode-cyan transition-colors"
          >
            Read more
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function BlogsSection() {
  const [status, setStatus] = useState<Status>("loading");
  const [posts,  setPosts]  = useState<MediumPost[]>([]);
  const [error,  setError]  = useState("");

  const fetchPosts = () => {
    setStatus("loading");
    fetch("/api/medium")
      .then((r) => r.json() as Promise<MediumFeedResponse>)
      .then((data) => {
        if (data.status === "ok" && data.posts.length > 0) {
          setPosts(data.posts);
          setStatus("ok");
        } else {
          setError(data.error ?? "No posts found");
          setStatus("error");
        }
      })
      .catch((e) => {
        setError(e.message ?? "Network error");
        setStatus("error");
      });
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <section className="px-8 py-16 md:px-12 lg:px-16">
      {/* Comment */}
      <p className="font-mono text-sm italic mb-6" style={{ color: "#98c379" }}>
        {"// blogs.md : writing on the web"}
      </p>

      <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-2">
        Blog
      </h2>

      <p className="font-mono text-sm text-vscode-text-muted mb-8">
        <span className="text-vscode-blue">import</span>{" "}
        <span className="text-vscode-cyan">posts</span>{" "}
        <span className="text-vscode-text-primary">from</span>{" "}
        <span className="text-vscode-green">&quot;@medium/pathaksantosh987&quot;</span>
      </p>

      {/* Loading */}
      {status === "loading" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 max-w-6xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/[0.02] border border-vscode-border rounded overflow-hidden animate-pulse">
              <div className="h-44 bg-vscode-border/30" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-3 bg-vscode-border/40 rounded w-1/2" />
                <div className="h-4 bg-vscode-border/40 rounded w-full" />
                <div className="h-4 bg-vscode-border/40 rounded w-3/4" />
                <div className="h-3 bg-vscode-border/30 rounded w-full mt-2" />
                <div className="h-3 bg-vscode-border/30 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="flex flex-col items-center gap-4 py-16 text-center max-w-md">
          <span className="text-4xl">📡</span>
          <p className="font-mono text-sm text-vscode-text-muted">
            Could not load posts from Medium.
          </p>
          <p className="font-mono text-xs text-vscode-text-muted opacity-60">{error}</p>
          <button
            onClick={fetchPosts}
            className="flex items-center gap-2 font-mono text-xs border border-vscode-border
                       px-3 py-1.5 rounded hover:bg-vscode-border/50 hover:text-vscode-text-primary
                       text-vscode-text-muted transition-colors"
          >
            <RefreshCw size={11} /> Retry
          </button>
          <a
            href="https://medium.com/@pathaksantosh987"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-vscode-cyan hover:underline"
          >
            Visit Medium profile ↗
          </a>
        </div>
      )}

      {/* Posts grid */}
      {status === "ok" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 max-w-6xl">
            {posts.map((post) => (
              <BlogCard key={post.link} post={post} />
            ))}
          </div>

          <div className="mt-8">
            <a
              href="https://medium.com/@pathaksantosh987"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm border border-vscode-border
                         px-4 py-2 rounded hover:bg-vscode-border/40 hover:text-vscode-text-primary
                         text-vscode-text-muted transition-colors"
            >
              View all posts on Medium
              <ExternalLink size={13} />
            </a>
          </div>
        </>
      )}
    </section>
  );
}
