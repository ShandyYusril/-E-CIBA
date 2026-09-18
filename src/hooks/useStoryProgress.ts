import { useState, useEffect, useCallback } from 'react';
import { STORY_SCENES } from '../data/story';
import type { StoryScene } from '../data/story';
import type { LiteracyIndicatorType } from '../data/indicators';
import { ADVENTURE_BADGES } from '../data/badges';
import type { Badge } from '../data/badges';
import { preloadImage } from '../utils/preloadImage';

const STORAGE_KEY = 'e_comic_sd_petualangan_v1';

export interface AnswerRecord {
  checkpointId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  indicator: LiteracyIndicatorType;
  pointsEarned: number;
}

export interface StoredProgress {
  currentSceneId: number;
  answers: Record<string, AnswerRecord>;
  unlockedBadgeIds: string[];
  discoveredHotspotIds: string[];
  totalScore: number;
  completed: boolean;
}

const defaultProgress: StoredProgress = {
  currentSceneId: 1,
  answers: {},
  unlockedBadgeIds: [],
  discoveredHotspotIds: [],
  totalScore: 0,
  completed: false
};

export function useStoryProgress() {
  const [progress, setProgress] = useState<StoredProgress>(() => {
    if (typeof window === 'undefined') return defaultProgress;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Gagal membaca progress dari localStorage:', e);
    }
    return defaultProgress;
  });

  // Sinkronisasi ke localStorage setiap kali progress berubah
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Gagal menyimpan progress ke localStorage:', e);
    }
  }, [progress]);

  // Dapatkan scene saat ini
  const currentSceneIndex = STORY_SCENES.findIndex((s) => s.id === progress.currentSceneId);
  const currentScene: StoryScene =
    currentSceneIndex !== -1 ? STORY_SCENES[currentSceneIndex] : STORY_SCENES[0];

  // Preload hanya scene berikutnya untuk mengoptimalkan performa:
  // - gambar utama (webp) + fallback (svg) agar perpindahan scene terasa instant.
  useEffect(() => {
    const nextScene = STORY_SCENES[currentSceneIndex + 1];
    if (nextScene && nextScene.image) {
      preloadImage(nextScene.image);
      preloadImage(nextScene.image.replace(/\.webp$/i, '.svg'));
    }
  }, [currentSceneIndex]);

  // Menjawab checkpoint literasi
  const submitAnswer = useCallback(
    (
      checkpointId: string,
      optionId: 'A' | 'B' | 'C' | 'D',
      isCorrect: boolean,
      indicator: LiteracyIndicatorType,
      points: number
    ) => {
      setProgress((prev) => {
        const pointsToAdd = isCorrect ? points : 0;
        const newAnswers = {
          ...prev.answers,
          [checkpointId]: {
            checkpointId,
            selectedOptionId: optionId,
            isCorrect,
            indicator,
            pointsEarned: pointsToAdd
          }
        };

        // Hitung total score baru
        const newTotalScore = Object.values(newAnswers).reduce(
          (sum, ans) => sum + ans.pointsEarned,
          0
        );

        // Cek lencana baru yang terbuka
        const newBadgeIds = [...prev.unlockedBadgeIds];
        if (isCorrect) {
          if (indicator === 'tokoh' && !newBadgeIds.includes('pembaca_teliti')) {
            newBadgeIds.push('pembaca_teliti');
          }
          if (indicator === 'alur' && !newBadgeIds.includes('penelusur_alur')) {
            newBadgeIds.push('penelusur_alur');
          }
          if (indicator === 'konflik' && !newBadgeIds.includes('detektif_konflik')) {
            newBadgeIds.push('detektif_konflik');
          }
          if (indicator === 'kosakata' && !newBadgeIds.includes('kolektor_kata')) {
            newBadgeIds.push('kolektor_kata');
          }
          if (indicator === 'pesanMoral' && !newBadgeIds.includes('pencari_pesan_moral')) {
            newBadgeIds.push('pencari_pesan_moral');
          }
        }

        return {
          ...prev,
          answers: newAnswers,
          totalScore: newTotalScore,
          unlockedBadgeIds: newBadgeIds
        };
      });
    },
    []
  );

  // Menandai hotspot yang sudah ditekan
  const discoverHotspot = useCallback((hotspotId: string) => {
    setProgress((prev) => {
      if (prev.discoveredHotspotIds.includes(hotspotId)) return prev;
      return {
        ...prev,
        discoveredHotspotIds: [...prev.discoveredHotspotIds, hotspotId]
      };
    });
  }, []);

  // Pindah ke scene berikutnya
  const nextScene = useCallback(() => {
    if (currentSceneIndex < STORY_SCENES.length - 1) {
      const nextId = STORY_SCENES[currentSceneIndex + 1].id;
      setProgress((prev) => ({
        ...prev,
        currentSceneId: nextId
      }));
    } else {
      // Petualangan tamat
      setProgress((prev) => {
        const badges = [...prev.unlockedBadgeIds];
        if (!badges.includes('penjelajah_rimba')) {
          badges.push('penjelajah_rimba');
        }
        return {
          ...prev,
          completed: true,
          unlockedBadgeIds: badges
        };
      });
    }
  }, [currentSceneIndex]);

  // Kembali ke scene sebelumnya
  const prevScene = useCallback(() => {
    if (currentSceneIndex > 0) {
      const prevId = STORY_SCENES[currentSceneIndex - 1].id;
      setProgress((prev) => ({
        ...prev,
        currentSceneId: prevId
      }));
    }
  }, [currentSceneIndex]);

  // Lompat ke scene tertentu
  const goToScene = useCallback((sceneId: number) => {
    setProgress((prev) => ({
      ...prev,
      currentSceneId: sceneId
    }));
  }, []);

  // Mulai ulang petualangan
  const resetProgress = useCallback(() => {
    setProgress({
      currentSceneId: 1,
      answers: {},
      unlockedBadgeIds: [],
      discoveredHotspotIds: [],
      totalScore: 0,
      completed: false
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Hitung skor per indikator literasi sastra
  const indicatorStats: Record<
    LiteracyIndicatorType,
    { earned: number; total: number; percentage: number; questionCount: number }
  > = {
    tokoh: { earned: 0, total: 0, percentage: 0, questionCount: 0 },
    alur: { earned: 0, total: 0, percentage: 0, questionCount: 0 },
    konflik: { earned: 0, total: 0, percentage: 0, questionCount: 0 },
    pesanMoral: { earned: 0, total: 0, percentage: 0, questionCount: 0 },
    kosakata: { earned: 0, total: 0, percentage: 0, questionCount: 0 },
    kesimpulan: { earned: 0, total: 0, percentage: 0, questionCount: 0 }
  };

  STORY_SCENES.forEach((scene) => {
    if (scene.checkpoint) {
      const ind = scene.checkpoint.indicator;
      indicatorStats[ind].total += scene.checkpoint.points;
      indicatorStats[ind].questionCount += 1;

      const userAns = progress.answers[scene.checkpoint.id];
      if (userAns) {
        indicatorStats[ind].earned += userAns.pointsEarned;
      }
    }
  });

  (Object.keys(indicatorStats) as LiteracyIndicatorType[]).forEach((key) => {
    const stat = indicatorStats[key];
    stat.percentage = stat.total > 0 ? Math.round((stat.earned / stat.total) * 100) : 0;
  });

  const unlockedBadges: Badge[] = ADVENTURE_BADGES.filter((b) =>
    progress.unlockedBadgeIds.includes(b.id)
  );

  return {
    currentScene,
    currentSceneIndex,
    totalScenes: STORY_SCENES.length,
    progress,
    answers: progress.answers,
    totalScore: progress.totalScore,
    isCompleted: progress.completed,
    indicatorStats,
    unlockedBadges,
    allBadges: ADVENTURE_BADGES,
    nextScene,
    prevScene,
    goToScene,
    submitAnswer,
    discoverHotspot,
    resetProgress
  };
}
