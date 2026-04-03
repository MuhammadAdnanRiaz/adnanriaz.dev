"use client";

import { motion } from "framer-motion";
import { heroStagger, fadeInUp } from "@/lib/animations";
import React from "react";

export function HeroAnimations({ children }: { children: React.ReactNode }) {
  const childArray = React.Children.toArray(children);

  return (
    <motion.div
      className="lg:col-span-7 z-10"
      variants={heroStagger}
      initial="hidden"
      animate="visible"
    >
      {childArray.map((child, i) => (
        <motion.div key={i} variants={fadeInUp}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
