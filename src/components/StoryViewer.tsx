import React, { useState, useEffect } from 'react';
import { Home, Star, Volume2 } from 'lucide-react';
import { STORY_SCENES } from '../data/story';
import type { StoryScene, Hotspot, LiteracyOption } from '../data/story';
import { ComicScene } from './ComicScene';
import { DialogueBox } from './DialogueBox';
import { NavigationControls } from './NavigationControls';
import { ProgressIndicator } from './ProgressIndicator';
import { LiteracyCheckpoint } from './LiteracyCheckpoint';
import { FeedbackModal } from './FeedbackModal';
import { FullscreenButton } from './FullscreenButton';
import { soundEffects } from '../utils/soundEffects';
import { fireRewardConfetti } from '../utils/confetti';

interface StoryViewerProps {
  currentScene: StoryScene;
  currentSceneIndex: number;
  totalScenes: number;
  totalScore: number;
  answers: Record<string, { selectedOptionId: string; isCorrect: boolean; pointsEarned: number }>;
  discoveredHotspots: string[];
  isMuted: boolean;
  isPlayingNarration: boolean;
  isFullscreen: boolean;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onPlayNarration: (text: string, audioFile?: string) => void;
  onStopAudio: () => void;
  onNextScene: () => void;
  onPrevScene: () => void;
  onGoToScene: (sceneId: number) => void;
  onSubmitAnswer: (
    checkpointId: string,
    optionId: 'A' | 'B' | 'C' | 'D',
    isCorrect: boolean,
    indicator: any,
    points: number
  ) => void;
  onDiscoverHotspot: (hotspotId: string) => void;
  onHomeClick: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  currentScene,
  currentSceneIndex,
  totalScenes,
  totalScore,
  answers,
  discoveredHotspots,
  isMuted,
  isPlayingNarration,
  isFullscreen,
  onToggleMute,
  onToggleFullscreen,
  onPlayNarration,
  onStopAudio,
  onNextScene,
  onPrevScene,
  onGoToScene,
  onSubmitAnswer,
  onDiscoverHotspot,
  onHomeClick
}) => {
  const [isCheckpointOpen, setIsCheckpointOpen] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<{
    option: LiteracyOption;
    points: number;
  } | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Checkpoint saat ini jika ada
  const currentCheckpoint = currentScene.checkpoint;
  const currentAnswer = currentCheckpoint ? answers[currentCheckpoint.id] : undefined;
  const isCheckpointAnswered = !!currentAnswer;

  // Reset modal UI saat berpindah scene (pola resmi React: menyesuaikan state
  // ketika prop berubah, tanpa setState di dalam effect)
  const [prevSceneId, setPrevSceneId] = useState(currentScene.id);
  if (prevSceneId !== currentScene.id) {
    setPrevSceneId(currentScene.id);
    setIsCheckpointOpen(false);
    setActiveFeedback(null);
  }

  // Hentikan narasi audio saat scene berubah (side-effect murni)
  useEffect(() => {
    onStopAudio();
  }, [currentScene.id, onStopAudio]);

  // Navigasi Keyboard (Panah Kanan, Panah Kiri, Spasi untuk Audio)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Jangan jalankan shortcut jika sedang membuka modal checkpoint / feedback
      if (isCheckpointOpen || activeFeedback || showExitConfirm) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        soundEffects.pop();
        if (currentCheckpoint && !isCheckpointAnswered) {
          setIsCheckpointOpen(true);
        } else {
          onNextScene();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSceneIndex > 0) {
          soundEffects.pop();
          onPrevScene();
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        const textToRead = currentScene.dialogue || currentScene.narration || '';
        onPlayNarration(textToRead, currentScene.audio);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isCheckpointOpen,
    activeFeedback,
    showExitConfirm,
    currentCheckpoint,
    isCheckpointAnswered,
    currentSceneIndex,
    currentScene,
    onNextScene,
    onPrevScene,
    onPlayNarration
  ]);

  // Handler saat siswa memilih jawaban di checkpoint
  const handleSelectOption = (option: LiteracyOption) => {
    if (!currentCheckpoint) return;

    if (option.isCorrect) {
      soundEffects.correct();
      fireRewardConfetti();
    } else {
      soundEffects.tryAgain();
    }

    onSubmitAnswer(
      currentCheckpoint.id,
      option.id,
      option.isCorrect,
      currentCheckpoint.indicator,
      currentCheckpoint.points
    );

    setActiveFeedback({
      option,
      points: currentCheckpoint.points
    });
  };

  // Handler saat hotspot di-tap
  const handleTriggerHotspot = (hotspot: Hotspot) => {
    onDiscoverHotspot(hotspot.id);
    if (!isMuted) {
      if (hotspot.soundType === 'laugh') soundEffects.laugh();
      else if (hotspot.soundType === 'splash') soundEffects.splash();
      else if (hotspot.soundType === 'snore') soundEffects.snore();
      else if (hotspot.soundType === 'cheer') soundEffects.cheer();
      else soundEffects.pop();
    }
  };

  // Handler tombol Audio Narasi
  const handlePlayCurrentNarration = () => {
    const textToRead = currentScene.dialogue || currentScene.narration || '';
    onPlayNarration(textToRead, currentScene.audio);
  };

  return (
    <div className="relative h-full w-full bg-slate-900 flex flex-col justify-between select-none overflow-hidden">
      {/* 1. HEADER STORY MODE (Minimalis & Bebas Distraksi) */}
      <header className="relative z-30 w-full px-3 py-2 sm:px-6 sm:py-3 bg-slate-900/90 backdrop-blur-md border-b-2 border-emerald-800/60 flex items-center justify-between gap-2 text-white">
        {/* Tombol Beranda / Keluar dengan Konfirmasi */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-600 transition-transform active:scale-95 flex items-center gap-1.5 text-xs sm:text-sm font-bold"
            title="Keluar ke Menu Utama"
            aria-label="Menu Utama"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            <span className="hidden md:inline">Menu</span>
          </button>

          {/* Indikator Poin Bintang Siswa */}
          <div className="flex items-center gap-1.5 bg-amber-400/20 border-2 border-amber-400/60 px-3 py-1.5 rounded-2xl text-amber-300 font-extrabold text-xs sm:text-sm shadow-inner">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{totalScore} Poin</span>
          </div>
        </div>

        {/* Indikator Progres Cerita (Tengah) */}
        <ProgressIndicator
          currentScene={currentScene.sceneNumber}
          totalScenes={totalScenes}
          answeredCheckpoints={Object.keys(answers).reduce((acc, k) => {
            acc[k] = answers[k].isCorrect;
            return acc;
          }, {} as Record<string, boolean>)}
          scenes={STORY_SCENES}
          onSelectScene={onGoToScene}
        />

        {/* Tombol Kanan: Fullscreen & Audio Mute */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-600 transition-transform active:scale-95"
            title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
            aria-label="Pengaturan Suara"
          >
            <Volume2 className={`w-4 h-4 sm:w-5 sm:h-5 ${isMuted ? 'text-red-400' : 'text-emerald-400'}`} />
          </button>

          <FullscreenButton isFullscreen={isFullscreen} onToggle={onToggleFullscreen} />
        </div>
      </header>

      {/* 2. KONTEN TENGAH: GAMBAR KOMIK BESAR (FOKUS UTAMA) */}
      <main className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        <ComicScene
          key={currentScene.id}
          scene={currentScene}
          onTriggerHotspot={handleTriggerHotspot}
          discoveredHotspots={discoveredHotspots}
        />
      </main>

      {/* 3. FOOTER STORY MODE: BALON DIALOG & KONTROL NAVIGASI */}
      <footer className="relative z-30 w-full bg-slate-900/95 backdrop-blur-md border-t-2 border-emerald-800/60 py-2 sm:py-3 px-2 sm:px-4 space-y-2">
        {/* Balon Dialog & Narasi Komik */}
        <DialogueBox
          scene={currentScene}
          onSpeak={handlePlayCurrentNarration}
          isPlaying={isPlayingNarration}
        />

        {/* Kontrol Navigasi Besar (Sebelumnya, Audio, Lanjut / Tantangan) */}
        <NavigationControls
          onPrev={() => {
            soundEffects.pop();
            onPrevScene();
          }}
          onNext={() => {
            soundEffects.pop();
            onNextScene();
          }}
          hasPrev={currentSceneIndex > 0}
          hasNext={currentSceneIndex < totalScenes - 1}
          hasCheckpoint={!!currentCheckpoint}
          isCheckpointAnswered={isCheckpointAnswered}
          onOpenCheckpoint={() => {
            soundEffects.pop();
            setIsCheckpointOpen(true);
          }}
          onPlayNarration={handlePlayCurrentNarration}
          isPlayingNarration={isPlayingNarration}
        />
      </footer>

      {/* MODAL CHECKPOINT LITERASI SASTRA */}
      {isCheckpointOpen && currentCheckpoint && (
        <LiteracyCheckpoint
          checkpoint={currentCheckpoint}
          onSelectOption={handleSelectOption}
          previousAnswer={currentAnswer}
          onClose={() => setIsCheckpointOpen(false)}
        />
      )}

      {/* MODAL FEEDBACK GAME-LIKE RAMAH ANAK */}
      {activeFeedback && (
        <FeedbackModal
          option={activeFeedback.option}
          pointsEarned={activeFeedback.points}
          onContinue={() => {
            setActiveFeedback(null);
            setIsCheckpointOpen(false);
            // Otomatis lanjut ke scene berikutnya jika benar!
            if (activeFeedback.option.isCorrect) {
              onNextScene();
            }
          }}
          onTryAgain={
            !activeFeedback.option.isCorrect
              ? () => {
                  setActiveFeedback(null);
                  setIsCheckpointOpen(true);
                }
              : undefined
          }
        />
      )}

      {/* MODAL KONFIRMASI KELUAR (Agar anak tidak sengaja memencet) */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-pop-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-amber-400 shadow-2xl text-center">
            <div className="text-4xl mb-2">🛑</div>
            <h4 className="text-xl font-black text-slate-800 mb-2">Ingin Kembali ke Menu?</h4>
            <p className="text-sm font-semibold text-slate-600 mb-6">
              Kemajuan membacamu tetap tersimpan secara otomatis. Kamu bisa melanjutkannya kapan saja!
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-5 py-2.5 rounded-2xl bg-slate-200 hover:bg-slate-300 font-bold text-sm text-slate-700"
              >
                Tetap Membaca
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onHomeClick();
                }}
                className="px-5 py-2.5 rounded-2xl btn-game-primary font-bold text-sm"
              >
                Ya, ke Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
