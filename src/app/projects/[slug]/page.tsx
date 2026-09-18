import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { site } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getAllProjects().find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.summary,
      url: `${site.url}/projects/${slug}`,
      images: [{ url: p.cover, alt: p.coverAlt }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = getAllProjects();
  const idx = all.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const project = await getProjectBySlug(slug);
  const next = all[(idx + 1) % all.length];

  const facts: { k: string; v: React.ReactNode }[] = [
    { k: "Role", v: project.role },
    { k: "Timeline", v: project.timeline },
    { k: "Team", v: project.team },
    { k: "Platform", v: project.platform },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${site.url}/projects/${slug}`,
    author: { "@id": `${site.url}/#person` },
    image: `${site.url}${project.cover}`,
    keywords: project.stack.join(", "),
  };

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="main" className="py-12 sm:py-16">
        <article className="container-x">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/#work" className="hover:text-fg">← All work</Link>
          </nav>

          <header className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow">{project.category} · {project.year}</p>
              <h1 className="mt-4 text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02]">{project.title}</h1>
              <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-3xl">{project.summary}</p>
            </div>
            <dl className="lg:col-span-4 rounded-2xl border hairline bg-bg-2 divide-y divide-line text-sm">
              {facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[6rem_1fr] gap-3 px-5 py-3">
                  <dt className="font-mono text-xs text-faint pt-0.5">{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
              {(project.live || project.source) && (
                <div className="grid grid-cols-[6rem_1fr] gap-3 px-5 py-3">
                  <dt className="font-mono text-xs text-faint pt-0.5">Links</dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4">Live ↗</a>
                    )}
                    {project.source && (
                      <a href={project.source} target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4">Source ↗</a>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </header>

          <div className="mt-12 relative aspect-[16/9] overflow-hidden rounded-2xl border hairline bg-bg-2">
            <Image src={project.cover} alt={project.coverAlt} fill priority sizes="(max-width: 1216px) 100vw, 1216px" className="object-cover" />
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <div className="case lg:col-span-8" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-8">
                <div>
                  <p className="eyebrow">Stack</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <li key={s} className="chip">{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow">In short</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span className="text-fg/90">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border hairline bg-bg-2 p-5">
                  <p className="font-display text-xl">Need something like this?</p>
                  <p className="mt-2 text-sm text-muted">Describe it in a few lines and I will reply within a business day.</p>
                  <Link href="/#contact" className="btn btn-primary mt-4 w-full !min-h-10 text-sm">Start a conversation</Link>
                </div>
              </div>
            </aside>
          </div>

          <footer className="mt-20 border-t hairline pt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/#work" className="text-sm text-muted hover:text-fg">← All work</Link>
            <Link href={`/projects/${next.slug}`} className="group text-right">
              <span className="eyebrow">Next project</span>
              <span className="block font-display text-xl group-hover:text-accent transition-colors">{next.title} →</span>
            </Link>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
