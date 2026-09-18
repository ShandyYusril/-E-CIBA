/**
 * Service Worker E-Comic Interaktif
 * Agar asset komik & audio selalu update saat diganti, strategi:
 *   - Hashed build assets (JS/CSS)  -> cache-first (immutable)
 *   - Comic / audio                 -> fallback cache + update (stale-while-revalidate)
 *   - Navigation (index.html)       -> network-first (agar versi baru selalu ter-load)
 */

const CACHE_VERSION = 'e-comic-v2';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const COMIC_CACHE = `comic-${CACHE_VERSION}`;

const IS_COMIC_ASSET = (url) =>
  /\.webp$/.test(url) || /\.svg$/.test(url) || /\.png$/.test(url) || /\.jpe?g$/.test(url);

const IS_AUDIO_ASSET = (url) => /\/audio\//.test(url) || /\.mp3$/.test(url);

/* ---------- Install: cache shell ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(['/', '/manifest.json', '/favicon.svg']))
      .then(() => self.skipWaiting())
  );
});

/* ---------- Activate: bersihkan cache lama ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('static-') || key.startsWith('comic-'))
            .filter((key) => !key.includes(CACHE_VERSION))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

/* ---------- Fetch strategy ---------- */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Jangan tangani request non-http (ex: chrome-extension)
  if (!request.url.startsWith('http')) return;

  /* --- Asset komik & audio: cache-first, lalu update cache di background --- */
  if (IS_COMIC_ASSET(request.url) || IS_AUDIO_ASSET(request.url)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request)
          .then((response) => {
            // Jangan cache halaman HTML (SPA-fallback) sebagai gambar/audio,
            // agar URL asset tidak pernah terkontaminasi konten yang salah.
            if (
              response &&
              response.ok &&
              (response.headers.get('content-type') || '').startsWith(
                IS_AUDIO_ASSET(request.url) ? 'audio/' : 'image/'
              )
            ) {
              const copy = response.clone();
              caches.open(COMIC_CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    );
    return;
  }

  /* --- Navigasi / HTML: network-first agar update selalu tampil --- */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  /* --- Build asset ber-hash: cache-first (immutable) --- */
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});