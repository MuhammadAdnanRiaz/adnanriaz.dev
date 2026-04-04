"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resolveHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="glass border-b border-outline-variant/10 shadow-lg shadow-black/5">
        <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tighter text-primary font-display">
            {siteConfig.brand}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              isHome ? (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="font-display tracking-tight text-on-surface-variant hover:text-on-surface transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  className="font-display tracking-tight text-on-surface-variant hover:text-on-surface transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="#"
              className="font-display tracking-tight text-on-surface-variant hover:text-on-surface transition-colors duration-200 flex items-center gap-1"
            >
              Resume <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {isHome ? (
              <Button
                variant="gradient"
                className="hidden sm:inline-flex"
                onClick={() => handleNav("#contact")}
              >
                Work with Me
              </Button>
            ) : (
              <Link
                href="/#contact"
                className="hidden sm:inline-flex gradient-cta text-on-primary-fixed font-bold rounded-lg px-6 py-2.5 hover:shadow-lg hover:shadow-primary/20 items-center gap-2 transition-all duration-200"
              >
                Work with Me
              </Link>
            )}
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-on-surface cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass border-b border-outline-variant/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) =>
                isHome ? (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className="block w-full text-left font-display text-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={resolveHref(link.href)}
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-left font-display text-lg text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              {isHome ? (
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full mt-4"
                  onClick={() => handleNav("#contact")}
                >
                  Work with Me
                </Button>
              ) : (
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full mt-4 text-center gradient-cta text-on-primary-fixed font-bold rounded-lg px-8 py-4 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                >
                  Work with Me
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
