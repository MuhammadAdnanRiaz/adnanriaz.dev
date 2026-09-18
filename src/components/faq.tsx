import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/site";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-20 py-20 sm:py-28 border-t hairline">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Before you write"
            title={
              <>
                The questions <em className="text-accent">clients usually ask.</em>
              </>
            }
          />
        </div>
        <div className="lg:col-span-8 divide-y divide-line border-y hairline" data-reveal>
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-start justify-between gap-6 text-lg font-display">
                <span>{f.q}</span>
                <span className="faq-icon mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border hairline text-muted" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 pr-12 text-muted leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
