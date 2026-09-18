import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
  className?: string;
}

export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  isFullscreen,
  onToggle,
  className = ''
}) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2.5 sm:p-3 rounded-2xl bg-white/90 hover:bg-white text-emerald-800 shadow-md border-2 border-emerald-200 transition-transform active:scale-95 flex items-center justify-center ${className}`}
      title={isFullscreen ? 'Keluar dari Layar Penuh' : 'Mode Layar Penuh (Membaca Lebih Luas)'}
      aria-label="Mode Layar Penuh"
    >
      {isFullscreen ? (
        <Minimize2 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
      ) : (
        <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700" />
      )}
    </button>
  );
};
