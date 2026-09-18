"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const href = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl tracking-tight" aria-label="Home">
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {nav.map((item) => (
            <a key={item.href} href={href(item.href)} className="text-sm text-muted hover:text-fg transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden sm:inline-flex !min-h-10 !px-4 text-sm"
          >
            Hire on Upwork
          </a>
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border hairline"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 h-[2px] w-4 bg-fg transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[5px] h-[2px] w-4 bg-fg transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[10px] h-[2px] w-4 bg-fg transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t hairline bg-bg">
          <nav aria-label="Mobile" className="container-x flex flex-col py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={href(item.href)}
                onClick={() => setOpen(false)}
                className="py-3 text-lg font-display border-b hairline last:border-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.links.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-4"
              onClick={() => setOpen(false)}
            >
              Hire on Upwork
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
