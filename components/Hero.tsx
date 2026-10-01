"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { clipReveal, staggerContainer, scaleIn, reducedVariant } from "@/lib/motion";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const achievements = [
  "GDGoC LASU",
  "3+ yrs shipping products",
  "Play Store published",
  "taught 100+ students",
  "AI · Solana · Gemini · AWS",
  "2× hackathon participant",
  "open to opportunities",
];

function formatWatDifference() {
  const now = new Date();
  const localOffsetMinutes = new Date().getTimezoneOffset();
  const watOffsetMinutes = -60;
  const differenceMinutes = localOffsetMinutes - watOffsetMinutes;
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  if (differenceMinutes === 0) return `${time} [same time]`;
  const differenceHours = Math.abs(differenceMinutes) / 60;
  const sign = differenceMinutes > 0 ? "+" : "-";
  return `${time} [utc${sign}${differenceHours} from wat]`;
}

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 25 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const radius = 60;
    const max = 18;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius && dist > 0) {
        rawX.set(dx * (dist / radius) * (max / radius));
        rawY.set(dy * (dist / radius) * (max / radius));
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <motion.a ref={ref} href={href} style={{ x, y }} className={className}>
      {children}
    </motion.a>
  );
}

function AchievementTicker() {
  const reduced = useReducedMotion();
  // Duplicate list for seamless loop
  const items = [...achievements, ...achievements];

  if (reduced) {
    return (
      <div className="flex flex-wrap gap-3 mt-8">
        {achievements.map((a) => (
          <span key={a} className="font-mono text-[10px] text-ink-muted border border-border rounded-full px-3 py-1">
            {a}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((a, i) => (
          <span
            key={i}
            className="font-mono text-[10px] text-ink-muted border border-border rounded-full px-3 py-1 whitespace-nowrap flex-shrink-0"
          >
            {a}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const headline = "Software Engineer.";

  const charVariant = reduced ? reducedVariant : clipReveal;
  const containerVariant = reduced ? reducedVariant : staggerContainer;
  const scaleVariant = reduced ? reducedVariant : scaleIn;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center py-24 border-b border-border overflow-hidden"
    >
      {/* WebGL canvas background */}
      <HeroCanvas />

      {/* Foreground content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-12">

          {/* Left: Text */}
          <div className="flex-1 min-w-0">
            <motion.div style={{ y: headlineY }}>
              <div className="font-mono text-xs text-accent mb-5 tracking-wide opacity-60">
                // habeeb oke
              </div>

              {/* Character-split headline — words wrap as whole units */}
              <motion.h1
                className="font-mono font-medium text-[13vw] leading-[1.05] sm:text-5xl md:text-6xl mb-6 max-w-3xl flex flex-wrap gap-x-[0.25em]"
                variants={containerVariant}
                initial="hidden"
                animate="visible"
              >
                {headline.split(" ").map((word, wi, arr) => {
                  const offset = arr.slice(0, wi).reduce((n, w) => n + w.length + 1, 0);
                  return (
                    <span key={wi} className="inline-block whitespace-nowrap">
                      {word.split("").map((char, ci) => (
                        <motion.span
                          key={ci}
                          variants={charVariant}
                          style={{ display: "inline-block" }}
                          transition={
                            reduced
                              ? undefined
                              : { delay: (offset + ci) * 0.025, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                          }
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  );
                })}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-ink-muted max-w-xl leading-relaxed mb-10"
                variants={reduced ? reducedVariant : { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden"
                animate="visible"
                transition={reduced ? undefined : { delay: 0.55, duration: 0.6 }}
              >
                I don&apos;t just write code. I solve problems other people give up on.
              </motion.p>
            </motion.div>

            <motion.div
              style={{ y: buttonsY }}
              variants={scaleVariant}
              initial="hidden"
              animate="visible"
              transition={reduced ? undefined : { delay: 0.7, duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-3">
                <MagneticLink
                  href="#work"
                  className="bg-accent text-bg font-mono text-sm font-medium px-5 py-3 rounded hover:brightness-110 transition"
                >
                  view work →
                </MagneticLink>
                <MagneticLink
                  href="#contact"
                  className="border border-border text-ink font-mono text-sm px-5 py-3 rounded hover:border-ink-muted transition"
                >
                  get in touch
                </MagneticLink>
              </div>

              {/* Achievement ticker */}
              <AchievementTicker />
            </motion.div>
          </div>

          {/* Right: Portrait */}
          <motion.div
            className="hidden md:flex flex-col items-center flex-shrink-0"
            initial={reduced ? {} : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reduced ? { duration: 0 } : { delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-56 h-72 overflow-hidden border border-border group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/habeeb.jpg"
                alt="Habeeb Oke"
                className="w-full h-full object-cover object-top"
                style={{
                  filter: "grayscale(100%) contrast(1.1) brightness(0.92)",
                  transition: "filter 0.7s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) contrast(1) brightness(1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) contrast(1.1) brightness(0.92)";
                }}
              />
              {/* Bottom vignette so it bleeds into the dark bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Name tag below photo */}
            <div className="mt-3 font-mono text-xs text-ink-muted tracking-widest text-center">
              HABEEB OKE
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
        animate={scrolled ? { opacity: 0 } : {}}
        transition={{ duration: 0.3 }}
      >
        <span
          className="font-mono text-[10px] text-ink-faint tracking-widest"
          style={{ animation: "float 2s ease-in-out infinite" }}
        >
          ↓
        </span>
      </motion.div>
    </section>
  );
}
