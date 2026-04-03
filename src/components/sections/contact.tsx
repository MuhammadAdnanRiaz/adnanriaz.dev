"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, CheckCircle, Send } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { siteConfig, projectTypes } from "@/lib/constants";
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Replace with your Formspree/Web3Forms endpoint
    console.log("Form submitted:", data);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        {/* Left - Info */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tighter">
            Let&apos;s build something great together.
          </h2>
          <p className="text-xl text-on-surface-variant mb-12 leading-relaxed">
            I&apos;m Adnan, and I&apos;m currently accepting new projects.
            Whether it&apos;s a web app, mobile app, or full-stack platform
            &mdash; let&apos;s talk.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center ghost-border">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                  Email
                </p>
                <p className="text-lg font-bold">{siteConfig.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center ghost-border">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                  Location
                </p>
                <p className="text-lg font-bold">{siteConfig.location}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-card rounded-xl p-8 shadow-xl"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[400px] text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                >
                  <CheckCircle className="w-16 h-16 text-primary mb-6" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold mb-2">
                  Message Dispatched!
                </h3>
                <p className="text-on-surface-variant">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-on-surface-variant">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      placeholder="John Doe"
                      className="w-full bg-surface-container-lowest border-b-2 border-outline-variant/30 focus:border-primary text-on-surface placeholder:text-outline p-4 transition-all outline-none rounded-sm"
                    />
                    {errors.name && (
                      <p className="text-error text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-on-surface-variant">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-surface-container-lowest border-b-2 border-outline-variant/30 focus:border-primary text-on-surface placeholder:text-outline p-4 transition-all outline-none rounded-sm"
                    />
                    {errors.email && (
                      <p className="text-error text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-on-surface-variant">
                    Project Type
                  </label>
                  <select
                    {...register("projectType")}
                    className="w-full bg-surface-container-lowest border-b-2 border-outline-variant/30 focus:border-primary text-on-surface p-4 transition-all outline-none rounded-sm cursor-pointer"
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="text-error text-xs mt-1">
                      {errors.projectType.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-on-surface-variant">
                    Your Vision
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Briefly describe your project goals..."
                    className="w-full bg-surface-container-lowest border-b-2 border-outline-variant/30 focus:border-primary text-on-surface placeholder:text-outline p-4 transition-all outline-none rounded-sm resize-none"
                  />
                  {errors.message && (
                    <p className="text-error text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Dispatching..."
                  ) : (
                    <>
                      Dispatch Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
