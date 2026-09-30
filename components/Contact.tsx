"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { fadeUp, reducedVariant } from "@/lib/motion";

const links = [
  { label: "Email", value: "adedayoke2006@gmail.com", href: "mailto:adedayoke2006@gmail.com" },
  { label: "GitHub", value: "@Adedayoke", href: "https://github.com/Adedayoke" },
  { label: "LinkedIn", value: "/in/habeeb-oke", href: "https://linkedin.com/in/habeeb-oke" },
  { label: "X", value: "@Adedayoke", href: "https://x.com/Adedayoke" },
];

function FloatingLabelInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;

  return (
    <div className="relative pt-4">
      <label
        htmlFor={id}
        className="absolute left-3 pointer-events-none font-mono text-xs transition-all duration-200"
        style={{
          top: raised ? "2px" : "50%",
          transform: raised ? "translateY(0) scale(0.75)" : "translateY(-50%)",
          transformOrigin: "left",
          color: focused ? "var(--accent)" : "var(--ink-muted)",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-bg-raised border border-border rounded px-3 pt-4 pb-2 text-sm focus:border-accent outline-none"
        style={{ borderColor: focused ? "var(--accent)" : undefined }}
      />
    </div>
  );
}

function FloatingLabelTextarea({
  id,
  label,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;

  return (
    <div className="relative pt-4">
      <label
        htmlFor={id}
        className="absolute left-3 pointer-events-none font-mono text-xs transition-all duration-200"
        style={{
          top: raised ? "2px" : "20px",
          transform: raised ? "translateY(0) scale(0.75)" : "translateY(0)",
          transformOrigin: "left",
          color: focused ? "var(--accent)" : "var(--ink-muted)",
        }}
      >
        {label}
      </label>
      <textarea
        id={id}
        required={required}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-bg-raised border border-border rounded px-3 pt-5 pb-2 text-sm focus:border-accent outline-none resize-none"
        style={{ borderColor: focused ? "var(--accent)" : undefined }}
      />
    </div>
  );
}

function MagneticSubmit({ disabled }: { disabled?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 25 });
  const y = useSpring(rawY, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const radius = 80;
    const max = 20;
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
    <motion.button
      ref={ref}
      type="submit"
      disabled={disabled}
      style={{ x, y }}
      className="bg-accent text-bg font-mono text-sm font-medium px-5 py-3 rounded hover:brightness-110 transition w-full"
    >
      Send message
    </motion.button>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();
  const v = reduced ? reducedVariant : fadeUp;
  const vp = { once: true as const };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${name || "no name given"}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.location.href = `mailto:adedayoke2006@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="py-24 border-b border-border"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="font-mono text-2xl font-medium">Contact</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div variants={v} initial="hidden" whileInView="visible" viewport={vp}>
          <p className="text-ink-muted leading-relaxed mb-4 max-w-sm">
            Open to roles, freelance work, or just a good conversation about
            something you&apos;re building. Reach out however&apos;s easiest.
          </p>
          <a
            href="/habeeb-oke.vcf"
            download
            className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline underline-offset-4 mb-8"
          >
            Save my contact card (.vcf) →
          </a>
          <div className="space-y-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-border rounded-lg px-4 py-3 hover:border-accent/50 transition-colors group"
              >
                <span className="font-mono text-xs text-ink-muted">{l.label}</span>
                <span className="font-mono text-sm text-ink group-hover:text-accent transition-colors">
                  {l.value}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          variants={v}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          transition={reduced ? undefined : { delay: 0.1 }}
        >
          <FloatingLabelInput
            id="contact-name"
            label="Name"
            value={name}
            onChange={setName}
            required
          />
          <FloatingLabelInput
            id="contact-email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            required
          />
          <FloatingLabelTextarea
            id="contact-message"
            label="Message"
            value={message}
            onChange={setMessage}
            required
          />
          <MagneticSubmit />
          {sent && (
            <p className="font-mono text-xs text-success">
              Opening your email client — send when ready.
            </p>
          )}
        </motion.form>
      </div>
      </div>
    </section>
  );
}
