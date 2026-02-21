import { Handshake } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import muemActionLogo from "@/assets/partner-muemaction.png";

const stats = [
  { value: "100", label: "Youth Climate Negotiators Trained", suffix: "+" },
  { value: "100", label: "Youth-Led Organizations Developed", suffix: "+" },
  { value: "50", label: "Youth Climate Heroes Identified", suffix: "+" },
  { value: "30", label: "Tertiary Institutions Engaged", suffix: "+" },
  { value: "20", label: "Industry Partners", suffix: "+" },
  { value: "6", label: "Storytelling Sessions Hosted", suffix: "" },
];

const partners = [
  { name: "MuemAction Post", logo: muemActionLogo },
  { name: "Royal Danish Embassy in Kenya", logo: null },
];

const Impact = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: initiativesRef, isVisible: initiativesVisible } = useScrollAnimation();

  return (
    <section id="impact" className="py-24 section-glass-light">
      <div className="container mx-auto px-6">
        <div 
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-accent">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Measurable outcomes driving real change in climate resilience.
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-card border border-border rounded-2xl p-6 text-center hover:shadow-card transition-all duration-500 hover:-translate-y-1 ${
                statsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}<span className="text-accent">{stat.suffix}</span>
              </div>
              <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div 
          ref={initiativesRef}
          className={`bg-hero-gradient rounded-3xl p-8 md:p-12 overflow-hidden relative transition-all duration-700 ${
            initiativesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
                <Handshake className="w-4 h-4" />
                Our Partners
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Collaborating for Climate Action
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                We work alongside trusted partners to amplify impact, scale solutions, and drive meaningful change in communities across Africa.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {partners.map((partner, index) => (
                <div
                  key={partner.name}
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-5 border border-white/10 transition-all duration-500 hover:bg-white/20 hover:-translate-y-1 flex flex-col items-center text-center w-40 ${
                    initiativesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center mb-3 overflow-hidden">
                    {partner.logo ? (
                      <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-contain" />
                    ) : (
                      <span className="text-2xl">🇩🇰</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-white leading-tight">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
