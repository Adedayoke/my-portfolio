import Nav from "@/components/Nav";
import StatusRail from "@/components/StatusRail";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
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
          <Work />
          <Experience />
          <Now />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
