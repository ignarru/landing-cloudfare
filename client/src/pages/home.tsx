import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import About from "@/components/About";
import Services from "@/components/Services";
import WorkProcess from "@/components/WorkProcess";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { CONTACT_EXTRA_OFFSET } from "@/lib/constants";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Scroll further down when jumping to the contact form
  const contactOffset = {
    mobile: CONTACT_EXTRA_OFFSET.mobile,
    desktop: CONTACT_EXTRA_OFFSET.desktop - 80
  };
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Statistics />
      <About />
      <Services />
      <WorkProcess />
      <Contact offset={contactOffset} />
      <Footer />
    </div>
  );
}
