import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  accent: "primary" | "secondary";
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
};

export type BlogPostWithContent = BlogPost & {
  contentHtml: string;
};

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      ...(data as BlogFrontmatter),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostWithContent> {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: "github-dark-default" })
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    ...(data as BlogFrontmatter),
    contentHtml: result.toString(),
  };
}
