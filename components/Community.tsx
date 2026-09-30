"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, reducedVariant } from "@/lib/motion";

const hackathons = [
  {
    name: "Google DeepMind Gemini 3 Hackathon",
    project: "ResearchLoop",
    description:
      "Built an autonomous paper-to-code agent that extracts algorithms from academic PDFs and generates verified Python inside a WASM sandbox. Solo build, 48 hrs.",
    link: "https://research-loop-taupe.vercel.app",
    year: "2026",
  },
  {
    name: "Solana Students Africa Hackathon",
    project: "StudyPay",
    description:
      "Built a blockchain-based campus payment PWA — multi-role dashboards, QR payments, real-time tracking, offline support. First time touching Solana Pay.",
    link: "https://studypay-sable.vercel.app",
    year: "2025",
  },
  {
    name: "Cavista Technologies Hackathon",
    project: "SPMS",
    description:
      "Built a Smart Patient Monitoring System — a mobile app integrated with hardware that tracks patient vitals (heartbeat, temperature) and auto-alerts the assigned nurse or doctor on critical changes like a flatline.",
    year: "2025",
  },
];

const presenceItems = [
  {
    label: "Teaching",
    detail: "LASU CBT18 — Frontend Dev Instructor",
    description:
      "Taught HTML, CSS and JavaScript to university students. Built and assigned capstone projects. Nov 2024 – Sep 2026.",
  },
  {
    label: "Open Source",
    detail: "github.com/Adedayoke",
    href: "https://github.com/Adedayoke",
    description:
      "Personal projects, experiments, and contributions. Most of what I build starts public.",
  },
  {
    label: "Informal Mentorship",
    detail: "Friends & classmates",
    description:
      "Usually the person people come to — debugging their projects, reviewing code, fixing write-ups. Quiet but consistent.",
  },
];

export default function Community() {
  const reduced = useReducedMotion();
  const v = reduced ? reducedVariant : fadeUp;
  const vp = { once: true as const, margin: "-10%" as const };

  return (
    <section id="community" className="py-24 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-mono text-2xl font-medium">Community</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Hackathon photo — full-width feature */}
        <motion.div
          className="mb-16 relative overflow-hidden"
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative h-64 md:h-80 overflow-hidden border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/community/cavista-hackathon.jpg"
              alt="Cavista Hackathon 2025 group photo"
              className="w-full h-full object-cover object-center"
              style={{
                filter: "grayscale(100%) contrast(1.12) brightness(0.9)",
                transition: "filter 0.7s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) contrast(1) brightness(1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) contrast(1.12) brightness(0.9)";
              }}
            />
            {/* Bottom gradient for caption readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
              <div>
                <p className="font-mono text-xs text-ink font-medium">
                  Cavista Technologies Hackathon 2025
                </p>
                <p className="font-mono text-[10px] text-ink-faint mt-0.5">
                  Lagos, Nigeria — 100+ developers, one room
                </p>
              </div>
              <span className="font-mono text-[10px] text-ink-faint border border-border rounded px-2 py-1 bg-bg/80 backdrop-blur-sm">
                2025
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hackathons */}
        <div className="mb-16">
          <p className="font-mono text-xs text-accent tracking-wider mb-8">
            // hackathons
          </p>
          <motion.div
            className="grid md:grid-cols-3 gap-5"
            variants={reduced ? reducedVariant : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            {hackathons.map((h) => (
              <motion.div
                key={h.name}
                variants={v}
                className="border border-border rounded-lg p-5 bg-bg-raised group hover:border-ink-faint transition-colors duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="font-mono text-[10px] text-ink-faint">{h.year}</span>
                    <h3 className="font-mono text-sm font-medium text-ink mt-0.5">
                      {h.project}
                    </h3>
                  </div>
                  {h.link && (
                    <a
                      href={h.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-ink-faint hover:text-accent transition-colors whitespace-nowrap border border-border rounded px-2 py-1 flex-shrink-0"
                    >
                      live →
                    </a>
                  )}
                </div>
                <p className="font-mono text-[10px] text-ink-faint mb-3 tracking-wide leading-relaxed">
                  {h.name}
                </p>
                <p className="text-ink-muted text-sm leading-relaxed mt-auto">
                  {h.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Presence */}
        <div>
          <p className="font-mono text-xs text-accent tracking-wider mb-8">
            // presence
          </p>
          <motion.div
            className="space-y-0"
            variants={reduced ? reducedVariant : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            {presenceItems.map((item) => (
              <motion.div
                key={item.label}
                variants={v}
                className="flex flex-col sm:flex-row sm:items-start gap-4 py-5 border-b border-border last:border-0"
              >
                <div className="sm:w-40 flex-shrink-0">
                  <span className="font-mono text-xs text-ink font-medium">
                    {item.label}
                  </span>
                  <div className="font-mono text-[10px] text-ink-faint mt-0.5">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        {item.detail}
                      </a>
                    ) : (
                      item.detail
                    )}
                  </div>
                </div>
                <p className="text-ink-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
