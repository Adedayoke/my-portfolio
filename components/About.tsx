"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { clipReveal, staggerContainer, reducedVariant } from "@/lib/motion";

const stats = [
  { label: "Experience", value: 3, suffix: "+ yrs" },
  { label: "Play Store", value: 1, suffix: " app" },
  { label: "Students taught", value: 100, suffix: "+" },
  { label: "AI projects", value: 3, suffix: "+" },
];

const milestones = [
  { label: "Frontend", years: "2024" },
  { label: "Backend", years: "2025" },
  { label: "Mobile", years: "2026" },
  { label: "Full-Stack", years: "2026" },
  { label: "AI / ML", years: "→" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setCount(target); return; }
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, reduced]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function JourneyPath() {
  const ref = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true });
  const reduced = useReducedMotion();

  return (
    <div ref={containerRef} className="mt-10 overflow-x-auto">
      <div className="relative min-w-[480px]">
        <svg
          viewBox="0 0 480 60"
          className="w-full"
          style={{ overflow: "visible" }}
        >
          <path
            d="M 24 30 L 456 30"
            stroke="var(--border)"
            strokeWidth="1"
            fill="none"
          />
          <motion.path
            ref={ref}
            d="M 24 30 L 456 30"
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={reduced ? {} : { pathLength: 0 }}
            animate={inView && !reduced ? { pathLength: 1 } : reduced ? {} : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          {milestones.map((m, i) => {
            const x = 24 + (i / (milestones.length - 1)) * 432;
            const delay = (i / (milestones.length - 1)) * 1.2;
            return (
              <g key={m.label}>
                <motion.circle
                  cx={x}
                  cy={30}
                  r={5}
                  fill="var(--bg)"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  initial={reduced ? {} : { scale: 0, opacity: 0 }}
                  animate={inView && !reduced ? { scale: 1, opacity: 1 } : reduced ? {} : {}}
                  style={{ transformOrigin: `${x}px 30px` }}
                  transition={{ delay, duration: 0.3 }}
                />
                <motion.text
                  x={x}
                  y={52}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fill="var(--ink-muted)"
                  initial={reduced ? {} : { opacity: 0 }}
                  animate={inView && !reduced ? { opacity: 1 } : reduced ? {} : {}}
                  transition={{ delay: delay + 0.1, duration: 0.3 }}
                >
                  {m.label}
                </motion.text>
                <motion.text
                  x={x}
                  y={14}
                  textAnchor="middle"
                  fontSize="8"
                  fontFamily="JetBrains Mono, monospace"
                  fill="var(--ink-faint)"
                  initial={reduced ? {} : { opacity: 0 }}
                  animate={inView && !reduced ? { opacity: 1 } : reduced ? {} : {}}
                  transition={{ delay: delay + 0.15, duration: 0.3 }}
                >
                  {m.years}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default function About() {
  const reduced = useReducedMotion();
  const containerVariant = reduced ? reducedVariant : staggerContainer;
  const itemVariant = reduced ? reducedVariant : clipReveal;

  return (
    <section
      id="about"
      className="py-24 border-b border-border"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-mono text-2xl font-medium">About</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.p
            className="text-ink-muted text-base md:text-lg leading-relaxed mb-6 max-w-2xl"
            variants={itemVariant}
          >
            Software engineer from Lagos. 3+ years building across the full
            stack — frontend, mobile, backend, and now AI. Every field is just
            problem-solving wearing a different stack.
          </motion.p>
        </motion.div>

        <a
          href="/about"
          className="font-mono text-sm text-accent hover:underline underline-offset-4"
        >
          Full story →
        </a>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
          {stats.map((s) => (
            <div key={s.label} className="border border-border rounded-lg p-4 bg-bg-raised">
              <div className="font-mono text-xl font-medium text-ink mb-1">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="font-mono text-[10px] text-ink-muted tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Journey path */}
        <JourneyPath />
      </div>
    </section>
  );
}
