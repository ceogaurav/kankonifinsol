"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { services, companyInfo } from "@/lib/site-data";
import { useQuickApply } from "@/lib/quick-apply-store";
import { useRouter, navItems, type PageName } from "@/lib/router-store";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function Logo() {
  const navigate = useRouter((s) => s.navigate);
  return (
    <button onClick={() => navigate("home")} className="group flex shrink-0 items-center text-left" aria-label="Kankoni Finsol home">
      <div className="relative flex h-12 w-[165px] sm:h-13 sm:w-[190px] shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white px-3 py-1.5 shadow-md transition-transform duration-300 group-hover:scale-[1.03]">
        <img src="/logo.png" alt="Kankoni Finsol Logo" className="max-h-full w-full object-contain" />
      </div>
    </button>
  );
}


function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-card/40 text-foreground/80 backdrop-blur transition-colors hover:text-foreground hover:bg-card"
    >
      {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useRouter((s) => s.navigate);
  const currentPage = useRouter((s) => s.page);
  const openModal = useQuickApply((s) => s.openModal);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNav(page: PageName) {
    navigate(page);
    setMobileOpen(false);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6",
          scrolled ? "mt-2 rounded-2xl border border-border/60 glass-nav py-2.5 shadow-premium sm:mt-3" : "py-4"
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <button
            onClick={() => handleNav("home")}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              currentPage === "home" ? "bg-accent/60 text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            )}
          >
            Home
          </button>

          {/* Services mega menu */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
              aria-expanded={servicesOpen}
            >
              Products
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3"
                >
                  <div className="glass-strong rounded-2xl border border-border/70 p-4 shadow-premium">
                    <div className="grid grid-cols-2 gap-1">
                      {services.map((s) => (
                        <button
                          key={s.slug}
                          onClick={() => { handleNav("services"); }}
                          className="group flex items-start gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-accent/60"
                        >
                          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-royal/10 text-royal transition-colors group-hover:bg-royal group-hover:text-white">
                            <s.icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-foreground">{s.name}</span>
                            <span className="block truncate text-xs text-muted-foreground">{s.tagline}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.filter(l => ["emi", "compare", "about", "contact"].includes(l.page)).map((l) => (
            <button
              key={l.page}
              onClick={() => handleNav(l.page)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                currentPage === l.page ? "bg-accent/60 text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              )}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={companyInfo.phoneHref}
            className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3.5 py-2 text-sm font-medium text-foreground/90 backdrop-blur transition-colors hover:bg-card sm:flex"
          >
            <Phone className="h-3.5 w-3.5 text-gold" />
            {companyInfo.phone}
          </a>
          <Button
            onClick={() => openModal("Personal Loan")}
            className="hidden rounded-full bg-royal-gradient px-5 text-sm font-semibold text-white shadow-royal-glow hover:opacity-95 md:inline-flex"
          >
            Apply Now
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="grid h-9 w-9 place-items-center rounded-full border border-border/70 bg-card/40 backdrop-blur lg:hidden">
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent className="w-[88vw] max-w-sm border-border/60 bg-background p-0">
              <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                <Logo />
                <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-border/70">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Mobile">
                {navItems.map((l) => (
                  <button
                    key={l.page}
                    onClick={() => handleNav(l.page)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                      currentPage === l.page ? "bg-accent/60 text-foreground" : "text-foreground/80 hover:bg-accent/60 hover:text-foreground"
                    )}
                  >
                    {l.label}
                  </button>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-1 px-1">
                  {services.slice(0, 8).map((s) => (
                    <button key={s.slug} onClick={() => handleNav("services")} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-accent/60">
                      <s.icon className="h-3.5 w-3.5 text-royal" />
                      {s.name}
                    </button>
                  ))}
                </div>
                <button onClick={() => { setMobileOpen(false); openModal("Personal Loan"); }} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-royal-gradient px-5 py-3 text-sm font-semibold text-white shadow-royal-glow">
                  <Sparkles className="h-4 w-4" /> Apply Now
                </button>
                <a href={companyInfo.phoneHref} className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-border/70 px-5 py-3 text-sm font-medium">
                  <Phone className="h-4 w-4 text-gold" /> {companyInfo.phone}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

const navLinks = navItems;
