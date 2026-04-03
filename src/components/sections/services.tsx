"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, CheckCircle } from "lucide-react";
import { services } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const iconMap = {
  Globe,
  Smartphone,
} as const;

export function Services() {
  return (
    <section className="py-24 bg-surface-container-low px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-bold tracking-tight lg:w-1/2"
          >
            Core Architecture Services
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-on-surface-variant max-w-md">
            Custom development workflows designed to eliminate friction and
            maximize conversion through technical excellence.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            const accentColor =
              service.accent === "primary" ? "text-primary" : "text-secondary";
            const hoverBorder =
              service.accent === "primary"
                ? "hover:border-primary/50"
                : "hover:border-secondary/50";

            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className={`group p-8 rounded-xl bg-surface transition-all duration-300 hover:shadow-xl ghost-border ${hoverBorder}`}
              >
                <div
                  className={`w-14 h-14 rounded-lg ${service.accent === "primary" ? "bg-primary/10" : "bg-secondary/10"} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-7 h-7 ${accentColor}`} />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${accentColor} shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
