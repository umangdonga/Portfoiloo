import React from 'react';

interface ToolItem {
  id: string;
  name: string;
  role: string;
  color: string;
  glowColor: string;
  percentage: number; // e.g. 80, 60, 50
  icon: React.ReactNode;
}

export const Tools: React.FC = () => {
  const tools: ToolItem[] = [
    {
      id: 'figma',
      name: 'Figma',
      role: 'UI/UX Design & Prototyping',
      color: '#F24E1E',
      glowColor: 'rgba(242, 78, 30, 0.35)',
      percentage: 80,
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      ),
    },
    {
      id: 'canva',
      name: 'Canva',
      role: 'Visual Assets & Layouts',
      color: '#00C4CC',
      glowColor: 'rgba(0, 196, 204, 0.35)',
      percentage: 80,
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="url(#canva_grad_tools)" />
          <path
            d="M14.5 9.5C13.8 8.8 12.8 8.5 11.5 8.5C9.2 8.5 7.5 10.3 7.5 12.8C7.5 15.3 9.3 17 11.8 17C13.2 17 14.4 16.5 15.2 15.6L14.1 14.7C13.5 15.3 12.8 15.7 11.8 15.7C10.2 15.7 9 14.4 9 12.8C9 11.1 10.1 9.8 11.5 9.8C12.4 9.8 13.1 10.1 13.6 10.5L14.5 9.5Z"
            fill="white"
          />
          <defs>
            <linearGradient id="canva_grad_tools" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00C4CC" />
              <stop offset="1" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      id: 'illustrator',
      name: 'Adobe Illustrator',
      role: 'Vector Graphics & Branding',
      color: '#FF9A00',
      glowColor: 'rgba(255, 154, 0, 0.35)',
      percentage: 60,
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[#271202] border border-[#FF9A00]/70 flex items-center justify-center font-bold text-[#FF9A00] text-sm shadow-inner shadow-[#FF9A00]/20">
          Ai
        </div>
      ),
    },
    {
      id: 'coreldraw',
      name: 'CorelDRAW',
      role: 'Graphics & Print Media',
      color: '#7AC142',
      glowColor: 'rgba(122, 193, 66, 0.35)',
      percentage: 60,
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[#0e210d] border border-[#7AC142]/70 flex items-center justify-center font-bold text-[#7AC142] text-xs shadow-inner shadow-[#7AC142]/20">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C7.58 2 4 5.58 4 10c0 3.2 1.88 5.96 4.6 7.24L8 22l4-2 4 2-.6-4.76C18.12 15.96 20 13.2 20 10c0-4.42-3.58-8-8-8zm-1 14h2v2h-2v-2zm1-12c2.76 0 5 2.24 5 5 0 1.9-1.07 3.55-2.65 4.38L14 13.6V12h-4v1.6l-.35-.22C8.07 12.55 7 10.9 7 9c0-2.76 2.24-5 5-5z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'framer',
      name: 'Framer',
      role: 'Interactive Web & Motion',
      color: '#0055FF',
      glowColor: 'rgba(0, 85, 255, 0.35)',
      percentage: 50,
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path d="M4 0H20V8H12L4 0Z" fill="#0055FF" />
          <path d="M4 8H12V16H4V8Z" fill="#0055FF" />
          <path d="M4 16H12V24L4 16Z" fill="#0055FF" />
        </svg>
      ),
    },
    {
      id: 'photoshop',
      name: 'Adobe Photoshop',
      role: 'Raster Editing & Mockups',
      color: '#31A8FF',
      glowColor: 'rgba(49, 168, 255, 0.35)',
      percentage: 50,
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[#00172c] border border-[#31A8FF]/70 flex items-center justify-center font-bold text-[#31A8FF] text-sm shadow-inner shadow-[#31A8FF]/20">
          Ps
        </div>
      ),
    },
  ];

  // Render 5 segments representing 0-100% (20% each)
  const renderSegments = (percentage: number, color: string) => {
    const totalSegments = 5;
    return (
      <div className="grid grid-cols-5 gap-2 h-2.5 w-full">
        {Array.from({ length: totalSegments }).map((_, idx) => {
          const segmentStart = idx * 20;
          const segmentEnd = (idx + 1) * 20;

          let fillRatio = 0;
          if (percentage >= segmentEnd) {
            fillRatio = 1;
          } else if (percentage > segmentStart) {
            fillRatio = (percentage - segmentStart) / 20;
          }

          const isFullyFilled = fillRatio >= 1;
          const isPartiallyFilled = fillRatio > 0 && fillRatio < 1;

          return (
            <div
              key={idx}
              className="h-full rounded-full overflow-hidden bg-[#182035] border border-slate-800/80 transition-all duration-300"
            >
              {isFullyFilled && (
                <div
                  className="w-full h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}`,
                  }}
                />
              )}
              {isPartiallyFilled && (
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${fillRatio * 100}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="tools" className="relative py-20 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/35 text-blue-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <span>Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4181f0]">
            Tools I Work With
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Tools that help me turn ideas into polished and interactive experiences.
          </p>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="group relative rounded-2xl p-5 sm:p-6 bg-[#0d1322]/85 border border-[#2a3050] hover:border-blue-500/60 transition-all duration-300 hover:shadow-xl flex flex-col justify-between backdrop-blur-xl hover:-translate-y-1"
              style={{
                boxShadow: `0 8px 24px -10px ${tool.glowColor}`,
              }}
            >
              {/* Card Header: Icon + Title + Subtitle */}
              <div className="flex items-center gap-3.5">
                <div
                  className="p-2.5 rounded-2xl bg-[#090d18] border transition-transform duration-300 group-hover:scale-105 flex items-center justify-center shrink-0 shadow-md"
                  style={{ borderColor: `${tool.color}45` }}
                >
                  {tool.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium truncate mt-0.5">{tool.role}</p>
                </div>
              </div>

              {/* 5-segment glowing visual meter */}
              <div className="mt-6">
                {renderSegments(tool.percentage, tool.color)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
