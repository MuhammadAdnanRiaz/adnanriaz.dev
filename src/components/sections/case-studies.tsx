"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

export function CaseStudies({ projects }: { projects: Project[] }) {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-display text-4xl font-bold mb-16 tracking-tight"
      >
        Case Studies
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => {
          const accentColor =
            project.accent === "primary" ? "text-primary" : "text-secondary";

          return (
            <motion.article
              key={project.slug}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className={`group relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-high ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 p-8 w-full">
                <Badge className={accentColor}>{project.tech}</Badge>
                <h3 className="text-2xl font-display font-bold mt-2 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  {project.description}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className={`${accentColor} text-sm font-bold flex items-center gap-1 group/btn`}
                >
                  View Study{" "}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Conversion CTA */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p className="text-on-surface-variant mb-4">
          Have a similar project in mind?
        </p>
        <Button variant="gradient" size="lg" onClick={() => scrollTo("#contact")}>
          Let&apos;s Talk
          <ArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>
    </section>
  );
}
