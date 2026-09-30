"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#work", label: "work" },
  { href: "#experience", label: "exp" },
  { href: "#community", label: "community" },
  { href: "#now", label: "now" },
  { href: "#contact", label: "contact" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);

  const scramble = useCallback(() => {
    let iterations = 0;
    cancelAnimationFrame(rafRef.current);
    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iterations) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iterations += 0.4;
      if (iterations < text.length) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <span onMouseEnter={scramble} className="font-mono text-sm font-medium">
      {display}
      <span className="text-accent">.dev</span>
    </span>
  );
}

// ─── Bulb SVG ────────────────────────────────────────────────────────────────

function LightBulbSVG({ on }: { on: boolean }) {
  return (
    <svg
      width="30"
      height="44"
      viewBox="0 0 30 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glass dome */}
      <path
        d="M15 2C8 2 2 8 2 15C2 21 6 25 9 27.5V33H21V27.5C24 25 28 21 28 15C28 8 22 2 15 2Z"
        fill={on ? "#fff9c4" : "#1e1e2e"}
        stroke={on ? "#f0c040" : "#555555"}
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ transition: "fill 0.25s, stroke 0.25s" }}
      />
      {/* Filament */}
      <path
        d="M11 18 Q13 13 15 18 Q17 23 19 18"
        stroke={on ? "#f5c030" : "#333333"}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        style={{ transition: "stroke 0.25s" }}
      />
      {/* Base ridge 1 */}
      <rect
        x="9" y="33" width="12" height="3" rx="0.5"
        fill={on ? "#c8a020" : "#444444"}
        style={{ transition: "fill 0.25s" }}
      />
      {/* Base ridge 2 */}
      <rect
        x="9" y="36" width="12" height="3" rx="0.5"
        fill={on ? "#b08010" : "#3a3a3a"}
        style={{ transition: "fill 0.25s" }}
      />
      {/* Screw tip */}
      <rect
        x="10" y="39" width="10" height="2.5" rx="0.5"
        fill={on ? "#906010" : "#2a2a2a"}
        style={{ transition: "fill 0.25s" }}
      />
    </svg>
  );
}

// ─── Bulb drop animation ──────────────────────────────────────────────────────

function BulbAnimation({
  targetTheme,
  buttonRect,
  onThemeChange,
  onDone,
}: {
  targetTheme: "light" | "dark";
  buttonRect: DOMRect;
  onThemeChange: () => void;
  onDone: () => void;
}) {
  const isLight = targetTheme === "light";
  // Start ON when switching to dark (show it turning off); OFF when switching to light (show it turning on)
  const [bulbOn, setBulbOn] = useState(!isLight);

  const CORD_H = 88;
  const BULB_H = 44;
  const TOTAL_H = CORD_H + BULB_H;
  const cx = buttonRect.left + buttonRect.width / 2;

  useEffect(() => {
    // Flip bulb state at the lowest point (~650ms) and trigger theme change
    const t1 = setTimeout(() => {
      setBulbOn(isLight);
      onThemeChange();
    }, 660);
    const t2 = setTimeout(onDone, 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        left: cx,
        top: 0,
        translateX: "-50%",
        zIndex: 29, // below nav (z-30), above page content
      }}
      initial={{ y: -(TOTAL_H + 8) }}
      animate={{
        y: [
          -(TOTAL_H + 8), // hidden above nav
          18,             // dropped — hangs below nav
          18,             // hold at bottom
          -(TOTAL_H + 8), // retract back up
        ],
      }}
      transition={{
        duration: 1.5,
        times: [0, 0.43, 0.60, 1.0],
        ease: ["easeOut", "linear", "easeIn"],
      }}
    >
      {/* Cord */}
      <div
        style={{
          width: 1.5,
          height: CORD_H,
          background: "linear-gradient(to bottom, transparent 0%, #888 12%, #888 100%)",
          margin: "0 auto",
        }}
      />

      {/* Glow halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: CORD_H + BULB_H * 0.5,
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,245,100,0.70) 0%, rgba(255,245,100,0) 70%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
        initial={{
          width: bulbOn ? 150 : 0,
          height: bulbOn ? 150 : 0,
        }}
        animate={{
          width: bulbOn ? 150 : 0,
          height: bulbOn ? 150 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Bulb */}
      <div style={{ marginLeft: -1 }}>
        <LightBulbSVG on={bulbOn} />
      </div>
    </motion.div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

export default function Nav() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bulb, setBulb] = useState<{
    targetTheme: "light" | "dark";
    rect: DOMRect;
  } | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const activeTheme = resolvedTheme ?? theme;

  const handleThemeToggle = () => {
    if (bulb) return; // prevent re-trigger during animation
    const next = (activeTheme === "dark" ? "light" : "dark") as "light" | "dark";
    if (toggleBtnRef.current) {
      const rect = toggleBtnRef.current.getBoundingClientRect();
      setBulb({ targetTheme: next, rect });
    } else {
      setTheme(next);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="h-0.75 bg-accent" />
        <div className="flex items-center justify-between px-6 md:px-10 py-4 md:pl-20">
          <a href="#hero" onClick={() => setMenuOpen(false)}>
            <ScrambleText text="native" />
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden sm:flex items-center gap-6 font-mono text-[11px] text-ink-muted relative"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 hover:text-ink transition-colors"
                onMouseEnter={() => setHoveredLink(link.href)}
              >
                {link.label}
                {hoveredLink === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex font-mono text-xs text-ink-muted border border-border rounded px-2 py-1.5 hover:border-accent hover:text-accent transition-colors"
            >
              résumé ↗
            </a>
            <button
              ref={toggleBtnRef}
              type="button"
              onClick={handleThemeToggle}
              className="font-mono text-xs text-ink-muted border border-border rounded px-2 py-1.5 hover:border-ink-muted transition-colors w-14 text-center"
              aria-label="Toggle color theme"
            >
              {mounted ? (activeTheme === "dark" ? "light" : "dark") : " "}
            </button>
            <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-ink-muted border border-border rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              open to opportunities
            </div>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <motion.span
                className="block w-5 h-px bg-ink-muted"
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-px bg-ink-muted"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-px bg-ink-muted"
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Bulb drop animation — renders when theme toggle is clicked */}
      {bulb && (
        <BulbAnimation
          targetTheme={bulb.targetTheme}
          buttonRect={bulb.rect}
          onThemeChange={() => setTheme(bulb.targetTheme)}
          onDone={() => setBulb(null)}
        />
      )}

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-20 bg-bg/60 backdrop-blur-sm sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="fixed top-[calc(var(--nav-height,57px))] right-0 bottom-0 z-20 w-64 bg-bg border-l border-border flex flex-col sm:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <nav className="flex flex-col px-6 pt-8 pb-4 gap-1 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="font-mono text-sm text-ink-muted hover:text-ink py-3 border-b border-border last:border-0 transition-colors"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Resume + status at bottom */}
              <div className="px-6 pb-8 flex flex-col gap-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-ink-muted border border-border rounded px-4 py-2.5 text-center hover:border-accent hover:text-accent transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  résumé ↗
                </a>
                <div className="flex items-center justify-center gap-2 font-mono text-[11px] text-ink-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  open to opportunities
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
