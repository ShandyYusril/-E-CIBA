# E-Comic Interaktif: Kelinci & Kura-Kura di Hutan yang Rindang
### Media Pembelajaran Literasi Sastra Digital Interaktif Siswa Sekolah Dasar (SD)

Aplikasi web cerita interaktif (*Digital Storybook Game*) yang dirancang khusus untuk meningkatkan dan mengukur kemampuan literasi sastra siswa SD melalui komik fabel interaktif.

---

## 🌟 Fitur Utama

1. **Pengalaman Membaca Immersive & Fullscreen**:
   - Mode membaca layar penuh (*one scene at a time*) bebas distraksi.
   - Mendukung Fullscreen API dengan fallback 100dvh untuk perangkat mobile & tablet.
   - Desain ramah anak: tipografi cerah mudah dibaca (Google Fonts: *Fredoka* & *Nunito*), tombol besar taktil 3D, rounded corners.

2. **Interaktivitas Karakter & Objek (Hotspot)**:
   - Siswa dapat menyentuh karakter (*Kelinci, Kura-kura, Monyet, Berang-berang*) dan objek hutan untuk memunculkan balon ucapan rahasia serta efek suara ceria.

3. **Audio Engine Ramah Anak**:
   - **Sound Synthesizer**: Menghasilkan efek suara pop, chime, tawa kelinci, snore, dan fanfare menggunakan *Web Audio API* tanpa ketergantungan file eksternal.
   - **Narasi Suara (TTS & Custom Audio)**: Mendukung pembacaan suara alami Bahasa Indonesia (*Web Speech API*) dan pemutaran file rekaman suara asli jika dimasukkan.

4. **Checkpoint Literasi & 6 Indikator Terukur**:
   - Sistem mencatat dan mengukur 6 aspek literasi sastra secara otomatis:
     - 🐰 **Pemahaman Tokoh**: Mengenali watak sombong kelinci vs tekad gigih kura-kura.
     - 🛤️ **Pemahaman Alur**: Mengurutkan kejadian dari awal hingga perlombaan selesai.
     - ⚡ **Pemahaman Konflik**: Menemukan akar permasalahan dan titik balik cerita.
     - 🌟 **Pemahaman Pesan Moral**: Memetik nilai budi pekerti luhur fabel.
     - 📖 **Pemahaman Kosakata**: Mengartikan kata sastra (*lamban, berkecil hati*).
     - 🎯 **Kemampuan Menyimpulkan**: Mengaitkan sebab-akibat kekalahan kelinci & kemenangan kura-kura.

5. **Gamifikasi Edukatif Positif**:
   - Poin bintang (+10 Poin per checkpoint), animasi konfeti, petunjuk ramah (*Hint*), dan 6 lencana prestasi petualang (*Badges*).
   - Umpan balik yang hangat tanpa kata-kata menghakimi ("Hebat!" / "Coba ingat lagi yuk!").

6. **Rapor Hasil Literasi Siswa & Fitur Cetak**:
   - Halaman hasil menampilkan skor total, persentase tiap indikator, catatan evaluasi perkembangan belajar, dan tombol cetak sertifikat untuk guru/siswa.

7. **Penyimpanan Kemajuan (Save Progress)**:
   - Kemajuan membaca, skor, dan lencana tersimpan di `localStorage` sehingga siswa dapat melanjutkan petualangan kapan saja.

---

## 🎨 Panduan Memasukkan Asset Komik Canva Anda

Website ini dirancang secara modular dan **data-driven**, sehingga Anda dapat langsung mengganti ilustrasi komik dengan hasil ekspor dari Canva tanpa perlu merombak kode program.

