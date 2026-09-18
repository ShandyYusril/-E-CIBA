import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControlProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isPlayingNarration: boolean;
  onPlayNarration: () => void;
  className?: string;
}

export const AudioControl: React.FC<AudioControlProps> = ({
  isMuted,
  onToggleMute,
  isPlayingNarration,
  onPlayNarration,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Tombol Dengarkan Narasi Suara */}
      <button
        onClick={onPlayNarration}
        className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl flex items-center gap-2 text-sm sm:text-base font-bold shadow-md transition-all active:scale-95 ${
          isPlayingNarration
            ? 'bg-amber-400 text-amber-950 border-2 border-amber-600 animate-pulse'
            : 'bg-white/95 text-emerald-800 border-2 border-emerald-300 hover:bg-emerald-50'
        }`}
        title="Dengarkan cerita bersuara"
        aria-label="Dengarkan cerita bersuara"
      >
        <Volume2
          className={`w-5 h-5 ${
            isPlayingNarration ? 'text-amber-900 animate-bounce' : 'text-emerald-700'
          }`}
        />
        <span className="hidden sm:inline">
          {isPlayingNarration ? 'Mendengarkan...' : 'Dengarkan'}
        </span>
      </button>

      {/* Tombol Mute/Unmute Suara */}
      <button
        onClick={onToggleMute}
        className="p-2 sm:p-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 shadow-md border-2 border-slate-200 transition-transform active:scale-95"
        title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
        aria-label="Pengaturan Suara"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-red-500" />
        ) : (
          <Volume2 className="w-5 h-5 text-emerald-600" />
        )}
      </button>
    </div>
  );
};
