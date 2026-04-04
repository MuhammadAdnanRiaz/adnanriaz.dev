import Link from "next/link";
import { socialLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full py-12 px-6 lg:px-8 bg-surface-container-low">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
        <div>
          <Link href="/" className="text-lg font-black text-on-surface font-display">
            {siteConfig.brand}
          </Link>
          <p className="text-secondary text-sm uppercase tracking-widest mt-2 font-body">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Engineered for
            performance.
          </p>
        </div>
        <nav className="flex flex-wrap md:justify-end gap-x-8 gap-y-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant text-sm uppercase tracking-widest hover:text-primary transition-colors font-body"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/#projects"
            className="text-on-surface-variant text-sm uppercase tracking-widest hover:text-primary transition-colors font-body"
          >
            Case Studies
          </Link>
        </nav>
      </div>
    </footer>
  );
}
