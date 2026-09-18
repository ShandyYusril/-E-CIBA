import { useState, useEffect } from 'react';
import { resolveComicImage } from '../utils/preloadImage';

/**
 * Menyelesaikan URL gambar komik yang benar-benar valid.
 *
 * Karena sebagian penyedia hosting menerapkan SPA-fallback (mengembalikan
 * index.html dengan status 200 untuk file yang hilang), rely hanya pada
 * `onError` di <img> tidak cukup. Hook ini memverifikasi lewat fetch bahwa
 * URL benar-benar mengirim konten gambar, lalu memilih:
 *   primary (mis. scene-01.webp) -> fallback (mis. scene-01.svg) -> placeholder
 */
export function useComicImage(primary: string, fallback: string | null): string | null {
  const [resolved, setResolved] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const resolve = async () => {
      const result = await resolveComicImage(primary, fallback ?? '');
      if (!cancelled) setResolved(result);
    };
    void resolve();

    return () => {
      cancelled = true;
    };
  }, [primary, fallback]);

  return resolved;
}