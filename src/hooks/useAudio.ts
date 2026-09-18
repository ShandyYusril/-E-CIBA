import { useState, useRef, useCallback } from 'react';
import { soundEffects } from '../utils/soundEffects';

export function useAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingNarration, setIsPlayingNarration] = useState(false);
  const [hasVoiceSupport] = useState(() => {
    if (typeof window === 'undefined') return true;
    return 'speechSynthesis' in window;
  });
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const stopAllAudio = useCallback(() => {
    // Stop HTML5 Audio if playing
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }

    // Stop SpeechSynthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setIsPlayingNarration(false);
  }, []);

  const speakWithTTS = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlayingNarration(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95; // Sedikit lebih lambat agar jelas untuk anak SD
    utterance.pitch = 1.05; // Sedikit lebih cerah ramah anak

    // Cari suara bahasa Indonesia jika ada
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find((v) => v.lang.includes('id') || v.lang.includes('ID'));
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }

    utterance.onend = () => setIsPlayingNarration(false);
    utterance.onerror = () => setIsPlayingNarration(false);

    window.speechSynthesis.speak(utterance);
  };

  // Memutar narasi teks atau audio file
  const playNarration = useCallback(
    async (text: string, audioFileUrl?: string) => {
      if (isMuted) return;

      stopAllAudio();
      setIsPlayingNarration(true);

      // 1. Coba putar file audio jika tersedia
      if (audioFileUrl) {
        try {
          const audio = new Audio(audioFileUrl);
          audioElementRef.current = audio;

          audio.onended = () => setIsPlayingNarration(false);
          audio.onerror = () => {
            // Fallback ke Text-to-Speech jika file audio tidak ditemukan / 404
            speakWithTTS(text);
          };

          await audio.play();
          return;
        } catch {
          // Fallback ke TTS
          speakWithTTS(text);
          return;
        }
      }

      // 2. Gunakan SpeechSynthesis bahasa Indonesia (Web Speech API)
      speakWithTTS(text);
    },
    [isMuted, stopAllAudio]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next) {
        stopAllAudio();
      }
      return next;
    });
  }, [stopAllAudio]);

  const playSfx = useCallback(
    (type: keyof typeof soundEffects) => {
      if (isMuted) return;
      try {
        soundEffects[type]();
      } catch (err) {
        console.warn('Error playing SFX:', err);
      }
    },
    [isMuted]
  );

  return {
    isMuted,
    isPlayingNarration,
    hasVoiceSupport,
    toggleMute,
    playNarration,
    stopAllAudio,
    playSfx
  };
}
