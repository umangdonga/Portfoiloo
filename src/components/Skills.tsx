import React from 'react';
import { Layout, Palette, Sparkles, Compass } from 'lucide-react';

interface SkillsProps {
  brandingImageUrl: string;
}

export const Skills: React.FC<SkillsProps> = ({ brandingImageUrl }) => {
  return (
    <section id="skills" className="relative py-20 md:py-28 px-4 sm:px-6 md:px-8">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Specialization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4181f0]">
            My Skills
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            I create thoughtful digital experiences that are simple, intuitive, and designed around real user needs.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Product Design */}
          <div className="md:col-span-6 rounded-3xl p-8 bg-[#0d1322]/80 border border-[#2a3050] hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between group relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-bl-full blur-2xl group-hover:bg-blue-500/20 transition-all" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-[#4181f0] group-hover:scale-110 transition-transform">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Product Design</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                End-to-end product experiences from complex user flows and systems to intuitive interfaces that solve
                real problems.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">User Flows</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Wireframing</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Design Systems</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Prototyping</span>
            </div>
          </div>

          {/* Card 2: UI/UX Design */}
          <div className="md:col-span-6 rounded-3xl p-8 bg-[#0d1322]/80 border border-[#2a3050] hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between group relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-bl-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-[#4181f0] group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">UI/UX Design</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Research-backed UX and high-fidelity UI design focused on clarity, usability, and seamless digital
                experiences across platforms.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">User Research</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Micro-Interactions</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">High-Fidelity UI</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Usability Testing</span>
            </div>
          </div>

          {/* Card 3: Branding and Identity with Graphic Artwork */}
          <div className="md:col-span-12 rounded-3xl p-8 bg-[#0d1322]/80 border border-[#2a3050] hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden backdrop-blur-xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Branding and Identity</h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  Crafting memorable identities, visual narratives, and cohesive brand systems that communicate clarity,
                  trust, and character.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Visual Language</span>
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Typography</span>
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Color Systems</span>
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">Brand Strategy</span>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border border-blue-500/20 bg-slate-950 shadow-xl group-hover:border-blue-500/40 transition-all">
                  <img
                    src={brandingImageUrl}
                    alt="Branding and Visual Design Showcase"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
