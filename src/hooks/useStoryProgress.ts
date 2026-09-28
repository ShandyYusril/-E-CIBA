import { useState, useEffect, useCallback } from 'react';
import { ALL_COMIC_STORIES, COMIC_1 } from '../data/story';
import type { StoryScene, ComicStory } from '../data/story';
import type { LiteracyIndicatorType } from '../data/indicators';
import { ADVENTURE_BADGES } from '../data/badges';
import type { Badge } from '../data/badges';
import { preloadImage } from '../utils/preloadImage';

const STORAGE_KEY = 'e_comic_sd_literasi_v2';

export interface AnswerRecord {
  checkpointId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  indicator: LiteracyIndicatorType;
  pointsEarned: number;
}

export interface StoryProgressData {
  currentSceneId: number;
  answers: Record<string, AnswerRecord>;
  unlockedBadgeIds: string[];
  discoveredHotspotIds: string[];
  totalScore: number;
  completed: boolean;
}

export interface AppStoredState {
  activeStoryId: string;
  stories: Record<string, StoryProgressData>;
}

const defaultStoryProgress: StoryProgressData = {
  currentSceneId: 1,
  answers: {},
  unlockedBadgeIds: [],
  discoveredHotspotIds: [],
  totalScore: 0,
  completed: false
};

const defaultAppState: AppStoredState = {
  activeStoryId: 'comic-1',
  stories: {
    'comic-1': { ...defaultStoryProgress },
    'comic-2': { ...defaultStoryProgress }
  }
};

