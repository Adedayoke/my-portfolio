"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, cardEntrance, reducedVariant } from "@/lib/motion";
import { useTilt } from "@/lib/hooks/useTilt";

type Project = {
  name: string;
  slug: string;
  url?: string;
  description: string;
  proud?: string;
  stack: string[];
  status: string;
  statusTone: "live" | "dev" | "soon" | "archived";
  link?: { label: string; href: string };
  image?: string;
  preview: string[];
};

const projects: Project[] = [
  {
    name: "StudyPay",
    slug: "studypay",
    url: "studypay-sable.vercel.app",
    description:
      "Blockchain-based campus payment PWA, built for the Solana Students Africa Hackathon — multi-role dashboards, QR payments, real-time tracking, offline support.",
    stack: ["Next.js", "TypeScript", "Solana Pay"],
    status: "Live · hackathon build",
    statusTone: "live",
    link: { label: "Live demo", href: "https://studypay-sable.vercel.app" },
    image: "/projects/studypay.png",
    preview: [
      "scan QR → payment verified",
      "tx: 5KzP...9mBq on devnet",
      "role: student ✓",
      "offline queue: syncing...",
      "balance: ◎ 2.40",
    ],
  },
  {
    name: "ResearchLoop",
    slug: "researchloop",
    url: "research-loop-taupe.vercel.app",
    description:
      "An autonomous paper-to-code agent built for the Google DeepMind Gemini 3 Hackathon — extracts algorithms from academic PDFs and generates verified Python inside a self-correcting WASM sandbox loop.",
    stack: ["React 19", "Gemini 3", "Pyodide/WASM"],
    status: "Live · hackathon build",
    statusTone: "live",
    link: { label: "Live demo", href: "https://research-loop-taupe.vercel.app" },
    image: "/projects/researchloop.png",
    preview: [
      "input: arxiv/2403.04132.pdf",
      "→ extracting algorithm...",
      "→ generating Python impl",
      "→ running in WASM sandbox",
      "tests passed: 3/3 ✓",
    ],
  },
  {
    name: "SPMS",
    slug: "spms",
    description:
      "Smart Patient Monitoring System — a mobile app integrated with hardware that monitors patient vitals (heartbeat, temperature) in real time. Automatically alerts the assigned nurse or doctor when a vital flatlines or shifts critically.",
    stack: ["React Native", "Hardware Integration", "Push Notifications"],
    status: "Hackathon build · Cavista",
    statusTone: "dev",
    preview: [
      "patient: John D. · room 4B",
      "heartbeat: 72 bpm ✓",
      "temperature: 36.8°C ✓",
      "⚠ flatline detected!",
      "→ notifying Dr. Eze...",
    ],
  },
  {
    name: "AdVance",
    slug: "advance",
    url: "github.com/Adedayoke/AdVance",
    description:
      "Multi-tenant platform for out-of-home (billboard) advertising companies — companies onboard clients, deploy staff to campaigns, and track locations and deployment proof.",
    proud:
      "Proudest piece: multi-tenant RBAC that fully isolates each company's staff, clients, and activity from every other company on the same platform.",
    stack: ["Next.js", "Flask", "PostgreSQL", "JWT"],
    status: "Not live",
    statusTone: "archived",
    link: { label: "View repo", href: "https://github.com/Adedayoke/AdVance" },
    preview: [
      "POST /api/campaigns/deploy",
      "→ staff assigned: 4",
      "→ locations tracked: 12",
      "→ proof uploaded: ✓",
      "tenant isolation: enforced",
    ],
  },
];

const statusColors: Record<Project["statusTone"], string> = {
  live: "text-success border-success/30 bg-success/10",
  dev: "text-accent border-accent/30 bg-accent/10",
  soon: "text-ink-muted border-border bg-bg-raised",
  archived: "text-ink-muted border-border bg-bg-raised",
};

function TerminalPreview({ lines, name }: { lines: string[]; name: string }) {
  return (
    <div className="relative h-32 bg-bg border-b border-border overflow-hidden font-mono text-[11px] leading-5 p-3">
      {/* Scanline shimmer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, var(--accent) 2px, var(--accent) 3px)",
        }}
      />
      {/* Prompt label */}
      <div className="text-ink-muted opacity-70 mb-1">
        <span className="text-accent opacity-80">~/</span>
        {name.toLowerCase().replace(/\s/g, "-")}
      </div>
      {lines.map((line, i) => (
        <div
          key={i}
          className="text-ink-muted"
          style={{ opacity: 0.55 + i * 0.09 }}
        >
          {line}
        </div>
      ))}
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </div>
  );
}

function TiltCard({ p }: { p: Project }) {
  const { ref, rotateX, rotateY, shineX, shineY } = useTilt(12);
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      style={
        reduced
          ? {}
          : {
              rotateX,
              rotateY,
              transformPerspective: 800,
              transformStyle: "preserve-3d",
            }
      }
      className="tilt-card border border-border rounded-lg overflow-hidden bg-bg-raised flex flex-col relative group"
      whileHover={reduced ? {} : { boxShadow: "0 8px 32px rgba(255,255,255,0.06)" }}
      transition={{ duration: 0.2 }}
    >
      {/* Animated gradient border on hover */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 30%, var(--accent) 50%, transparent 70%)",
          padding: 1,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />

      {/* Shine overlay */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg z-10"
          style={{
            background: `radial-gradient(circle at ${shineX.get()}% ${shineY.get()}%, rgba(255,255,255,0.05) 0%, transparent 60%)`,
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
        />
      )}

      {/* Screenshot or terminal preview */}
      {p.image ? (
        <div className="relative h-40 overflow-hidden border-b border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover object-top"
            style={{ filter: "grayscale(10%) contrast(1.02)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent pointer-events-none" />
        </div>
      ) : (
        <TerminalPreview lines={p.preview} name={p.name} />
      )}

      {/* Browser chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border relative z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-ink-faint" />
        <span className="w-2.5 h-2.5 rounded-full bg-ink-faint" />
        <span className="w-2.5 h-2.5 rounded-full bg-ink-faint" />
        {p.url && (
          <span className="font-mono text-[11px] text-ink-faint ml-3 truncate">
            {p.url}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="font-mono text-lg font-medium">{p.name}</h3>
          <span
            className={`font-mono text-[10px] px-2 py-1 rounded border whitespace-nowrap ${statusColors[p.statusTone]}`}
          >
            {p.status}
          </span>
        </div>

        <p className="text-ink-muted text-sm leading-relaxed mb-3">
          {p.description}
        </p>

        {p.proud && (
          <p className="text-ink-muted/80 text-sm leading-relaxed mb-4 italic">
            {p.proud}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[10px] text-ink-muted border border-border rounded px-2 py-1"
            >
              {s}
            </span>
          ))}
        </div>

        {p.link && (
          <a
            href={p.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-accent hover:underline underline-offset-4 mt-4"
          >
            {p.link.label} →
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Work() {
  const reduced = useReducedMotion();

  return (
    <section id="work" className="py-24 border-b border-border section-container">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-mono text-2xl font-medium">Work</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={reduced ? reducedVariant : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {projects.map((p) => (
            <motion.div
              key={p.name}
              variants={reduced ? reducedVariant : cardEntrance}
            >
              <TiltCard p={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
