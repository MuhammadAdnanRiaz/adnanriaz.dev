"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { terminalLines } from "@/lib/constants";
import { scaleIn } from "@/lib/animations";

export function TerminalWidget() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= terminalLines.length) return;

    const line = terminalLines[currentLine];

    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLine] = line.slice(0, currentChar + 1);
          return newLines;
        });
        setCurrentChar((c) => c + 1);
      }, 30 + Math.random() * 20);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <div className="absolute aspect-square bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[100px] -inset-4" />
      <div className="relative glass-card rounded-xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-error" />
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <div className="space-y-3 font-mono text-sm min-h-[140px]">
          {displayedLines.map((line, i) => (
            <p
              key={i}
              className={
                i === terminalLines.length - 1 || i === terminalLines.length - 2
                  ? "text-on-surface-variant"
                  : "text-primary/80"
              }
            >
              {line}
              {i === currentLine && currentLine < terminalLines.length && (
                <span className="animate-blink text-primary">|</span>
              )}
            </p>
          ))}
          {currentLine < terminalLines.length &&
            displayedLines.length <= currentLine && (
              <p className="text-primary/80">
                <span className="animate-blink text-primary">|</span>
              </p>
            )}
        </div>
      </div>
    </motion.div>
  );
}
