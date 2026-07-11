"use client";

import { useState } from "react";

const links = [
  { label: "Email", value: "adedayoke2006@gmail.com", href: "mailto:adedayoke2006@gmail.com" },
  { label: "GitHub", value: "@Adedayoke", href: "https://github.com/Adedayoke" },
  { label: "LinkedIn", value: "/in/habeeb-oke", href: "https://linkedin.com/in/habeeb-oke" },
  { label: "X", value: "@Adedayoke", href: "https://x.com/Adedayoke" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${name || "no name given"}`);
    const body = encodeURIComponent(
      `From: ${name} (${email})\n\n${message}`
    );
    window.location.href = `mailto:adedayoke2006@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="px-6 md:px-10 md:pl-20 py-24 border-b border-border"
    >
      <div className="flex items-center gap-4 mb-10 max-w-5xl">
        <h2 className="font-mono text-2xl font-medium">Contact</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
        <div>
          <p className="text-ink-muted leading-relaxed mb-8 max-w-sm">
            Open to roles, freelance work, or just a good conversation about
            something you&apos;re building. Reach out however&apos;s easiest.
          </p>
          <div className="space-y-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-border rounded-lg px-4 py-3 hover:border-accent/50 transition-colors group"
              >
                <span className="font-mono text-xs text-ink-muted">
                  {l.label}
                </span>
                <span className="font-mono text-sm text-ink group-hover:text-accent transition-colors">
                  {l.value}
                </span>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-xs text-ink-muted block mb-2">
              Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-bg-raised border border-border rounded px-3 py-2.5 text-sm focus:border-accent outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-ink-muted block mb-2">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg-raised border border-border rounded px-3 py-2.5 text-sm focus:border-accent outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-ink-muted block mb-2">
              Message
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-bg-raised border border-border rounded px-3 py-2.5 text-sm focus:border-accent outline-none resize-none"
              placeholder="What are you building?"
            />
          </div>
          <button
            type="submit"
            className="bg-accent text-bg font-mono text-sm font-medium px-5 py-3 rounded hover:brightness-110 transition w-full"
          >
            Send message
          </button>
          {sent && (
            <p className="font-mono text-xs text-success">
              Opening your email client — send when ready.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
