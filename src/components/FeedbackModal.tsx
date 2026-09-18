import React from 'react';
import { Sparkles, Star, Lightbulb, ArrowRight, RotateCcw } from 'lucide-react';
import type { LiteracyOption } from '../data/story';

interface FeedbackModalProps {
  option: LiteracyOption;
  pointsEarned: number;
  onContinue: () => void;
  onTryAgain?: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  option,
  pointsEarned,
  onContinue,
  onTryAgain
}) => {
  const isCorrect = option.isCorrect;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-pop-in">
      <div
        className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl text-center border-4 ${
          isCorrect
            ? 'bg-white border-emerald-400'
            : 'bg-white border-amber-400'
        }`}
      >
        {/* Ikon Selebrasi / Penyemangat */}
        <div className="flex justify-center mb-4">
          {isCorrect ? (
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-300 flex items-center justify-center text-4xl shadow-inner animate-bounce">
                🎉
              </div>
              <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 p-1.5 rounded-full border-2 border-white shadow animate-spin">
                <Star className="w-5 h-5 fill-amber-950 text-amber-950" />
              </div>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-4xl shadow-inner animate-pulse">
              💡
            </div>
          )}
        </div>

        {/* Judul Feedback */}
        <h3
          className={`text-xl sm:text-2xl font-black mb-2 ${
            isCorrect ? 'text-emerald-700' : 'text-amber-800'
          }`}
        >
          {isCorrect ? 'Luar Biasa, Kamu Hebat!' : 'Sedikit Lagi, Coba Ingat Lagi!'}
        </h3>

        {/* Poin Bonus jika Benar */}
        {isCorrect && (
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-4 py-1 rounded-full text-sm sm:text-base font-extrabold border-2 border-amber-300 mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>+{pointsEarned} Bintang Poin!</span>
          </div>
        )}

        {/* Isi Feedback / Penjelasan Ramah */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 my-3 text-slate-700 font-bold text-sm sm:text-base leading-relaxed">
          {option.feedback}
        </div>

        {/* Hint tambahan jika belum tepat */}
        {!isCorrect && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm font-semibold text-amber-900 mb-4 text-left flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold">Petunjuk:</span> {option.hint}
            </div>
          </div>
        )}

        {/* Tombol Aksi */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {!isCorrect && onTryAgain && (
            <button
              onClick={onTryAgain}
              className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm sm:text-base shadow-md border-b-4 border-amber-700 flex items-center gap-2 active:border-b-0 active:translate-y-1 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Coba Jawab Lagi</span>
            </button>
          )}

          <button
            onClick={onContinue}
            className="px-6 py-3 rounded-2xl btn-game-primary font-bold text-sm sm:text-base shadow-md flex items-center gap-2"
          >
            <span>{isCorrect ? 'Lanjut Petualangan' : 'Lanjutkan Cerita'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
