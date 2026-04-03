interface BadgeProps {
  children: React.ReactNode;
  variant?: "availability" | "tech";
  className?: string;
}

export function Badge({ children, variant = "tech", className = "" }: BadgeProps) {
  if (variant === "availability") {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
          {children}
        </span>
      </div>
    );
  }

  return (
    <span
      className={`text-[10px] uppercase tracking-widest font-bold ${className}`}
    >
      {children}
    </span>
  );
}
