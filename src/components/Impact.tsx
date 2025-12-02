import { TreePine, Sprout, Droplets, Zap } from "lucide-react";

const stats = [
  { value: "100", label: "Youth Climate Negotiators Trained", suffix: "+" },
  { value: "100", label: "Youth-Led Organizations Developed", suffix: "+" },
  { value: "50", label: "Youth Climate Heroes Identified", suffix: "+" },
  { value: "30", label: "Tertiary Institutions Engaged", suffix: "+" },
  { value: "20", label: "Industry Partners", suffix: "+" },
  { value: "6", label: "Storytelling Sessions Hosted", suffix: "" },
];

const initiatives = [
  {
    icon: TreePine,
    title: "Forest Restoration",
    description: "2 forest restoration programs across the country",
    color: "text-green-600 bg-green-100",
  },
  {
    icon: Sprout,
    title: "Climate Smart Agriculture",
    description: "2 climate smart agriculture projects identified and developed",
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    icon: Droplets,
    title: "Water Resource Management",
    description: "1 water resource management program across the country",
    color: "text-blue-600 bg-blue-100",
  },
  {
    icon: Zap,
    title: "Renewable Energy & E-Mobility",
    description: "2 renewable energy and e-mobility programs across the country",
    color: "text-amber-600 bg-amber-100",
  },
];

const Impact = () => {
  return (
    <section id="impact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-accent">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Measurable outcomes driving real change in climate resilience.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-card transition-shadow"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}<span className="text-accent">{stat.suffix}</span>
              </div>
              <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Africa Climate Edition */}
        <div className="bg-hero-gradient rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
                Africa Climate Edition
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Community-Driven Climate Solutions
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Implementing on-ground environmental and climate solutions that reduce carbon footprints, 
                promote sustainability and strengthen resilience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {initiatives.map((initiative) => (
                <div
                  key={initiative.title}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className={`w-12 h-12 rounded-xl ${initiative.color} flex items-center justify-center mb-4`}>
                    <initiative.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{initiative.title}</h4>
                  <p className="text-white/60 text-sm">{initiative.description}</p>
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
