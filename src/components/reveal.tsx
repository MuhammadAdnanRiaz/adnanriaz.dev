"use client";

import { useEffect } from "react";

/** Adds `.js` to <html> and reveals [data-reveal] elements as they enter the viewport. */
export function RevealInit() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    // Safety net: never leave content hidden if the observer misbehaves.
    const timer = window.setTimeout(() => els.forEach((el) => el.classList.add("is-in")), 1800);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);
  return null;
}
