import React, { useState } from 'react';
import { ArrowRight, HelpCircle, Info, Play, RotateCcw, X } from 'lucide-react';
import { FullscreenButton } from './FullscreenButton';
import backgroundImage from '../assets/background/backgorund.webp';
import logoImage from '../assets/background/logo.webp';

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
  const [showAuthorInfo, setShowAuthorInfo] = useState(false);

  return (
    <div
      className="relative min-h-full w-full overflow-hidden bg-[#f2eee5] text-[#17352e] select-none"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(242, 238, 229, 0.96) 0%, rgba(242, 238, 229, 0.82) 42%, rgba(242, 238, 229, 0.2) 100%), url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <img
            src={logoImage}
            alt="Logo ECIBA"
            className="h-14 w-14 rounded-2xl object-cover shadow-[4px_4px_0_#d8864b] sm:h-16 sm:w-16"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuide(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b9c9ba] bg-white/75 text-[#17352e] shadow-[0_3px_0_#d7d2c7] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
            title="Petunjuk ECIBA"
            aria-label="Buka petunjuk ECIBA"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowAuthorInfo(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b9c9ba] bg-white/75 text-[#17352e] shadow-[0_3px_0_#d7d2c7] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
            title="Tentang karya"
            aria-label="Buka informasi pembuat karya"
          >
            <Info className="h-5 w-5" />
          </button>
          <FullscreenButton isFullscreen={isFullscreen} onToggle={onToggleFullscreen} />
        </div>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100dvh-82px)] w-full max-w-6xl items-center gap-10 px-5 pb-10 pt-3 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-0">
        <section className="max-w-xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d8864b]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#b56839]">Cerita anak, cara baru membaca</span>
          </div>

          <h1 className="max-w-lg text-5xl font-black leading-[0.94] tracking-[-0.06em] text-[#17352e] sm:text-6xl lg:text-7xl">
            Buka halaman.
            <br />
            Temukan <span className="text-[#d2773e]">makna.</span>
          </h1>
          <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-[#668176] sm:text-lg">
            ECIBA adalah <strong className="text-[#315d4d]">E-Comic Interaktif Berbasis Cerita Anak</strong>. Baca fabel dengan ritmemu sendiri, jelajahi setiap halaman, lalu jawab kuis di akhir cerita.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              onClick={onStartAdventure}
              className="group flex items-center gap-3 rounded-xl bg-[#17352e] px-6 py-4 text-sm font-black text-white shadow-[0_6px_0_#0c211c] transition-all hover:-translate-y-0.5 hover:bg-[#245243] active:translate-y-1 active:shadow-[0_2px_0_#0c211c]"
            >
              <Play className="h-4 w-4 fill-current" />
              Mulai membaca
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            {hasSavedProgress && onResumeAdventure && (
              <button
                onClick={onResumeAdventure}
                className="flex items-center gap-2 rounded-xl border border-[#c7d2c8] bg-white/60 px-5 py-3.5 text-sm font-bold text-[#315d4d] transition hover:border-[#668176] hover:bg-white"
              >
                <RotateCcw className="h-4 w-4" />
                Lanjut halaman {savedSceneNumber}
              </button>
            )}
          </div>

          <div className="mt-10 flex items-center gap-8 border-t border-[#d7d2c7] pt-5 text-[#668176]">
            <div><strong className="block text-xl font-black text-[#17352e]">13</strong><span className="text-[10px] font-bold uppercase tracking-wider">Halaman</span></div>
            <div><strong className="block text-xl font-black text-[#17352e]">Fabel</strong><span className="text-[10px] font-bold uppercase tracking-wider">Jenis cerita</span></div>
            <div><strong className="block text-xl font-black text-[#17352e]">Kelas IV</strong><span className="text-[10px] font-bold uppercase tracking-wider">Untuk kamu</span></div>
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative rotate-[-2deg] rounded-[2rem] bg-[#17352e] p-3 shadow-[14px_16px_0_#d8864b] transition-transform duration-500 hover:rotate-0">
            <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#254d40] px-6 pb-7 pt-6 sm:px-8 sm:pt-8">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[18px] border-[#d8864b]/30" />
              <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border-[22px] border-[#b7cda9]/20" />

              <div className="relative mb-16 flex items-start justify-between">
                <div className="rounded-full border border-white/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#d9e8d3]">Komik 01</div>
                <span className="text-xs font-bold text-[#b7cda9]">ECIBA / 2026</span>
              </div>

              <div className="relative">
                <div className="mb-3 h-1 w-12 bg-[#d8864b]" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b7cda9]">Sebuah fabel tentang</p>
                <h2 className="mt-3 text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">Kura-Kura<br /><span className="text-[#e09a63]">&amp;</span> Kelinci yang Sombong</h2>
                <p className="mt-6 max-w-[230px] text-sm font-medium leading-relaxed text-white/55">Tentang langkah yang tenang, tekad yang panjang, dan tidak meremehkan siapa pun.</p>
              </div>

              <div className="relative mt-10 flex items-end justify-between border-t border-white/10 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">Baca • Jelajah • Pahami</span>
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border-2 border-[#254d40] bg-[#d8864b]" />
                  <div className="h-7 w-7 rounded-full border-2 border-[#254d40] bg-[#b7cda9]" />
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17352e]/65 p-4 backdrop-blur-sm animate-pop-in">
          <div className="relative w-full max-w-sm rounded-3xl border border-white/60 bg-[#f8f5ed] p-6 shadow-2xl">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-[#668176] transition hover:bg-[#e8e1d3] hover:text-[#17352e]"
              aria-label="Tutup petunjuk ECIBA"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#b7cda9] bg-[#17352e] text-white shadow-[0_4px_0_#0c211c]">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h2 className="text-center text-2xl font-black text-[#17352e]">Petunjuk ECIBA</h2>
            <div className="mt-5 grid gap-3 text-sm text-[#668176]">
              <GuideItem number="01" text="Geser halaman untuk mengikuti alur cerita." />
              <GuideItem number="02" text="Sentuh titik interaktif yang kamu temukan." />
              <GuideItem number="03" text="Selesaikan kuis setelah halaman terakhir." />
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="mt-6 w-full rounded-xl bg-[#17352e] px-5 py-3 text-sm font-black text-white shadow-[0_4px_0_#0c211c] transition hover:bg-[#245243] active:translate-y-1 active:shadow-[0_1px_0_#0c211c]"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {showAuthorInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17352e]/65 p-4 backdrop-blur-sm animate-pop-in">
          <div className="relative w-full max-w-sm rounded-3xl border border-white/60 bg-[#f8f5ed] p-6 text-center shadow-2xl">
            <button
              onClick={() => setShowAuthorInfo(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-[#668176] transition hover:bg-[#e8e1d3] hover:text-[#17352e]"
              aria-label="Tutup informasi pembuat"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#d8864b] bg-[#17352e] text-3xl font-black text-[#f2eee5] shadow-[0_5px_0_#b56839]">
              ML
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b56839]">Pembuat karya</p>
            <h2 className="mt-2 text-2xl font-black text-[#17352e]">Media Literasi Sastra Digital SD</h2>
            <p className="mt-3 text-sm font-medium leading-relaxed text-[#668176]">
              Skripsi ini dikembangkan sebagai media literasi sastra digital berbentuk e-comic interaktif untuk siswa sekolah dasar.
            </p>
            <button
              onClick={() => setShowAuthorInfo(false)}
              className="mt-5 rounded-xl bg-[#17352e] px-5 py-3 text-sm font-black text-white shadow-[0_4px_0_#0c211c] transition hover:bg-[#245243] active:translate-y-1 active:shadow-[0_1px_0_#0c211c]"
            >
              Kembali ke halaman utama
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function GuideItem({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-black text-[#d2773e]">{number}</span>
      <span className="font-semibold">{text}</span>
    </div>
  );
}
