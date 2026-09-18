import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t hairline py-10">
      <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg">
            {site.name}<span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-faint">
            © {new Date().getFullYear()} {site.fullName}. {site.role}. Built with Next.js, deployed on Vercel.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/#work" className="hover:text-fg">Work</Link>
          <a href={site.links.upwork} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Upwork</a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">LinkedIn</a>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">GitHub</a>
        </nav>
      </div>
    </footer>
  );
}
