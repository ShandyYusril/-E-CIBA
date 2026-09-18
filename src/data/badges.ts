export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  badgeColor: string;
  conditionDescription: string;
}

export const ADVENTURE_BADGES: Badge[] = [
  {
    id: 'pembaca_teliti',
    title: 'Pembaca Teliti',
    description: 'Cermat mengenali karakter, watak, dan peran tokoh dalam cerita fabel maupun dongeng.',
    icon: '🔍',
    badgeColor: '#3B82F6',
    conditionDescription: 'Menjawab benar soal pemahaman tokoh'
  },
  {
    id: 'penelusur_alur',
    title: 'Penelusur Alur Cerita',
    description: 'Menguasai urutan kronologis kejadian dari awal, puncak peristiwa, hingga akhir.',
    icon: '🛤️',
    badgeColor: '#10B981',
    conditionDescription: 'Menjawab benar soal alur cerita'
  },
  {
    id: 'detektif_konflik',
    title: 'Penganalisis Masalah',
    description: 'Mampu menemukan sumber konflik dan titik balik penyelesaian tantangan tokoh.',
    icon: '⚡',
    badgeColor: '#F59E0B',
    conditionDescription: 'Menjawab benar soal konflik cerita'
  },
  {
    id: 'kolektor_kata',
    title: 'Kolektor Kosakata Sastra',
    description: 'Memahami istilah sastra seperti fabel, dongeng, dan makna kiasan dalam komik.',
    icon: '📖',
    badgeColor: '#EC4899',
    conditionDescription: 'Menjawab benar soal kosakata cerita'
  },
  {
    id: 'pencari_pesan_moral',
    title: 'Penjaga Akhlak Luhur',
    description: 'Menemukan mutiara budi pekerti luhur dan nilai Al-Qur’an dalam pembelajaran.',
    icon: '🌟',
    badgeColor: '#8B5CF6',
    conditionDescription: 'Menjawab benar soal amanat & nilai karakter'
  },
  {
    id: 'kesimpulan_tajam',
    title: 'Pemikir Kritis & Bijak',
    description: 'Mampu menarik simpulan logis dan menghubungkan sebab-akibat peristiwa cerita.',
    icon: '🎯',
    badgeColor: '#06B6D4',
    conditionDescription: 'Menjawab benar soal simpulan cerita'
  },
  {
    id: 'penjelajah_rimba',
    title: 'Sahabat Fabel Rimba',
    description: 'Menuntaskan seluruh 13 adegan petualangan Komik 1 Kelinci & Kura-kura!',
    icon: '🐰',
    badgeColor: '#10B981',
    conditionDescription: 'Menyelesaikan Komik 1 (Kelinci & Kura-kura)'
  },
  {
    id: 'pendekar_timun_mas',
    title: 'Ksatria Dongeng Nusantara',
    description: 'Menuntaskan seluruh 11 adegan petualangan Komik 2 Timun Mas & Buto Ijo!',
    icon: '✨',
    badgeColor: '#D97706',
    conditionDescription: 'Menyelesaikan Komik 2 (Timun Mas & Buto Ijo)'
  }
];
