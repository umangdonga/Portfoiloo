import React from 'react';
import { Award, Eye } from 'lucide-react';

interface CertificatesProps {
  onSelectImage: (url: string, title: string) => void;
}

export const Certificates: React.FC<CertificatesProps> = ({ onSelectImage }) => {
  const certificates = [
    {
      url: 'https://framerusercontent.com/images/DEvtdnvAKKupDkgn5Dyl4Gfkvgo.png?width=978&height=757',
      title: 'Design Certification 1',
    },
    {
      url: 'https://framerusercontent.com/images/fuuZIbricMo1PVSR7tp4OQkr5JY.png?width=982&height=755',
      title: 'Design Certification 2',
    },
    {
      url: 'https://framerusercontent.com/images/3dpyyeyuUsEUTP7RmjwfKL1tE.png?width=1110&height=690',
      title: 'UI/UX Specialization Credential',
    },
    {
      url: 'https://framerusercontent.com/images/GkEnCNJjG8OSgwXV9a5UIeBwKs.png?width=1191&height=838',
      title: 'Professional Learning Achievement',
    },
    {
      url: 'https://framerusercontent.com/images/vmXKZdZCP8MUNsWbxkgozyzuntI.png?width=978&height=755',
      title: 'Academic & Industry Certification',
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Credentials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#4181f0] mb-3">
          Certificates
        </h2>
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          A collection of certifications that highlight my continuous learning and growing expertise in design,
          technology, and user experience.
        </p>
      </div>

      {/* Screen Tickers Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-reverse flex gap-6 items-center">
          {[...certificates, ...certificates].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectImage(item.url, item.title)}
              className="group relative w-72 sm:w-80 md:w-96 flex-shrink-0 rounded-2xl overflow-hidden border border-[#2a3050] bg-[#0c101c] p-2 hover:border-[#4181f0] transition-all duration-300 cursor-pointer shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02]"
            >
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay with eye icon */}
                <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <div className="p-3 rounded-full bg-blue-600 text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-5 h-5" />
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
