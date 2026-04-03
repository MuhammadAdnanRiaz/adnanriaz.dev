"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TerminalWidget } from "@/components/ui/terminal-widget";
import { heroStagger, fadeInUp } from "@/lib/animations";

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden pt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Content */}
        <motion.div
          className="lg:col-span-7 z-10"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="availability">Available for new projects</Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tighter mt-8 mb-8"
          >
            Hey, I&apos;m Adnan. I build apps that{" "}
            <span className="gradient-text">drive growth.</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed"
          >
            Full-stack developer specializing in high-velocity web &amp; mobile
            solutions. From architecture to deployment, I turn ideas into
            products that scale.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Button
              variant="gradient"
              size="lg"
              onClick={() => scrollTo("#projects")}
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => scrollTo("#skills")}
            >
              Technical Stack
            </Button>
          </motion.div>
        </motion.div>

        {/* Right - Terminal Widget */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <TerminalWidget />
        </div>
      </div>
    </section>
  );
}
