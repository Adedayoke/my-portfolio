export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="h-[3px] bg-accent" />
      <div className="flex items-center justify-between px-6 md:px-10 py-4 md:pl-20">
        <a href="#hero" className="font-mono text-sm font-medium">
          habeeb<span className="text-accent">.dev</span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 font-mono text-[11px] text-ink-muted">
          <a href="#about" className="hover:text-ink transition-colors">
            about
          </a>
          <a href="#work" className="hover:text-ink transition-colors">
            work
          </a>
          <a href="#now" className="hover:text-ink transition-colors">
            now
          </a>
          <a href="#contact" className="hover:text-ink transition-colors">
            contact
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-ink-muted border border-border rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          open to opportunities
        </div>
      </div>
    </header>
  );
}
