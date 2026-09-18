import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28 border-t hairline bg-bg-2/40">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">
            Send me the problem. <em className="text-accent">I will tell you how I would approach it.</em>
          </h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            A new product, a feature that needs finishing, or a codebase nobody wants to touch. A few lines
            is enough. You get a straight answer on scope, approach and timeline, usually within a day.
          </p>

          <div className="mt-8 rounded-2xl border hairline bg-bg p-6">
            <p className="eyebrow">Prefer to hire through Upwork?</p>
            <p className="mt-2 text-sm text-muted">
              Contracts, milestones and payment protection are all handled there. Message me from my profile
              and mention this site.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-10 !px-4 text-sm">
                Open Upwork profile ↗
              </a>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-10 !px-4 text-sm">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
