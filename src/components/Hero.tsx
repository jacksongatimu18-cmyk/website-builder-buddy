import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Introducing Nexus 2.0</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up animation-delay-100">
            Build the future with{" "}
            <span className="text-gradient">powerful tools</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up animation-delay-200">
            Transform your ideas into reality with our cutting-edge platform. 
            Streamline workflows, boost productivity, and scale your business effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
            <Button variant="hero" size="xl">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 animate-fade-up animation-delay-400">
            <p className="text-sm text-muted-foreground mb-4">Trusted by innovative teams worldwide</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-xl font-bold text-foreground">Acme Co</div>
              <div className="text-xl font-bold text-foreground">Globex</div>
              <div className="text-xl font-bold text-foreground">Initech</div>
              <div className="text-xl font-bold text-foreground hidden sm:block">Umbrella</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
