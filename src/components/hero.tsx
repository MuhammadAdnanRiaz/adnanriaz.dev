import { heroFacts, site, snapshot } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-glow">
      <div className="absolute inset-0 grid-texture opacity-[0.35] pointer-events-none" aria-hidden />
      <div className="container-x relative grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:items-center lg:py-32">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 chip !text-ok !border-ok/30" data-reveal>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            {site.availability}
          </p>

          <h1
            className="mt-7 text-[clamp(2.75rem,8vw,5.75rem)] leading-[0.98] font-normal"
            data-reveal
            style={{ ["--reveal-delay" as string]: "60ms" }}
          >
            I take web and mobile products from{" "}
            <em className="text-accent" style={{ fontVariationSettings: '"SOFT" 60' }}>
              spec to shipped.
            </em>
          </h1>

          <p
            className="mt-7 max-w-2xl text-lg sm:text-xl text-muted leading-relaxed"
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            Senior full-stack engineer. React, Next.js and SvelteKit in TypeScript, Node.js and
            PostgreSQL behind them, React Native for mobile. Remote with US startups since 2022, most
            recently as the lead front-end engineer for a logistics-AI company in the San Francisco Bay
            Area, owning features from UI to database to deployment.
          </p>

          <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
            <a href="#work" className="btn btn-primary">See the work</a>
            <a href="#contact" className="btn btn-ghost">Start a conversation</a>
          </div>

          <ul
            className="mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted"
            data-reveal
            style={{ ["--reveal-delay" as string]: "240ms" }}
          >
            {heroFacts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <aside
          className="lg:col-span-5"
          aria-label="Engagement snapshot"
          data-reveal
          style={{ ["--reveal-delay" as string]: "200ms" }}
        >
          <div className="rounded-2xl border hairline bg-bg-2/80 backdrop-blur p-6 sm:p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between">
              <p className="eyebrow !text-fg">Engagement snapshot</p>
              <span className="font-mono text-[11px] text-faint">v2026.09</span>
            </div>
            <dl className="mt-5 divide-y divide-line">
              {snapshot.map((row) => (
                <div key={row.k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
                  <dt className="font-mono text-xs text-faint pt-0.5">{row.k}</dt>
                  <dd className="text-fg/90">{row.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-10 !px-4 text-sm">
                Upwork profile
              </a>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-10 !px-4 text-sm">
                LinkedIn
              </a>
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-10 !px-4 text-sm">
                GitHub
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
