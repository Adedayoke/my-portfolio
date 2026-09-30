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
    role: "Full-stack Developer",
    period: "Jul 2026 – Present",
    location: "Remote",
    type: "Full-time",
    roleType: "full-stack",
    bullets: [
      "Built responsive dashboard interfaces for product, order, and cart management using Next.js, TypeScript, Tailwind CSS, and Zustand, integrating real-time backend state with responsive UI flows.",
      "Built Telegram channel integration across the frontend and backend — real-time WebSocket flows for QR authentication, OTP, 2FA, connection status updates, and session reconnection using Redis Pub/Sub and BullMQ workers.",
      "Developed commerce functionality for products, orders, and carts: product CRUD, bulk CSV imports with SKU deduplication, transactional cart operations, order management, payment history, and dashboard metrics.",
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
      "Developed and taught a structured Frontend Web Development curriculum covering HTML, CSS, and JavaScript.",
      "Created and assigned multiple capstone projects throughout the program to reinforce concepts and build practical mastery.",
    ],
  },
  {
    company: "Viigo",
    role: "Mobile Developer",
    period: "Mar 2026 – Aug 2026",
    location: "Remote",
    type: "Contract",
    roleType: "mobile",
    bullets: [
      "Built and shipped the core booking marketplace powering Viigo's two-sided platform (gym owners and users) using React Native and Expo — GPS discovery, live slot pricing, and Razorpay payment integration; published to the Google Play Store.",
      "Designed the hourly slot-selection and live-pricing flow with automated test coverage for shared booking logic, identifying pricing and availability issues before release.",
      "Implemented JWT authentication with automatic token refresh, Google OAuth, and OTP login with persistent sessions.",
    ],
  },
  {
    company: "ORR Solutions",
    role: "Frontend Developer",
    period: "Dec 2025 – Mar 2026",
    location: "Remote",
    type: "Contract",
    roleType: "frontend",
    bullets: [
      "Built a responsive, real-time financial analytics dashboard using TypeScript, Zustand, and Recharts — reusable data visualization and table components for scalable feature development.",
      "Implemented frontend security controls including RBAC, CSRF protection, and XSS prevention, validating protections against common attack vectors.",
      "Built a rich-text CMS, calendar-integrated meeting scheduler, and audit-logging system for enterprise/regulated clients.",
    ],
  },
  {
    company: "HNG",
    role: "Backend Track Intern",
    period: "Oct 2025 – Dec 2025",
    location: "Remote",
    type: "Internship",
    roleType: "backend",
    bullets: [
      "Built the API Gateway and Authentication microservices within a 5-service distributed notification system (NestJS, RabbitMQ, PostgreSQL) — circuit breakers and retry logic validated by tests.",
      "Built an asynchronous image-processing service (NestJS, BullMQ) — background queues for resize/compress/thumbnail generation so uploads stay fast.",
      "Developed a crypto risk-assessment agent (TypeScript, Groq AI/Llama 3.3 70B, CoinGecko API) — automated real-time risk scoring.",
    ],
  },
  {
    company: "Kloud6 Technologies",
    role: "Full-Stack Developer",
    period: "Nov 2024 – Oct 2025",
    location: "Lagos, Nigeria",
    type: "Full-time",
    roleType: "full-stack",
    bullets: [
      "Built and maintained a full-stack LMS for programming education across Nigeria — 60+ features across responsive learning interfaces, assessments, payments, and live/recorded class experiences using React.js, Next.js, Node.js, and PostgreSQL.",
      "Integrated Stripe payment flows with access-code generation and automated PDF invoicing.",
      "Implemented Jest tests covering assessment and learning experience workflows.",
      "Redesigned the company website — user engagement +25%, conversion rates +35%, Google Lighthouse 92+ across all metrics.",
    ],
  },
  {
    company: "Jechres",
    role: "Frontend Developer",
    period: "Apr 2024 – Nov 2024",
    location: "Remote",
    type: "Contract",
    roleType: "frontend",
    bullets: [
      "Built responsive e-commerce interfaces for a clothing marketplace using React.js and Tailwind CSS.",
      "Implemented server-state management and data fetching with TanStack React Query, integrating frontend components with backend APIs.",
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
