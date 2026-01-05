import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AcademyBanner from "@/components/AcademyBanner";
import Programs from "@/components/Programs";
import Impact from "@/components/Impact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <AcademyBanner />
      <Programs />
      <Impact />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
