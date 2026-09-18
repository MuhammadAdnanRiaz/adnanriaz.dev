import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28 border-t hairline bg-bg-2/40">
      <div className="container-x">
        <SectionHeading
          eyebrow="What I build"
          title={
            <>
              Three kinds of work. <em className="text-accent">One engineer, no handoff.</em>
            </>
          }
          lede="Every engagement ends with something deployed, documented, and ready for whoever touches it next."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.n}
              className="rounded-2xl border hairline bg-bg p-7 flex flex-col"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className="font-mono text-xs text-accent">{s.n}</span>
              <h3 className="mt-4 text-2xl leading-tight">{s.title}</h3>
              <p className="mt-4 text-sm text-muted leading-relaxed">{s.body}</p>
              <ul className="mt-6 space-y-2.5 text-sm border-t hairline pt-5">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span className="text-fg/85">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
