import React from 'react';

interface ProcessCard {
  number: string;
  title: string;
  process: string;
  description: string;
  focus: string;
}

export const DesignProcess: React.FC = () => {
  const processes: ProcessCard[] = [
    {
      number: '01',
      title: '5D Process',
      process: 'Discover → Define → Develop → Deliver → Deploy',
      description:
        'I start by understanding the user, defining the core problem, exploring solutions, creating and testing prototypes, and taking the final solution toward implementation.',
      focus: 'Research • Problem • Ideation • Prototype • Implementation',
    },
    {
      number: '02',
      title: 'Double Diamond',
      process: 'Discover → Define → Develop → Deliver',
      description:
        'I explore the problem broadly, narrow it down to a clear opportunity, develop multiple solutions, and refine the most suitable direction through testing.',
      focus: 'Explore • Focus • Create • Refine',
    },
    {
      number: '03',
      title: 'Design Thinking',
      process: 'Empathize → Define → Ideate → Prototype → Test',
      description:
        'I keep users at the center by understanding their needs, defining the problem, exploring ideas, prototyping solutions, and learning through user testing.',
      focus: 'Empathy • Ideas • Prototyping • Testing',
    },
  ];

  return (
    <section id="process" className="relative py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4181f0]">
            My Design Process
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            A clear and focused approach to creating meaningful digital experiences.
          </p>
        </div>

        {/* 3 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {processes.map((card) => (
            <div
              key={card.number}
              className="group relative rounded-3xl p-7 sm:p-8 bg-[#0d1322]/80 border border-[#2a3050] hover:border-[#4181f0] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between backdrop-blur-xl h-full"
            >
              <div className="space-y-5">
                {/* Number */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-600 group-hover:text-[#4181f0] transition-colors">
                    {card.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                  {card.title}
                </h3>

                {/* Process Steps (Easy to Scan) */}
                <div className="py-2.5 px-3.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-[#60a5fa] text-xs sm:text-[13px] font-medium leading-relaxed tracking-wide">
                  {card.process}
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Focus Area */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1.5">
                  Focus
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 font-medium leading-relaxed">
                  {card.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
