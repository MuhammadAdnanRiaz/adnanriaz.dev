"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds `.js` to <html> and reveals [data-reveal] elements as they enter the viewport.
 * Re-runs on every route change so client-side navigations never leave content hidden.
 */
export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const reveal = (el: Element) => el.classList.add("is-in");
    const pending = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));

    if (!("IntersectionObserver" in window)) {
      pending().forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    pending().forEach((el) => io.observe(el));

    // Elements added after navigation (streamed or lazily rendered) get observed too.
    const mo = new MutationObserver(() => pending().forEach((el) => io.observe(el)));
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: never leave content hidden if the observer misbehaves.
    const timer = window.setTimeout(() => pending().forEach(reveal), 1800);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
