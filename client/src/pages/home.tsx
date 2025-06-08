import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import About from "@/components/About";
import Services from "@/components/Services";
import WorkProcess from "@/components/WorkProcess";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Statistics />
      <About />
      <Services />
      <WorkProcess />
      <Contact />
      <Footer />
    </div>
  );
}
