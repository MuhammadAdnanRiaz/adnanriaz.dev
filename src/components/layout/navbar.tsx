"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="glass border-b border-outline-variant/10 shadow-lg shadow-black/5">
        <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold tracking-tighter text-primary font-display">
            {siteConfig.brand}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-display tracking-tight text-on-surface-variant hover:text-on-surface transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
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
            <Button
              variant="gradient"
              className="hidden sm:inline-flex"
              onClick={() => scrollTo("#contact")}
            >
              Work with Me
            </Button>
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
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left font-display text-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="gradient"
                size="lg"
                className="w-full mt-4"
                onClick={() => scrollTo("#contact")}
              >
                Work with Me
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
