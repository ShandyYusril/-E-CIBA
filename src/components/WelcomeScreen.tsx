import React, { useState } from 'react';
import { Play, HelpCircle, RotateCcw, Sparkles, BookOpen } from 'lucide-react';
import { STORY_METADATA } from '../data/story';
import { GuideModal } from './GuideModal';
import { FullscreenButton } from './FullscreenButton';

interface WelcomeScreenProps {
  onStartAdventure: () => void;
  onResumeAdventure?: () => void;
  hasSavedProgress: boolean;
  savedSceneNumber?: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartAdventure,
  onResumeAdventure,
  hasSavedProgress,
  savedSceneNumber = 1,
  isFullscreen,
  onToggleFullscreen
}) => {
  const [showGuide, setShowGuide] = useState(false);
  const [selectedChar, setSelectedChar] = useState<any | null>(null);

  return (
    <div className="relative min-h-full w-full bg-gradient-to-b from-sky-300 via-emerald-100 to-green-300 p-4 sm:p-8 flex flex-col justify-between select-none overflow-y-auto">
      {/* Tombol Kontrol Atas (Fullscreen & Panduan) */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-20">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border-2 border-emerald-300 shadow-sm">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <span className="text-xs sm:text-sm font-extrabold text-emerald-900">
            Komik Literasi Digital SD
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuide(true)}
            className="p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-white/90 hover:bg-white text-amber-900 shadow-md border-2 border-amber-300 flex items-center gap-2 text-xs sm:text-sm font-bold transition-transform active:scale-95"
            aria-label="Petunjuk Membaca"
          >
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span className="hidden sm:inline">Petunjuk Membaca</span>
          </button>

          <FullscreenButton isFullscreen={isFullscreen} onToggle={onToggleFullscreen} />
        </div>
      </div>

      {/* Konten Utama Layar Pembuka */}
      <div className="w-full max-w-4xl mx-auto my-auto text-center z-10 py-6">
        {/* Badge Judul */}
        <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 px-5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider mb-3 shadow-md border-2 border-white animate-bounce-soft">
          <Sparkles className="w-4 h-4" />
          <span>Petualangan Literasi Sastra Interaktif</span>
        </div>

        {/* Judul Cerita */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-emerald-950 mb-2 drop-shadow-sm tracking-tight leading-tight">
          Kelinci & Kura-Kura
        </h1>
        <p className="text-base sm:text-2xl font-black text-amber-800 mb-6 drop-shadow-xs">
          Di Hutan yang Rindang 🌳
        </p>

        {/* Kartu Karakter Utama (Dapat Disentuh Siswa) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8">
          {STORY_METADATA.characters.map((char) => (
            <button
              key={char.id}
              onClick={() => setSelectedChar(char)}
              className="group p-3 sm:p-4 rounded-3xl bg-white/95 backdrop-blur-sm border-3 border-emerald-200 hover:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 text-center cursor-pointer active:scale-95"
            >
              <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition-transform">
                {char.avatar}
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-800 leading-tight">
                {char.name}
              </h3>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 line-clamp-1 mt-0.5">
                {char.role}
              </span>
            </button>
          ))}
        </div>

        {/* Modal Info Karakter Ringkas jika ditekan */}
        {selectedChar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-pop-in">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-amber-300 shadow-2xl text-center">
              <div className="text-5xl mb-2">{selectedChar.avatar}</div>
              <h4 className="text-xl font-black text-slate-800">{selectedChar.name}</h4>
              <p className="text-xs font-bold text-amber-700 mb-3">{selectedChar.role}</p>
              <p className="text-sm font-semibold text-slate-600 mb-4 leading-relaxed">
                "{selectedChar.description}"
              </p>
              <button
                onClick={() => setSelectedChar(null)}
                className="px-6 py-2 rounded-2xl btn-game-primary font-bold text-sm"
              >
                Tutup Info
              </button>
            </div>
          </div>
        )}

        {/* Tombol Aksi Utama (Mulai / Lanjutkan) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartAdventure}
            className="w-full sm:w-auto px-8 py-4 rounded-3xl btn-game-primary text-lg sm:text-xl font-black shadow-2xl flex items-center justify-center gap-3 animate-pulse-glow"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>Mulai Petualangan 🚀</span>
          </button>

          {hasSavedProgress && onResumeAdventure && (
            <button
              onClick={onResumeAdventure}
              className="w-full sm:w-auto px-6 py-4 rounded-3xl btn-game-amber text-base sm:text-lg font-bold shadow-xl flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Lanjut Adegan #{savedSceneNumber}</span>
            </button>
          )}
        </div>
      </div>

      {/* Footer Hak Cipta & Info Guru */}
      <div className="w-full text-center text-xs font-bold text-emerald-900/80 z-10 pt-4">
        Media Pembelajaran Literasi Sastra Digital Interaktif • Khusus Siswa Sekolah Dasar
      </div>

      {/* Modal Petunjuk */}
      {showGuide && (
        <GuideModal onClose={() => setShowGuide(false)} onStartAdventure={onStartAdventure} />
      )}
    </div>
  );
};
