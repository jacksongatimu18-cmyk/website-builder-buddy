import { Users, Mic, BookOpen, Trophy, Rocket, GraduationCap } from "lucide-react";

const programs = [
  {
    icon: Users,
    title: "Initiative Fair",
    description: "A platform for youth co-creation, collaboration and advocacy strategies.",
    mode: "Physical",
    color: "from-primary to-primary/70",
  },
  {
    icon: Mic,
    title: "Climate E-ntaractive",
    description: "Interactive sessions building a well-coordinated and aligned youth network for climate action.",
    mode: "Physical",
    color: "from-accent to-accent/70",
  },
  {
    icon: BookOpen,
    title: "Living Books",
    description: "Documented stories to inspire, inform and educate on indigenous and cultural perspectives of climate action.",
    mode: "Hybrid",
    color: "from-primary to-primary/70",
  },
  {
    icon: Trophy,
    title: "The Climate Challenge",
    description: "Nurturing a connected, committed and collaborative community of climate champions.",
    mode: "Hybrid",
    color: "from-accent to-accent/70",
  },
  {
    icon: Rocket,
    title: "Climate Futures Plus",
    description: "Advanced training and mentorship program preparing the next generation of climate leaders.",
    mode: "Hybrid",
    color: "from-primary to-primary/70",
  },
  {
    icon: GraduationCap,
    title: "Climate Negotiators Training",
    description: "Live climate negotiation simulation preparing youth for global climate conferences.",
    mode: "Hybrid",
    color: "from-accent to-accent/70",
  },
];

const Programs = () => {
  return (
    <section id="programs" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary">Programs</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Empowering youth and communities through diverse climate action initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-card transition-all duration-300"
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${program.color}`} />
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center`}>
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                    {program.mode}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