### Langkah-langkah:
1. Buka komik Anda di **Canva** (referensi: [Canva Link](https://canva.link/rxt3shsdyf2b48a)).
2. Ekspor/Unduh setiap halaman komik dalam format **WebP** (disarankan untuk performa terbaik) atau **PNG/JPG**.
3. Beri nama file secara berurutan:
   - `scene-01.webp` (Adegan 1: Kesombongan Kelinci di Tepi Sungai)
   - `scene-02.webp` (Adegan 2: Jawaban Tenang Kura-Kura)
   - `scene-03.webp` (Adegan 3: Ledekan Kelinci)
   - `scene-04.webp` (Adegan 4: Tantangan Lomba Lari)
   - `scene-05.webp` (Adegan 5: Garis Start Lomba)
   - `scene-06.webp` (Adegan 6: Kelinci Melesat Cepat)
   - `scene-07.webp` (Adegan 7: Kelinci Tertidur di Bawah Pohon)
   - `scene-08.webp` (Adegan 8: Kura-Kura Juara & Pesan Moral)
4. Masukkan file tersebut ke dalam folder:
   ```
   public/assets/comic/
   ```
5. Muat ulang browser Anda. Gambar Canva Anda akan langsung otomatis tampil menggantikan ilustrasi bawaan!

> **Catatan:** Jika file `.webp` belum Anda masukkan, sistem memiliki *fallback* otomatis yang akan menampilkan ilustrasi komik SVG bawaan yang sudah siap pakai. Jika kedua file hilang, akan tampil placeholder pengembangan ringan (`📖`) yang otomatis menghilang saat gambar dimasukkan. Deteksi gambar dilakukan melalui verifikasi `Content-Type`, sehingga aman di semua jenis hosting (termasuk yang menerapkan SPA-fallback).

---

## 🎙️ Panduan Memasukkan Audio Rekaman Asli (Opsional)
Jika Anda memiliki rekaman suara guru atau murid yang membacakan cerita:
1. Simpan rekaman audio per adegan dengan format `.mp3`.
2. Beri nama: `scene-01.mp3`, `scene-02.mp3`, ..., `scene-08.mp3`.
3. Masukkan ke folder:
   ```
   public/assets/audio/
   ```
4. Website akan otomatis memutar file rekaman tersebut saat tombol "Dengarkan Cerita" ditekan, dan tetap menggunakan Text-to-Speech sebagai cadangan jika file belum ada.

---

## 🚀 Cara Menjalankan Aplikasi

### Mode Pengembangan (Dev Server):
```bash
npm run dev
```
Akses di browser: `http://localhost:5173/`

### Mode Build Produksi:
```bash
npm run build
npm run preview
```

---

## 📱 PWA (Install ke Home Screen)

Aplikasi mendukung **Progressive Web App**: saat didaftarkan, siswa dapat meng-installnya ke layar utama HP/tablet dan tampil seperti aplikasi native (mode `standalone`).

- **Service worker hanya aktif di build produksi** (`npm run build`), tidak mengganggu mode pengembangan.
- Strategi cache dikalibrasi agar **update asset komik tidak pernah gagal**: asset `webp/svg/mp3` dicek ulang ke server secara otomatis, halaman utama selalu diambil dari jaringan (tidak pernah menyajikan versi lama).

## 📁 Struktur Folder Proyek

```
coba-web/
├── public/
│   ├── assets/
│   │   ├── comic/            # File gambar komik (scene-01.webp s.d. scene-08.webp)
│   │   ├── audio/            # File audio rekaman suara asli (scene-01.mp3 s.d. scene-10.mp3)
│   │   └── icons/            # Ikon aplikasi & favicon
│   ├── favicon.svg
│   ├── sw.js                 # Service Worker PWA (cache aman, update asset tidak gagal)
│   └── manifest.json         # Konfigurasi PWA Standalone
├── src/
│   ├── components/
│   │   ├── LoadingScreen.tsx       # Animasi pembuka ramah anak
│   │   ├── WelcomeScreen.tsx       # Halaman judul & kartu karakter
│   │   ├── StoryViewer.tsx         # Kontainer membaca komik fullscreen
│   │   ├── ComicScene.tsx          # Panel komik besar + hotspot + fallback gambar
│   │   ├── DialogueBox.tsx         # Balon dialog & narasi suara
│   │   ├── NavigationControls.tsx  # Navigasi Sebelumnya / Lanjut / Tantangan
│   │   ├── ProgressIndicator.tsx   # Indikator adegan & bintang
│   │   ├── HotspotInteraction.tsx  # Titik sentuh interaktif karakter
│   │   ├── LiteracyCheckpoint.tsx  # Soal pilihan ganda literasi sastra
│   │   ├── FeedbackModal.tsx       # Umpan balik positif game-like
│   │   ├── ResultScreen.tsx        # Layar hasil, rapor 6 indikator & lencana
│   │   ├── GuideModal.tsx          # Petunjuk bermain untuk anak SD
│   │   └── FullscreenButton.tsx    # Tombol toggle layar penuh
│   ├── data/
│   │   ├── story.ts                # Data 8 adegan cerita & checkpoint
│   │   ├── indicators.ts           # Definisi 6 indikator literasi sastra
│   │   └── badges.ts               # Daftar lencana petualangan
│   ├── hooks/
│   │   ├── useStoryProgress.ts     # Logika progres & penyimpanan localStorage
│   │   ├── useAudio.ts             # Pengelola audio narasi & TTS
│   │   ├── useFullscreen.ts        # Pengendali Fullscreen API
│   │   └── useComicImage.ts        # Resolusi gambar valid (webp → svg → placeholder)
│   ├── utils/
│   │   ├── preloadImage.ts         # Preload scene berikutnya & verifikasi gambar
│   │   ├── soundEffects.ts         # Synthesizer efek suara Web Audio API
│   │   └── confetti.ts             # Animasi selebrasi konfeti
│   ├── App.tsx                     # Pengatur alur halaman
│   ├── index.css                   # Desain sistem & tombol 3D anak SD
│   └── main.tsx
└── package.json
```
