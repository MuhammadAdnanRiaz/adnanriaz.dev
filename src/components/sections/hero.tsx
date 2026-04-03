import { Badge } from "@/components/ui/badge";
import { HeroAnimations } from "@/components/sections/hero-animations";
import { HeroCTAs } from "@/components/sections/hero-ctas";
import { TerminalLazy } from "@/components/ui/terminal-lazy";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden pt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Content — server-rendered for fast LCP */}
        <HeroAnimations>
          <div>
            <Badge variant="availability">Available for new projects</Badge>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tighter mt-8 mb-8">
            Hey, I&apos;m Adnan. I build apps that{" "}
            <span className="gradient-text">drive growth.</span>
          </h1>

          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
            Full-stack developer specializing in high-velocity web &amp; mobile
            solutions. From architecture to deployment, I turn ideas into
            products that scale.
          </p>

          <HeroCTAs />
        </HeroAnimations>

        {/* Right - Terminal Widget (lazy client component) */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <TerminalLazy />
        </div>
      </div>
    </section>
  );
}
