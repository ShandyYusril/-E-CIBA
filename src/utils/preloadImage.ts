/**
 * Util pemuatan gambar komik yang hemat performa & adaptif.
 *
 * - preloadImage: mempreload gambar berikutnya ke browser cache (tanpa render).
 * - resolveComicImage: mencoba beberapa kandidat format (webp -> jpg -> png -> svg).
 */

export function preloadImage(src: string): void {
  if (typeof window === 'undefined' || !src) return;
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
}

/**
 * Cek bahwa URL mengembalikan konten gambar yang valid.
 */
export async function resolveValidImage(src: string): Promise<string | null> {
  if (!src) return null;
  try {
    const res = await fetch(src, { method: 'HEAD' }).catch(() => fetch(src, { method: 'GET' }));
    if (!res || !res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    // Jika server mengembalikan HTML (SPA fallback 404), tolak
    if (contentType.includes('text/html')) return null;
    return src;
  } catch {
    return null;
  }
}

/**
 * Lakukan fallback bertingkat:
 * webp -> jpg -> png -> svg
 */
export async function resolveComicImage(
  primary: string,
  candidates: string[] = []
): Promise<string> {
  const allCandidates = [primary, ...candidates].filter(Boolean);

  for (const candidate of allCandidates) {
    const ok = await resolveValidImage(candidate);
    if (ok) return ok;
  }

  // Jika gagal cek fetch (misal offline/CORS), gunakan primary langsung
  return primary;
}
