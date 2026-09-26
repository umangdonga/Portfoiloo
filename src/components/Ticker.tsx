import React from 'react';

export const Ticker: React.FC = () => {
  const items = [
    'USER FLOW',
    'WIREFRAME',
    'DESIGN SYSTEM',
    'APP DESIGN',
    'WEBSITE',
    'LOGO DESIGN',
    'FIGMA',
    'RESEARCH',
    'CARD SORTING',
    'PROTOTYPING',
  ];

  return (
    <div className="relative w-full max-w-full py-3.5 sm:py-4 border-y border-[#2a3050] bg-[#0c101c]/70 overflow-hidden backdrop-blur-md">
      {/* Edge gradient fades - compact on mobile so text remains readable */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-24 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-24 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="inline-flex items-center gap-4 sm:gap-6 text-xs sm:text-sm md:text-base tracking-wider">
            <span className="text-yellow-400 text-sm sm:text-base select-none">⭐</span>
            <span className="uppercase text-[11px] sm:text-xs md:text-sm tracking-widest font-bold text-white hover:text-[#4181f0] transition-colors cursor-default">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
