import React, { useState } from 'react';
import { Sparkles, MessageCircle, X } from 'lucide-react';
import type { Hotspot } from '../data/story';

interface HotspotInteractionProps {
  hotspots?: Hotspot[];
  onTriggerHotspot: (hotspot: Hotspot) => void;
  discoveredIds: string[];
}

export const HotspotInteraction: React.FC<HotspotInteractionProps> = ({
  hotspots,
  onTriggerHotspot,
  discoveredIds
}) => {
  const [activeBubble, setActiveBubble] = useState<Hotspot | null>(null);

  if (!hotspots || hotspots.length === 0) return null;

  const handleClick = (spot: Hotspot) => {
    setActiveBubble(spot);
    onTriggerHotspot(spot);
  };

  return (
    <>
      {hotspots.map((spot) => {
        const isDiscovered = discoveredIds.includes(spot.id);

        return (
          <div
            key={spot.id}
            style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              onClick={() => handleClick(spot)}
              className={`group relative flex items-center justify-center p-2 sm:p-2.5 rounded-full transition-transform active:scale-90 ${
                isDiscovered
                  ? 'bg-amber-400/90 text-amber-950 ring-2 ring-white shadow-md hover:scale-110'
                  : 'bg-emerald-500 text-white ring-4 ring-emerald-200/80 shadow-lg animate-bounce hover:scale-125'
              }`}
              title={`Sentuh ${spot.title}!`}
              aria-label={`Sentuh ${spot.title}`}
            >
              {isDiscovered ? (
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200 animate-spin" />
              )}

              {/* Tag Nama Karakter / Objek */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/85 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
                Sentuh {spot.name}
              </span>
            </button>
          </div>
        );
      })}

      {/* Pop-up Balon Ucapan Interaktif Karakter */}
      {activeBubble && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-pop-in">
          <div className="relative max-w-sm w-full bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-300 text-center">
            <button
              onClick={() => setActiveBubble(null)}
              className="absolute -top-3 -right-3 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition-transform active:scale-95"
              aria-label="Tutup Balon Ucapan"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 border border-amber-300">
              💬 {activeBubble.title} Berkata:
            </div>

            <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed my-2">
              "{activeBubble.reaction}"
            </p>

            <button
              onClick={() => setActiveBubble(null)}
              className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold rounded-2xl shadow-md border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all"
            >
              Aku Paham! 👍
            </button>
          </div>
        </div>
      )}
    </>
  );
};
