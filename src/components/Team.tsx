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

// Staggered sizes and rotations for a dynamic, magazine-style feel
const cardStyles = [
  "md:col-span-2 md:row-span-2", // Isaac - large featured
  "md:col-span-1 md:row-span-1", // Debra
  "md:col-span-1 md:row-span-1", // Jackson
  "md:col-span-1 md:row-span-1", // Cynthia
  "md:col-span-1 md:row-span-1", // Ryan
  "md:col-span-2 md:row-span-1", // Melanie - wide
];

const rotations = [
  "-rotate-1",
  "rotate-2",
  "-rotate-1",
  "rotate-1",
  "-rotate-2",
  "rotate-1",
];

const Team = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section id="team" className="py-24 section-glass-light overflow-hidden">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto auto-rows-[180px] md:auto-rows-[200px]"
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group relative rounded-2xl overflow-hidden shadow-card cursor-pointer
                ${cardStyles[index]}
                ${rotations[index]}
                hover:rotate-0 hover:scale-105 hover:shadow-glow hover:z-10
                transition-all duration-500 ease-out
                ${gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              {/* Gradient overlay - always visible at bottom, full on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Name badge - pinned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-sm md:text-base font-bold tracking-tight leading-tight">
                  {member.name}
                </h3>
                <p className="text-white/80 text-xs md:text-sm font-medium mt-0.5">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
