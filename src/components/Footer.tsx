import spacLogo from "@/assets/spac-logo.jpg";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-white/20 bg-black/20 backdrop-blur-sm text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <img src={spacLogo} alt="SPAC Network" className="h-12 w-auto mb-4" />
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
              A catalyst for locally-led climate resilience. Bridging science, policy, 
              action and community for impactful climate solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/90">
              <span className="font-semibold text-white">S</span>cience •{" "}
              <span className="font-semibold text-white">P</span>olicy •{" "}
              <span className="font-semibold text-white">A</span>ction •{" "}
              <span className="font-semibold text-white">C</span>ommunity
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Programs</h4>
            <ul className="space-y-3">
              <li><a href="#programs" className="text-sm text-white/70 hover:text-white transition-colors">Initiative Fair</a></li>
              <li><a href="#programs" className="text-sm text-white/70 hover:text-white transition-colors">Climate E-ntaractive</a></li>
              <li><a href="#programs" className="text-sm text-white/70 hover:text-white transition-colors">Living Books</a></li>
              <li><a href="#programs" className="text-sm text-white/70 hover:text-white transition-colors">Climate Challenge</a></li>
              <li><a href="#programs" className="text-sm text-white/70 hover:text-white transition-colors">Climate Futures Plus</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-sm text-white/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#impact" className="text-sm text-white/70 hover:text-white transition-colors">Our Impact</a></li>
              <li><a href="#contact" className="text-sm text-white/70 hover:text-white transition-colors">Partner With Us</a></li>
              <li><a href="#contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            © 2024 The SPAC Network. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
