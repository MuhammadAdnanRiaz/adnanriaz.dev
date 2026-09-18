import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import type { Project } from "@/lib/projects";

export function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="scroll-mt-20 py-20 sm:py-28 border-t hairline">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Five projects that show the range, <em className="text-accent">explained properly.</em>
            </>
          }
          lede="A data platform for a US startup where I wrote most of the code, a six-year client relationship spanning web, API and mobile, two live SaaS products, and an open-source build you can read line by line. Each case study covers the context, what I personally built, and the decisions behind it."
        />

        <div className="mt-16 space-y-20 sm:space-y-28">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={p.slug}
                className="grid gap-8 lg:grid-cols-12 lg:items-center"
                data-reveal
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className={`group relative block overflow-hidden rounded-2xl border hairline bg-bg-2 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
                  aria-label={`${p.title}: read the case study`}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      priority={i === 0}
                    />
                  </div>
                </Link>

                <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <p className="eyebrow">
                    {p.category} · {p.year}
                  </p>
                  <h3 className="mt-3 text-3xl sm:text-4xl leading-[1.05]">
                    <Link href={`/projects/${p.slug}`} className="hover:text-accent transition-colors">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-muted leading-relaxed">{p.summary}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span className="text-fg/90">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 6).map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                    <Link href={`/projects/${p.slug}`} className="font-semibold underline decoration-accent underline-offset-4 hover:decoration-2">
                      Read the case study →
                    </Link>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                        Live ↗
                      </a>
                    )}
                    {p.source && (
                      <a href={p.source} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                        Source ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 rounded-2xl border hairline bg-bg-2 p-6 sm:p-8 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center" data-reveal>
          <div>
            <p className="eyebrow">Also built</p>
            <p className="mt-2 text-muted">
              Bokia, a bookkeeping, inventory and point-of-sale app for small businesses with multi-currency and barcode scanning (React, React Native, 2022 to 2024);{" "}
              <a href="https://openclick-frontend.vercel.app" target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-accent underline-offset-4">OpenClick</a>, a project-tracking UI with list, board, calendar and Gantt views (React, Vite);{" "}
              <a href="https://github.com/MuhammadAdnanRiaz/translator-app" target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-accent underline-offset-4">Prolingo</a>, a desktop app that rewrites messages into natural English with a fully local LLM (Tauri, Rust, llama.cpp); and PG Viewer, an open-source PostgreSQL browser. Client work under NDA is walked through on a call.
            </p>
          </div>
          <a href="#contact" className="btn btn-ghost">Ask about similar work</a>
        </div>
      </div>
    </section>
  );
}
