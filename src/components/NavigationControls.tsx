import React from 'react';
import { ArrowLeft, ArrowRight, HelpCircle, Volume2 } from 'lucide-react';

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  hasCheckpoint: boolean;
  isCheckpointAnswered: boolean;
  onOpenCheckpoint: () => void;
  onPlayNarration: () => void;
  isPlayingNarration: boolean;
  className?: string;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  hasCheckpoint,
  isCheckpointAnswered,
  onOpenCheckpoint,
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
            ? 'btn-game-amber'
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
            ? 'bg-amber-300 text-amber-950 border-b-4 border-amber-600 animate-pulse'
            : 'bg-white text-emerald-800 border-2 border-emerald-300 hover:bg-emerald-50 border-b-4 border-b-emerald-600'
        }`}
        title="Dengarkan Cerita"
      >
        <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
        <span className="hidden sm:inline">
          {isPlayingNarration ? 'Bercerita...' : 'Suara Cerita'}
        </span>
      </button>

      {/* Tombol Kanan: Jika ada checkpoint yang belum dijawab, tampilkan "Jawab Tantangan", jika sudah atau tidak ada tampilkan "Lanjut" */}
      {hasCheckpoint && !isCheckpointAnswered ? (
        <button
          onClick={onOpenCheckpoint}
          className="btn-game-purple px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl flex items-center gap-2 text-sm sm:text-base font-bold shadow-lg animate-pulse"
          aria-label="Buka Tantangan Literasi"
        >
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          <span>Tantangan Cerita 🎯</span>
        </button>
      ) : (
        <button
          onClick={onNext}
          className="btn-game-primary px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-2xl flex items-center gap-2 text-sm sm:text-base font-bold shadow-lg"
          aria-label={hasNext ? 'Halaman Selanjutnya' : 'Selesaikan Petualangan'}
        >
          <span>{hasNext ? 'Lanjut' : 'Lihat Hasil 🌟'}</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
};
