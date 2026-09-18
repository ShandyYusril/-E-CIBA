/**
 * Util pemuatan gambar komik yang hemat performa.
 *
 * - preloadImage: mempreload gambar berikutnya ke browser cache (tanpa render).
 * - resolveValidImage: memverifikasi sebuah URL benar-benar mengirim file gambar
 *   (bukan halaman HTML hasil SPA-fallback), lalu mengembalikan URL atau string kosong.
 */

export function preloadImage(src: string): void {
  if (typeof window === 'undefined' || !src) return;
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
}

/**
 * Cek bahwa URL mengembalikan konten gambar yang valid.
 * Menggunakan GET agar sesuai dengan mekanisme cache-browser.
 */
export async function resolveValidImage(src: string): Promise<string | null> {
  if (!src) return null;
  try {
    const res = await fetch(src, { method: 'GET' });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) return null;
    return src;
  } catch {
    return null;
  }
}

/**
 * Lakukan fallback webp -> svg secara andal di semua jenis server:
 * 1. Coba URL utama (mis. scene-01.webp)
 * 2. Jika tidak valid (404 / HTML-fallback / gagal), gunakan URL cadangan (mis. scene-01.svg)
 * 3. Jika keduanya gagal, kembalikan string kosong agar UI menampilkan placeholder.
 */
export async function resolveComicImage(primary: string, fallback: string): Promise<string> {
  const primaryOk = await resolveValidImage(primary);
  if (primaryOk) return primaryOk;
  const fallbackOk = await resolveValidImage(fallback);
  return fallbackOk ?? '';
}