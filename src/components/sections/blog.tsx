"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { BlogPost } from "@/lib/blog";

export function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="blog" className="py-24 bg-surface-container-low px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-between mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl font-bold tracking-tight"
          >
            Technical Insights
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <Link
              href="/blog"
              className="text-primary font-bold flex items-center gap-2 hover:underline underline-offset-4"
            >
              All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => {
            const accentColor =
              post.accent === "primary" ? "text-primary" : "text-secondary";
            const hoverBorder =
              post.accent === "primary"
                ? "hover:border-primary/50"
                : "hover:border-secondary/50";

            return (
              <motion.article
                key={post.slug}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className={`block bg-surface p-6 rounded-xl ghost-border ${hoverBorder} transition-all h-full cursor-pointer`}
                >
                  <div
                    className={`text-xs font-bold ${accentColor} tracking-widest uppercase mb-4`}
                  >
                    {post.category}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant mb-6">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold text-outline">
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
