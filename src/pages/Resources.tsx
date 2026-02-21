import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FileText, Newspaper, BookOpen, Heart, ExternalLink, Calendar, Clock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type ResourceItem = {
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tag: string;
  link?: string;
};

const resources: Record<string, { icon: React.ElementType; label: string; items: ResourceItem[] }> = {
  newsletters: {
    icon: Newspaper,
    label: "Newsletters",
    items: [
      { title: "Climate Action Digest — February 2026", summary: "Youth-led climate policy wins across East Africa, COP31 preparation updates, and community resilience stories.", date: "Feb 2026", readTime: "5 min", tag: "Monthly" },
      { title: "Climate Action Digest — January 2026", summary: "New year, new climate commitments: tracking national pledges and grassroots movements.", date: "Jan 2026", readTime: "5 min", tag: "Monthly" },
      { title: "Climate Action Digest — December 2025", summary: "Year in review: the biggest climate wins of 2025 and what's ahead.", date: "Dec 2025", readTime: "6 min", tag: "Monthly" },
      { title: "Climate Action Digest — November 2025", summary: "COP30 outcomes, African youth delegation highlights, and adaptation finance updates.", date: "Nov 2025", readTime: "5 min", tag: "Monthly" },
    ],
  },
  briefs: {
    icon: FileText,
    label: "Policy Briefs",
    items: [
      { title: "Just Transition for African Youth", summary: "A framework for equitable green job creation and skills development across Sub-Saharan Africa.", date: "Jan 2026", readTime: "12 min", tag: "Policy" },
      { title: "Localising Climate Finance", summary: "How to channel adaptation finance to community-based organisations effectively.", date: "Nov 2025", readTime: "10 min", tag: "Policy" },
      { title: "Indigenous Knowledge & Climate Adaptation", summary: "Integrating traditional ecological knowledge into national adaptation strategies.", date: "Sep 2025", readTime: "8 min", tag: "Research" },
    ],
  },
  blogs: {
    icon: BookOpen,
    label: "Blog & Articles",
    items: [
      { title: "Why Storytelling Is Our Most Powerful Climate Tool", summary: "How the LIVErary program is changing narratives and inspiring action through spoken word and poetry.", date: "Feb 2026", readTime: "4 min", tag: "Story" },
      { title: "Inside the Initiative Fair: Youth Co-Creating Solutions", summary: "A behind-the-scenes look at how young innovators are designing community climate projects.", date: "Jan 2026", readTime: "6 min", tag: "Feature" },
      { title: "What I Learned at the Climate Negotiators Training", summary: "A participant's reflection on simulating global climate negotiations.", date: "Dec 2025", readTime: "5 min", tag: "Reflection" },
      { title: "Living Books: Preserving Climate Wisdom", summary: "How documenting indigenous stories is building a bridge between generations.", date: "Oct 2025", readTime: "7 min", tag: "Culture" },
    ],
  },
  wellness: {
    icon: Heart,
    label: "Wellness",
    items: [
      { title: "Managing Eco-Anxiety: A Practical Guide", summary: "Evidence-based strategies for coping with climate distress while staying engaged.", date: "Feb 2026", readTime: "8 min", tag: "Guide" },
      { title: "Building Resilience as a Climate Activist", summary: "Self-care practices and community support systems for sustained advocacy.", date: "Dec 2025", readTime: "6 min", tag: "Wellbeing" },
      { title: "Nature-Based Healing for Climate Workers", summary: "How reconnecting with nature can restore mental and emotional balance.", date: "Oct 2025", readTime: "5 min", tag: "Wellbeing" },
    ],
  },
};

const Resources = () => {
  const [activeTab, setActiveTab] = useState("newsletters");

  return (
    <div className="bg-page-gradient">
      <main className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="pt-32 pb-16 section-glass">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Knowledge Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Resources & <span className="text-primary">Publications</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore newsletters, policy briefs, blog articles and wellness guides from the SPAC Network.
            </p>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16 section-glass-light">
          <div className="container mx-auto px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-10">
                {Object.entries(resources).map(([key, { icon: Icon, label }]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(resources).map(([key, { items }]) => (
                <TabsContent key={key} value={key}>
                  <div className="grid gap-4 md:grid-cols-2">
                    {items.map((item) => (
                      <article
                        key={item.title}
                        className="group bg-card rounded-2xl border border-border p-6 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
                            {item.tag}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {item.readTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.summary}
                        </p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-accent hover:underline"
                          >
                            Read more <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Resources;
