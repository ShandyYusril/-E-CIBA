import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoaded, 300);
          return 100;
        }
        return prev + 17;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-sky-200 via-emerald-100 to-green-200 p-6 select-none overflow-hidden">
      {/* Ornamen Lingkungan Hutan Lucu */}
      <div className="absolute top-10 left-10 text-5xl animate-float opacity-70">☁️</div>
      <div className="absolute top-16 right-16 text-4xl animate-float opacity-60 delay-700">☁️</div>
      <div className="absolute bottom-6 left-12 text-6xl opacity-80">🌳</div>
      <div className="absolute bottom-8 right-12 text-6xl opacity-80">🌲</div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Karakter Animasi Lucu */}
        <div className="relative mb-6">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white/90 border-4 border-amber-300 shadow-2xl flex items-center justify-center text-6xl animate-bounce-soft">
            🐰
          </div>
          <div className="absolute -bottom-2 -right-2 w-14 h-14 rounded-2xl bg-emerald-100 border-3 border-emerald-400 flex items-center justify-center text-3xl shadow-lg animate-float">
            🐢
          </div>
          <div className="absolute -top-3 -left-3 text-amber-400 animate-spin">
            <Sparkles className="w-8 h-8 fill-amber-400" />
          </div>
        </div>

        {/* Judul E-Comic */}
        <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 mb-1 tracking-wide">
          E-COMIC INTERAKTIF
        </h1>
        <p className="text-sm sm:text-base font-extrabold text-amber-800 mb-6 bg-white/80 px-4 py-1.5 rounded-full border border-amber-200 shadow-xs">
          Literasi Sastra Siswa Sekolah Dasar 📚
        </p>

        {/* Progress Bar Loading Ramah Anak */}
        <div className="w-full bg-white/90 rounded-full h-5 p-1 border-3 border-emerald-600 shadow-md mb-3">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-bold text-emerald-900 animate-pulse">
          Menyiapkan Lembaran Komik... {progress}%
        </p>
      </div>
    </div>
  );
};
