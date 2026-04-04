"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { BlogPost } from "@/lib/blog";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {posts.map((post) => {
        const accentColor =
          post.accent === "primary" ? "text-primary" : "text-secondary";
        const hoverBorder =
          post.accent === "primary"
            ? "hover:border-primary/50"
            : "hover:border-secondary/50";

        return (
          <motion.div key={post.slug} variants={fadeInUp} whileHover={{ y: -2 }}>
            <Link
              href={`/blog/${post.slug}`}
              className={`block bg-surface-container-high p-6 rounded-xl ghost-border ${hoverBorder} transition-all`}
            >
              <div className="flex items-center gap-4 mb-3">
                <span
                  className={`text-xs font-bold ${accentColor} tracking-widest uppercase`}
                >
                  {post.category}
                </span>
                <span className="text-[10px] uppercase font-bold text-outline">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="text-[10px] uppercase font-bold text-outline">
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-xl font-display font-bold mb-2 leading-tight">
                {post.title}
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {post.description}
              </p>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
