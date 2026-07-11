"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "HERO" },
  { id: "about", label: "ABOUT" },
  { id: "work", label: "WORK" },
  { id: "experience", label: "EXP" },
  { id: "now", label: "NOW" },
  { id: "contact", label: "CONTACT" },
];

export default function StatusRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-14 border-r border-border flex-col items-center pt-32 gap-7 z-40 bg-bg"
      aria-hidden="true"
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group relative flex items-center justify-center"
        >
          <span
            className={`block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              active === s.id ? "bg-accent" : "bg-border"
            }`}
          />
          <span
            className={`absolute left-6 whitespace-nowrap font-mono text-[10px] tracking-wider transition-all duration-200 pointer-events-none ${
              active === s.id
                ? "text-accent opacity-100 translate-x-0"
                : "text-ink-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
            }`}
          >
            {s.label}
          </span>
        </a>
      ))}
    </div>
  );
}
