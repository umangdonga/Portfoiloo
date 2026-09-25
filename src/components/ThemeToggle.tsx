import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {showLabel && (
        <span className="text-xs font-medium text-slate-400 select-none">
          {isLight ? 'Light' : 'Dark'}
        </span>
      )}
      <button
        type="button"
        onClick={toggleTheme}
        role="switch"
        aria-checked={isLight}
        aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
        title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
        className={`relative inline-flex h-8 w-15 flex-shrink-0 cursor-pointer rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          isLight
            ? 'bg-amber-100/90 border border-amber-300/60 shadow-inner'
            : 'bg-[#151d38] border border-[#303f70] shadow-inner'
        }`}
      >
        {/* Track Icons for visual affordance */}
        <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none select-none">
          <Sun
            className={`w-3.5 h-3.5 transition-opacity duration-200 ${
              isLight ? 'text-amber-600 opacity-90' : 'text-slate-500 opacity-30'
            }`}
          />
          <Moon
            className={`w-3.5 h-3.5 transition-opacity duration-200 ${
              !isLight ? 'text-blue-300 opacity-90' : 'text-slate-400 opacity-30'
            }`}
          />
        </span>

        {/* Sliding thumb */}
        <span
          className={`pointer-events-none inline-flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-transform duration-300 ease-out z-10 ${
            isLight
              ? 'translate-x-0 bg-white text-amber-500 ring-1 ring-amber-300/50 shadow-amber-500/20'
              : 'translate-x-7 bg-[#23315d] text-blue-200 ring-1 ring-blue-400/40 shadow-blue-900/40'
          }`}
        >
          {isLight ? (
            <Sun className="w-3.5 h-3.5 animate-spin-slow text-amber-500" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-blue-200" />
          )}
        </span>
      </button>
    </div>
  );
};
