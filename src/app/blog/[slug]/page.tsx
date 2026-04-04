import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogArticle } from "@/components/sections/blog-article";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 lg:px-8 bg-surface min-h-screen">
        <article className="max-w-3xl mx-auto">
          <div className="mb-12">
            <Link
              href="/blog"
              className="text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              &larr; All posts
            </Link>
            <div className="mt-6 mb-4 flex items-center gap-4">
              <span
                className={`text-xs font-bold tracking-widest uppercase ${
                  post.accent === "primary"
                    ? "text-primary"
                    : "text-secondary"
                }`}
              >
                {post.category}
              </span>
              <span className="text-xs text-outline uppercase font-bold">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-xs text-outline uppercase font-bold">
                {post.readTime}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-on-surface-variant leading-relaxed">
              {post.description}
            </p>
          </div>

          <BlogArticle contentHtml={post.contentHtml} />
        </article>
      </main>
      <Footer />
    </>
  );
}
