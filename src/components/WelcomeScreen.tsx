import React, { useState } from 'react';
import { Play, RotateCcw, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
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

  return (
    <div className="relative min-h-full w-full bg-[#0f1923] flex flex-col select-none overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Soft gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top bar */}
      <header className="relative z-10 w-full px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-sm font-bold text-white/70 tracking-wide">E-COMIC</span>
        </div>
        <FullscreenButton isFullscreen={isFullscreen} onToggle={onToggleFullscreen} />
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 pb-8">
        {/* Title section */}
        <div className="text-center mb-10 max-w-lg">
          <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
              Komik Literasi Interaktif
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
            Kelinci & Kura-Kura
          </h1>
          <p className="text-base sm:text-lg text-white/40 font-medium leading-relaxed max-w-md mx-auto">
            Baca komik interaktif tentang fabel klasik penuh hikmah.
            Geser halaman, nikmati cerita, dan uji pemahamanmu di akhir.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs mb-8">
          <button
            onClick={onStartAdventure}
            className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Mulai Membaca</span>
          </button>

          {hasSavedProgress && onResumeAdventure && (
            <button
              onClick={onResumeAdventure}
              className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Lanjutkan Halaman {savedSceneNumber}</span>
            </button>
          )}
        </div>

        {/* Info cards - compact */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-sm mb-6">
          <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-xl font-black text-white mb-0.5">13</div>
            <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wide">Halaman</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-xl font-black text-white mb-0.5">Fabel</div>
            <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wide">Genre</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-xl font-black text-white mb-0.5">SD</div>
            <div className="text-[10px] font-semibold text-white/30 uppercase tracking-wide">Kelas IV</div>
          </div>
        </div>

        {/* Expandable guide section */}
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center gap-1.5 text-xs font-semibold text-white/30 hover:text-white/50 transition-colors mb-2"
        >
          <span>Petunjuk Membaca</span>
          {showGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showGuide && (
          <div className="w-full max-w-sm rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3 animate-pop-in">
            <GuideItem
              step="1"
              title="Baca & geser halaman"
              desc="Tekan tombol navigasi atau geser layar untuk berpindah halaman komik."
            />
            <GuideItem
              step="2"
              title="Sentuh objek interaktif"
              desc="Temukan titik-titik tersembunyi di gambar komik untuk mendengar reaksi karakter."
            />
            <GuideItem
              step="3"
              title="Dengarkan narasi"
              desc="Tekan ikon speaker untuk mendengar cerita dibacakan."
            />
            <GuideItem
              step="4"
              title="Kuis di akhir"
              desc="Setelah selesai membaca, jawab pertanyaan untuk menguji pemahamanmu."
            />
            <div className="pt-1 text-[10px] text-white/20 font-medium">
              Keyboard: Panah Kanan (lanjut) / Panah Kiri (kembali) / Spasi (audio)
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center pb-5 px-5">
        <p className="text-[10px] font-medium text-white/15">
          Media Pembelajaran Literasi Sastra Digital Interaktif
        </p>
      </footer>
    </div>
  );
};

function GuideItem({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-md bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 text-xs font-bold">
        {step}
      </div>
      <div>
        <h4 className="text-xs font-bold text-white/70">{title}</h4>
        <p className="text-[11px] text-white/30 leading-snug mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
