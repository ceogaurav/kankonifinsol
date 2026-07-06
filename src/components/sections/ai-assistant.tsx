"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, X, Send, Bot, User, Loader2, MessageCircle,
  Phone, CalendarClock, ArrowRight,
} from "lucide-react";
import { companyInfo } from "@/lib/site-data";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "What's the interest rate for a home loan?",
  "How do I improve my CIBIL score?",
  "What documents do I need for a business loan?",
  "Am I eligible for a personal loan?",
  "Book a free consultation",
];

const suggestions = [
  "How do I improve my CIBIL score?",
  "What documents do I need for a business loan?",
  "Am I eligible for a personal loan?",
  "Book a free consultation",
];

const welcome: Msg = {
  role: "assistant",
  content:
    "Namaste! I'm Kankoni, your AI financial concierge. I can help with loans, EMIs, eligibility, documents and bank comparisons. How can I assist you today?",
};

function genId() {
  return "kankoni-" + Math.random().toString(36).slice(2, 10);
}

export function AIAssistant() {
  const [open, setOpen] = React.useState(false);
  const [sessionId] = React.useState(() => genId());
  const [messages, setMessages] = React.useState<Msg[]>([welcome]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [hasNew, setHasNew] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setHasNew(true), 4000);
      return () => clearTimeout(t);
    } else {
      setHasNew(false);
    }
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: content, history: next.slice(-8) }),
      });
      const data = await res.json();
      const reply = data.reply || "I'm having trouble right now. Please call us at " + companyInfo.phone;
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I'm having connectivity trouble. Please WhatsApp or call us — we're here to help!" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 15 }}
        onClick={() => setOpen((p) => !p)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-royal-gradient text-white shadow-royal-glow sm:h-16 sm:w-16"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {hasNew && !open && (
          <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-navy-deep">
            1
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-3 z-50 flex h-[32rem] max-h-[80vh] w-[calc(100vw-1.5rem)] max-w-[25rem] flex-col overflow-hidden rounded-3xl border border-border/60 glass-strong shadow-premium sm:right-5"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 overflow-hidden bg-royal-gradient p-4 text-white">
              <div className="absolute inset-0 bg-mesh opacity-40" />
              <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/15 backdrop-blur">
                <Bot className="h-5 w-5" />
              </div>
              <div className="relative flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  Kankoni AI
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-400" />
                </p>
                <p className="text-[11px] text-white/70">Your financial concierge · Online</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="relative grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto premium-scrollbar bg-background/40 p-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${m.role === "user" ? "bg-royal/15 text-royal" : "bg-gold/15 text-gold"}`}>
                    {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </span>
                  <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-royal text-white rounded-tr-sm" : "bg-card border border-border/60 rounded-tl-sm"}`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <Bot className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border/60 bg-card px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick suggestions */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 border-t border-border/50 bg-background/40 p-3">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-border/70 bg-card/60 px-2.5 py-1 text-[11px] text-foreground/80 transition-colors hover:border-royal/50 hover:text-royal"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-border/50 bg-background/60 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about loans, EMI, eligibility…"
                className="flex-1 rounded-full border border-border/70 bg-card/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-royal"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-royal-gradient text-white transition-opacity disabled:opacity-40"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>

            {/* Footer actions */}
            <div className="flex items-center justify-center gap-4 border-t border-border/50 bg-background/40 px-4 py-2 text-[11px]">
              <a href={companyInfo.phoneHref} className="inline-flex items-center gap-1 text-muted-foreground hover:text-royal">
                <Phone className="h-3 w-3" /> Call
              </a>
              <a href="#contact" className="inline-flex items-center gap-1 text-muted-foreground hover:text-gold">
                <CalendarClock className="h-3 w-3" /> Book consultation
              </a>
              <a href="#contact" className="inline-flex items-center gap-1 text-muted-foreground hover:text-royal">
                Apply <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
