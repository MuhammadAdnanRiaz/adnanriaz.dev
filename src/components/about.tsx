import { SectionHeading } from "@/components/section-heading";
import { aboutFacts, career } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28 border-t hairline bg-bg-2/40">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="About"
            title={
              <>
                Muhammad Adnan Riaz. <em className="text-accent">Islamabad, working worldwide.</em>
              </>
            }
          />
          <div className="mt-8 space-y-5 text-muted leading-relaxed max-w-2xl" data-reveal>
            <p>
              I have spent seven-plus years building production software, first for a public hospital and a
              local agency, then since 2022 with US startups, most recently AI companies in the San Francisco
              Bay Area. The common thread is that I am usually the one engineer responsible for the whole
              feature: schema, API, interface, deployment, and the documentation that lets the next person
              pick it up.
            </p>
            <p>
              I write things down. Scope before code, short written updates while building, and code that
              reads like it was meant to be read. Remote work with US teams solved the timezone question a
              long time ago: I keep overlap hours, answer in writing, and do not need a meeting to unblock
              myself.
            </p>
            <p>
              If you need a senior engineer who can take a product from a spec to shipped without a handoff,
              send me the problem and I will tell you how I would approach it.
            </p>
          </div>

          <ol className="mt-12 border-t hairline" data-reveal>
            {career.map((c) => (
              <li key={c.org} className="grid gap-2 py-5 border-b hairline sm:grid-cols-[9rem_1fr]">
                <span className="font-mono text-xs text-faint pt-1">{c.period}</span>
                <div>
                  <p className="font-semibold">{c.role}</p>
                  <p className="text-sm text-muted">{c.org}</p>
                  <p className="mt-1.5 text-sm text-muted">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:col-span-5 lg:pl-8" data-reveal>
          <dl className="rounded-2xl border hairline bg-bg divide-y divide-line">
            {aboutFacts.map((f) => (
              <div key={f.k} className="grid grid-cols-[7rem_1fr] gap-4 px-6 py-4 text-sm">
                <dt className="font-mono text-xs text-faint pt-0.5">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-faint leading-relaxed">
            References from past clients and employers are available on request. Client code under NDA is not
            shown publicly but can be walked through on a call.
          </p>
        </aside>
      </div>
    </section>
  );
}