export function useStoryProgress() {
  const [appState, setAppState] = useState<AppStoredState>(() => {
    if (typeof window === 'undefined') return defaultAppState;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AppStoredState>;
        return {
          activeStoryId: parsed.activeStoryId || 'comic-1',
          stories: {
            'comic-1': parsed.stories?.['comic-1'] || { ...defaultStoryProgress },
            'comic-2': parsed.stories?.['comic-2'] || { ...defaultStoryProgress },
            'comic-3': parsed.stories?.['comic-3'] || { ...defaultStoryProgress }
          }
        };
      }
    } catch (e) {
      console.warn('Gagal membaca progress dari localStorage:', e);
    }
    return defaultAppState;
  });

  // Sinkronisasi ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn('Gagal menyimpan progress ke localStorage:', e);
    }
  }, [appState]);

  const activeStoryId = appState.activeStoryId;
  const currentStory: ComicStory = ALL_COMIC_STORIES[activeStoryId] || COMIC_1;
  const storyProgress = appState.stories[activeStoryId] || defaultStoryProgress;

  // Scene aktif
  const currentSceneIndex = currentStory.scenes.findIndex((s) => s.id === storyProgress.currentSceneId);
  const currentScene: StoryScene =
    currentSceneIndex !== -1 ? currentStory.scenes[currentSceneIndex] : currentStory.scenes[0];

  // Preload scene berikutnya
  useEffect(() => {
    const nextScene = currentStory.scenes[currentSceneIndex + 1];
    if (nextScene && nextScene.image) {
      preloadImage(nextScene.image);
      preloadImage(nextScene.image.replace(/\.webp$/i, '.jpg'));
    }
  }, [currentStory.scenes, currentSceneIndex]);

  // Ganti cerita komik
  const selectStory = useCallback((storyId: string) => {
    if (!ALL_COMIC_STORIES[storyId]) return;
    setAppState((prev) => ({
      ...prev,
      activeStoryId: storyId
    }));
  }, []);

  // Menjawab checkpoint
  const submitAnswer = useCallback(
    (
      checkpointId: string,
      optionId: 'A' | 'B' | 'C' | 'D',
      isCorrect: boolean,
      indicator: LiteracyIndicatorType,
      points: number
    ) => {
      setAppState((prev) => {
        const curStoryId = prev.activeStoryId;
        const currentData = prev.stories[curStoryId] || { ...defaultStoryProgress };

        const pointsToAdd = isCorrect ? points : 0;
        const newAnswers = {
          ...currentData.answers,
          [checkpointId]: {
            checkpointId,
            selectedOptionId: optionId,
            isCorrect,
            indicator,
            pointsEarned: pointsToAdd
          }
        };

        const newTotalScore = Object.values(newAnswers).reduce(
          (sum, ans) => sum + ans.pointsEarned,
          0
        );

        const newBadgeIds = [...currentData.unlockedBadgeIds];
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
          if (indicator === 'kesimpulan' && !newBadgeIds.includes('kesimpulan_tajam')) {
            newBadgeIds.push('kesimpulan_tajam');
          }
        }

        return {
          ...prev,
          stories: {
            ...prev.stories,
            [curStoryId]: {
              ...currentData,
              answers: newAnswers,
              totalScore: newTotalScore,
              unlockedBadgeIds: newBadgeIds
            }
          }
        };
      });
    },
    []
  );

  // Menemukan hotspot
  const discoverHotspot = useCallback((hotspotId: string) => {
    setAppState((prev) => {
      const curStoryId = prev.activeStoryId;
      const currentData = prev.stories[curStoryId] || { ...defaultStoryProgress };

      if (currentData.discoveredHotspotIds.includes(hotspotId)) return prev;

      return {
        ...prev,
        stories: {
          ...prev.stories,
          [curStoryId]: {
            ...currentData,
            discoveredHotspotIds: [...currentData.discoveredHotspotIds, hotspotId]
          }
        }
      };
    });
  }, []);

  // Lanjut scene
  const nextScene = useCallback(() => {
    setAppState((prev) => {
      const curStoryId = prev.activeStoryId;
      const story = ALL_COMIC_STORIES[curStoryId] || COMIC_1;
      const curData = prev.stories[curStoryId] || { ...defaultStoryProgress };
      const curIdx = story.scenes.findIndex((s) => s.id === curData.currentSceneId);

      if (curIdx < story.scenes.length - 1) {
        return {
          ...prev,
          stories: {
            ...prev.stories,
            [curStoryId]: {
              ...curData,
              currentSceneId: story.scenes[curIdx + 1].id
            }
          }
        };
      } else {
        // Tamat cerita
        const badges = [...curData.unlockedBadgeIds];
        const finishBadgeId = curStoryId === 'comic-1' ? 'penjelajah_rimba' : 'pendekar_timun_mas';
        if (!badges.includes(finishBadgeId)) {
          badges.push(finishBadgeId);
        }
        return {
          ...prev,
          stories: {
            ...prev.stories,
            [curStoryId]: {
              ...curData,
              completed: true,
              unlockedBadgeIds: badges
            }
          }
        };
      }
    });
  }, []);

  // Kembali scene
  const prevScene = useCallback(() => {
    setAppState((prev) => {
      const curStoryId = prev.activeStoryId;
      const story = ALL_COMIC_STORIES[curStoryId] || COMIC_1;
      const curData = prev.stories[curStoryId] || { ...defaultStoryProgress };
      const curIdx = story.scenes.findIndex((s) => s.id === curData.currentSceneId);

      if (curIdx > 0) {
        return {
          ...prev,
          stories: {
            ...prev.stories,
            [curStoryId]: {
              ...curData,
              currentSceneId: story.scenes[curIdx - 1].id
            }
          }
        };
      }
      return prev;
    });
  }, []);

  // Lompat ke scene
  const goToScene = useCallback((sceneId: number) => {
    setAppState((prev) => {
      const curStoryId = prev.activeStoryId;
      const curData = prev.stories[curStoryId] || { ...defaultStoryProgress };
      return {
        ...prev,
        stories: {
          ...prev.stories,
          [curStoryId]: {
            ...curData,
            currentSceneId: sceneId
          }
        }
      };
    });
  }, []);

  // Reset cerita aktif
  const resetCurrentStory = useCallback(() => {
    setAppState((prev) => ({
      ...prev,
      stories: {
        ...prev.stories,
        [prev.activeStoryId]: { ...defaultStoryProgress }
      }
    }));
  }, []);

  // Kembali membaca dari halaman terakhir setelah cerita selesai
  const continueStory = useCallback(() => {
    setAppState((prev) => ({
      ...prev,
      stories: {
        ...prev.stories,
        [prev.activeStoryId]: {
          ...(prev.stories[prev.activeStoryId] || { ...defaultStoryProgress }),
          completed: false
        }
      }
    }));
  }, []);

  // Hitung statistik indikator untuk cerita aktif
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

  currentStory.scenes.forEach((scene) => {
    if (scene.checkpoint) {
      const ind = scene.checkpoint.indicator;
      indicatorStats[ind].total += scene.checkpoint.points;
      indicatorStats[ind].questionCount += 1;

      const userAns = storyProgress.answers[scene.checkpoint.id];
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
    storyProgress.unlockedBadgeIds.includes(b.id)
  );

  return {
    currentStory,
    allStories: ALL_COMIC_STORIES,
    activeStoryId,
    currentScene,
    currentSceneIndex,
    totalScenes: currentStory.scenes.length,
    progress: storyProgress,
    answers: storyProgress.answers,
    totalScore: storyProgress.totalScore,
    isCompleted: storyProgress.completed,
    indicatorStats,
    unlockedBadges,
    allBadges: ADVENTURE_BADGES,
    selectStory,
    nextScene,
    prevScene,
    goToScene,
    submitAnswer,
    discoverHotspot,
    resetProgress: resetCurrentStory,
    continueStory
  };
}
