import React, { useState } from 'react';
import { ArrowRight, Eye, Minus, Plus } from 'lucide-react';

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  imageUrl: string;
  description: string;
  caseStudyUrl: string;
}

interface SelectedWorksProps {
  onSelectImage?: (url: string, title: string) => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onSelectImage }) => {
  // 01 is expanded by default to match image.png
  const [expandedId, setExpandedId] = useState<string | null>('01');

  const projects: ProjectItem[] = [
    {
      id: '01',
      number: '01',
      title: 'Univercity Campus App Design',
      imageUrl: 'https://framerusercontent.com/images/1eNwBeFhmpXZlncNDPsZGqzG31k.png',
      description:
        'Campus Connect is a student-focused app designed to make campus life simpler. It helps students easily find classrooms, labs, buildings, services, and other important campus facilities through one connected platform.',
      caseStudyUrl: 'https://www.behance.net/gallery/249721127/Campus-Connect-Smart-Campus-Navigation-App',
    },
    {
      id: '02',
      number: '02',
      title: 'Indu Cafe app',
      imageUrl: 'https://framerusercontent.com/images/lkJHmviV0GLgNvpcUKAT4sjAiLQ.png',
      description:
        'Indu Cafe is a student-focused food ordering app designed to make ordering food on campus quick, simple, and convenient. The app allows students to explore food categories, discover popular items, add meals to their cart, apply coupons, and place orders through an easy-to-use interface.',
      caseStudyUrl: 'https://www.behance.net/gallery/249721671/Innovation-A-Digital-Solution-for-Campus-Catering',
    },
    {
      id: '03',
      number: '03',
      title: 'Bookmyshow Kid Version Design',
      imageUrl: 'https://framerusercontent.com/images/bSKlbHf9c335XdrSsIWO0zbkCo.png?width=1909&height=824',
      description:
        'Reimagined the BookMyShow entertainment platform for families and children, providing a playful UI, age-tailored cinema categories, gamified booking passes, and a frictionless parental approval flow.',
      caseStudyUrl: 'https://www.behance.net/gallery/249716123/Bookmyshow-Kid-Version',
    },
    {
      id: '04',
      number: '04',
      title: 'CARE BAND – People with Cognitive Disabilities',
      imageUrl: 'https://framerusercontent.com/images/vqJ1LbmnF0q9RMarlCDkz5rw62g.png?width=1136&height=798',
      description:
        'CARE BAND is a smart wearable safety solution designed to support people with cognitive disabilities in unfamiliar or unsafe situations. It uses a simple identification and tracking system to help caregivers locate and reconnect with the wearer when needed.',
      caseStudyUrl: 'https://www.behance.net/gallery/249718331/Use-Care-Band-Safety-Support-Wearable',
    },
    {
      id: '05',
      number: '05',
      title: 'UX Laws – Competitive App Analysis',
      imageUrl: '/images/ux-laws-case-study.svg',
      description:
        'A comprehensive competitive app analysis and UX research case study evaluating digital products against the 10 core Laws of UX to uncover usability patterns, cognitive friction, and actionable interface recommendations.',
      caseStudyUrl: 'https://www.behance.net/gallery/249721329/Competitive-App-Analysis-Based-on-the-10-Laws-of-UX',
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="work" className="relative py-24 px-4 sm:px-6 md:px-8 border-t border-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Selected <span className="text-[#4181f0]">Works</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Featured case studies and design projects showcasing end-to-end UX research, wireframing, and UI systems
          </p>
        </div>

        {/* Selected Works Container Card */}
        <div className="rounded-3xl p-4 sm:p-8 md:p-10 bg-[#0d1322]/80 border border-[#2a3050] shadow-2xl backdrop-blur-xl">
          <div className="space-y-4">
            {projects.map((project) => {
              const isExpanded = expandedId === project.id;

              return (
                <div
                  key={project.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#080d19] border-blue-500/40 shadow-lg shadow-blue-500/10 p-5 sm:p-6'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-blue-500/30 p-4 sm:p-5'
                  }`}
                >
                  {/* Accordion Row Header */}
                  <div
                    onClick={() => toggleExpand(project.id)}
                    className={`flex items-center justify-between cursor-pointer select-none ${
                      isExpanded ? 'pl-3 sm:pl-4 mb-5' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      {/* Number Badge */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-colors ${
                          isExpanded
                            ? 'bg-[#4181f0] text-white shadow-md shadow-blue-500/30'
                            : 'border border-[#4181f0] text-[#4181f0] bg-blue-950/40'
                        }`}
                      >
                        {project.number}
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                    </div>

                    {/* Collapse / Expand Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(project.id);
                      }}
                      className="p-1 text-slate-300 hover:text-white transition-colors"
                      aria-label={isExpanded ? 'Collapse project details' : 'Expand project details'}
                    >
                      {isExpanded ? (
                        <Minus className="w-5 h-5 text-slate-300 hover:text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-slate-400 hover:text-white" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Content Body */}
                  {isExpanded && (
                    <div className="pl-3 sm:pl-4 space-y-6 animate-fadeIn">
                      {/* High Fidelity Banner Graphic (Full uncropped image display) */}
                      <div
                        onClick={() => onSelectImage?.(project.imageUrl, project.title)}
                        className={`relative w-full rounded-xl overflow-hidden border border-blue-400/20 bg-[#0a0f1d] shadow-xl group/card ${
                          onSelectImage ? 'cursor-pointer' : ''
                        }`}
                      >
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-auto block object-contain"
                          loading="lazy"
                        />
                        {onSelectImage && (
                          <div className="absolute top-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-lg border border-blue-400/30 flex items-center gap-1.5 shadow-lg pointer-events-none">
                            <Eye className="w-3.5 h-3.5 text-blue-400" />
                            <span>View Full Image</span>
                          </div>
                        )}
                      </div>

                      {/* Description and CTA Row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
                        <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal">
                          {project.description}
                        </p>

                        <div className="flex-shrink-0">
                          <a
                            href={project.caseStudyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-950/80 hover:bg-[#4181f0] border border-blue-500/40 text-blue-300 hover:text-white transition-all text-xs sm:text-sm font-semibold group/btn cursor-pointer"
                          >
                            <span>View on Behance</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
