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

        {/* Team Grid */}
        <section className="py-20 md:py-28 section-glass-light">
          <div className="container mx-auto px-6">
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto"
            >
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`group bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 ${
                    gridVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
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
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default TeamPage;
