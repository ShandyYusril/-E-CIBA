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

export function App() {
  const [screenState, setScreenState] = useState<ScreenState>('loading');

  const {
    currentStory,
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
    submitAnswer,
    discoverHotspot,
    resetProgress
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
          discoveredHotspots={progress.discoveredHotspotIds}
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
          onSubmitAnswer={submitAnswer}
          onDiscoverHotspot={discoverHotspot}
          onHomeClick={() => setScreenState('welcome')}
        />
      )}

      {screenState === 'result' && (
        <ResultScreen
          totalScore={totalScore}
          maxScore={totalScenes * 10}
          indicatorStats={indicatorStats}
          unlockedBadges={unlockedBadges}
          allBadges={allBadges}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
