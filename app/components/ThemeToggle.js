"use client";
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative p-2 rounded-xl transition-all duration-300 hover:bg-white/30 dark:hover:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 group"
      aria-label="Toggle dark mode"
    >
      {/* Sun Icon */}
      <svg
        className={`h-5 w-5 transition-all duration-300 ${
          isDarkMode 
            ? 'text-yellow-400 rotate-0 scale-100' 
            : 'text-slate-600 rotate-90 scale-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      
      {/* Moon Icon */}
      <svg
        className={`absolute inset-0 m-auto h-5 w-5 transition-all duration-300 ${
          isDarkMode 
            ? 'text-slate-300 rotate-90 scale-0' 
            : 'text-slate-600 rotate-0 scale-100'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      
      {/* Hover effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
}
