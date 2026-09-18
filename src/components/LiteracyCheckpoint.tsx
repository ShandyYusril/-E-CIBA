import React, { useState } from 'react';
import { HelpCircle, Lightbulb, CheckCircle2, Award } from 'lucide-react';
import type { LiteracyCheckpoint as CheckpointType, LiteracyOption } from '../data/story';
import { LITERACY_INDICATORS } from '../data/indicators';

interface LiteracyCheckpointProps {
  checkpoint: CheckpointType;
  onSelectOption: (option: LiteracyOption) => void;
  previousAnswer?: { selectedOptionId: string; isCorrect: boolean };
  onClose: () => void;
}

export const LiteracyCheckpoint: React.FC<LiteracyCheckpointProps> = ({
  checkpoint,
  onSelectOption,
  previousAnswer,
  onClose
}) => {
  const [showHint, setShowHint] = useState(false);
  const indicatorInfo = LITERACY_INDICATORS[checkpoint.indicator];

  const optionColors = [
    'hover:border-blue-500 hover:bg-blue-50/80 active:bg-blue-100',
    'hover:border-emerald-500 hover:bg-emerald-50/80 active:bg-emerald-100',
    'hover:border-amber-500 hover:bg-amber-50/80 active:bg-amber-100',
    'hover:border-purple-500 hover:bg-purple-50/80 active:bg-purple-100'
  ];

  const badgeLetters = [
    'bg-blue-500 text-white',
    'bg-emerald-500 text-white',
    'bg-amber-500 text-white',
    'bg-purple-500 text-white'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-pop-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-amber-400 max-h-[95dvh] overflow-y-auto no-scrollbar">
        {/* Header Kartu Pertanyaan */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b-2 border-amber-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{indicatorInfo?.icon || '🎯'}</span>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                {indicatorInfo?.name || 'Literasi Sastra'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-extrabold text-xs sm:text-sm px-3 py-1 rounded-full border border-emerald-300">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>+{checkpoint.points} Poin ⭐</span>
          </div>
        </div>

        {/* Pertanyaan Literasi */}
        <div className="my-3">
          <div className="flex items-start gap-2 mb-2">
            <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <h3 className="text-base sm:text-xl font-extrabold text-slate-800 leading-snug">
              {checkpoint.question}
            </h3>
          </div>
        </div>

        {/* Tombol Bantuan / Petunjuk Ramah */}
        <div className="mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{showHint ? 'Sembunyikan Petunjuk' : 'Butuh Bantuan? Lihat Petunjuk 💡'}</span>
          </button>

          {showHint && (
            <div className="mt-2 p-3 bg-amber-100/90 rounded-2xl border-2 border-amber-300 text-xs sm:text-sm font-bold text-amber-900 animate-fadeIn">
              💡 <span className="underline">Petunjuk Belajar:</span>{' '}
              {checkpoint.options.find((o) => o.isCorrect)?.hint ||
                'Ingat kembali ucapan dan tindakan tokoh dalam komik.'}
            </div>
          )}
        </div>

        {/* Daftar Pilihan Jawaban (A, B, C, D) */}
        <div className="space-y-2.5 sm:space-y-3">
          {checkpoint.options.map((opt, idx) => {
            const isSelected = previousAnswer?.selectedOptionId === opt.id;
            const isPreviouslyCorrect = isSelected && previousAnswer?.isCorrect;

            return (
              <button
                key={opt.id}
                onClick={() => onSelectOption(opt)}
                className={`w-full text-left p-3 sm:p-4 rounded-2xl border-2 transition-all flex items-center gap-3 sm:gap-4 shadow-sm active:scale-[0.99] ${
                  isSelected
                    ? isPreviouslyCorrect
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300'
                      : 'border-amber-500 bg-amber-50 ring-2 ring-amber-300'
                    : `border-slate-200 bg-slate-50/70 ${optionColors[idx % optionColors.length]}`
                }`}
              >
                {/* Huruf Pilihan A, B, C, D */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-extrabold text-sm sm:text-base shrink-0 shadow-inner ${
                    badgeLetters[idx % badgeLetters.length]
                  }`}
                >
                  {opt.id}
                </div>

                {/* Teks Pilihan */}
                <span className="flex-1 text-xs sm:text-base font-bold text-slate-800 leading-snug">
                  {opt.text}
                </span>

                {/* Indikator Jika Sebelumnya Sudah Dijawab */}
                {isSelected && (
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 ${
                      isPreviouslyCorrect ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tombol Tutup Sementara jika ingin membaca komik lagi */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Nanti Dulu, Mau Baca Komik Lagi 📖
          </button>
        </div>
      </div>
    </div>
  );
};
