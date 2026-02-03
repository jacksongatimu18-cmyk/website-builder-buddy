import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ContactDialog from "./ContactDialog";
import PartnerDialog from "./PartnerDialog";

const CTA = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [contactOpen, setContactOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  return (
    <section id="contact" className="py-24 section-glass">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={ref}
            className={`bg-card rounded-3xl border border-border p-8 md:p-16 text-center shadow-card transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div 
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-8 transition-all duration-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <Mail className="w-8 h-8 text-accent" />
            </div>
            
            <h2 
              className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              Ready to Join the{" "}
              <span className="text-primary">Climate Movement</span>?
            </h2>
            
            <p 
              className={`text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Whether you're a youth leader, organization, or industry partner, 
              there's a place for you in the SPAC Network. Let's build climate 
              resilience together.
            </p>

            <div 
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              <Button 
                variant="hero" 
                size="xl" 
                className="hover:scale-105 transition-transform"
                onClick={() => setPartnerOpen(true)}
              >
                Partner With Us
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="hover:scale-105 transition-transform"
                onClick={() => setContactOpen(true)}
              >
                Contact Us
              </Button>
            </div>

            <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
            <PartnerDialog open={partnerOpen} onOpenChange={setPartnerOpen} />

            {/* Theory of Change */}
            <div 
              className={`mt-16 pt-10 border-t border-border transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Our Theory of Change
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                If communities and organizations gain access to climate science, policy frameworks 
                and investment-readiness training, they will mainstream resilience into their programs, 
                meet national and global climate commitments, and unlock climate finance—accelerating 
                climate action at local, national, and regional levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
