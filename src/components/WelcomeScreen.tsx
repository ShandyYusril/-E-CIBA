import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, HelpCircle, Info, Play, RotateCcw, X } from 'lucide-react';
import { FullscreenButton } from './FullscreenButton';
import backgroundImage from '../assets/background/backgorund.webp';
import logoImage from '../assets/background/logo.webp';
import comic1Cover from '../assets/comic/comic1/scene-01.webp';
import comic2Cover from '../assets/comic/comic2/scene1/scene utama.png';
import comic3Cover from '../assets/comic/comic3/scene-1.webp';
import alifahPhoto from '../assets/background/alipah.png';
import dosenPhoto from '../assets/background/dosen.png';

interface WelcomeScreenProps {
  onStartAdventure: (comicId?: string) => void;
  onResumeAdventure?: () => void;
  hasSavedProgress: boolean;
  savedSceneNumber?: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

interface ComicOption {
  id: string;
  number: string;
  title: string;
  genre: string;
  description: string;
  cover: string;
  available: boolean;
}

const comicOptions: ComicOption[] = [
  {
    id: 'comic-1',
    number: 'Komik 01',
    title: 'Kura-Kura & Kelinci yang Sombong',
    genre: 'Fabel',
    description: 'Fabel tentang ketekunan, kerendahan hati, dan tidak meremehkan teman.',
    cover: comic1Cover,
    available: true
  },
  {
    id: 'comic-2',
    number: 'Komik 02',
    title: 'Timun Mas dan Buto Ijo',
    genre: 'Dongeng',
    description: 'Dongeng tentang keberanian, kasih sayang, dan pantang menyerah.',
    cover: comic2Cover,
    available: true
  },
  {
    id: 'comic-3',
    number: 'Komik 03',
    title: 'Legenda Naga dan Pahlawan',
    genre: 'Cerita Rakyat',
    description: 'Cerita pilihan berikutnya dengan pesan baik untuk pembaca cilik.',
    cover: comic3Cover,
    available: true
  }
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartAdventure,
  onResumeAdventure,
  hasSavedProgress,
  savedSceneNumber = 1,
  isFullscreen,
  onToggleFullscreen
}) => {
  const [showGuide, setShowGuide] = useState(false);
  const [showAuthorInfo, setShowAuthorInfo] = useState(false);
  const [showComicSelection, setShowComicSelection] = useState(false);
  const [activeComicIndex, setActiveComicIndex] = useState(0);

  const activeComic = comicOptions[activeComicIndex];

  useEffect(() => {
    if (showComicSelection || showGuide || showAuthorInfo) return;

    const carouselTimer = window.setInterval(() => {
      setActiveComicIndex((currentIndex) => (currentIndex + 1) % comicOptions.length);
    }, 3500);

    return () => window.clearInterval(carouselTimer);
  }, [showAuthorInfo, showComicSelection, showGuide]);

  return (
    <div
      className="relative min-h-full w-full overflow-hidden bg-[#f2eee5] text-[#17352e] select-none"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(242, 238, 229, 0.96) 0%, rgba(242, 238, 229, 0.82) 42%, rgba(242, 238, 229, 0.2) 100%), url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <img
            src={logoImage}
            alt="Logo ECIBA"
            className="h-14 w-14 rounded-2xl object-cover shadow-[4px_4px_0_#d8864b] sm:h-16 sm:w-16"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuide(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b9c9ba] bg-white/75 text-[#17352e] shadow-[0_3px_0_#d7d2c7] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
            title="Petunjuk ECIBA"
            aria-label="Buka petunjuk ECIBA"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowAuthorInfo(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b9c9ba] bg-white/75 text-[#17352e] shadow-[0_3px_0_#d7d2c7] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
            title="Tentang karya"
            aria-label="Buka informasi pembuat karya"
          >
            <Info className="h-5 w-5" />
          </button>
          <FullscreenButton isFullscreen={isFullscreen} onToggle={onToggleFullscreen} />
        </div>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100dvh-82px)] w-full max-w-6xl items-center gap-10 px-5 pb-10 pt-3 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-0">
        <section className="max-w-xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d8864b]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#b56839]">Ruang cerita interaktif untuk anak</span>
          </div>

          <h1 className="max-w-lg text-5xl font-black leading-[0.94] tracking-[-0.06em] text-[#17352e] sm:text-6xl lg:text-7xl">
            Baca cerita.
            <br />
            Temukan <span className="text-[#d2773e]">dunia baru.</span>
          </h1>
          <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-[#668176] sm:text-lg">
            ECIBA adalah <strong className="text-[#315d4d]">E-Comic Interaktif Berbasis Cerita Anak</strong>. Jelajahi koleksi cerita dengan ritmemu sendiri, temukan pesan baik, lalu uji pemahamanmu dengan cara yang menyenangkan.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => setShowComicSelection(true)}
              className="group flex items-center gap-3 rounded-xl bg-[#17352e] px-6 py-4 text-sm font-black text-white shadow-[0_6px_0_#0c211c] transition-all hover:-translate-y-0.5 hover:bg-[#245243] active:translate-y-1 active:shadow-[0_2px_0_#0c211c]"
            >
              <Play className="h-4 w-4 fill-current" />
              Mulai membaca
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            {hasSavedProgress && onResumeAdventure && (
              <button
                onClick={onResumeAdventure}
                className="flex items-center gap-2 rounded-xl border border-[#c7d2c8] bg-white/60 px-5 py-3.5 text-sm font-bold text-[#315d4d] transition hover:border-[#668176] hover:bg-white"
              >
                <RotateCcw className="h-4 w-4" />
                Lanjut halaman {savedSceneNumber}
              </button>
            )}
          </div>

          <div className="mt-10 flex items-center gap-8 border-t border-[#d7d2c7] pt-5 text-[#668176]">
            <div><strong className="block text-xl font-black text-[#17352e]">3</strong><span className="text-[10px] font-bold uppercase tracking-wider">Koleksi</span></div>
            <div><strong className="block text-xl font-black text-[#17352e]">Seru</strong><span className="text-[10px] font-bold uppercase tracking-wider">Cara belajar</span></div>
            <div><strong className="block text-xl font-black text-[#17352e]">SD</strong><span className="text-[10px] font-bold uppercase tracking-wider">Untuk kamu</span></div>
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative rotate-[-2deg] rounded-[2rem] bg-[#17352e] p-3 shadow-[14px_16px_0_#d8864b] transition-transform duration-500 hover:rotate-0">
            <div key={activeComic.id} className="relative animate-carousel-in overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#254d40] px-6 pb-7 pt-6 sm:px-8 sm:pt-8">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[18px] border-[#d8864b]/30" />
              <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border-[22px] border-[#b7cda9]/20" />

              <div className="relative mb-10 flex items-start justify-between gap-3">
                <button
                  onClick={() => setActiveComicIndex((activeComicIndex - 1 + comicOptions.length) % comicOptions.length)}
                  className="rounded-full border border-white/20 p-1.5 text-[#d9e8d3] transition hover:bg-white/10"
                  aria-label="Komik sebelumnya"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="rounded-full border border-white/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#d9e8d3]">{activeComic.number}</div>
                <button
                  onClick={() => setActiveComicIndex((activeComicIndex + 1) % comicOptions.length)}
                  className="rounded-full border border-white/20 p-1.5 text-[#d9e8d3] transition hover:bg-white/10"
                  aria-label="Komik berikutnya"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <span className="text-xs font-bold text-[#b7cda9]">ECIBA / 2026</span>
              </div>

              <div className="relative">
                <div className="mb-3 h-1 w-12 bg-[#d8864b]" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b7cda9]">Koleksi cerita ECIBA</p>
                <h2 className="mt-3 text-3xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-4xl">{activeComic.title}</h2>
                <p className="mt-6 max-w-[250px] text-sm font-medium leading-relaxed text-white/55">{activeComic.description}</p>
              </div>

              <div className="relative mt-10 flex items-end justify-between border-t border-white/10 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/35">Baca • Jelajah • Pahami</span>
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border-2 border-[#254d40] bg-[#d8864b]" />
                  <div className="h-7 w-7 rounded-full border-2 border-[#254d40] bg-[#b7cda9]" />
                </div>
              </div>
              <div className="relative mt-5 flex justify-center gap-1.5">
                {comicOptions.map((comic, index) => (
                  <button
                    key={comic.id}
                    onClick={() => setActiveComicIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${index === activeComicIndex ? 'w-6 bg-[#d8864b]' : 'w-1.5 bg-white/30'}`}
                    aria-label={`Tampilkan ${comic.title}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </section>
      </main>

      {showComicSelection && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#17352e]/70 p-4 backdrop-blur-sm animate-pop-in"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowComicSelection(false);
          }}
        >
          <div className="relative max-h-[90dvh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/70 bg-[#f8f5ed] p-5 shadow-2xl sm:p-8">
            <button
              onClick={() => setShowComicSelection(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-[#668176] transition hover:bg-[#e8e1d3] hover:text-[#17352e]"
              aria-label="Tutup pilihan komik"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="pr-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b56839]">Pilih petualanganmu</p>
              <h2 className="mt-2 text-2xl font-black text-[#17352e] sm:text-3xl">Mau membaca komik yang mana?</h2>
              <p className="mt-2 text-sm font-medium text-[#668176]">Pilih satu cerita untuk mulai menjelajah.</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {comicOptions.map((comic) => (
                <article key={comic.id} className="overflow-hidden rounded-2xl border border-[#d7d2c7] bg-white shadow-sm">
                  <div className="relative h-36 overflow-hidden bg-[#254d40]">
                    <img src={comic.cover} alt={`Sampul ${comic.title}`} className="h-full w-full object-cover" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#17352e]/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                      {comic.genre}
                    </span>
                  </div>
                  <div className="flex min-h-[210px] flex-col p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#b56839]">{comic.number}</p>
                    <h3 className="mt-2 text-lg font-black leading-tight text-[#17352e]">{comic.title}</h3>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-[#668176]">{comic.description}</p>
                    <button
                      onClick={() => {
                        if (comic.available) {
                          setShowComicSelection(false);
                           onStartAdventure(comic.id);
                        }
                      }}
                      disabled={!comic.available}
                      className="mt-auto w-full rounded-xl bg-[#17352e] px-4 py-3 text-xs font-black text-white shadow-[0_3px_0_#0c211c] transition hover:bg-[#245243] disabled:cursor-not-allowed disabled:bg-[#b9c9ba] disabled:text-[#668176] disabled:shadow-none"
                    >
                      {comic.available ? 'Baca Sekarang' : 'Segera hadir'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17352e]/65 p-4 backdrop-blur-sm animate-pop-in">
          <div className="relative w-full max-w-sm rounded-3xl border border-white/60 bg-[#f8f5ed] p-6 shadow-2xl">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-[#668176] transition hover:bg-[#e8e1d3] hover:text-[#17352e]"
              aria-label="Tutup petunjuk ECIBA"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#b7cda9] bg-[#17352e] text-white shadow-[0_4px_0_#0c211c]">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h2 className="text-center text-2xl font-black text-[#17352e]">Petunjuk ECIBA</h2>
            <div className="mt-5 grid gap-3 text-sm text-[#668176]">
              <GuideItem number="01" text="Geser halaman untuk mengikuti alur cerita." />
              <GuideItem number="02" text="Sentuh titik interaktif yang kamu temukan." />
              <GuideItem number="03" text="Selesaikan kuis setelah halaman terakhir." />
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="mt-6 w-full rounded-xl bg-[#17352e] px-5 py-3 text-sm font-black text-white shadow-[0_4px_0_#0c211c] transition hover:bg-[#245243] active:translate-y-1 active:shadow-[0_1px_0_#0c211c]"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {showAuthorInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17352e]/65 p-4 backdrop-blur-sm animate-pop-in">
          <div className="relative max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/60 bg-[#f8f5ed] p-5 shadow-2xl sm:p-8">
            <button
              onClick={() => setShowAuthorInfo(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-[#668176] transition hover:bg-[#e8e1d3] hover:text-[#17352e]"
              aria-label="Tutup informasi pembuat"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b56839]">Profil pengembang</p>
              <h2 className="mt-2 text-2xl font-black text-[#17352e] sm:text-3xl">Penulis dan Dosen Pembimbing</h2>
              <p className="mt-2 text-sm font-medium text-[#668176]">
                Informasi singkat mengenai pengembang media E-CIBA.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border-2 border-[#d8864b]/40 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={alifahPhoto}
                    alt="Foto ALIFAH MUKAROMAH"
                    className="h-16 w-16 shrink-0 rounded-full border-4 border-[#d8864b] object-cover shadow-[0_4px_0_#b56839]"
                  />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#b56839]">Penulis</p>
                    <h3 className="mt-1 text-lg font-black leading-tight text-[#17352e]">ALIFAH MUKAROMAH</h3>
                  </div>
                </div>
                <p className="text-sm font-medium leading-relaxed text-[#668176]">
                  Lahir di Banjarnegara pada 10 Januari 2025, merupakan mahasiswa aktif Program Studi Pendidikan Guru Sekolah Dasar (PGSD), Fakultas Keguruan dan Ilmu Pendidikan (FKIP), Universitas Muhammadiyah Surakarta (UMS), yang mulai menempuh pendidikan pada tahun 2023. Aktif mengikuti berbagai kegiatan organisasi kemahasiswaan serta memiliki ketertarikan pada bidang riset dan pengembangan keilmiahan. Ketertarikan tersebut menjadi motivasi untuk terus mengembangkan wawasan, kreativitas, dan kemampuan akademik, khususnya dalam bidang pendidikan dasar. Melalui pengembangan media E-Comic Interaktif Berbasis Cerita Anak (E-CIBA), diharapkan dapat menghadirkan inovasi pembelajaran yang kreatif, interaktif, dan menarik guna mendukung peningkatan literasi sastra siswa sekolah dasar.
                </p>
              </article>

              <article className="rounded-2xl border-2 border-[#b7cda9] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={dosenPhoto}
                    alt="Foto Dr. Fitri Puji Rahmawati"
                    className="h-16 w-16 shrink-0 rounded-full border-4 border-[#b7cda9] object-cover shadow-[0_4px_0_#234638]"
                  />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#668176]">Dosen Pembimbing</p>
                    <h3 className="mt-1 text-lg font-black leading-tight text-[#17352e]">Dr. Fitri Puji Rahmawati, S.Pd., M.Hum., M.Pd.</h3>
                  </div>
                </div>
                <p className="text-sm font-medium leading-relaxed text-[#668176]">
                  Lahir di Purwokerto pada tahun 1978. Saat ini, beliau beraktivitas sebagai dosen pada Program Studi Pendidikan Guru Sekolah Dasar (PGSD), Fakultas Keguruan dan Ilmu Pendidikan (FKIP), Universitas Muhammadiyah Surakarta (UMS). Pendidikan tinggi ditempuh secara berjenjang. Pendidikan sarjana (S1) diselesaikan pada Program Studi Pendidikan Bahasa, Sastra Indonesia dan Daerah, FKIP Universitas Muhammadiyah Surakarta, lulus pada tahun 2000. Selanjutnya, beliau melanjutkan pendidikan magister (S2) pada Program Studi Linguistik Deskriptif di Universitas Sebelas Maret (UNS) Surakarta dan berhasil menyelesaikannya pada tahun 2011. Untuk memperluas dan memperkuat keilmuan di bidang kependidikan, penulis kembali menempuh pendidikan magister (S2) pada Program Studi Administrasi Pendidikan Universitas Muhammadiyah Surakarta, yang diselesaikan pada tahun 2015. Pendidikan doktoral (S3) diselesaikan pada Program Studi Pendidikan Bahasa Indonesia Universitas Sebelas Maret Surakarta. Selain mengajar, beliau aktif melaksanakan kegiatan penelitian dan pengabdian kepada masyarakat. Berbagai artikel ilmiah telah dipublikasikan dalam jurnal nasional maupun internasional. Di samping itu, beliau juga menulis beberapa buku ajar dan referensi.
                </p>
              </article>
            </div>

            <button
              onClick={() => setShowAuthorInfo(false)}
              className="mx-auto mt-6 block rounded-xl bg-[#17352e] px-5 py-3 text-sm font-black text-white shadow-[0_4px_0_#0c211c] transition hover:bg-[#245243] active:translate-y-1 active:shadow-[0_1px_0_#0c211c]"
            >
              Tutup informasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function GuideItem({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-black text-[#d2773e]">{number}</span>
      <span className="font-semibold">{text}</span>
    </div>
  );
}
