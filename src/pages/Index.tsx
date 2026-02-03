import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AcademyBanner from "@/components/AcademyBanner";
import Impact from "@/components/Impact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-page-gradient">
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <AcademyBanner />
        <Impact />
        <CTA />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
