import React, { useEffect } from 'react';
import {
  Star,
  Award,
  RotateCcw,
  Printer,
  BookOpen,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { LITERACY_INDICATORS } from '../data/indicators';
import type { LiteracyIndicatorType } from '../data/indicators';
import type { Badge } from '../data/badges';
import { fireEndingGrandCelebration } from '../utils/confetti';
import { soundEffects } from '../utils/soundEffects';

interface ResultScreenProps {
  quizUrl: string;
  indicatorStats: Record<
    LiteracyIndicatorType,
    { earned: number; total: number; percentage: number; questionCount: number }
  >;
  unlockedBadges: Badge[];
  allBadges: Badge[];
  onRestart: () => void;
  onBack: () => void;
  onBackToStory: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  indicatorStats,
  unlockedBadges,
  allBadges,
  onRestart,
  onBack,
  onBackToStory,
  quizUrl
}) => {
  const [showQuizConfirm, setShowQuizConfirm] = React.useState(false);
  useEffect(() => {
    // Selebrasi kemenangan saat masuk ke result screen
    fireEndingGrandCelebration();
    soundEffects.fanfare();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-amber-100 via-emerald-50 to-green-100 p-4 sm:p-8 overflow-y-auto">
      <button
        onClick={onBackToStory}
        className="mb-4 flex items-center gap-2 rounded-xl border-2 border-emerald-300 bg-white px-4 py-2.5 text-sm font-black text-emerald-800 shadow-md transition hover:bg-emerald-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali Membaca Komik
      </button>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner Utama Selebrasi */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-400"></div>

          {/* Trofi & Bintang */}
          <div className="relative inline-block mb-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-yellow-300 to-amber-400 border-4 border-white shadow-xl flex items-center justify-center text-5xl mx-auto">
              🏆
            </div>
            <div className="flex justify-center gap-1 mt-2">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className="w-7 h-7 fill-amber-400 text-amber-500 drop-shadow sm:w-8 sm:h-8"
                />
              ))}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 mb-1">
            Petualangan Selesai! 🎉
          </h1>
          <p className="text-sm sm:text-lg text-emerald-800 font-bold mb-4">
            Selamat! Kamu telah membaca komik dan menuntaskan petualangan literasi sastra dengan luar biasa!
          </p>

          <div className="mx-auto mb-2 max-w-xl rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-5 py-4">
            <p className="text-sm font-bold text-emerald-900 sm:text-base">
              Komik selesai. Sekarang waktunya menguji pemahamanmu lewat kuis game.
            </p>
            <button
              onClick={() => setShowQuizConfirm(true)}
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-[0_4px_0_#166534] transition hover:bg-emerald-500 active:translate-y-1 active:shadow-none"
            >
              <ExternalLink className="h-4 w-4" />
              Lanjut ke Kuis Game
            </button>
          </div>

          {/* Kalimat Motivasi */}
          <p className="text-xs sm:text-base font-bold text-slate-600 italic mt-3">
            "Ketekunan dan kerendahan hati seperti Kura-kura akan membawamu meraih impian terindah."
          </p>
        </div>

        {/* Evaluasi 6 Indikator Literasi Sastra (Kebutuhan Guru & Siswa) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-emerald-200">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <h2 className="text-lg sm:text-2xl font-black text-slate-800">
              Rapor 6 Indikator Literasi Sastra Siswa
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mb-6">
            Hasil analisis pemahaman unsur intrinsik cerita fabel untuk evaluasi guru dan perkembangan siswa:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(LITERACY_INDICATORS) as LiteracyIndicatorType[]).map((key) => {
              const indicator = LITERACY_INDICATORS[key];
              const stat = indicatorStats[key] || { earned: 0, total: 0, percentage: 0 };
              const isGood = stat.percentage >= 70;

              return (
                <div
                  key={key}
                  className="p-4 rounded-2xl border-2 transition-all hover:shadow-md"
                  style={{
                    backgroundColor: indicator.bgLight,
                    borderColor: indicator.borderColor
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{indicator.icon}</span>
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-800">
                          {indicator.name}
                        </h3>
                        <span className="text-[11px] font-bold text-slate-500 block">
                          {indicator.description}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-lg sm:text-xl font-black px-2.5 py-0.5 rounded-xl text-white shadow-xs"
                      style={{ backgroundColor: indicator.color }}
                    >
                      {stat.percentage}%
                    </span>
                  </div>

                  {/* Progress Bar Indikator */}
                  <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden shadow-inner my-2">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${stat.percentage}%`,
                        backgroundColor: indicator.color
                      }}
                    ></div>
                  </div>

                  {/* Catatan Evaluasi Guru / Rekomendasi Belajar */}
                  <div className="mt-2 text-xs font-bold text-slate-700 flex items-start gap-1.5 bg-white/70 p-2 rounded-xl border border-black/5">
                    <span className="text-sm">{isGood ? '✅' : '💡'}</span>
                    <span>
                      {isGood ? indicator.recommendationGood : indicator.recommendationImprove}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lencana Prestasi (Badges Collection) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-amber-600" />
            <h2 className="text-lg sm:text-2xl font-black text-slate-800">
              Koleksi Lencana Petualangan ({unlockedBadges.length} / {allBadges.length})
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {allBadges.map((badge) => {
              const isUnlocked = unlockedBadges.some((b) => b.id === badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border-2 text-center transition-all ${
                    isUnlocked
                      ? 'bg-amber-50 border-amber-300 shadow-sm scale-100'
                      : 'bg-slate-100 border-slate-200 opacity-45 grayscale'
                  }`}
                >
                  <div className="text-3xl sm:text-4xl mb-1">{badge.icon}</div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 mb-1 leading-tight">
                    {badge.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-semibold block leading-snug">
                    {isUnlocked ? 'Tercapai! ⭐' : badge.conditionDescription}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tombol Aksi Bawah: Cetak Rapor & Ulangi Petualangan */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 pb-8">
          <button
            onClick={handlePrint}
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg flex items-center gap-2 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all"
          >
            <Printer className="w-5 h-5" />
            <span>Cetak Hasil Literasi (Guru / Siswa)</span>
          </button>

          <button
            onClick={onRestart}
            className="px-6 py-3.5 rounded-2xl btn-game-primary font-bold text-sm sm:text-base shadow-lg flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Mulai Ulang Cerita 📖</span>
          </button>

          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-2xl border-2 border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-lg transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Kembali ke Menu</span>
          </button>
        </div>
      </div>

      {showQuizConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl">
            <h2 className="text-xl font-black text-slate-900">Lanjut ke kuis game?</h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">
              Kamu akan membuka kuis di halaman baru. Apakah kamu yakin ingin melanjutkan?
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setShowQuizConfirm(false)}
                className="rounded-xl bg-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-300"
              >
                Nanti
              </button>
              <button
                onClick={() => window.open(quizUrl, '_blank', 'noopener,noreferrer')}
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-500"
              >
                Ya, Buka Kuis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
