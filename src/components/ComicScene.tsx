import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import type { StoryScene, Hotspot, InteractiveDialogue } from '../data/story';
import { HotspotInteraction } from './HotspotInteraction';
import { useComicImage } from '../hooks/useComicImage';

interface ComicSceneProps {
  scene: StoryScene;
  onTriggerHotspot: (hotspot: Hotspot) => void;
  discoveredHotspots: string[];
}

export const ComicScene: React.FC<ComicSceneProps> = ({
  scene,
  onTriggerHotspot,
  discoveredHotspots
}) => {
  // Component direm-ount per scene (via key={scene.id} di StoryViewer),
  // sehingga tidak perlu reset state di dalam effect.
  const resolvedImage = useComicImage(scene.image);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const showImage = !!resolvedImage && !isBroken;

  if (scene.interactiveDialogues?.length) {
    return <InteractiveComicArtwork scene={scene} image={resolvedImage} />;
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-2 sm:p-4 animate-page-flip">
      {/* Kontainer Gambar Komik dengan Aspect Ratio Terjaga */}
      <div className="relative max-w-5xl w-full h-full max-h-[75vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
        {showImage ? (
          <img
            src={resolvedImage}
            alt={`Komik Adegan ${scene.sceneNumber}: ${scene.title}`}
            onError={() => setIsBroken(true)}
            onLoad={() => setIsImageLoaded(true)}
            decoding="async"
            className={`w-full h-full object-contain select-none pointer-events-none transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-60'
            }`}
          />
        ) : (
          // Placeholder pengembangan sederhana (bukan ilustrasi final)
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center p-6 bg-slate-900">
            <span className="text-5xl sm:text-6xl opacity-90">📖</span>
            <p className="text-emerald-300 font-black text-base sm:text-xl">
              Adegan #{scene.sceneNumber}
            </p>
            <p className="text-slate-400 font-bold text-xs sm:text-sm max-w-xs">
              Gambar komik sedang disiapkan. Placeholder akan otomatis diganti saat file{' '}
              <code className="text-emerald-300">scene-{String(scene.sceneNumber).padStart(2, '0')}.webp</code>{' '}
              dimasukkan.
            </p>
          </div>
        )}

        {/* Lapisan Titik Interaksi Hotspot (Bintang/Sentuhan Karakter) */}
        <HotspotInteraction
          hotspots={scene.hotspots}
          onTriggerHotspot={onTriggerHotspot}
          discoveredIds={discoveredHotspots}
        />

        {/* Badge Nomor Adegan di Sudut Gambar */}
        <div className="absolute top-3 left-3 bg-slate-950/80 text-white/70 px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-md border border-white/10 flex items-center gap-1">
          <span>Halaman</span> {scene.sceneNumber}
        </div>
      </div>
    </div>
  );
};

interface InteractiveComicArtworkProps {
  scene: StoryScene;
  image: string;
}

const InteractiveComicArtwork: React.FC<InteractiveComicArtworkProps> = ({ scene, image }) => {
  const [activeDialogueId, setActiveDialogueId] = useState<string | null>(null);
  const dialogues = scene.interactiveDialogues as InteractiveDialogue[];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-2 sm:p-4 animate-page-flip">
      <div className="relative max-w-5xl w-full h-full max-h-[75vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white">
        <img
          src={image}
          alt={`Komik Adegan ${scene.sceneNumber}: ${scene.title}`}
          className="w-full h-full object-contain select-none"
          draggable={false}
        />

        {dialogues.map((dialogue) => {
          const isActive = activeDialogueId === dialogue.id;
          return (
            <button
              key={dialogue.id}
              type="button"
              onClick={() => setActiveDialogueId(isActive ? null : dialogue.id)}
              style={{
                left: `${dialogue.leftPercent}%`,
                top: `${dialogue.topPercent}%`,
                width: `${dialogue.widthPercent}%`,
                height: `${dialogue.heightPercent}%`
              }}
              className={`absolute z-20 group cursor-pointer border-2 border-transparent transition-colors hover:border-amber-300/80 focus:border-amber-300 focus:outline-none ${isActive ? 'z-30' : ''}`}
              aria-label={`${isActive ? 'Tutup' : 'Buka'} ${dialogue.label}`}
            >
              {isActive ? (
                <img
                  src={dialogue.image}
                  alt={dialogue.label}
                  className="absolute inset-0 h-full w-full object-contain mix-blend-multiply pointer-events-none animate-pop-in"
                  draggable={false}
                />
              ) : (
                <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-[10px] font-black text-white transition-transform group-hover:scale-110 sm:text-xs">
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-slate-950 shadow-[0_4px_0_rgba(120,53,15,0.8)] animate-pulse-glow sm:h-14 sm:w-14">
                    <span className="absolute inset-0 rounded-full border-2 border-amber-200 animate-ping opacity-60" />
                    <MessageCircle className="relative h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <span className="rounded-full bg-slate-950/80 px-2.5 py-1 shadow-md">
                    Buka dialog
                  </span>
                </span>
              )}
            </button>
          );
        })}

        {activeDialogueId && (
          <button
            type="button"
            onClick={() => setActiveDialogueId(null)}
            className="absolute right-3 top-3 z-40 rounded-full bg-slate-950/80 p-2 text-white shadow-md transition hover:bg-red-600"
            aria-label="Tutup dialog"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="absolute left-3 top-3 z-40 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-white/80 shadow-md">
          Halaman {scene.sceneNumber}
        </div>
      </div>
    </div>
  );
};
