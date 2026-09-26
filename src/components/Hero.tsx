import React from 'react';
import { ArrowRight, Send } from 'lucide-react';

interface HeroProps {
  photoUrl?: string;
  behanceUrl: string;
  linkedinUrl: string;
  resumeUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  behanceUrl,
  linkedinUrl,
}) => {
  return (
    <section id="about-me" className="relative pt-24 pb-14 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bio & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <span>About Me</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              I’m <span className="text-[#4181f0] drop-shadow-[0_0_25px_rgba(65,129,240,0.4)]">Umang Donga</span>
            </h1>

            <div className="space-y-3.5 sm:space-y-4 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              <p>
                Hi, I’m Umang, a <span className="text-white font-medium">UI/UX Designer</span> and{' '}
                <span className="text-white font-medium">M.Des student</span> passionate about creating simple,
                meaningful, and user-friendly digital experiences. With a background in{' '}
                <span className="text-white font-medium">Computer Applications and Design</span>, I enjoy combining
                research, problem-solving, and visual design to understand users and turn their needs into thoughtful
                interfaces.
              </p>
              <p>
                As a <span className="text-white font-medium">fresher</span>, I’m currently building my skills through
                academic projects, design research, and real-world problem-solving. I’m especially interested in{' '}
                <span className="text-white font-medium">
                  UX research, UI design, interaction design, and design strategy
                </span>
                . I believe good design is not just about making things look beautiful - it’s about making them{' '}
                <span className="text-white font-medium">easy to understand, useful, and enjoyable to use</span>.
              </p>
              <p className="text-slate-400">
                I’m always curious, open to learning, and excited to work on new challenges that help me grow as a
                designer.
              </p>
            </div>

            {/* Action Buttons - full width stacked on mobile, row on tablet/desktop */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#4181f0] to-[#2563eb] hover:from-[#3575e6] hover:to-[#1d4ed8] text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/30 transition-all duration-200 active:scale-95 group text-center"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/50 text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-all duration-200 active:scale-95 text-center"
              >
                <Send className="w-4 h-4 text-[#4181f0]" />
                <span>Let's Connect</span>
              </a>
            </div>
          </div>

          {/* Right Column: Photo Frame & Role Card */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              {/* Violet Glow behind photo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-blue-600/40 to-cyan-500/20 rounded-3xl blur-2xl -z-10 scale-95" />

              {/* Photo Frame Card */}
              <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-[#0d1322] shadow-2xl p-2 sm:p-2.5 backdrop-blur-xl">
                <div className="relative aspect-[1126/1397] w-full rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src="/image-1.png"
                    alt="Umang Donga - UI/UX Designer"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>

                {/* Role Card */}
                <div className="mt-2.5 sm:mt-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#141b2d]/90 border border-blue-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] sm:text-xs text-blue-400 font-semibold uppercase tracking-wider">Role</p>
                    <p className="text-xs sm:text-sm font-bold text-white">Product UI/UX Designer</p>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Behance Link */}
                    <a
                      href={behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 sm:p-2.5 rounded-xl bg-blue-950/60 hover:bg-blue-600/30 text-[#4181f0] hover:text-white border border-blue-500/30 transition-all active:scale-95 shadow-sm"
                      title="Umang Donga on Behance"
                      aria-label="Behance Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
                      </svg>
                    </a>

                    {/* LinkedIn Link */}
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 sm:p-2.5 rounded-xl bg-blue-950/60 hover:bg-blue-600/30 text-[#4181f0] hover:text-white border border-blue-500/30 transition-all active:scale-95 shadow-sm"
                      title="Umang Donga on LinkedIn"
                      aria-label="LinkedIn Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
