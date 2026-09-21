import React from 'react';

interface ProgressIndicatorProps {
  currentScene: number;
  totalScenes: number;
  answeredCheckpoints: Record<string, boolean>;
  scenes: Array<{ id: number; checkpoint?: { id: string } }>;
  onSelectScene?: (sceneId: number) => void;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentScene,
  totalScenes,
  answeredCheckpoints,
  scenes,
  onSelectScene,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Teks Petualangan */}
      <div className="bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 shadow-sm flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wider text-white/40">Halaman</span>
        <span className="text-xs sm:text-sm font-bold text-white/80 whitespace-nowrap">
          <span className="text-emerald-400 font-extrabold">{currentScene}</span> / {totalScenes}
        </span>
      </div>

      {/* Titik-Titik Progres Komik */}
      <div className="hidden md:flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-emerald-200 shadow-sm">
        {scenes.map((sc, idx) => {
          const sceneNum = idx + 1;
          const isCurrent = sceneNum === currentScene;
          const isPast = sceneNum < currentScene;
          const hasAnsweredCheckpoint = sc.checkpoint
            ? !!answeredCheckpoints[sc.checkpoint.id]
            : false;

          return (
            <button
              key={sc.id}
              onClick={() => onSelectScene && onSelectScene(sc.id)}
              disabled={!onSelectScene}
              className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                isCurrent
                   ? 'w-7 h-7 bg-emerald-500 text-white font-bold text-xs ring-4 ring-emerald-500/20 scale-110 shadow'
                  : isPast
                  ? 'w-5 h-5 bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'w-4 h-4 bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Buka Adegan ${sceneNum}`}
              aria-label={`Adegan ${sceneNum}`}
            >
              {isCurrent ? (
                sceneNum
              ) : isPast && hasAnsweredCheckpoint ? (
                <span className="text-[10px]">⭐</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
