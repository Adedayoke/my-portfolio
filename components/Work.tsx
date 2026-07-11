type Project = {
  name: string;
  url?: string;
  description: string;
  proud?: string;
  stack: string[];
  status: string;
  statusTone: "live" | "dev" | "soon" | "archived";
  link?: { label: string; href: string };
};

const projects: Project[] = [
  {
    name: "AdVance",
    url: "github.com/Adedayoke/AdVance",
    description:
      "Multi-tenant platform for out-of-home (billboard) advertising companies — companies onboard clients, deploy staff to campaigns, and track locations and deployment proof.",
    proud:
      "Proudest piece: multi-tenant RBAC that fully isolates each company's staff, clients, and activity from every other company on the same platform.",
    stack: ["Next.js", "Flask", "PostgreSQL", "JWT"],
    status: "Not live",
    statusTone: "archived",
    link: { label: "View repo", href: "https://github.com/Adedayoke/AdVance" },
  },
  {
    name: "Viigo",
    url: "viigo — users & partners",
    description:
      "Two-sided React Native (Expo) marketplace. Viigo Users lets people discover and book gyms with friends, pick a date, and pay via Razorpay. Viigo Partners lets gym owners manage users, gym details, and wallet payouts.",
    proud:
      "Proudest piece: Razorpay SDK integration coordinated with backend-generated webhooks for reliable payment confirmation.",
    stack: ["React Native", "Expo", "Razorpay", "TypeScript"],
    status: "In development",
    statusTone: "dev",
  },
  {
    name: "StudyPay",
    url: "studypay-sable.vercel.app",
    description:
      "Blockchain-based campus payment PWA, built for the Solana Students Africa Hackathon — multi-role dashboards, QR payments, real-time tracking, offline support.",
    stack: ["Next.js", "TypeScript", "Solana Pay"],
    status: "Live · hackathon build",
    statusTone: "live",
    link: { label: "Live demo", href: "https://studypay-sable.vercel.app" },
  },
  {
    name: "ResearchLoop",
    url: "research-loop-taupe.vercel.app",
    description:
      "An autonomous paper-to-code agent built for the Google DeepMind Gemini 3 Hackathon — extracts algorithms from academic PDFs and generates verified Python implementations inside a self-correcting WASM sandbox loop.",
    stack: ["React 19", "Gemini 3", "Pyodide/WASM"],
    status: "Live · hackathon build",
    statusTone: "live",
    link: {
      label: "Live demo",
      href: "https://research-loop-taupe.vercel.app",
    },
  },
  {
    name: "Uptime Monitor",
    description:
      "A self-hosted uptime and status-page tool. Built to actually understand the concurrency, time-series, and alerting problems that tools like Uptime Kuma solve — before eventually contributing upstream.",
    stack: ["Node.js", "Express", "PostgreSQL"],
    status: "Coming soon",
    statusTone: "soon",
  },
];

const statusColors: Record<Project["statusTone"], string> = {
  live: "text-success border-success/30 bg-success/10",
  dev: "text-accent border-accent/30 bg-accent/10",
  soon: "text-ink-muted border-border bg-bg-raised",
  archived: "text-ink-muted border-border bg-bg-raised",
};

export default function Work() {
  return (
    <section
      id="work"
      className="px-6 md:px-10 md:pl-20 py-24 border-b border-border"
    >
      <div className="flex items-center gap-4 mb-12 max-w-5xl">
        <h2 className="font-mono text-2xl font-medium">Work</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
        {projects.map((p) => (
          <div
            key={p.name}
            className="border border-border rounded-lg overflow-hidden bg-bg-raised flex flex-col"
          >
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-ink-faint" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink-faint" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink-faint" />
              {p.url && (
                <span className="font-mono text-[11px] text-ink-faint ml-3 truncate">
                  {p.url}
                </span>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="font-mono text-lg font-medium">{p.name}</h3>
                <span
                  className={`font-mono text-[10px] px-2 py-1 rounded border whitespace-nowrap ${
                    statusColors[p.statusTone]
                  }`}
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
          </div>
        ))}
      </div>
    </section>
  );
}
