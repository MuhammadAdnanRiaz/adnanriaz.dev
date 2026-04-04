import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogArticle } from "@/components/sections/blog-article";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 lg:px-8 bg-surface min-h-screen">
        <article className="max-w-3xl mx-auto">
          <div className="mb-12">
            <Link
              href="/#projects"
              className="text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              &larr; All projects
            </Link>

            <div className="mt-8 relative aspect-video rounded-xl overflow-hidden bg-surface-container-high">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <Badge
                className={
                  project.accent === "primary"
                    ? "text-primary"
                    : "text-secondary"
                }
              >
                {project.tech}
              </Badge>
              <span className="text-xs text-outline uppercase font-bold">
                {project.role}
              </span>
              <span className="text-xs text-outline uppercase font-bold">
                {project.duration}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-on-surface-variant leading-relaxed">
              {project.description}
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.stack.map((tech) => (
                <div
                  key={tech}
                  className="text-sm text-on-surface-variant bg-surface-container-high rounded-lg px-3 py-2 text-center ghost-border"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <BlogArticle contentHtml={project.contentHtml} />
        </article>
      </main>
      <Footer />
    </>
  );
}
