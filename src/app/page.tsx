import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";

// Below-fold sections: lazy-loaded to reduce initial JS bundle
const Services = dynamic(() =>
  import("@/components/sections/services").then((m) => ({ default: m.Services }))
);
const CaseStudies = dynamic(() =>
  import("@/components/sections/case-studies").then((m) => ({
    default: m.CaseStudies,
  }))
);
const Blog = dynamic(() =>
  import("@/components/sections/blog").then((m) => ({ default: m.Blog }))
);
const SkillsMarquee = dynamic(() =>
  import("@/components/sections/skills-marquee").then((m) => ({
    default: m.SkillsMarquee,
  }))
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((m) => ({
    default: m.Contact,
  }))
);

export default function Home() {
  const posts = getAllPosts();
  const projects = getAllProjects();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <CaseStudies projects={projects} />
        <Blog posts={posts} />
        <SkillsMarquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
