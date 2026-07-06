"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Calendar, Clock, ArrowRight, Sparkles, Share2, BookOpen, CheckCircle2,
} from "lucide-react";
import { type BlogPost, getBlogContent } from "@/lib/site-data";
import { useQuickApply } from "@/lib/quick-apply-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogDetailModalProps {
  post: BlogPost | null;
  open: boolean;
  onClose: () => void;
}

function renderMarkdown(md: string) {
  // Lightweight markdown renderer: headings, bold, lists, paragraphs.
  const lines = md.split("\n");
  const out: React.ReactNode[] = [];
  let list: React.ReactNode[] = [];
  let key = 0;

  const flushList = () => {
    if (list.length) {
      out.push(
        <ul key={`ul-${key++}`} className="my-3 space-y-1.5 pl-1">
          {list}
        </ul>
      );
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      out.push(<h4 key={key++} className="mt-5 font-display text-base font-semibold text-foreground">{line.slice(4)}</h4>);
    } else if (line.startsWith("## ")) {
      flushList();
      out.push(<h3 key={key++} className="mt-6 font-display text-lg font-bold text-foreground">{line.slice(3)}</h3>);
    } else if (line.startsWith("- ") || /^\d+\.\s/.test(line)) {
      const content = line.replace(/^(- |\d+\.\s)/, "");
      list.push(
        <li key={`li-${key++}`} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal" />
          <span dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>') }} />
        </li>
      );
    } else {
      flushList();
      out.push(<p key={key++} className="my-2 text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>') }} />);
    }
  }
  flushList();
  return out;
}

const accentBar: Record<string, string> = {
  royal: "from-royal to-royal/40",
  gold: "from-gold to-gold/40",
  navy: "from-navy to-royal/40",
};

export function BlogDetailModal({ post, open, onClose }: BlogDetailModalProps) {
  const openApply = useQuickApply((s) => s.openModal);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const content = post ? getBlogContent(post.slug) : "";

  return (
    <AnimatePresence>
      {open && post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] grid place-items-center bg-navy-deep/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${post.title} article`}
        >
          <motion.div
            initial={{ scale: 0.95, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-premium"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-background/60 backdrop-blur transition-colors hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="relative h-32 overflow-hidden bg-royal-gradient sm:h-40">
              <div className="absolute inset-0 bg-mesh opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="h-14 w-14 text-white/25" />
              </div>
              <div className={cn("absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r", accentBar[post.accent])} />
              <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                {post.category}
              </span>
            </div>

            {/* Body */}
            <div className="max-h-[calc(90vh-9rem)] overflow-y-auto premium-scrollbar p-6 sm:p-8">
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime} min read
                </span>
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="h-3 w-3" /> {post.author}
                </span>
              </div>

              <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                {post.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-gold">{post.excerpt}</p>

              <div className="mt-5 border-t border-border/50 pt-5">
                {renderMarkdown(content)}
              </div>

              {/* CTA */}
              <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-base font-semibold">Ready to act on this?</p>
                  <p className="text-xs text-muted-foreground">Get instant offers from 100+ banks with one application.</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => { onClose(); openApply("Personal Loan"); }}
                    className="rounded-xl bg-royal-gradient px-5 text-sm font-semibold text-white shadow-royal-glow"
                  >
                    <Sparkles className="mr-1.5 h-4 w-4" /> Apply Now
                  </Button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: post.title, text: post.excerpt }).catch(() => {});
                      } else if (navigator.clipboard) {
                        navigator.clipboard.writeText(post.title);
                      }
                    }}
                    aria-label="Share article"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-border/70 bg-background/50 text-muted-foreground hover:text-foreground"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useBlogDetail() {
  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [open, setOpen] = React.useState(false);
  const openDetail = React.useCallback((p: BlogPost) => { setPost(p); setOpen(true); }, []);
  const close = React.useCallback(() => setOpen(false), []);
  return { post, open, openDetail, close };
}
