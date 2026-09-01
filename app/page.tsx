import FloatingSky from "@/components/floating-sky/FloatingSky";
import Hero from "@/components/floating-sky/sections/Hero";
import About from "@/components/floating-sky/sections/About";
import Skills from "@/components/floating-sky/sections/Skills";
import Projects from "@/components/floating-sky/sections/Projects";
import Path from "@/components/floating-sky/sections/Path";
// import Blog from "@/components/floating-sky/sections/Blog"; // no blog posts yet
import Contact from "@/components/floating-sky/sections/Contact";
import Footer from "@/components/floating-sky/Footer";

export default function Page() {
  return (
    <FloatingSky>
      <main id="content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Path />
        {/* <Blog /> */}
        <Contact />
      </main>
      <Footer />
    </FloatingSky>
  );
}
