"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/constants";
import { fadeIn } from "@/lib/animations";

export function SkillsMarquee() {
  return (
    <motion.section
      id="skills"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-12 bg-surface-container-lowest overflow-hidden"
    >
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-container-lowest to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-container-lowest to-transparent z-10" />

        <div className="animate-marquee flex items-center gap-12 px-12 whitespace-nowrap">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className={`text-2xl md:text-4xl font-display font-bold text-on-surface/10 transition-colors duration-300 cursor-default select-none ${i % 2 === 0 ? "hover:text-primary" : "hover:text-secondary"}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
