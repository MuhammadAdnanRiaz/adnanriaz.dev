"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function BlogArticle({ contentHtml }: { contentHtml: string }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="prose"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
