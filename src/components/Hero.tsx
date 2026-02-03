import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 animate-fade-up">
            <Leaf className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white">Science | Policy | Action | Community</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white animate-fade-up animation-delay-100">
            A Catalyst for{" "}
            <span className="text-accent">Locally-Led</span>{" "}
            Climate Resilience
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-fade-up animation-delay-200 leading-relaxed">
            Equipping communities and organizations with science-based, policy-aligned 
            and community-grounded strategies for impactful climate action.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
            <Button variant="hero" size="xl">
              Join Our Network
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="heroOutline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              Explore Programs
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up animation-delay-400">
            {[
              { value: "100+", label: "Youth Trained" },
              { value: "50+", label: "Climate Heroes" },
              { value: "30+", label: "Institutions" },
              { value: "20+", label: "Industry Partners" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgba(255,255,255,0.15)"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
