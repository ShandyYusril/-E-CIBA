import React, { useEffect, useState } from 'react';
import logoImage from '../assets/background/logo.jpeg';

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
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 overflow-hidden">
          <img src={logoImage} alt="Logo E-CIBA" className="h-full w-full object-cover" />
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
