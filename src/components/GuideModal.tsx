import React from 'react';
import { X, Sparkles, Volume2, HelpCircle, Trophy, Keyboard } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
  onStartAdventure?: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose, onStartAdventure }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 max-h-[90dvh] overflow-y-auto no-scrollbar">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          aria-label="Tutup Petunjuk"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Modal */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-3xl mx-auto mb-2 shadow-inner">
            💡
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            Cara Bermain & Membaca Komik
          </h2>
          <p className="text-xs sm:text-sm font-bold text-amber-800">
            Petunjuk asyik berpetualang di rimba cerita!
          </p>
        </div>

        {/* Daftar Panduan Anak SD */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm font-bold">
              1
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Sentuh Karakter & Objek (Hotspot)
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                Cari bintang berkedip pada Kelinci, Kura-kura, atau Monyet. Sentuh untuk mendengar reaksi rahasia mereka!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50 border-2 border-blue-200">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm font-bold">
              2
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-blue-900 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-blue-600" />
                Dengarkan Suara Cerita
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                Tekan tombol speaker untuk mendengarkan narator membacakan percakapan dan alur cerita.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-50 border-2 border-purple-200">
            <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-sm font-bold">
              3
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-purple-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                Jawab Tantangan Literasi
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                Jawab pertanyaan seru tentang tokoh, alur, kosakata, dan pesan moral untuk mengumpulkan poin bintang.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm font-bold">
              4
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-amber-900 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-600" />
                Raih Lencana & Rapor Literasi
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                Di akhir petualangan, kamu bisa melihat nilaimu dan mencetak sertifikat literasi sastra!
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-slate-500 shrink-0" />
            <span>
              Di Laptop: Tekan <span className="underline">Panah Kanan</span> (Lanjut),{' '}
              <span className="underline">Panah Kiri</span> (Sebelumnya),{' '}
              <span className="underline">Spasi</span> (Audio).
            </span>
          </div>
        </div>

        {/* Tombol Mulai */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={() => {
              onClose();
              if (onStartAdventure) onStartAdventure();
            }}
            className="w-full py-3.5 rounded-2xl btn-game-primary font-bold text-base shadow-lg"
          >
            Siap Berpetualang! 🚀
          </button>
          {onStartAdventure ? (
            <button
              onClick={onClose}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 px-4 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Nanti Dulu, Saya Mau Lihat Halaman Pembuka
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
