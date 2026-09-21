import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoaded, 400);
          return 100;
        }
        return prev + Math.random() * 18 + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onLoaded]);

  const displayProgress = Math.min(Math.round(progress), 100);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f1923] select-none">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs px-6">
        {/* Book icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-lg font-bold text-white/90 tracking-wide mb-1">E-COMIC</h1>
        <p className="text-xs text-white/30 font-medium mb-8">Memuat halaman komik...</p>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        <span className="text-[11px] font-semibold text-white/20 tabular-nums">{displayProgress}%</span>
      </div>
    </div>
  );
};
