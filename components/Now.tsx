"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, fadeUp, reducedVariant } from "@/lib/motion";

const status = [
  {
    label: "Currently at",
    value: "Bloom AI",
    detail: "Full-stack Dev · commerce & automation tooling",
  },
  {
    label: "Learning",
    value: "DSA · System Design · AI engineering",
    detail: "NeetCode, LeetCode, going deeper than 'it works'",
  },
  {
    label: "Teaching",
    value: "LASU CBT18",
    detail: "Frontend Dev instructor · Nov 2024 – Sep 2026",
  },
  {
    label: "Reading",
    value: "Atomic Habits",
    detail: "James Clear",
  },
];

export default function Now() {
  const reduced = useReducedMotion();
  const vp = { once: true as const, margin: "-10%" as const };

  return (
    <section id="now" className="py-24 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="font-mono text-2xl font-medium">Now</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-2 font-mono text-xs text-ink-muted mb-10">
          <span
            className="w-2 h-2 rounded-full bg-success flex-shrink-0"
            style={{ animation: "blink 2s ease-in-out infinite" }}
          />
          what I&apos;m doing right now
        </div>

        <motion.div
          className="divide-y divide-border"
          variants={reduced ? reducedVariant : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {status.map((item) => (
            <motion.div
              key={item.label}
              variants={reduced ? reducedVariant : fadeUp}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5"
            >
              <span className="font-mono text-[10px] text-ink-muted tracking-wider uppercase w-28 flex-shrink-0">
                {item.label}
              </span>
              <div>
                <span className="font-mono text-sm text-ink font-medium">
                  {item.value}
                </span>
                <span className="font-mono text-xs text-ink-muted ml-3">
                  {item.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
