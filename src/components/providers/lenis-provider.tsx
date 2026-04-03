"use client";

import { useEffect, startTransition } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Defer Lenis init until after first paint to avoid blocking FCP/LCP
    const timeout = setTimeout(() => {
      startTransition(() => {
        import("lenis").then(({ default: Lenis }) => {
          const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
          });

          function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }

          requestAnimationFrame(raf);

          // Store cleanup reference
          (window as unknown as Record<string, () => void>).__lenisCleanup =
            () => lenis.destroy();
        });
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      (window as unknown as Record<string, (() => void) | undefined>)
        .__lenisCleanup?.();
    };
  }, []);

  return <>{children}</>;
}
