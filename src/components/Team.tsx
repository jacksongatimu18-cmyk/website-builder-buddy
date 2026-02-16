import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import teamIsaac from "@/assets/team-isaac.jpg";
import teamDebra from "@/assets/team-debra.jpg";
import teamJackson from "@/assets/team-jackson.jpg";
import teamCynthia from "@/assets/team-cynthia.jpg";
import teamRyan from "@/assets/team-ryan.jpg";
import teamMelanie from "@/assets/team-melanie.jpg";

const teamMembers = [
  {
    name: "Isaac Ndirangu",
    role: "Executive Director",
    image: teamIsaac,
  },
  {
    name: "Debra Kimberley",
    role: "Policy & ESG Director",
    image: teamDebra,
  },
  {
    name: "Jackson Gatimu",
    role: "Finance & Innovation Director",
    image: teamJackson,
  },
  {
    name: "Cynthia Mutheu",
    role: "Communications & Advocacy Lead",
    image: teamCynthia,
  },
  {
    name: "Ryan Kipkorir",
    role: "Admin & Programs",
    image: teamRyan,
  },
  {
    name: "Melanie Wangui",
    role: "Mental Health & Wellbeing",
    image: teamMelanie,
  },
];

const Team = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section id="team" className="py-24 section-glass-light">
      <div className="container mx-auto px-6">
        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-4">
            🌍 The People
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            Meet the <span className="text-ocean-gradient">Team</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Young, passionate changemakers driving climate resilience across Africa.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group text-center transition-all duration-500 ${
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative mx-auto w-36 h-36 md:w-44 md:h-44 mb-4 rounded-2xl overflow-hidden shadow-card group-hover:shadow-glow transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
              <h3 className="text-base md:text-lg font-bold tracking-tight text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-accent font-medium mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
