"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <footer className="border-t border-border px-6 md:px-10 md:pl-20 py-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mounted && resolvedTheme === "light" ? "/logo-light.png" : "/logo-dark.png"}
            alt="Native Dev"
            className="h-14 w-auto"
          />
          <p className="font-mono text-[11px] text-ink-faint max-w-xs text-center sm:text-left leading-relaxed">
            Building products people actually use.<br />Open to full-time &amp; freelance.
          </p>
        </div>

        {/* Right: colophon + credit */}
        <div className="flex flex-col items-center sm:items-end gap-2 font-mono text-[11px] text-ink-faint">
          <span className="text-center sm:text-right">
            next.js · tailwind · framer-motion · three.js
          </span>
          <span>jetbrains mono · inter</span>
          <span className="mt-1 text-ink-muted">© 2026 Habeeb Oke</span>
        </div>
      </div>
    </footer>
  );
}
