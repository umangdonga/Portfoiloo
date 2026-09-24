import React from 'react';

interface FooterProps {
  behanceUrl: string;
  linkedinUrl: string;
}

export const Footer: React.FC<FooterProps> = ({ behanceUrl, linkedinUrl }) => {
  return (
    <footer className="relative border-t border-[#2a3050] bg-[#060810] pt-16 pb-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8 text-center">
        {/* Brand Name */}
        <a
          href="#"
          className="font-bold tracking-tight text-2xl md:text-3xl text-white hover:text-[#4181f0] transition-colors"
        >
          Umang Donga
        </a>

        {/* Motto */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
          <span className="text-yellow-400">⭐</span>
          <span>Always learning. Always creating.</span>
        </div>

        {/* Quick Nav & Socials */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <a href="#" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#about-me" className="hover:text-white transition-colors">
            About me
          </a>
          <a href="#work" className="hover:text-white transition-colors">
            Work
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Skills
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
          <a
            href={behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4181f0] transition-colors"
          >
            Behance
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4181f0] transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-500 pt-4">
          © {new Date().getFullYear()} Umang Donga. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
