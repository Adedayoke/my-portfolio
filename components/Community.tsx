"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, reducedVariant } from "@/lib/motion";

const photos = [
  {
    src: "/community/cavista-hackathon.jpg",
    alt: "Cavista Technologies Hackathon 2025",
    label: "Cavista Technologies Hackathon",
    year: "2025",
  },
  {
    src: "/community/GDGLASU-Core team member.avif",
    alt: "GDGoC LASU Core Team 2025",
    label: "GDGoC LASU Core Team",
    year: "2025",
  },
  {
    src: "/community/ArthuriteIntegrated007.avif",
    alt: "Arthurite Integrated Event 2024",
    label: "Arthurite Integrated",
    year: "2024",
  },
  {
    src: "/community/LASUTechX3.avif",
    alt: "LASU Tech X 3.0",
    label: "LASU Tech X 3.0",
    year: "2025",
  },
  {
    src: "/community/ArthuriteIntegrated008.avif",
    alt: "Arthurite Integrated Event 2024",
    label: "Arthurite Integrated",
    year: "2024",
  },
  {
    src: "/community/SUI workshop.avif",
    alt: "SUI Workshop",
    label: "SUI Workshop",
    year: "2025",
  },
];

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

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%" }),
  center: { x: 0 },
  exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%" }),
};

function PhotoCarousel() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered || reduced) return;
    const t = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % photos.length);
    }, 3500);
    return () => clearInterval(t);
  }, [hovered, reduced]);

  const prev = () => {
    setDir(-1);
    setIdx((i) => (i - 1 + photos.length) % photos.length);
  };

  const next = () => {
    setDir(1);
    setIdx((i) => (i + 1) % photos.length);
  };

  const photo = photos[idx];

  return (
    <div className="relative select-none">
      {/* Main slide area */}
      <div
        className="relative overflow-hidden border border-border h-72 md:h-[22rem] cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            variants={reduced ? {} : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover object-center"
              style={{
                filter: hovered
                  ? "grayscale(0%) contrast(1) brightness(1)"
                  : "grayscale(100%) contrast(1.12) brightness(0.88)",
                transition: "filter 0.6s ease",
              }}
              draggable={false}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/75 via-transparent to-transparent pointer-events-none" />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between pointer-events-none">
              <span className="font-mono text-xs text-ink font-medium">
                {photo.label}
              </span>
              <span className="font-mono text-[10px] text-ink-faint border border-border rounded px-2 py-0.5 bg-bg/70 backdrop-blur-sm">
                {photo.year}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center border border-border bg-bg/80 backdrop-blur-sm font-mono text-xs text-ink-muted hover:text-ink hover:border-ink-muted transition-all"
          aria-label="Previous photo"
        >
          ←
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center border border-border bg-bg/80 backdrop-blur-sm font-mono text-xs text-ink-muted hover:text-ink hover:border-ink-muted transition-all"
          aria-label="Next photo"
        >
          →
        </button>

        {/* Paused badge */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              className="absolute top-3 right-3 z-10 font-mono text-[9px] text-ink-faint bg-bg/75 backdrop-blur-sm border border-border rounded px-2 py-0.5"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              paused
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-1.5 mt-4">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
            aria-label={`Go to photo ${i + 1}`}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === idx ? 24 : 6,
              background: i === idx ? "var(--accent)" : "var(--ink-faint)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

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

        {/* Photo carousel */}
        <div className="mb-16">
          <p className="font-mono text-xs text-accent tracking-wider mb-6">
            // moments
          </p>
          <PhotoCarousel />
        </div>

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
