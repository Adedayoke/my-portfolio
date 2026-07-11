const items = [
  {
    title: "Lynx — crypto analysis agent",
    body: "Built a cryptocurrency analysis AI agent using TypeScript and Groq AI, integrating the CoinGecko API for real-time market data and automated risk assessment.",
  },
  {
    title: "Image processing service",
    body: "Built an asynchronous image processing service with NestJS and BullMQ — background job queues handling resize, compress, and thumbnail generation.",
  },
  {
    title: "Notification system — user service",
    body: "Built the user service within a microservices-based notification system, responsible for retrieving user data and publishing events to RabbitMQ for downstream consumption by the email and push notification services.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-6 md:px-10 md:pl-20 py-24 border-b border-border"
    >
      <div className="flex items-center gap-4 mb-10 max-w-3xl">
        <h2 className="font-mono text-2xl font-medium">Experience</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="max-w-3xl">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="font-mono text-base font-medium">
            HNG Internship — Backend Track
          </h3>
          <span className="font-mono text-xs text-ink-faint whitespace-nowrap">
            Oct 2025 – Dec 2025
          </span>
        </div>
        <p className="text-ink-muted text-sm mb-6">Remote</p>

        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.title} className="border-l border-border pl-5">
              <h4 className="font-mono text-sm text-ink mb-1">
                {item.title}
              </h4>
              <p className="text-ink-muted text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
