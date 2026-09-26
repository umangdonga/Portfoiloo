import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  title: string | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  title,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[92vh] sm:max-h-[90vh] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#0c101c] border border-blue-500/30 shadow-2xl flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#2a3050] bg-[#0d1322]">
          <h4 className="text-xs sm:text-base font-semibold text-white truncate pr-3">
            {title || 'Preview'}
          </h4>
          <button
            onClick={onClose}
            className="p-1 sm:p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Image */}
        <div className="p-2 sm:p-6 flex items-center justify-center overflow-auto max-h-[calc(92vh-56px)] sm:max-h-[calc(90vh-70px)]">
          <img
            src={imageUrl}
            alt={title || 'Full Resolution Preview'}
            className="max-h-full max-w-full object-contain rounded-lg sm:rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
