import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { CaseStudies } from "@/components/sections/case-studies";
import { Blog } from "@/components/sections/blog";
import { SkillsMarquee } from "@/components/sections/skills-marquee";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <CaseStudies />
        <Blog />
        <SkillsMarquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
