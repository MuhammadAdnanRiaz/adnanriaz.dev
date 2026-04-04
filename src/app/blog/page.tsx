import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogGrid } from "@/components/sections/blog-grid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical insights on web development, mobile apps, and modern frameworks.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 lg:px-8 bg-surface min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <Link
              href="/"
              className="text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              &larr; Back home
            </Link>
            <h1 className="font-display text-5xl font-bold tracking-tighter mt-6 mb-4">
              Technical Insights
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              Deep dives into the tools, frameworks, and patterns I use to build
              production software.
            </p>
          </div>

          <BlogGrid posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
