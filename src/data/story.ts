import type { LiteracyIndicatorType } from './indicators';

export interface Hotspot {
  id: string;
  name: string;
  xPercent: number; // 0 - 100%
  yPercent: number; // 0 - 100%
  title: string;
  reaction: string;
  soundType: 'laugh' | 'pop' | 'chime' | 'splash' | 'cheer' | 'snore' | 'water';
}

export interface LiteracyOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  feedback: string;
  hint: string;
}

export interface LiteracyCheckpoint {
  id: string;
  title: string;
  question: string;
  indicator: LiteracyIndicatorType;
  points: number;
  options: LiteracyOption[];
}

export interface StoryScene {
  id: number;
  sceneNumber: number;
  title: string;
  image: string;
  speaker?: string;
  speakerRole?: 'rabbit' | 'turtle' | 'monkey' | 'narrator';
  dialogue?: string;
  narration?: string;
  audio?: string;
  hotspots?: Hotspot[];
  checkpoint?: LiteracyCheckpoint;
  nextSceneId: number | null;
}

export const STORY_METADATA = {
  title: 'Kelinci dan Kura-Kura di Hutan yang Rindang',
  subtitle: 'Petualangan Literasi Sastra Siswa SD',
  author: 'Media Literasi Sastra Digital',
  coverImage: '/assets/comic/scene-01.webp',
  description:
    'Kisah persahabatan, perlombaan lari, dan pelajaran budi pekerti luhur antara Kelinci yang lincah namun sombong dengan Kura-kura yang sabar dan pantang menyerah.',
  totalScenes: 8,
  characters: [
    {
      id: 'kelinci',
      name: 'Kelinci',
      role: 'Pelari Cepat & Suka Membanggakan Diri',
      avatar: '🐰',
      description: 'Memiliki kaki panjang dan lari cepat, namun suka meremehkan teman.'
    },
    {
      id: 'kura-kura',
      name: 'Kura-kura',
      role: 'Sahabat Sabar & Pantang Menyerah',
      avatar: '🐢',
      description: 'Langkahnya tenang dan tidak pernah putus asa menghadapi ejekan.'
    },
    {
      id: 'monyet',
      name: 'Monyet Ceria',
      role: 'Wasit Lomba & Penyemangat',
      avatar: '🐒',
      description: 'Suka berayun di pepohonan dan menjadi wasit perlombaan lari.'
    },
    {
      id: 'rubah',
      name: 'Rubah',
      role: 'Penonton Hutan yang Kritis',
      avatar: '🦊',
      description: 'Mengamati sikap sombong kelinci dari balik rimbunnya semak.'
    }
  ]
};

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    sceneNumber: 1,
    title: 'Kesombongan Kelinci di Tepi Sungai',
    image: '/assets/comic/scene-01.webp',
    speaker: 'Kelinci',
    speakerRole: 'rabbit',
    dialogue: 'Lihatlah, teman-teman! Kakiku panjang. Aku bisa berlari sangat cepat, tidak seperti kura-kura!',
    narration: 'Di dekat jembatan kayu yang asri, kelinci tertawa riang sambil melirik ke arah kura-kura di tepian air.',
    audio: '/assets/audio/scene-01.mp3',
    hotspots: [
      {
        id: 'spot-rabbit-1',
        name: 'Kelinci Sombong',
        xPercent: 82,
        yPercent: 32,
        title: 'Kelinci',
        reaction: 'Haha! Akulah yang tercepat di hutan ini! Siapa berani menandingiku?',
        soundType: 'laugh'
      },
      {
        id: 'spot-turtle-1',
        name: 'Kura-kura',
        xPercent: 30,
        yPercent: 62,
        title: 'Kura-kura',
        reaction: 'Aku berjalan pelan bukan berarti aku lemah. Aku hanya berhati-hati.',
        soundType: 'chime'
      },
      {
        id: 'spot-otters-1',
        name: 'Berang-berang',
        xPercent: 58,
        yPercent: 55,
        title: 'Berang-berang Sungai',
        reaction: 'Biar lamban, kura-kura adalah kawan yang sangat baik hati!',
        soundType: 'splash'
      }
    ],
    checkpoint: {
      id: 'chk-1',
      title: 'Checkpoint Tokoh',
      question: 'Berdasarkan perkataan dan tindakannya di tepi sungai, bagaimanakah watak Kelinci?',
      indicator: 'tokoh',
      points: 10,
      options: [
        {
          id: 'A',
          text: 'Ramah dan suka menyapa teman',
          isCorrect: false,
          feedback: 'Belum tepat. Coba perhatikan lagi cara kelinci berbicara.',
          hint: 'Kelinci memamerkan kakinya dan mengejek teman lain yang lamban.'
        },
        {
          id: 'B',
          text: 'Sombong dan suka meremehkan orang lain',
          isCorrect: true,
          feedback: '🎉 Hebat sekali! Kamu sangat teliti memahami watak sombong kelinci yang memamerkan kelebihannya.',
          hint: 'Perhatikan bagaimana kelinci membandingkan dirinya dengan kura-kura.'
        },
        {
          id: 'C',
          text: 'Pemalu dan suka bersembunyi di semak',
          isCorrect: false,
          feedback: 'Kelinci justru berdiri tegak dan berbicara lantang di depan semua hewan.',
          hint: 'Tokoh pemalu biasanya tidak suka menjadi pusat perhatian.'
        },
        {
          id: 'D',
          text: 'Penyabar dan gemar menolong',
          isCorrect: false,
          feedback: 'Sifat sabar lebih tepat menggambarkan kura-kura, bukan kelinci.',
          hint: 'Kelinci justru suka membanggakan diri.'
        }
      ]
    },
    nextSceneId: 2
  },
  {
    id: 2,
    sceneNumber: 2,
    title: 'Jawaban Tenang Kura-Kura',
    image: '/assets/comic/scene-02.webp',
    speaker: 'Kura-kura',
    speakerRole: 'turtle',
    dialogue: 'Aku tidak lamban, aku hanya tak ingin terburu-buru dan selalu berhati-hati.',
    narration: 'Kura-kura yang mendengarkannya pun merasa jengkel, tetapi ia tetap menjawab dengan tenang di depan Monyet yang bergelantungan.',
    audio: '/assets/audio/scene-02.mp3',
    hotspots: [
      {
        id: 'spot-monkey-2',
        name: 'Monyet',
        xPercent: 15,
        yPercent: 35,
        title: 'Monyet Hutan',
        reaction: 'Uu-aa! Kura-kura benar sekali! Yang penting selamat sampai tujuan!',
        soundType: 'pop'
      },
      {
        id: 'spot-turtle-2',
        name: 'Kura-kura Bijak',
        xPercent: 50,
        yPercent: 70,
        title: 'Kura-kura',
        reaction: 'Ketekunan dan kehati-hatian adalah kunci dalam setiap perjalanan.',
        soundType: 'chime'
      }
    ],
    checkpoint: {
      id: 'chk-2',
      title: 'Checkpoint Kosakata',
      question: 'Apakah arti kata "lamban" dalam percakapan antara kelinci dan kura-kura?',
      indicator: 'kosakata',
      points: 10,
      options: [
        {
          id: 'A',
          text: 'Bergerak atau berjalan tidak cepat; perlahan-lahan',
          isCorrect: true,
          feedback: '⭐ Luar biasa! "Lamban" artinya berjalan perlahan atau tidak tergesa-gesa.',
          hint: 'Lawan kata dari lamban adalah cepat atau tangkas.'
        },
        {
          id: 'B',
          text: 'Pandai berenang di air deras',
          isCorrect: false,
          feedback: 'Itu keahlian berenang, bukan arti dari kata lamban.',
          hint: 'Lamban berkaitan dengan kecepatan berjalan.'
        },
        {
          id: 'C',
          text: 'Mudah lelah saat mengangkat benda',
          isCorrect: false,
          feedback: 'Kurang tepat. Lamban mengacu pada laju gerakan, bukan kekuatan.',
          hint: 'Pikirkan tentang cara kura-kura melangkah.'
        },
        {
          id: 'D',
          text: 'Suka beristirahat di bawah pohon',
          isCorrect: false,
          feedback: 'Itu adalah kebiasaan beristirahat, bukan arti kata lamban.',
          hint: 'Perhatikan kata cepat vs lamban.'
        }
      ]
    },
    nextSceneId: 3
  },
  {
    id: 3,
    sceneNumber: 3,
    title: 'Ledekan Kelinci yang Berulang',
    image: '/assets/comic/scene-03.webp',
    speaker: 'Kelinci',
    speakerRole: 'rabbit',
    dialogue: 'Akui saja jika kau memang lamban, kura-kura! Hahaha!',
    narration: 'Kelinci merasa puas jika teman yang diledeknya merasa berkecil hati di depan umum.',
    audio: '/assets/audio/scene-03.mp3',
    hotspots: [
      {
        id: 'spot-rabbit-3',
        name: 'Kelinci Meledek',
        xPercent: 75,
        yPercent: 38,
        title: 'Kelinci Tertawa',
        reaction: 'Mana mungkin kamu bisa menandingi kecepatan lompatanku!',
        soundType: 'laugh'
      },
      {
        id: 'spot-fox-3',
        name: 'Rubah Mengamati',
        xPercent: 18,
        yPercent: 55,
        title: 'Rubah',
        reaction: 'Hmm... Sikap kelinci lama-kelamaan keterlaluan pada temannya.',
        soundType: 'pop'
      }
    ],
    checkpoint: {
      id: 'chk-3',
      title: 'Checkpoint Konflik',
      question: 'Apakah sumber konflik (masalah utama) yang terjadi pada cerita di atas?',
      indicator: 'konflik',
      points: 10,
      options: [
        {
          id: 'A',
          text: 'Kelinci dan kura-kura berebut makanan wortel',
          isCorrect: false,
          feedback: 'Cerita tidak menceritakan perselisihan makanan.',
          hint: 'Lihat ucapan kelinci yang mengejek kura-kura.'
        },
        {
          id: 'B',
          text: 'Kelinci terus-menerus meledek dan meremehkan kura-kura',
          isCorrect: true,
          feedback: '🔍 Tepat sekali! Konflik bermula karena kelinci merasa paling unggul dan senang meremehkan teman.',
          hint: 'Kelinci membuat kura-kura merasa jengkel dengan kata-katanya.'
        },
        {
          id: 'C',
          text: 'Kura-kura merusak jembatan kayu sungai',
          isCorrect: false,
          feedback: 'Jembatan kayu tetap kokoh dan digunakan oleh hewan-hewan lain.',
          hint: 'Perhatikan hubungan antar tokoh.'
        },
        {
          id: 'D',
          text: 'Monyet melarang kelinci melintasi hutan',
          isCorrect: false,
          feedback: 'Monyet hanya menjadi penonton dan teman baik mereka.',
          hint: 'Fokus pada apa yang dilakukan kelinci terhadap kura-kura.'
        }
      ]
    },
    nextSceneId: 4
  },
  {
    id: 4,
    sceneNumber: 4,
    title: 'Tantangan Lomba Lari Kura-Kura',
    image: '/assets/comic/scene-04.webp',
    speaker: 'Kura-kura',
    speakerRole: 'turtle',
    dialogue: 'Aku akan membuktikan bahwa aku bukan binatang yang lamban. Bagaimana jika kita lomba lari?',
    narration: 'Kura-kura menegakkan kepalanya. Keheningan sesaat melanda hutan saat mendengar tantangan tak terduga itu.',
    audio: '/assets/audio/scene-04.mp3',
    hotspots: [
      {
        id: 'spot-turtle-4',
        name: 'Kura-kura Bertekad',
        xPercent: 42,
        yPercent: 65,
        title: 'Tekad Kura-kura',
        reaction: 'Aku percaya pada usaha keras dan doa, bukan sekadar kesombongan!',
        soundType: 'chime'
      },
      {
        id: 'spot-trees-4',
        name: 'Hutan Rindang',
        xPercent: 78,
        yPercent: 25,
        title: 'Angin Hutan',
        reaction: 'Daun-daun berbisik menyaksikan keberanian kura-kura.',
        soundType: 'pop'
      }
    ],
    checkpoint: {
      id: 'chk-4',
      title: 'Checkpoint Pesan Moral',
      question:
        'Nilai budi pekerti apakah yang dapat kita teladani dari sikap kura-kura saat menerima ejekan kelinci?',
      indicator: 'pesanMoral',
      points: 10,
      options: [
        {
          id: 'A',
          text: 'Menyimpan dendam dan menantang dengan cara curang',
          isCorrect: false,
          feedback: 'Kura-kura sama sekali tidak berbuat curang atau berniat dendam.',
          hint: 'Kura-kura memilih cara yang jujur dan sportif.'
        },
        {
          id: 'B',
          text: 'Percaya diri, tidak berkecil hati, dan membuktikan kemampuan dengan cara yang sportif',
          isCorrect: true,
          feedback: '🌟 Luar biasa! Kura-kura mengajarkan bahwa kita tetap rendah hati dan berpikir positif meski diremehkan orang lain.',
          hint: 'Sikap terpuji kura-kura adalah tetap semangat tanpa membalas dengan keburukan.'
        },
        {
          id: 'C',
          text: 'Membalas ejekan dengan memukul kelinci',
          isCorrect: false,
          feedback: 'Membalas dengan kekerasan bukanlah budi pekerti yang baik.',
          hint: 'Kura-kura tidak pernah menyentuh kelinci sedikit pun.'
        },
        {
          id: 'D',
          text: 'Meminta bantuan singa untuk menghukum kelinci',
          isCorrect: false,
          feedback: 'Menyuruh hewan lain menghukum bukanlah contoh budi pekerti yang luhur.',
          hint: 'Kura-kura menyelesaikan masalahnya sendiri secara adil.'
        }
      ]
    },
    nextSceneId: 5
  },
  {
    id: 5,
    sceneNumber: 5,
    title: 'Garis Awal Perlombaan Rimba',
    image: '/assets/comic/scene-05.webp',
    speaker: 'Monyet',
    speakerRole: 'monkey',
    dialogue: 'Bersedia... Siap... Satu... Dua... Tiga... Lariiii!',
    narration: 'Seluruh warga hutan berkumpul di garis start. Bendera daun diangkat tinggi oleh Monyet yang bertugas sebagai wasit.',
    audio: '/assets/audio/scene-05.mp3',
    hotspots: [
      {
        id: 'spot-monkey-5',
        name: 'Monyet Wasit',
        xPercent: 50,
        yPercent: 30,
        title: 'Monyet Sang Wasit',
        reaction: 'Ayo semua tertib! Siapa yang mencapai pohon beringin pertama adalah pemenang!',
        soundType: 'cheer'
      },
      {
        id: 'spot-animals-5',
        name: 'Sorak Sahabat Hutan',
        xPercent: 20,
        yPercent: 70,
        title: 'Penonton Hewan',
        reaction: 'Semangat Kura-kura! Ayo Kelinci!',
        soundType: 'cheer'
      }
    ],
    checkpoint: {
      id: 'chk-5',
      title: 'Checkpoint Alur Cerita',
      question: 'Setelah kura-kura menantang kelinci, bagaimana urutan alur peristiwa selanjutnya?',
      indicator: 'alur',
      points: 10,
      options: [
        {
          id: 'A',
          text: 'Kelinci langsung pulang dan lomba dibatalkan',
          isCorrect: false,
          feedback: 'Kelinci menerima tantangan karena yakin ia pasti menang.',
          hint: 'Mereka sepakat untuk menggelar lomba lari.'
        },
        {
          id: 'B',
          text: 'Hewan-hewan hutan berkumpul dan perlombaan lari resmi dimulai',
          isCorrect: true,
          feedback: '🛤️ Pintar! Alur cerita berlanjut ke persiapan lomba yang disaksikan seluruh sahabat rimba.',
          hint: 'Monyet mengibarkan bendera start.'
        },
        {
          id: 'C',
          text: 'Kura-kura tiba-tiba jatuh sakit sehingga batal berlari',
          isCorrect: false,
          feedback: 'Kura-kura dalam keadaan sehat dan siap berlari.',
          hint: 'Keduanya berdiri gagah di garis start.'
        },
        {
          id: 'D',
          text: 'Hujan badai mengguyur hutan hingga malam hari',
          isCorrect: false,
          feedback: 'Cuaca hutan sangat cerah dan berangin sejuk.',
          hint: 'Suasana sangat mendukung perlombaan.'
        }
      ]
    },
    nextSceneId: 6
  },
  {
    id: 6,
    sceneNumber: 6,
    title: 'Kelinci Melesat Cepat Seperti Angin',
    image: '/assets/comic/scene-06.webp',
    speaker: 'Kelinci',
    speakerRole: 'rabbit',
    dialogue: 'Wuuush! Lihat, kura-kura masih jauh sekali di belakang! Kemenangan ini sudah pasti milikku!',
    narration: 'Hanya dalam hitungan menit, kelinci sudah melompati bukit kecil dan meninggalkan kura-kura yang baru melangkah beberapa jengkal.',
    audio: '/assets/audio/scene-06.mp3',
    hotspots: [
      {
        id: 'spot-rabbit-6',
        name: 'Kelinci Melompat',
        xPercent: 70,
        yPercent: 42,
        title: 'Lompatan Cepat Kelinci',
        reaction: 'Lariku seperti kilat! Tak ada yang bisa mengejarku!',
        soundType: 'pop'
      },
      {
        id: 'spot-dust-6',
        name: 'Debu Kecepatan',
        xPercent: 35,
        yPercent: 78,
        title: 'Jejak Lari',
        reaction: 'Bum! Debu beterbangan di sepanjang jalur lintasan.',
        soundType: 'pop'
      }
    ],
    checkpoint: {
      id: 'chk-6',
      title: 'Checkpoint Kosakata',
      question: 'Ungkapan "berkecil hati" yang dirasakan seseorang saat diejek memiliki arti...',
      indicator: 'kosakata',
      points: 10,
      options: [
        {
          id: 'A',
          text: 'Merasa sangat sombong dan bangga',
          isCorrect: false,
          feedback: 'Itu adalah arti dari tinggi hati atau besar kepala.',
          hint: 'Berkecil hati adalah perasaan sebaliknya.'
        },
        {
          id: 'B',
          text: 'Merasa sedih, hilang keberanian, atau merasa rendah diri',
          isCorrect: true,
          feedback: '📚 Keren sekali! "Berkecil hati" artinya patah semangat, sedih, atau merasa tidak berharga.',
          hint: 'Pikirkan perasaan saat seseorang diremehkan.'
        },
        {
          id: 'C',
          text: 'Ukuran jantung yang menjadi kecil',
          isCorrect: false,
          feedback: 'Ini adalah ungkapan kiasan, bukan arti organ tubuh sebenarnya.',
          hint: 'Ini adalah kata kiasan untuk perasaan hati.'
        },
        {
          id: 'D',
          text: 'Merasa lapar dan haus setelah berjalan jauh',
          isCorrect: false,
          feedback: 'Itu rasa lapar fisik, bukan makna berkecil hati.',
          hint: 'Berkaitan dengan semangat dan keberanian.'
        }
      ]
    },
    nextSceneId: 7
  },
  {
    id: 7,
    sceneNumber: 7,
    title: 'Kelinci Tertidur di Bawah Pohon Rindang',
    image: '/assets/comic/scene-07.webp',
    speaker: 'Kelinci',
    speakerRole: 'rabbit',
    dialogue: 'Zzz... Udara di sini sejuk sekali. Aku tidur sebentar saja. Kura-kura butuh berjam-jam untuk sampai ke sini.',
    narration: 'Kelinci yang terlalu percaya diri merebahkan badannya di rumput lembut bawah pohon beringin, lalu terlelap mendengkur.',
    audio: '/assets/audio/scene-07.mp3',
    hotspots: [
      {
        id: 'spot-tree-7',
        name: 'Pohon Rindang',
        xPercent: 48,
        yPercent: 28,
        title: 'Pohon Teduh',
        reaction: 'Angin sepoi-sepoi membuat siapa pun mengantuk...',
        soundType: 'pop'
      },
      {
        id: 'spot-rabbit-sleep-7',
        name: 'Kelinci Mendengkur',
        xPercent: 55,
        yPercent: 68,
        title: 'Kelinci Tertidur Pulas',
        reaction: 'Zzz... Zzz... Aku juara... Zzz...',
        soundType: 'snore'
      }
    ],
    checkpoint: {
      id: 'chk-7',
      title: 'Checkpoint Titik Balik Konflik',
      question: 'Apakah tindakan kelinci yang menjadi titik balik (penyebab kekalahan) dalam perlombaan?',
      indicator: 'konflik',
      points: 10,
      options: [
        {
          id: 'A',
          text: 'Kelinci tersandung akar pohon hingga kakinya patah',
          isCorrect: false,
          feedback: 'Kaki kelinci tidak cedera sama sekali.',
          hint: 'Kelinci sendiri yang memilih untuk beristirahat santai.'
        },
        {
          id: 'B',
          text: 'Meremehkan lawan dan memilih tidur lelap di bawah pohon',
          isCorrect: true,
          feedback: '⚡ Tepat sekali! Sikap lalai dan meremehkan lawan membuat kelinci kehilangan keunggulannya.',
          hint: 'Kelinci merasa lawannya terlalu lambat sehingga ia lalai.'
        },
        {
          id: 'C',
          text: 'Kelinci salah memilih jalan menuju jurang',
          isCorrect: false,
          feedback: 'Jalan lintasan sudah ditandai dengan jelas oleh monyet.',
          hint: 'Kelinci tidur di tepi jalur perlombaan.'
        },
        {
          id: 'D',
          text: 'Kelinci dihentikan oleh pemburu di hutan',
          isCorrect: false,
          feedback: 'Hutan ini aman dan tidak ada pemburu dalam cerita.',
          hint: 'Fokus pada pilihan tindakan kelinci sendiri.'
        }
      ]
    },
    nextSceneId: 8
  },
  {
    id: 8,
    sceneNumber: 8,
    title: 'Langkah Kura-Kura yang Penuh Kegigihan',
    image: '/assets/comic/scene-08.webp',
    speaker: 'Kura-kura',
    speakerRole: 'turtle',
    dialogue: 'Satu langkah demi satu langkah... Aku tidak boleh menyerah sampai garis finish terlihat!',
    narration:
      'Dengan peluh menetes, kura-kura terus mengayunkan kakinya dan melintasi kelinci yang mendengkur tanpa bersuara. Ia akhirnya melangkah melewati garis finish lebih dahulu! Kelinci yang terbangun hanya bisa tertunduk malu. Kesombongan dan kelalaian membuat kura-kura yang lambat justru keluar sebagai pemenang.',
    audio: '/assets/audio/scene-08.mp3',
    hotspots: [
      {
        id: 'spot-turtle-8',
        name: 'Kura-kura Berjalan',
        xPercent: 42,
        yPercent: 62,
        title: 'Kura-kura Gigih',
        reaction: 'Tap... tap... tap... Usaha tidak akan pernah mengkhianati hasil!',
        soundType: 'chime'
      },
      {
        id: 'spot-road-8',
        name: 'Jalan Berbatu',
        xPercent: 75,
        yPercent: 78,
        title: 'Lintasan Menanjak',
        reaction: 'Jalan terjal dilalui dengan sabar selangkah demi selangkah.',
        soundType: 'pop'
      }
    ],
    checkpoint: {
      id: 'chk-8',
      title: 'Checkpoint Simpulan Cerita',
      question:
        'Berdasarkan sikap kelinci yang tertidur lelap, kesimpulan apakah yang dapat kamu tarik tentang akhir perlombaan?',
      indicator: 'kesimpulan',
      points: 10,
      options: [
        {
          id: 'A',
          text: 'Kelinci tetap menang karena larinya paling cepat',
          isCorrect: false,
          feedback: 'Kecepatan tidak berguna jika sudah membuang waktu tidur.',
          hint: 'Kura-kura terus melangkah tanpa berhenti.'
        },
        {
          id: 'B',
          text: 'Kura-kura yang tekun tanpa berhenti melangkah kemungkinan besar akan sampai garis finish lebih dahulu',
          isCorrect: true,
          feedback: '🎯 Sangat tajam! Ketekunan dan konsistensi kura-kura menjadi kunci kemenangannya di akhir cerita.',
          hint: 'Siapa yang tidak pernah berhenti berusaha, dialah yang lebih dulu sampai tujuan.'
        },
        {
          id: 'C',
          text: 'Kedua peserta mendapatkan hadiah yang sama besar',
          isCorrect: false,
          feedback: 'Perlombaan tetap menentukan satu pemenang yang mencapai garis finish lebih dulu.',
          hint: 'Perlombaan lari pasti memiliki pemenang tunggal.'
        },
        {
          id: 'D',
          text: 'Perlombaan dibatalkan oleh monyet selaku wasit',
          isCorrect: false,
          feedback: 'Monyet tidak pernah membatalkan perlombaan.',
          hint: 'Lomba tetap berlangsung sampai ada yang melewati garis akhir.'
        }
      ]
    },
    nextSceneId: null
  }
];
