import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-red-600 text-white py-10 mt-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo and Description */}
          <div className="text-center md:text-left max-w-sm">
            <h1 className="text-2xl font-extrabold flex items-center gap-2">
              ❤️ BloodCare
            </h1>
            <p className="mt-2 text-sm opacity-90">
              Save lives through blood donation.  
              Be a hero. Join our life-saving community today.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <a href="/" className="hover:text-gray-200 transition">Home</a>
            <a href="/requests" className="hover:text-gray-200 transition">Requests</a>
            <a href="/statistics" className="hover:text-gray-200 transition">Statistics</a>
            <a href="/register" className="hover:text-gray-200 transition">Register</a>
            <a href="/login" className="hover:text-gray-200 transition">Login</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition transform hover:scale-110">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition transform hover:scale-110">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition transform hover:scale-110">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition transform hover:scale-110">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>© {new Date().getFullYear()} BloodCare. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center gap-1 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ArrowUp size={16} /> Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
