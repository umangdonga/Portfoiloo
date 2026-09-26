import React from 'react';
import { GraduationCap, School, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  const educationItems = [
    {
      degree: 'Master of Design (M.Des)',
      institution: 'Indus University',
      period: '2025 – Present | CGPA: 9.6',
      icon: GraduationCap,
      current: true,
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Silver Oak University, Ahmedabad',
      period: '2021 – 2024 | CGPA: 9.6',
      icon: BookOpen,
      current: false,
    },
    {
      degree: 'Secondary & Higher Secondary Education (10th & 12th)',
      institution: 'Gujarat Board',
      period: '2019 – 2021',
      icon: School,
      current: false,
    },
  ];

  return (
    <section id="education" className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4181f0]">
            Education
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            My academic qualifications and educational foundation
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="space-y-3.5 sm:space-y-4">
          {educationItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 bg-[#0d1322]/80 border border-[#2a3050] hover:border-[#4181f0] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-6 backdrop-blur-xl"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-gradient-to-b from-[#4181f0] to-blue-700 rounded-r-full group-hover:w-1.5 transition-all" />

                <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 pl-1.5 sm:pl-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-[#4181f0] shrink-0 group-hover:scale-110 transition-transform mt-0.5 sm:mt-0">
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                        {item.degree}
                      </h3>
                      {item.current && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] sm:text-[11px] font-semibold tracking-wide">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1 sm:mt-0.5">
                      {item.institution}
                    </p>
                  </div>
                </div>

                {/* Period Badge */}
                <div className="sm:text-right pl-11 sm:pl-0 shrink-0">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-300 font-medium text-[11px] sm:text-xs tracking-wide">
                    {item.period}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
