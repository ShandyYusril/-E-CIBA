import { useState, useEffect } from 'react';
import { resolveComicImage } from '../utils/preloadImage';

/**
 * Menyelesaikan URL gambar komik yang paling valid.
 * Coba .webp -> .jpg -> .png -> .svg
 */
export function useComicImage(imageSrc: string): string {
  const [resolved, setResolved] = useState<string>(imageSrc);

  useEffect(() => {
    let cancelled = false;

    const baseWithoutExt = imageSrc.replace(/\.(webp|jpg|jpeg|png|svg)$/i, '');
    const candidates = [
      `${baseWithoutExt}.webp`,
      `${baseWithoutExt}.jpg`,
      `${baseWithoutExt}.png`,
      `${baseWithoutExt}.svg`
    ];

    const resolve = async () => {
      const result = await resolveComicImage(imageSrc, candidates);
      if (!cancelled && result) {
        setResolved(result);
      }
    };
    void resolve();

    return () => {
      cancelled = true;
    };
  }, [imageSrc]);

  return resolved;
}
