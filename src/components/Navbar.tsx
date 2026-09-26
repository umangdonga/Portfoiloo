import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  resumeUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({ resumeUrl }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#about-me' },
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Tools', href: '#tools' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 sm:py-3 bg-[#080808]/92 backdrop-blur-md border-b border-[#2a3050]/40 shadow-xl shadow-black/60'
          : 'pt-3 sm:pt-5 pb-2 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 md:px-8">
        <nav
          className={`flex items-center justify-between px-3.5 sm:px-5 md:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-[#0d1326] border border-[#2e3b66] shadow-2xl shadow-black/80'
              : 'bg-[#0d1326] border border-blue-500/35 shadow-lg shadow-black/50'
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#about-me"
            className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors shrink-0"
          >
            Umang Donga
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-7 text-sm font-normal text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 text-[14px] font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Controls: Theme Switcher & Resume Button */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Light / Dark Mode Switch */}
            <ThemeToggle />

            {/* Download Resume Button - desktop */}
            <div className="hidden sm:flex items-center">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-medium text-white bg-gradient-to-r from-[#4181f0] to-[#2563eb] hover:from-[#3575e6] hover:to-[#1d4ed8] rounded-full shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-blue-400/30"
              >
                <span>Resume</span>
                <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-full bg-slate-800/50 border border-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu with backdrop blur and touch scroll */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 sm:p-5 rounded-2xl glass-nav bg-[#0a0f1d]/98 border border-blue-500/35 flex flex-col space-y-3.5 shadow-2xl backdrop-blur-2xl max-h-[calc(100vh-5rem)] overflow-y-auto animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-[#4181f0] py-2 px-3 rounded-xl hover:bg-white/5 active:bg-blue-500/10 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between px-3">
              <span className="text-sm font-medium text-slate-300">Theme</span>
              <ThemeToggle showLabel />
            </div>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#4181f0] to-[#2563eb] rounded-full shadow-lg shadow-blue-500/30 active:scale-98 transition-all"
            >
              <span>Download Resume</span>
              <Download className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
