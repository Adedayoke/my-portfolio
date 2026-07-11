export default function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-10 md:pl-20 py-24 border-b border-border"
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-mono text-2xl font-medium">About</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <p className="text-ink-muted text-base md:text-lg leading-relaxed mb-6">
          Growing up, everyone around me had a defined answer; doctor, lawyer,
          nurse. I never did. I called myself a &ldquo;scientist&rdquo; just to
          buy myself room to be curious about everything, until tech found me
          and gave that curiosity an actual home. I&apos;ve gone from frontend
          to mobile to backend to now chasing AI and ML and maybe sometime eventually go into hardware, and networking,
          not because I can&apos;t focus, but because every one of those
          fields is really just problem-solving wearing a different stack.
          Still connecting the dots.
        </p>
        <a
          href="/about"
          className="font-mono text-sm text-accent hover:underline underline-offset-4"
        >
          Read the full story →
        </a>
      </div>
    </section>
  );
}
