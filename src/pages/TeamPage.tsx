import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import teamHero from "@/assets/team-hero.jpg";
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
    bio: "Isaac leads SPAC Network's strategic direction, driving locally-led climate resilience initiatives across Africa.",
  },
  {
    name: "Debra Kimberley",
    role: "Policy & ESG Director",
    image: teamDebra,
    bio: "Debra shapes policy engagement and ESG strategies, bridging the gap between climate science and actionable policy.",
  },
  {
    name: "Jackson Gatimu",
    role: "Finance & Innovation Director",
    image: teamJackson,
    bio: "Jackson drives financial innovation and sustainable funding strategies for climate resilience projects.",
  },
  {
    name: "Cynthia Mutheu",
    role: "Communications & Advocacy Lead",
    image: teamCynthia,
    bio: "Cynthia amplifies SPAC's voice through strategic communications and youth climate advocacy campaigns.",
  },
  {
    name: "Ryan Kipkorir",
    role: "Admin & Programs",
    image: teamRyan,
    bio: "Ryan coordinates program delivery and administrative operations to keep SPAC's initiatives running smoothly.",
  },
  {
    name: "Melanie Wangui",
    role: "Mental Health & Wellbeing",
    image: teamMelanie,
    bio: "Melanie champions mental health awareness and wellbeing support within climate action spaces.",
  },
];

// Alternating layout: image left/right for a zigzag storytelling feel
const TeamPage = () => {
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <div className="bg-page-gradient">
      <main className="min-h-screen">
        <Navigation />

        {/* Hero Banner */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <img
            src={teamHero}
            alt="SPAC Network Team"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Meet The SPAC Team
            </h1>
            <p className="text-lg md:text-xl text-white/85 font-light leading-relaxed">
              Young, passionate changemakers driving climate resilience and
              locally-led action across Africa.
            </p>
          </div>
        </section>

        {/* Team - Zigzag Cards */}
        <section className="py-20 md:py-28 section-glass-light">
          <div ref={gridRef} className="container mx-auto px-6 max-w-5xl space-y-8 md:space-y-0">
            {teamMembers.map((member, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={member.name}
                  className={`group flex flex-col md:flex-row items-center gap-6 md:gap-10
                    ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
                    ${index > 0 ? "md:-mt-8" : ""}
                    ${isEven ? "md:ml-0 md:mr-16" : "md:mr-0 md:ml-16"}
                    transition-all duration-600
                    ${gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  `}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  {/* Photo */}
                  <div
                    className={`relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0 rounded-3xl overflow-hidden shadow-card
                      ${isEven ? "-rotate-2" : "rotate-2"}
                      group-hover:rotate-0 group-hover:scale-105 group-hover:shadow-glow
                      transition-all duration-500
                    `}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info */}
                  <div className={`text-center md:text-left ${isEven ? "" : "md:text-right"} max-w-sm`}>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-accent mt-1">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default TeamPage;
