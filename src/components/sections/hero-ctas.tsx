"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroCTAs() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="gradient"
        size="lg"
        onClick={() => scrollTo("#projects")}
      >
        View My Work
        <ArrowRight className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="lg" onClick={() => scrollTo("#skills")}>
        Technical Stack
      </Button>
    </div>
  );
}
