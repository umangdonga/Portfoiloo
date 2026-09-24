import React from 'react';

export const Tools: React.FC = () => {
  const tools = [
    {
      name: 'Figma',
      role: 'UI/UX & Prototyping',
      color: '#F24E1E',
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
      name: 'Canva',
      role: 'Visual Assets & Layouts',
      color: '#00C4CC',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="url(#canva_grad)" />
          <path d="M14.5 9.5C13.8 8.8 12.8 8.5 11.5 8.5C9.2 8.5 7.5 10.3 7.5 12.8C7.5 15.3 9.3 17 11.8 17C13.2 17 14.4 16.5 15.2 15.6L14.1 14.7C13.5 15.3 12.8 15.7 11.8 15.7C10.2 15.7 9 14.4 9 12.8C9 11.1 10.1 9.8 11.5 9.8C12.4 9.8 13.1 10.1 13.6 10.5L14.5 9.5Z" fill="white" />
          <defs>
            <linearGradient id="canva_grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00C4CC" />
              <stop offset="1" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: 'Framer',
      role: 'Interactive Web & Motion',
      color: '#0055FF',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path d="M4 0H20V8H12L4 0Z" fill="#0055FF" />
          <path d="M4 8H12V16H4V8Z" fill="#0055FF" />
          <path d="M4 16H12V24L4 16Z" fill="#0055FF" />
        </svg>
      ),
    },
    {
      name: 'Illustrator',
      role: 'Vector & Illustration',
      color: '#FF9A00',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[#330000] border border-[#FF9A00]/50 flex items-center justify-center font-bold text-[#FF9A00] text-sm">
          Ai
        </div>
      ),
    },
    {
      name: 'CorelDRAW',
      role: 'Graphics & Vector Design',
      color: '#7AC142',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[#14260f] border border-[#7AC142]/50 flex items-center justify-center font-bold text-[#7AC142] text-xs">
          CD
        </div>
      ),
    },
    {
      name: 'PhotoShop',
      role: 'Raster & Image Editing',
      color: '#31A8FF',
      icon: (
        <div className="w-8 h-8 rounded-lg bg-[#001E36] border border-[#31A8FF]/50 flex items-center justify-center font-bold text-[#31A8FF] text-sm">
          Ps
        </div>
      ),
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4181f0]">
            Tools I Work With
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Tools that help me turn ideas into polished and interactive experiences.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="group relative rounded-2xl p-6 bg-[#0d1322]/80 border border-[#2a3050] hover:border-[#4181f0] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col items-center text-center backdrop-blur-md"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{tool.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
