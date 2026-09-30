"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { clipReveal, staggerContainer, reducedVariant } from "@/lib/motion";

const paragraphs = [
  `You already know my name by now — I'm Habeeb. If you scrolled straight here, it's somewhere else on this page.`,

  `Being a young boy, I had people all around me who all knew what they wanted to be in the future — doctors, lawyers, nurses, et cetera — and I was there, confused about what I wanted to be or do. At one point a doctor, at another an engineer, at another even a lawyer. All in all, something in me knew I never actually wanted to bear the name of a defined space. Yes, I loved medicine to an extent. I loved being an engineer, same as I did law. But since I knew there was no way to be all of them, I decided to take the title of a "Scientist" — at the time, it just made me believe I could be into anything science.`,

  `Since then, I've been someone deeply engraved in everything. Then I came across the saying "Jack of all trades, master of none." This hurt me to the bone — it saddened me that I couldn't be everything I wanted to be, and be great at all of it. It wasn't until later that I found the fuller quote: "A jack of all trades is a master of none, but oftentimes better than a master of one." That settled something in me. I'm not trying to be a jack of anything. I'm Habeeb — master of one, maybe two by now, and genuinely knowledgeable in the rest. That's enough for me.`,

  `This was until I found tech (all thanks to Game Shakers). I started researching game-making and so on — I won't bore you with the whole story.`,

  `Now I find myself in tech. Started as a frontend developer, did a bit of design, advanced into frontend, got into mobile development along the way, now backend — and I'm crazily interested in AI engineering, machine learning, hardware engineering, networking, DevOps, and I could keep counting. Seems absurd, right? A lot of my friends say I should focus on "one thing," that I'm all over the place given I'm interested in almost everything (every stack, too 😂). They may be right — maybe I'll find a true path someday and drop the noise. But there's this itch of curiosity, wanting to know why and how things work — that's what got me into tech in the first place.`,

  `I could say I'm still "connecting the dots," as my good friend Nureni Jamiu puts it. But all in all, I know I'm a problem solver, and every single stack or field I mentioned has a large part to play in problem-solving. Of course, I may not eventually go into most of them — but whatever field I land in, I make sure to master my craft, right from the root up.`,
];

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "var(--accent)",
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
}

export default function AboutPage() {
  const reduced = useReducedMotion();

  return (
    <>
      <ReadingProgress />
      <motion.main
        className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto"
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/#about"
          className="font-mono text-sm text-ink-muted hover:text-accent transition-colors"
        >
          ← back
        </Link>

        <h1 className="font-mono text-3xl md:text-4xl font-medium mt-8 mb-2">
          Connecting the Dots
        </h1>
        <p className="text-ink-muted text-sm mb-12">
          This is a somewhat long read.
        </p>

        <motion.div
          className="space-y-6 text-ink-muted leading-relaxed text-base md:text-lg"
          variants={reduced ? reducedVariant : staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              variants={reduced ? reducedVariant : clipReveal}
              transition={reduced ? undefined : { delay: i * 0.06 }}
            >
              {text}
            </motion.p>
          ))}

          <motion.p
            className="text-ink font-medium pt-4"
            variants={reduced ? reducedVariant : clipReveal}
            transition={reduced ? undefined : { delay: paragraphs.length * 0.06 }}
          >
            That&apos;s me. Habeeb — Native Dev.
          </motion.p>
        </motion.div>
      </motion.main>
    </>
  );
}
