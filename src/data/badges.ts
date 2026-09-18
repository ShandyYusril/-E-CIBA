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
    description: 'Berhasil memahami sifat dan watak tokoh kelinci dan kura-kura.',
    icon: '🐰',
    badgeColor: '#3B82F6',
    conditionDescription: 'Menjawab benar soal pemahaman tokoh'
  },
  {
    id: 'penelusur_alur',
    title: 'Penelusur Alur',
    description: 'Menguasai urutan kejadian dan alur petualangan dari awal sampai akhir.',
    icon: '🛤️',
    badgeColor: '#10B981',
    conditionDescription: 'Menjawab benar soal alur cerita'
  },
  {
    id: 'detektif_konflik',
    title: 'Detektif Cerita',
    description: 'Berhasil membongkar konflik utama yang memicu perlombaan lari.',
    icon: '🔍',
    badgeColor: '#F59E0B',
    conditionDescription: 'Menjawab benar soal konflik cerita'
  },
  {
    id: 'kolektor_kata',
    title: 'Kolektor Kata Indah',
    description: 'Mengenal dan memahami kosakata sastra baru di dalam komik.',
    icon: '📚',
    badgeColor: '#EC4899',
    conditionDescription: 'Menjawab benar soal kosakata cerita'
  },
  {
    id: 'pencari_pesan_moral',
    title: 'Pencari Pesan Moral',
    description: 'Menemukan mutiara budi pekerti luhur dari fabel kelinci dan kura-kura.',
    icon: '🌟',
    badgeColor: '#8B5CF6',
    conditionDescription: 'Menjawab benar soal amanat cerita'
  },
  {
    id: 'penjelajah_rimba',
    title: 'Sahabat Rimba Bijak',
    description: 'Menyelesaikan seluruh petualangan komik interaktif hingga tuntas!',
    icon: '🏆',
    badgeColor: '#F97316',
    conditionDescription: 'Menyelesaikan 8 scene komik'
  }
];
