"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "gradient" | "ghost" | "text";
type ButtonSize = "default" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  gradient:
    "gradient-cta text-on-primary-fixed font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20",
  ghost:
    "ghost-border text-on-surface font-bold rounded-lg hover:bg-surface-container-high transition-colors",
  text: "text-primary font-bold hover:underline underline-offset-4",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-6 py-2.5",
  lg: "px-8 py-4",
};

export function Button({
  variant = "gradient",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${variantStyles[variant]} ${variant !== "text" ? sizeStyles[size] : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
