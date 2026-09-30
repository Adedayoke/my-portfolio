"use client";

const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

type Skill = { label: string; icon?: string; accent?: boolean };

const ROW1: Skill[] = [
  { label: "TypeScript",        icon: `${BASE}/typescript/typescript-original.svg`,  accent: true },
  { label: "React.js",          icon: `${BASE}/react/react-original.svg`,             accent: true },
  { label: "Next.js",           icon: `${BASE}/nextjs/nextjs-original.svg`,           accent: true },
  { label: "React Native",      icon: `${BASE}/react/react-original.svg`,             accent: true },
  { label: "JavaScript",        icon: `${BASE}/javascript/javascript-original.svg` },
  { label: "Vue.js",            icon: `${BASE}/vuejs/vuejs-original.svg` },
  { label: "Tailwind CSS",      icon: `${BASE}/tailwindcss/tailwindcss-original.svg` },
  { label: "HTML5",             icon: `${BASE}/html5/html5-original.svg` },
  { label: "CSS3",              icon: `${BASE}/css3/css3-original.svg` },
  { label: "Redux",             icon: `${BASE}/redux/redux-original.svg` },
  { label: "Zustand" },
  { label: "Styled-Components" },
];

const ROW2: Skill[] = [
  { label: "NestJS",      icon: `${BASE}/nestjs/nestjs-original.svg`,           accent: true },
  { label: "PostgreSQL",  icon: `${BASE}/postgresql/postgresql-original.svg`,   accent: true },
  { label: "Node.js",     icon: `${BASE}/nodejs/nodejs-original.svg` },
  { label: "Express.js",  icon: `${BASE}/express/express-original.svg` },
  { label: "MongoDB",     icon: `${BASE}/mongodb/mongodb-original.svg` },
  { label: "Redis",       icon: `${BASE}/redis/redis-original.svg` },
  { label: "Docker",      icon: `${BASE}/docker/docker-original.svg` },
  { label: "Git",         icon: `${BASE}/git/git-original.svg` },
  { label: "Jest",        icon: `${BASE}/jest/jest-plain.svg` },
  { label: "Prisma ORM",  icon: `${BASE}/prisma/prisma-original.svg` },
  { label: "Solana Pay" },
  { label: "Stripe" },
  { label: "BullMQ" },
  { label: "RabbitMQ",    icon: `${BASE}/rabbitmq/rabbitmq-original.svg` },
  { label: "Vercel",      icon: `${BASE}/vercel/vercel-original.svg` },
];

function Chip({ skill }: { skill: Skill }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded border whitespace-nowrap flex-shrink-0 ${
        skill.accent
          ? "border-accent/40 text-accent bg-accent/5"
          : "border-border text-ink-muted bg-bg-raised"
      }`}
    >
      {skill.icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={skill.icon}
          alt=""
          width={14}
          height={14}
          className="flex-shrink-0"
          style={{ filter: "grayscale(100%) brightness(1.8) contrast(0.9)" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      )}
      {skill.label}
    </span>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Skill[];
  direction: "left" | "right";
  duration: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="flex overflow-hidden select-none"
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
    >
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `${direction === "left" ? "scroll-left" : "scroll-right"} ${duration}s linear infinite`,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {doubled.map((skill, i) => (
          <Chip key={`${skill.label}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 border-b border-border overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-10 mb-8">
        <span className="font-mono text-xs text-accent tracking-wider">
          // tech stack
        </span>
        <div className="h-px bg-border mt-3" />
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={ROW1} direction="left" duration={40} />
        <MarqueeRow items={ROW2} direction="right" duration={55} />
      </div>
    </section>
  );
}
