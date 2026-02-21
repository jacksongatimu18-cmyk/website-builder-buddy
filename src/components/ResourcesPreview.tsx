import { FileText, Newspaper, BookOpen, Heart, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const categories = [
  {
    icon: Newspaper,
    title: "Newsletters",
    description: "Monthly updates on climate action, youth movements, and SPAC initiatives across Africa.",
    count: 12,
  },
  {
    icon: FileText,
    title: "Policy Briefs",
    description: "Evidence-based policy recommendations for climate governance and sustainable development.",
    count: 8,
  },
  {
    icon: BookOpen,
    title: "Blog & Articles",
    description: "Thought leadership, stories from the field, and deep dives into climate solutions.",
    count: 24,
  },
  {
    icon: Heart,
    title: "Wellness Resources",
    description: "Guides on eco-anxiety, climate resilience, and holistic wellbeing for activists.",
    count: 6,
  },
];

const ResourcesPreview = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  return (
    <section id="resources" className="py-24 section-glass-light">
      <div className="container mx-auto px-6">
        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            Knowledge Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Resources & <span className="text-primary">Publications</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Access our growing library of newsletters, policy briefs, blogs and wellness resources.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {categories.map((cat, index) => (
            <a
              key={cat.title}
              href="/resources"
              className={`group relative bg-card rounded-2xl border border-border p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-500 ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <cat.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {cat.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {cat.count} items
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </a>
          ))}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline underline-offset-4"
          >
            Browse all resources
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;
