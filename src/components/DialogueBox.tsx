import React from 'react';
import { Volume2 } from 'lucide-react';
import type { StoryScene } from '../data/story';

interface DialogueBoxProps {
  scene: StoryScene;
  onSpeak: (text: string, audioFile?: string) => void;
  isPlaying: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  scene,
  onSpeak,
  isPlaying
}) => {
  const speakerName = scene.speaker || 'Narator Cerita';
  const mainText = scene.dialogue || scene.narration || '';

  const getAvatar = () => {
    switch (scene.speakerRole) {
      case 'rabbit':
        return '🐰';
      case 'turtle':
        return '🐢';
      case 'monkey':
        return '🐒';
      default:
        return '📖';
    }
  };

  const getSpeakerBadgeStyle = () => {
    switch (scene.speakerRole) {
      case 'rabbit':
        return 'bg-amber-500 text-white border-amber-600';
      case 'turtle':
        return 'bg-emerald-600 text-white border-emerald-700';
      case 'monkey':
        return 'bg-purple-600 text-white border-purple-700';
      default:
        return 'bg-blue-600 text-white border-blue-700';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-3.5 sm:p-4 shadow-xl border-4 border-amber-300 flex items-start gap-3 sm:gap-4 transition-all">
        {/* Avatar Tokoh */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner">
          {getAvatar()}
        </div>

        {/* Isi Percakapan & Narasi */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-extrabold uppercase tracking-wide border ${getSpeakerBadgeStyle()}`}
            >
              {speakerName}
            </span>

            {/* Tombol Dengarkan Suara Tokoh */}
            <button
              onClick={() => onSpeak(mainText, scene.audio)}
              className={`p-1.5 rounded-xl border transition-all flex items-center gap-1 text-xs font-bold ${
                isPlaying
                  ? 'bg-amber-300 text-amber-950 border-amber-500 animate-pulse'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
              title="Dengarkan percakapan ini"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Ucapkan</span>
            </button>
          </div>

          <p className="text-slate-800 text-sm sm:text-base md:text-lg font-bold leading-snug">
            {scene.dialogue ? `"${scene.dialogue}"` : scene.narration}
          </p>

          {/* Jika ada narasi terpisah di bawah dialog */}
          {scene.dialogue && scene.narration && (
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1 italic line-clamp-2">
              📖 {scene.narration}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
