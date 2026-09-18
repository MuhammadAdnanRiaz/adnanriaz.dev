import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export type ProjectFrontmatter = {
  title: string;
  summary: string;
  category: string;
  year: string;
  role: string;
  timeline: string;
  team: string;
  platform: string;
  cover: string;
  coverAlt: string;
  live?: string;
  source?: string;
  stack: string[];
  highlights: string[];
  order: number;
};

export type Project = ProjectFrontmatter & { slug: string };
export type ProjectWithContent = Project & { contentHtml: string };

export function getAllProjects(): Project[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as ProjectFrontmatter) };
    })
    .sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithContent> {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: "github-dark-default", keepBackground: false })
    .use(rehypeStringify)
    .process(content);
  return { slug, ...(data as ProjectFrontmatter), contentHtml: result.toString() };
}
