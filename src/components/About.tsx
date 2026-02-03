import { Target, Eye, Compass, AlertTriangle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
const pillars = [{
  icon: Target,
  title: "Mission",
  description: "To be a catalyst for locally-led climate resilience.",
  color: "bg-primary/10 text-primary"
}, {
  icon: Eye,
  title: "Vision",
  description: "Equipping communities and organizations with science-based, policy aligned and community grounded strategies for impactful climate action.",
  color: "bg-accent/10 text-accent"
}, {
  icon: Compass,
  title: "Goal",
  description: "Build human and institutional capacity for climate-resilient development and unlock climate finance through investment-ready training.",
  color: "bg-primary/10 text-primary"
}];
const About = () => {
  const {
    ref: headerRef,
    isVisible: headerVisible
  } = useScrollAnimation();
  const {
    ref: pillarsRef,
    isVisible: pillarsVisible
  } = useScrollAnimation();
  const {
    ref: solutionRef,
    isVisible: solutionVisible
  } = useScrollAnimation();
  return <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bridging <span className="text-primary">Science</span> & <span className="text-accent">Action</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Communities and organizations often struggle to align their initiatives with climate science 
            and global climate goals. This limits their ability to access climate finance and deliver 
            sustainable, locally-relevant solutions.
          </p>
        </div>

        <div ref={pillarsRef} className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => <div key={pillar.title} className={`p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card ${pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{
          transitionDelay: `${index * 150}ms`
        }}>
              <div className={`w-14 h-14 rounded-xl ${pillar.color} flex items-center justify-center mb-6`}>
                <pillar.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>)}
        </div>

        {/* Solution Box */}
        <div ref={solutionRef} className={`bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl p-8 md:p-12 border border-border transition-all duration-700 ${solutionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid lg:grid-cols-2 gap-10 items-center bg-secondary">
            <div>
              <div className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
                <AlertTriangle className="w-5 h-5" />
                Our Solution
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Practical Tools for Climate Action
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We provide practical tools, strategies and insights that connect science, policy and locally-led action. 
                Our approach delivers solutions that integrate the Sustainable Development Goals, applies the Leave No One 
                Behind principle and ensures a Human Rights Based Approach for equity and inclusion.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-destructive">
              {[{
              label: "SDG Integration",
              icon: "🎯"
            }, {
              label: "Leave No One Behind",
              icon: "🤝"
            }, {
              label: "Human Rights Based",
              icon: "⚖️"
            }, {
              label: "Community Driven",
              icon: "🌍"
            }].map((item, index) => <div key={item.label} className={`bg-card rounded-xl p-4 border border-border text-center transition-all duration-500 hover:scale-105 ${solutionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{
              transitionDelay: `${300 + index * 100}ms`
            }}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;