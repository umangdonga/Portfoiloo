import React from 'react';
import { Eye } from 'lucide-react';

interface DesignHighlightsProps {
  onSelectImage: (url: string, title: string) => void;
}

export const DesignHighlights: React.FC<DesignHighlightsProps> = ({ onSelectImage }) => {
  const screens = [
    {
      url: 'https://framerusercontent.com/images/FrwvfXzErWrQB9e6BO0MT7q5ys.png?width=1536&height=1024',
      title: 'Mobile App Experience 1',
    },
    {
      url: 'https://framerusercontent.com/images/pOz6lJhmLBSbggr9oxDVrJcjHU.png?width=1536&height=1024',
      title: 'Dashboard & Interface Design',
    },
    {
      url: 'https://framerusercontent.com/images/moflpuJBkERHKJnEB24gYrGQY.png?width=1536&height=1024',
      title: 'Visual Architecture & Flow',
    },
    {
      url: 'https://framerusercontent.com/images/25wCZ7TlteJaZY10bDyzixKco.png?width=1097&height=663',
      title: 'Digital Experience Concept',
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mb-10 sm:mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4181f0] mb-2.5 sm:mb-3">
          Design Highlights
        </h2>
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          A curated collection of screens and interfaces that reflect my approach to crafting thoughtful digital
          experiences.
        </p>
      </div>

      {/* Screen Tickers Container */}
      <div className="relative w-full max-w-full overflow-hidden py-3 sm:py-4">
        {/* Gradient edge masks - subtle on mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-20 md:w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-20 md:w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-4 sm:gap-6 items-center">
          {[...screens, ...screens].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectImage(item.url, item.title)}
              className="group relative w-64 sm:w-80 md:w-96 shrink-0 rounded-2xl overflow-hidden border border-[#2a3050] bg-[#0c101c] p-1.5 sm:p-2 hover:border-[#4181f0] transition-all duration-300 cursor-pointer shadow-xl hover:shadow-blue-500/20 active:scale-98"
            >
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Tap indicator on mobile / Hover overlay on desktop */}
                <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <div className="p-2.5 sm:p-3 rounded-full bg-blue-600 text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
