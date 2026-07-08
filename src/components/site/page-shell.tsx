"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "@/lib/router-store";
import { cn } from "@/lib/utils";

interface PageShellProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "default" | "wide";
}

export function PageShell({
  eyebrow,
  title,
  description,
  children,
  className,
  maxWidth = "default",
}: PageShellProps) {
  const navigate = useRouter((s) => s.navigate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative pt-28 pb-20 sm:pt-32", className)}
    >
      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-mesh opacity-40" />

      <div className={cn("relative mx-auto px-4 sm:px-6", maxWidth === "wide" ? "max-w-7xl" : "max-w-6xl")}>
        {/* Back button */}
        <button
          onClick={() => navigate("home")}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/50 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur transition-colors hover:border-royal/40 hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </button>

        {/* Page header */}
        <div className="mb-10 flex flex-col gap-4">
          {eyebrow && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.2rem]">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Page content */}
        {children}
      </div>
    </motion.div>
  );
}
