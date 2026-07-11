export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[90vh] flex flex-col justify-center px-6 md:px-10 md:pl-20 py-24 border-b border-border"
    >
      <div className="fade-up">
        <div className="font-mono text-xs text-accent mb-5 tracking-wide">
          // lagos, nigeria
        </div>
        <h1 className="font-mono font-medium text-[13vw] leading-[1.05] sm:text-5xl md:text-6xl mb-6 max-w-3xl">
          Software Engineer.
        </h1>
        <p className="text-lg md:text-xl text-ink-muted max-w-xl leading-relaxed mb-10">
          I don&apos;t just write code — I solve problems other people give up on.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#work"
            className="bg-accent text-bg font-mono text-sm font-medium px-5 py-3 rounded hover:brightness-110 transition"
          >
            view work →
          </a>
          <a
            href="#contact"
            className="border border-border text-ink font-mono text-sm px-5 py-3 rounded hover:border-ink-muted transition"
          >
            get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
