import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/vitrine/Hero";
import Prestations from "@/components/vitrine/Prestations";
import About from "@/components/vitrine/About";
import Gallery from "@/components/vitrine/Gallery";
import Contact from "@/components/vitrine/Contact";
import Footer from "@/components/vitrine/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Prestations />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
