export type LiteracyIndicatorType =
  | 'tokoh'
  | 'alur'
  | 'konflik'
  | 'pesanMoral'
  | 'kosakata'
  | 'kesimpulan';

export interface LiteracyIndicatorInfo {
  id: LiteracyIndicatorType;
  name: string;
  shortLabel: string;
  description: string;
  color: string;
  bgLight: string;
  borderColor: string;
  icon: string;
  recommendationGood: string;
  recommendationImprove: string;
}

export const LITERACY_INDICATORS: Record<LiteracyIndicatorType, LiteracyIndicatorInfo> = {
  tokoh: {
    id: 'tokoh',
    name: 'Pemahaman Tokoh & Watak',
    shortLabel: 'Tokoh & Watak',
    description: 'Mengenali karakter, sifat, peran, dan tindakan tokoh dalam cerita.',
    color: '#3B82F6',
    bgLight: '#EFF6FF',
    borderColor: '#93C5FD',
    icon: '🐰',
    recommendationGood: 'Sangat cermat mengenali watak tokoh (sombong vs sabar & pantang menyerah).',
    recommendationImprove: 'Perhatikan kata-kata dan ekspresi wajah karakter untuk memahami sifatnya.'
  },
  alur: {
    id: 'alur',
    name: 'Pemahaman Alur Cerita',
    shortLabel: 'Alur Kejadian',
    description: 'Memahami urutan peristiwa, awal, pertengahan, dan akhir cerita secara logis.',
    color: '#10B981',
    bgLight: '#ECFDF5',
    borderColor: '#6EE7B7',
    icon: '🛤️',
    recommendationGood: 'Hebat dalam mengingat urutan kejadian dari awal hingga perlombaan selesai.',
    recommendationImprove: 'Coba ingat kembali apa yang terjadi sebelum dan sesudah peristiwa penting.'
  },
  konflik: {
    id: 'konflik',
    name: 'Pemahaman Konflik & Masalah',
    shortLabel: 'Konflik Cerita',
    description: 'Menemukan masalah utama dan pertentangan yang dihadapi para tokoh.',
    color: '#F59E0B',
    bgLight: '#FFFBEB',
    borderColor: '#FCD34D',
    icon: '⚡',
    recommendationGood: 'Mampu menemukan sumber masalah utama yang memicu tantangan lomba lari.',
    recommendationImprove: 'Pikirkan apa penyebab yang membuat tokoh berselisih paham atau merasa jengkel.'
  },
  pesanMoral: {
    id: 'pesanMoral',
    name: 'Pemahaman Pesan Moral (Amanat)',
    shortLabel: 'Pesan Moral',
    description: 'Menangkap nilai budi pekerti luhur dan hikmah yang dapat dipetik dari fabel.',
    color: '#8B5CF6',
    bgLight: '#F5F3FF',
    borderColor: '#C4B5FD',
    icon: '🌟',
    recommendationGood: 'Memahami pesan luhur: jangan sombong dan hargai usaha keras teman.',
    recommendationImprove: 'Renungkan pelajaran hidup apa yang dapat kita teladani dalam kehidupan sehari-hari.'
  },
  kosakata: {
    id: 'kosakata',
    name: 'Pemahaman Kosakata Sastra',
    shortLabel: 'Kosakata Cerita',
    description: 'Mengartikan istilah sastra dan kosakata ekspresif seperti lamban dan berkecil hati.',
    color: '#EC4899',
    bgLight: '#FDF2F8',
    borderColor: '#F9A8D4',
    icon: '📖',
    recommendationGood: 'Penguasaan kosa kata sastra sangat baik dan mengerti konteks kalimat cerita.',
    recommendationImprove: 'Tanyakan atau cari tahu arti kata baru yang kamu temukan di dalam komik.'
  },
  kesimpulan: {
    id: 'kesimpulan',
    name: 'Kemampuan Menyimpulkan Cerita',
    shortLabel: 'Simpulan Cerita',
    description: 'Menarik kesimpulan logis dan menghubungkan sebab-akibat peristiwa dalam cerita.',
    color: '#06B6D4',
    bgLight: '#ECFEFF',
    borderColor: '#67E8F9',
    icon: '🎯',
    recommendationGood: 'Kritis dalam menyimpulkan alasan di balik kemenangan kura-kura secara utuh.',
    recommendationImprove: 'Coba hubungkan tindakan tokoh di awal cerita dengan akibat yang dialaminya di akhir.'
  }
};
