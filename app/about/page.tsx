import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "The story behind Habeeb Oke (Native Dev) — how curiosity, not a single defined path, led into software engineering.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 md:px-16 py-16 max-w-3xl mx-auto">
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

      <div className="space-y-6 text-ink-muted leading-relaxed text-base md:text-lg">
        <p>
          You already know my name by now — I&apos;m Habeeb. If you scrolled
          straight here, it&apos;s somewhere else on this page.
        </p>

        <p>
          Being a young boy, I had people all around me who all knew what they
          wanted to be in the future; doctors, lawyers, nurses, et cetera,
          and I was there, confused about what I wanted to be or do. At one
          point a doctor, at another an engineer, at another even a lawyer.
          All in all, something in me knew I never actually wanted to bear the
          name of a defined space. Yes, I loved medicine to an extent. I loved
          being an engineer, same as I did law. But since I knew there was no
          way to be all of them, I decided to take the title of a
          &ldquo;Scientist&rdquo; — at the time, it just made me believe I
          could be into anything science.
        </p>

        <p>
          Since then, I&apos;ve been someone deeply engraved in everything.
          Then I came across the saying &ldquo;Jack of all trades, master of
          none.&rdquo; This hurt me to the bone — it saddened me that I
          couldn&apos;t be everything I wanted to be, and be great at all of
          it. It wasn&apos;t until later that I found the fuller quote:{" "}
          <em>
            &ldquo;A jack of all trades is a master of none, but oftentimes
            better than a master of one.&rdquo;
          </em>{" "}
          That settled something in me. I&apos;m not trying to be a jack of
          anything. I&apos;m Habeeb — master of one, maybe two by now, and
          genuinely knowledgeable in the rest. That&apos;s enough for me.
        </p>

        <p>
          This was until I found tech (all thanks to Game Shakers). I started
          researching game-making and so on — I won&apos;t bore you with the
          whole story.
        </p>

        <p>
          Now I find myself in tech. Started as a frontend developer, did a
          bit of design, advanced into frontend, got into mobile development
          along the way, now backend — and I&apos;m crazily interested in AI
          engineering, machine learning, hardware engineering, networking,
          DevOps, and I could keep counting. Seems absurd, right? A lot of my
          friends say I should focus on &ldquo;one thing,&rdquo; that
          I&apos;m all over the place given I&apos;m interested in almost
          everything (every stack, too 😂). They may be right — maybe
          I&apos;ll find a true path someday and drop the noise. But
          there&apos;s this itch of curiosity, wanting to know why and how
          things work — that&apos;s what got me into tech in the first place.
        </p>

        <p>
          I could say I&apos;m still &ldquo;connecting the dots,&rdquo; as my
          good friend Nureni Jamiu puts it. But all in all, I know I&apos;m a
          problem solver, and every single stack or field I mentioned has a
          large part to play in problem-solving. Of course, I may not
          eventually go into most of them — but whatever field I land in, I
          make sure to master my craft, right from the root up.
        </p>

        <p className="text-ink font-medium pt-4">
          That&apos;s me. Habeeb — Native Dev.
        </p>
      </div>
    </main>
  );
}
