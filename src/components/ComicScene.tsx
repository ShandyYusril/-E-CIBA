import React, { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import type { StoryScene, InteractiveDialogue } from '../data/story';
import { useComicImage } from '../hooks/useComicImage';

interface ComicSceneProps {
  scene: StoryScene;
}

export const ComicScene: React.FC<ComicSceneProps> = ({
  scene,
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
  const [activeDialogueIds, setActiveDialogueIds] = useState<string[]>([]);
  const dialogues = scene.interactiveDialogues as InteractiveDialogue[];
  const activeDialogues = dialogues.filter((dialogue) => activeDialogueIds.includes(dialogue.id));

  useEffect(() => {
    dialogues.forEach((dialogue) => {
      if (dialogue.image) void getCroppedDialogueImage(dialogue.image);
    });
  }, [dialogues]);

  const openDialogue = (dialogueId: string) => {
    setActiveDialogueIds((currentIds) =>
      currentIds.includes(dialogueId) ? currentIds : [...currentIds, dialogueId]
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-2 sm:p-4 animate-page-flip">
      <div className="relative max-w-5xl w-full aspect-[2048/1434] max-h-[75vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white">
        <img
          src={image}
          alt={`Komik Adegan ${scene.sceneNumber}: ${scene.title}`}
          className="absolute inset-0 w-full h-full object-contain select-none"
          draggable={false}
        />

        {dialogues.map((dialogue) => {
          const isActive = activeDialogueIds.includes(dialogue.id);
          return (
            <button
              key={dialogue.id}
              type="button"
              onClick={() => openDialogue(dialogue.id)}
              style={{
                left: `${dialogue.leftPercent}%`,
                top: `${dialogue.topPercent}%`,
                width: `${dialogue.widthPercent}%`,
                height: `${dialogue.heightPercent}%`
              }}
              className={`absolute z-20 group cursor-pointer border-2 border-transparent transition-colors hover:border-amber-300/80 focus:border-amber-300 focus:outline-none ${isActive ? 'z-30' : ''}`}
              aria-label={`${isActive ? 'Tutup' : 'Buka'} ${dialogue.label}`}
            >
              <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-[10px] font-black text-white transition-transform group-hover:scale-110 sm:text-xs">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-slate-950 shadow-[0_4px_0_rgba(120,53,15,0.8)] sm:h-14 sm:w-14">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span className="rounded-full bg-slate-950/80 px-2.5 py-1 shadow-md">
                  Klik pesan
                </span>
              </span>
            </button>
          );
        })}

        {activeDialogues.map((dialogue, index) =>
          dialogue.image ? (
            <div
              key={dialogue.id}
              className="pointer-events-none absolute overflow-hidden animate-pop-in"
              style={{
                left: `${dialogue.leftPercent}%`,
                top: `${dialogue.topPercent}%`,
                width: `${dialogue.widthPercent}%`,
                height: `${dialogue.heightPercent}%`,
                zIndex: 30 + index
              }}
            >
              <CroppedDialogueImage image={dialogue.image} label={dialogue.label} />
            </div>
          ) : null
        )}

        {activeDialogues.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveDialogueIds([])}
            className="absolute right-3 top-3 z-40 rounded-full bg-slate-950/80 p-2 text-white shadow-md transition hover:bg-red-600"
            aria-label="Tutup dialog"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="absolute left-3 top-3 z-40 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-white/80 shadow-md">
          Halaman {scene.sceneNumber}
        </div>
        <div className="absolute bottom-3 left-1/2 z-40 -translate-x-1/2 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-bold text-white/90 shadow-md sm:text-xs">
          Klik lingkaran pesan untuk membaca dialog
        </div>
      </div>
    </div>
  );
};

interface CroppedDialogueImageProps {
  image: string;
  label: string;
}

const CroppedDialogueImage: React.FC<CroppedDialogueImageProps> = ({ image, label }) => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  useEffect(() => {
    getCroppedDialogueImage(image).then(setCroppedImage);
  }, [image]);

  if (!croppedImage) return null;

  return (
    <img
      src={croppedImage}
      alt={label}
      className="absolute inset-0 h-full w-full object-contain"
      draggable={false}
    />
  );
};

const croppedDialogueCache = new Map<string, Promise<string>>();

const getCroppedDialogueImage = (image: string): Promise<string> => {
  const cachedImage = croppedDialogueCache.get(image);
  if (cachedImage) return cachedImage;

  const croppedImage = new Promise<string>((resolve) => {
    const source = new Image();
    source.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = source.naturalWidth;
      canvas.height = source.naturalHeight;
      const context = canvas.getContext('2d');

      if (!context) {
        resolve(image);
        return;
      }

      context.drawImage(source, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let minX = canvas.width;
      let minY = canvas.height;
      let maxX = -1;
      let maxY = -1;

      for (let y = 0; y < canvas.height; y += 1) {
        for (let x = 0; x < canvas.width; x += 1) {
          if (pixels[(y * canvas.width + x) * 4 + 3] > 10) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      if (maxX < 0 || maxY < 0) {
        resolve(image);
        return;
      }

      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = maxX - minX + 1;
      croppedCanvas.height = maxY - minY + 1;
      croppedCanvas
        .getContext('2d')
        ?.drawImage(
          canvas,
          minX,
          minY,
          croppedCanvas.width,
          croppedCanvas.height,
          0,
          0,
          croppedCanvas.width,
          croppedCanvas.height
        );
      resolve(croppedCanvas.toDataURL('image/png'));
    };
    source.src = image;
  });

  croppedDialogueCache.set(image, croppedImage);
  return croppedImage;
};
