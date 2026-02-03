import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AcademyBanner = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      className={`py-16 bg-white/20 backdrop-blur-sm relative overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div 
            className={`flex items-center gap-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">SPAC Academy</h2>
              <p className="text-white/80 text-lg max-w-xl">
                Join our flagship program for climate leadership training, skills development, and youth empowerment across Africa.
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => navigate("/auth")}
            size="xl"
            className={`bg-white/90 text-primary hover:bg-white font-bold shadow-lg hover:shadow-xl transition-all group ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Access Academy
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AcademyBanner;
