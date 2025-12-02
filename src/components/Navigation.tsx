import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import spacLogo from "@/assets/spac-logo.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-2">
            <img src={spacLogo} alt="SPAC Network" className="h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#programs" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Programs
            </a>
            <a href="#impact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Impact
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="accent" size="default">
              Get Involved
            </Button>
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
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors py-2 font-medium">
                About
              </a>
              <a href="#programs" className="text-muted-foreground hover:text-primary transition-colors py-2 font-medium">
                Programs
              </a>
              <a href="#impact" className="text-muted-foreground hover:text-primary transition-colors py-2 font-medium">
                Impact
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors py-2 font-medium">
                Contact
              </a>
              <div className="pt-4">
                <Button variant="accent" className="w-full">
                  Get Involved
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
