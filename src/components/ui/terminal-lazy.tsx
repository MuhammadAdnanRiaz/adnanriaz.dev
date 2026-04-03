"use client";

import dynamic from "next/dynamic";

const TerminalWidget = dynamic(
  () =>
    import("@/components/ui/terminal-widget").then((m) => ({
      default: m.TerminalWidget,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="relative">
        <div className="absolute aspect-square bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[100px] -inset-4" />
        <div className="relative glass-card rounded-xl p-6 shadow-2xl min-h-[200px]" />
      </div>
    ),
  }
);

export function TerminalLazy() {
  return <TerminalWidget />;
}
