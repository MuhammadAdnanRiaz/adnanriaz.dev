import { SectionHeading } from "@/components/section-heading";
import { process } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 py-20 sm:py-28 border-t hairline">
      <div className="container-x">
        <SectionHeading
          eyebrow="How an engagement runs"
          title={
            <>
              Written down, built in the open, <em className="text-accent">handed over properly.</em>
            </>
          }
          lede="Seven years of remote work with small teams produced a simple routine. It exists so you always know what is happening without having to ask."
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border hairline bg-line md:grid-cols-4">
          {process.map((step, i) => (
            <li
              key={step.n}
              className="bg-bg p-7"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className="font-mono text-xs text-accent">{step.n}</span>
              <h3 className="mt-4 text-xl font-sans font-semibold tracking-normal">{step.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
