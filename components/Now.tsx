export default function Now() {
  return (
    <section
      id="now"
      className="px-6 md:px-10 md:pl-20 py-24 border-b border-border"
    >
      <div className="flex items-center gap-4 mb-10 max-w-2xl">
        <h2 className="font-mono text-2xl font-medium">Now</h2>
        <div className="flex-1 h-px bg-border" />
      </div>
      <p className="text-ink-faint font-mono text-xs mb-12 max-w-2xl">
        What I&apos;m currently doing.
      </p>

      <div className="max-w-2xl space-y-12">
        <div>
          <h3 className="font-mono text-sm text-accent mb-3">
            What I&apos;m building
          </h3>
          <p className="text-ink-muted leading-relaxed">
            Just wrapped up my final semester at LASU — Computer Science,
            four years in the making. Right now I&apos;m building{" "}
            <strong className="text-ink">Bloom</strong> with a small crew of
            friends, one of those projects where we&apos;re figuring things
            out and growing together as we go. No client brief, no academic
            requirement telling us what it should be — just us trying to
            build something that actually matters, and learning a lot about
            ourselves in the process.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-sm text-accent mb-3">
            What I&apos;m learning
          </h3>
          <p className="text-ink-muted leading-relaxed">
            Currently reading <em>Atomic Habits</em> by James Clear — the
            kind of book that makes you quietly re-evaluate every routine
            you&apos;ve ever had. On the technical side, I&apos;m grinding
            DSA with friends (NeetCode, LeetCode, the whole ritual), and
            going deeper into backend fundamentals — specifically system
            design, because I&apos;m tired of my backend work stopping at
            &ldquo;it works&rdquo; and never reaching &ldquo;I actually
            understand why this scales.&rdquo;
          </p>
        </div>

        <div>
          <h3 className="font-mono text-sm text-accent mb-3">
            What&apos;s challenging me?
          </h3>
          <p className="text-ink-muted leading-relaxed">
            Genuinely, just figuring out what&apos;s next. Four years of work
            — projects, freelance gigs, community stuff — all building up to
            this exact moment, and now it&apos;s time to see if it pays off.
            Add in the DSA grind, the system design deep-dive, and Bloom
            running in parallel, and my schedule looks less like a plan and
            more like a group project nobody&apos;s leading. But I&apos;m
            learning to hold the chaos loosely instead of fighting it.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-sm text-accent mb-3">
            Beyond all that
          </h3>
          <p className="text-ink-muted leading-relaxed">
            Beyond all that, I care a lot about the people around me —
            I&apos;m usually the one my friends and classmates come to for
            help with their projects, their code, their write-ups, whatever
            needs fixing. There&apos;s something satisfying about being
            useful in that quiet, unglamorous way. Leadership and community
            aren&apos;t things I chase for the title — they just seem to
            find me, and I&apos;ve stopped resisting it.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-sm text-accent mb-3">
            What&apos;s next?
          </h3>
          <p className="text-ink-muted leading-relaxed">
            At the end of the day, I just want everything I&apos;m juggling
            right now to actually work out — the job search, Bloom, the
            leadership stuff, all of it. And if the universe can&apos;t
            guarantee that, the least it can do is keep my Wi-Fi stable.
          </p>
        </div>
      </div>
    </section>
  );
}
