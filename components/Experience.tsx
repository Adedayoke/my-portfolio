"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { fadeUp, reducedVariant } from "@/lib/motion";

type RoleType = "full-stack" | "mobile" | "frontend" | "backend" | "instructor";

type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  roleType: RoleType;
  bullets: string[];
};

const roleStyles: Record<RoleType, string> = {
  "full-stack": "bg-accent/10 text-accent border-accent/25",
  mobile: "bg-bg-raised text-ink-muted border-border",
  frontend: "bg-bg-raised text-ink-muted border-border",
  backend: "bg-bg-raised text-ink-muted border-border",
  instructor: "bg-bg-raised text-ink-muted border-border",
};

const roleLabels: Record<RoleType, string> = {
  "full-stack": "Full-Stack",
  mobile: "Mobile",
  frontend: "Frontend",
  backend: "Backend",
  instructor: "Instructor",
};

const jobs: Job[] = [
  {
    company: "Bloom AI",
    role: "Full-Stack Developer",
    period: "Nov 2025 – Present",
    location: "Remote",
    type: "Full-time",
    roleType: "full-stack",
    bullets: [
      "Built real-time product, order, cart and business-metric views for a merchant dashboard (Next.js, TypeScript, Zustand) backed by a commerce API covering products, orders, carts and payment history.",
      "Implemented a Telegram connection flow end to end (QR login, OTP, 2FA, connection status and automatic reconnection) using WebSockets, Redis Pub/Sub and BullMQ, keeping connections reliable through network drops.",
      "Built transactional cart operations and bulk CSV product import with SKU deduplication. Integrated AWS SES for transactional email, S3 for media storage, and EC2 for API deployment.",
    ],
  },
  {
    company: "Viigo",
    role: "Mobile Developer",
    period: "Mar 2026 – Sep 2026",
    location: "India (Remote)",
    type: "Contract",
    roleType: "mobile",
    bullets: [
      "Built and shipped two connected React Native apps using Expo for a gym-booking marketplace — a customer app for discovering and booking gyms, and a gym-owner app for managing slots and pricing.",
      "Implemented shared hourly booking and live-pricing logic across both apps. Wrote automated tests for booking and pricing logic to catch defects before release.",
      "Developed GPS-based gym discovery, integrated Razorpay payments, and implemented JWT with silent refresh, Google OAuth and OTP login.",
    ],
  },
  {
    company: "SKPROJECTX",
    role: "Frontend Developer",
    period: "Dec 2025 – Mar 2026",
    location: "Remote",
    type: "Contract",
    roleType: "frontend",
    bullets: [
      "Built a real-time financial analytics dashboard (TypeScript, Zustand, Recharts) on a reusable component library.",
      "Implemented a client-side security layer (RBAC, CSRF protection, XSS prevention) and built a rich-text CMS, meeting scheduler and audit-logging UI for compliance workflows.",
    ],
  },
  {
    company: "HNG Internship",
    role: "Backend Intern & Team Lead",
    period: "Oct 2025 – Dec 2025",
    location: "Remote",
    type: "Internship",
    roleType: "backend",
    bullets: [
      "Led a team building a five-service notification system (NestJS, RabbitMQ, PostgreSQL); built the API Gateway and Auth services with circuit breakers and retries validated by failure tests.",
      "Built an asynchronous image-processing service (BullMQ, MinIO) that moved resize and compression work to background queues; reviewed teammates' pull requests as team lead.",
    ],
  },
  {
    company: "LASU CBT18",
    role: "Frontend Dev Instructor",
    period: "Nov 2024 – Sep 2026",
    location: "Lagos, Nigeria",
    type: "Part-time",
    roleType: "instructor",
    bullets: [
      "Designed and taught a three-month frontend web development curriculum (HTML, CSS, JavaScript) to 100+ students.",
      "Created and assigned capstone projects throughout the programme to reinforce concepts and build practical mastery.",
    ],
  },
  {
    company: "Kloud6 Technologies",
    role: "Full-Stack Developer",
    period: "Jul 2023 – Oct 2025",
    location: "Lagos, Nigeria",
    type: "Full-time",
    roleType: "full-stack",
    bullets: [
      "Built the frontend and core flows of a full-stack learning platform (React, Next.js, Redux Toolkit, Node.js, PostgreSQL, MongoDB), including role-based access to live and recorded classes and auto-graded assessments.",
      "Integrated Stripe payments with access codes and automated PDF invoicing.",
      "Redesigned the company website — engagement +25%, conversions +35%, Lighthouse 92+ across all categories.",
    ],
  },
  {
    company: "Jechres",
    role: "Frontend Developer",
    period: "Aug 2022 – Jul 2023",
    location: "Canada (Remote)",
    type: "Contract",
    roleType: "frontend",
    bullets: [
      "Built responsive e-commerce interfaces (React, Vite, Tailwind CSS) and integrated them with backend APIs using TanStack Query for server-state management.",
    ],
  },
];

function JobEntry({ job, index }: { job: Job; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const visibleBullets = job.bullets.slice(0, 2);
  const hiddenBullets = job.bullets.slice(2);

  return (
    <motion.div
      className="relative pl-8"
      variants={reduced ? reducedVariant : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      transition={reduced ? undefined : { delay: index * 0.08 }}
    >
      {/* Dot on timeline */}
      <motion.span
        className="absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-accent bg-bg"
        initial={reduced ? {} : { scale: 0, opacity: 0 }}
        whileInView={reduced ? {} : { scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 + 0.1, duration: 0.3 }}
        style={{ transform: "translateX(-50%)" }}
      />

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span
          className={`font-mono text-[10px] px-2 py-0.5 rounded border ${roleStyles[job.roleType]}`}
        >
          {roleLabels[job.roleType]}
        </span>
        <span className="font-mono text-base font-medium text-ink">
          {job.company}
        </span>
        <span className="font-mono text-xs text-ink-faint ml-auto">
          {job.period}
        </span>
      </div>

      <div className="font-mono text-sm text-ink-muted mb-1">{job.role}</div>
      <div className="font-mono text-xs text-ink-faint mb-4">
        {job.location} · {job.type}
      </div>

      <ul className="space-y-2 mb-2">
        {visibleBullets.map((b, i) => (
          <li key={i} className="text-ink-muted text-sm leading-relaxed flex gap-2">
            <span className="text-ink-faint mt-0.5 flex-shrink-0">—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {hiddenBullets.length > 0 && (
        <>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                className="space-y-2 mb-2 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {hiddenBullets.map((b, i) => (
                  <li key={i} className="text-ink-muted text-sm leading-relaxed flex gap-2">
                    <span className="text-ink-faint mt-0.5 flex-shrink-0">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="font-mono text-xs text-accent hover:underline underline-offset-4 mt-1"
          >
            {expanded ? "show less ↑" : `show ${hiddenBullets.length} more ↓`}
          </button>
        </>
      )}
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section
      id="experience"
      className="py-24 border-b border-border section-container"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="font-mono text-2xl font-medium">Experience</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div ref={ref} className="max-w-3xl relative">
        {/* Animated timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border">
          {!reduced && (
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent"
              style={{ scaleY, transformOrigin: "top", height: "100%" }}
            />
          )}
        </div>

        <div className="space-y-12">
          {jobs.map((job, i) => (
            <JobEntry key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
