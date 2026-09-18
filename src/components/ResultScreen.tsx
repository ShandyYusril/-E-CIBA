import React, { useEffect } from 'react';
import {
  Star,
  Award,
  RotateCcw,
  Printer,
  BookOpen
} from 'lucide-react';
import { LITERACY_INDICATORS } from '../data/indicators';
import type { LiteracyIndicatorType } from '../data/indicators';
import type { Badge } from '../data/badges';
import { fireEndingGrandCelebration } from '../utils/confetti';
import { soundEffects } from '../utils/soundEffects';

interface ResultScreenProps {
  totalScore: number;
  maxScore: number;
  indicatorStats: Record<
    LiteracyIndicatorType,
    { earned: number; total: number; percentage: number; questionCount: number }
  >;
  unlockedBadges: Badge[];
  allBadges: Badge[];
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  totalScore,
  maxScore,
  indicatorStats,
  unlockedBadges,
  allBadges,
  onRestart
}) => {
  useEffect(() => {
    // Selebrasi kemenangan saat masuk ke result screen
    fireEndingGrandCelebration();
    soundEffects.fanfare();
  }, []);

  const overallPercentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const getStarRating = () => {
    if (overallPercentage >= 80) return 3;
    if (overallPercentage >= 50) return 2;
    return 1;
  };

  const starsCount = getStarRating();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-full w-full bg-gradient-to-b from-amber-100 via-emerald-50 to-green-100 p-4 sm:p-8 overflow-y-auto">
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
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${
                    s <= starsCount
                      ? 'fill-amber-400 text-amber-500 drop-shadow'
                      : 'text-slate-300'
                  }`}
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

          {/* Kartu Skor Besar */}
          <div className="inline-flex items-center gap-4 bg-amber-50 border-3 border-amber-300 px-6 py-3 rounded-2xl shadow-inner mb-2">
            <div>
              <span className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wider block">
                Total Skor Literasi
              </span>
              <span className="text-3xl sm:text-5xl font-black text-amber-600">
                {totalScore}{' '}
                <span className="text-lg sm:text-2xl font-bold text-slate-500">/ {maxScore}</span>
              </span>
            </div>
            <div className="h-10 w-[2px] bg-amber-200"></div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-emerald-800 uppercase tracking-wider block">
                Pencapaian
              </span>
              <span className="text-3xl sm:text-5xl font-black text-emerald-600">
                {overallPercentage}%
              </span>
            </div>
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
        </div>
      </div>
    </div>
  );
};
