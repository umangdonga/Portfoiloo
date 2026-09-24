import React from 'react';
import { Search, GitBranch, PenTool, CheckCircle2 } from 'lucide-react';

export const DesignProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover & Research',
      description: 'Understanding user behavior, business goals, and product challenges to uncover meaningful insights.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Strategy & Structure',
      description: 'Organizing ideas into clear user flows, scalable systems, and intuitive product foundations.',
      icon: GitBranch,
    },
    {
      number: '03',
      title: 'Design & Prototyping',
      description: 'Crafting visually refined interfaces and interactive experiences that feel seamless and engaging.',
      icon: PenTool,
    },
    {
      number: '04',
      title: 'Testing & Refinement',
      description: 'Improving usability through iteration, feedback, and thoughtful design optimization.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4181f0]">
            My Design Process
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            A clear and focused approach to creating meaningful digital experiences.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-3xl p-7 bg-[#0d1322]/80 border border-[#2a3050] hover:border-[#4181f0] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between backdrop-blur-xl"
              >
                <div>
                  {/* Top: Icon & Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-950/70 border border-blue-500/30 flex items-center justify-center text-[#4181f0] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-600 group-hover:text-[#4181f0] transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>Phase {step.number}</span>
                  <div className="w-2 h-2 rounded-full bg-blue-500/40 group-hover:bg-[#4181f0] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
