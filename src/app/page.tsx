import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work projects={projects} />
        <Services />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
