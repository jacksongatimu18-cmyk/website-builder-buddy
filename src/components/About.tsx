import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Reduce operational costs by up to 40%",
  "Increase team productivity by 3x",
  "Deploy new features in minutes, not days",
  "24/7 dedicated support team",
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for teams who want to{" "}
              <span className="text-gradient">move faster</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We understand the challenges of scaling a modern business. That's why we've built 
              a platform that grows with you, providing the tools and infrastructure you need 
              at every stage of your journey.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent p-1">
              <div className="w-full h-full rounded-3xl bg-card border border-border flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl md:text-7xl font-bold text-gradient mb-2">98%</div>
                  <p className="text-lg text-muted-foreground">Customer Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="text-3xl font-bold text-foreground mb-1">10K+</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
