import React from 'react';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onPlayNarration: () => void;
  isPlayingNarration: boolean;
  className?: string;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onPlayNarration,
  isPlayingNarration,
  className = ''
}) => {
  return (
    <div
      className={`w-full max-w-4xl mx-auto px-2 sm:px-4 flex items-center justify-between gap-3 ${className}`}
    >
      {/* Tombol Sebelumnya */}
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className={`px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl flex items-center gap-2 text-sm sm:text-base font-bold shadow-lg transition-all ${
          hasPrev
            ? 'bg-slate-700 text-white border-b-4 border-slate-950 hover:bg-slate-600'
            : 'bg-slate-300 text-slate-400 border-b-4 border-slate-400 cursor-not-allowed opacity-50'
        }`}
        aria-label="Halaman Sebelumnya"
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        <span>Sebelumnya</span>
      </button>

      {/* Tombol Tengah: Audio Narasi Cepat */}
      <button
        onClick={onPlayNarration}
        className={`px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl flex items-center gap-2 text-sm sm:text-base font-bold shadow-md transition-all ${
          isPlayingNarration
            ? 'bg-emerald-400 text-emerald-950 border-b-4 border-emerald-700 animate-pulse'
            : 'bg-slate-800 text-white/80 border border-white/10 hover:bg-slate-700 border-b-4 border-b-slate-950'
        }`}
        title="Dengarkan Cerita"
      >
        <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
        <span className="hidden sm:inline">
          {isPlayingNarration ? 'Bercerita...' : 'Suara Cerita'}
        </span>
      </button>

      <button
          onClick={onNext}
          className="btn-game-primary px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl flex items-center gap-2 text-sm sm:text-base font-bold shadow-lg"
          aria-label={hasNext ? 'Halaman Selanjutnya' : 'Selesaikan Petualangan'}
        >
          <span>{hasNext ? 'Lanjut' : 'Lihat Hasil 🌟'}</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>
    </div>
  );
};
