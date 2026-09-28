import { useState, useEffect } from 'react';
import { useStoryProgress } from './hooks/useStoryProgress';
import { useAudio } from './hooks/useAudio';
import { useFullscreen } from './hooks/useFullscreen';
import { LoadingScreen } from './components/LoadingScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StoryViewer } from './components/StoryViewer';
import { ResultScreen } from './components/ResultScreen';
import { soundEffects } from './utils/soundEffects';

type ScreenState = 'loading' | 'welcome' | 'story' | 'result';

const QUIZ_URLS: Record<string, string> = {
  'comic-1': 'https://quiz.zep.us/id/play/aW5KxX',
  'comic-2': 'https://quiz.zep.us/id/play/kPewlB',
  'comic-3': 'https://quiz.zep.us/id/play/zZbMKX'
};

export function App() {
  const [screenState, setScreenState] = useState<ScreenState>('loading');

  const {
    currentStory,
    activeStoryId,
    selectStory,
    currentScene,
    currentSceneIndex,
    totalScenes,
    progress,
    answers,
    totalScore,
    isCompleted,
    indicatorStats,
    unlockedBadges,
    allBadges,
    nextScene,
    prevScene,
    goToScene,
    resetProgress,
    continueStory
  } = useStoryProgress();

  const {
    isMuted,
    isPlayingNarration,
    toggleMute,
    playNarration,
    stopAllAudio
  } = useAudio();

  const { isFullscreen, toggleFullscreen, enterFullscreen } = useFullscreen();

  // Jika progress sudah selesai saat memuat, atau saat selesai petualangan
  /* oxlint-disable react/set-state-in-effect */
  useEffect(() => {
    if (isCompleted && screenState === 'story') {
      setScreenState('result');
    }
  }, [isCompleted, screenState]);
  /* oxlint-enable react/set-state-in-effect */

  // Handler: Selesai loading
  const handleLoaded = () => {
    setScreenState('welcome');
  };

  // Handler: Mulai Petualangan Baru
  const handleStartAdventure = (comicId = 'comic-1') => {
    soundEffects.pop();
    selectStory(comicId);
    // Coba masuk fullscreen dengan user gesture
    enterFullscreen();
    setScreenState('story');
  };

  // Handler: Lanjutkan Petualangan Tersimpan
  const handleResumeAdventure = () => {
    soundEffects.pop();
    enterFullscreen();
    setScreenState('story');
  };

  // Handler: Mulai Ulang Petualangan
  const handleRestart = () => {
    soundEffects.pop();
    resetProgress();
    setScreenState('welcome');
  };

  const handleBackFromResult = () => {
    resetProgress();
    setScreenState('welcome');
  };

  const handleBackToStory = () => {
    continueStory();
    setScreenState('story');
  };

  return (
    <div className="h-full w-full overflow-hidden bg-slate-900 font-sans select-none">
      {screenState === 'loading' && <LoadingScreen onLoaded={handleLoaded} />}

      {screenState === 'welcome' && (
        <WelcomeScreen
          onStartAdventure={handleStartAdventure}
          onResumeAdventure={handleResumeAdventure}
          hasSavedProgress={progress.currentSceneId > 1 || Object.keys(answers).length > 0}
          savedSceneNumber={progress.currentSceneId}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      )}

      {screenState === 'story' && (
        <StoryViewer
          currentScene={currentScene}
           currentSceneIndex={currentSceneIndex}
           totalScenes={totalScenes}
           scenes={currentStory.scenes}
           totalScore={totalScore}
          answers={answers}
          isMuted={isMuted}
          isPlayingNarration={isPlayingNarration}
          isFullscreen={isFullscreen}
          onToggleMute={toggleMute}
          onToggleFullscreen={toggleFullscreen}
          onPlayNarration={playNarration}
          onStopAudio={stopAllAudio}
          onNextScene={nextScene}
          onPrevScene={prevScene}
          onGoToScene={goToScene}
          onHomeClick={() => setScreenState('welcome')}
        />
      )}

      {screenState === 'result' && (
        <ResultScreen
          quizUrl={QUIZ_URLS[activeStoryId]}
          indicatorStats={indicatorStats}
          unlockedBadges={unlockedBadges}
          allBadges={allBadges}
          onRestart={handleRestart}
          onBack={handleBackFromResult}
          onBackToStory={handleBackToStory}
        />
      )}
    </div>
  );
}

export default App;
