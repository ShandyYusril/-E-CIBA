import React, { useEffect, useState } from 'react';
import { Check, ChevronRight, X } from 'lucide-react';
import type { LiteracyCheckpoint, LiteracyOption } from '../data/story';

interface FinalQuizProps {
  checkpoints: LiteracyCheckpoint[];
  onSubmitAnswer: (
    checkpointId: string,
    optionId: 'A' | 'B' | 'C' | 'D',
    isCorrect: boolean,
    indicator: any,
    points: number
  ) => void;
  onFinish: () => void;
}

export const FinalQuiz: React.FC<FinalQuizProps> = ({ checkpoints, onSubmitAnswer, onFinish }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<LiteracyOption | null>(null);

  useEffect(() => {
    if (checkpoints.length === 0) onFinish();
  }, [checkpoints.length, onFinish]);

  if (checkpoints.length === 0) {
    return null;
  }

  const checkpoint = checkpoints[questionIndex];
  const isLast = questionIndex === checkpoints.length - 1;

  const handleSelect = (option: LiteracyOption) => {
    if (selected) return;
    setSelected(option);
    onSubmitAnswer(checkpoint.id, option.id, option.isCorrect, checkpoint.indicator, checkpoint.points);
  };

  const handleNext = () => {
    if (!selected) return;
    if (isLast) {
      onFinish();
      return;
    }
    setQuestionIndex((index) => index + 1);
    setSelected(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-pop-in">
      <div className="w-full max-w-xl max-h-[92dvh] overflow-y-auto no-scrollbar rounded-2xl bg-[#f7f5ef] p-5 shadow-2xl sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">Kuis Akhir</p>
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">Seberapa baik kamu membaca?</h2>
          </div>
          <div className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">{questionIndex + 1} / {checkpoints.length}</div>
        </div>

        <div className="mb-5">
          <p className="text-base font-bold leading-relaxed text-slate-800 sm:text-lg">{checkpoint.question}</p>
          <p className="mt-2 text-xs text-slate-400">Pilih jawaban yang paling sesuai dengan cerita.</p>
        </div>

        <div className="space-y-2.5">
          {checkpoint.options.map((option) => {
            const isSelected = selected?.id === option.id;
            const isCorrect = selected && isSelected && option.isCorrect;
            const isWrong = selected && isSelected && !option.isCorrect;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${isCorrect ? 'border-emerald-500 bg-emerald-50' : isWrong ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/50'}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-black text-white">{option.id}</span>
                <span className="flex-1 text-sm font-semibold leading-snug text-slate-700">{option.text}</span>
                {isCorrect && <Check className="h-5 w-5 text-emerald-600" />}
                {isWrong && <X className="h-5 w-5 text-rose-500" />}
              </button>
            );
          })}
        </div>

        {selected && <div className={`mt-4 rounded-xl p-3 text-sm font-semibold ${selected.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{selected.isCorrect ? selected.feedback : `Petunjuk: ${selected.hint}`}</div>}

        <div className="mt-6 flex justify-end">
          <button onClick={handleNext} disabled={!selected} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40">
            <span>{isLast ? 'Lihat Hasil' : 'Pertanyaan Berikutnya'}</span>
            {isLast ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
