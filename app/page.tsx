import Nav from "@/components/Nav";
import StatusRail from "@/components/StatusRail";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Community from "@/components/Community";
import Now from "@/components/Now";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StatusRail />
      <div className="md:pl-14">
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Work />
          <Community />
          <Now />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
