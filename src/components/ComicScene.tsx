import React, { useState } from 'react';
import type { StoryScene, Hotspot } from '../data/story';
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
  const fallbackSvg = scene.image.replace(/\.webp$/i, '.svg').replace(/\.(png|jpe?g)$/i, '.svg');
  const resolvedImage = useComicImage(scene.image, fallbackSvg);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const showImage = !!resolvedImage && !isBroken;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-2 sm:p-4 animate-pop-in">
      {/* Kontainer Gambar Komik dengan Aspect Ratio Terjaga */}
      <div className="relative max-w-5xl w-full h-full max-h-[75vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300/80 bg-slate-900">
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
            <p className="text-amber-200 font-black text-base sm:text-xl">
              Adegan #{scene.sceneNumber}
            </p>
            <p className="text-slate-400 font-bold text-xs sm:text-sm max-w-xs">
              Gambar komik sedang disiapkan. Placeholder akan otomatis diganti saat file{' '}
              <code className="text-amber-300">scene-{String(scene.sceneNumber).padStart(2, '0')}.webp</code>{' '}
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
        <div className="absolute top-3 left-3 bg-amber-400 text-amber-950 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold shadow-md border-2 border-white flex items-center gap-1">
          <span>📖</span> Adegan #{scene.sceneNumber}
        </div>
      </div>
    </div>
  );
};