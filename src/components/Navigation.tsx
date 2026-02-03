import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import spacLogo from "@/assets/spac-logo.jpg";

const programs = [
  {
    title: "Initiative Fair",
    description: "A platform for youth co-creation, collaboration and advocacy strategies.",
    mode: "Physical",
  },
  {
    title: "Climate E-ntaractive",
    description: "Interactive sessions building a well-coordinated and aligned youth network for climate action.",
    mode: "Physical",
  },
  {
    title: "Living Books",
    description: "Documented stories to inspire, inform and educate on indigenous and cultural perspectives of climate action.",
    mode: "Hybrid",
  },
  {
    title: "The Climate Challenge",
    description: "Nurturing a connected, committed and collaborative community of climate champions.",
    mode: "Hybrid",
  },
  {
    title: "Climate Futures Plus",
    description: "Advanced training and mentorship program preparing the next generation of climate leaders.",
    mode: "Hybrid",
  },
  {
    title: "Climate Negotiators Training",
    description: "Live climate negotiation simulation preparing youth for global climate conferences.",
    mode: "Hybrid",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItemClassName =
    "text-foreground hover:text-primary transition-all duration-200 font-semibold px-3 py-2 rounded-full hover:bg-accent/50";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-2">
            <img src={spacLogo} alt="SPAC Network" className="h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className={navItemClassName}>
              About
            </a>

            {/* Programs hover dropdown */}
            <div className="relative group">
              <a href="#" className={navItemClassName} aria-haspopup="menu" aria-label="Programs">
                <span className="inline-flex items-center gap-1.5">
                  Programs
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </span>
              </a>

              <div
                className="pointer-events-none opacity-0 translate-y-1 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute left-0 top-full pt-3 z-50"
                role="menu"
              >
                <div className="w-[360px] rounded-2xl border border-border bg-popover text-popover-foreground shadow-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold">Programs</p>
                    <p className="text-xs text-muted-foreground">Explore how to get involved</p>
                  </div>
                  <ul className="p-2">
                    {programs.map((p) => (
                      <li key={p.title}>
                        <button
                          type="button"
                          className="w-full text-left rounded-xl px-3 py-3 hover:bg-accent transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium">{p.title}</p>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                                {p.description}
                              </p>
                            </div>
                            <span className="shrink-0 text-[11px] px-2 py-1 rounded-full bg-muted text-muted-foreground">
                              {p.mode}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a href="#impact" className={navItemClassName}>
              Impact
            </a>
            <a href="#contact" className={navItemClassName}>
              Contact
            </a>
          </div>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#about" className="text-foreground hover:text-primary transition-colors py-2 font-semibold">
                About
              </a>

              <div className="py-2">
                <p className="text-foreground font-semibold">Programs</p>
                <div className="mt-2 pl-3 border-l border-border flex flex-col gap-2">
                  {programs.map((p) => (
                    <div key={p.title} className="rounded-lg px-2 py-2 hover:bg-accent transition-colors">
                      <p className="text-sm font-medium text-foreground">{p.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{p.mode}</p>
                    </div>
                  ))}
                </div>
              </div>

              <a href="#impact" className="text-foreground hover:text-primary transition-colors py-2 font-semibold">
                Impact
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors py-2 font-semibold">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
