const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'comic');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Helper SVG parts
const forestBackground = `
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7dd3fc" />
      <stop offset="60%" stop-color="#bae6fd" />
      <stop offset="100%" stop-color="#d9f99d" />
    </linearGradient>
    <linearGradient id="sunbeam" x1="0%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#fde047" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="treeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#15803d" />
      <stop offset="100%" stop-color="#14532d" />
    </linearGradient>
    <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
    <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#78350f" />
    </linearGradient>
    <filter id="comicShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="3" dy="4" stdDeviation="2" flood-color="#1e293b" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Langit & Cahaya Matahari -->
  <rect width="1000" height="700" fill="url(#skyGrad)"/>
  <polygon points="200,0 350,0 550,700 350,700" fill="url(#sunbeam)" />
  <polygon points="550,0 700,0 850,700 650,700" fill="url(#sunbeam)" />

  <!-- Dedaunan Latar Belakang -->
  <circle cx="100" cy="180" r="180" fill="#166534" opacity="0.8"/>
  <circle cx="280" cy="140" r="160" fill="#15803d" opacity="0.9"/>
  <circle cx="500" cy="100" r="140" fill="#166534" opacity="0.8"/>
  <circle cx="750" cy="120" r="170" fill="#15803d" opacity="0.9"/>
  <circle cx="920" cy="160" r="190" fill="#14532d" opacity="0.8"/>

  <!-- Batang Pohon Rimbun -->
  <path d="M40,700 Q70,400 50,150 L90,150 Q110,400 130,700 Z" fill="#78350f"/>
  <path d="M880,700 Q860,400 870,120 L920,120 Q930,400 950,700 Z" fill="#78350f"/>

  <!-- Tanah & Rumput -->
  <path d="M0,450 Q300,430 500,480 T1000,460 L1000,700 L0,700 Z" fill="#22c55e"/>
  <path d="M0,490 Q250,470 480,510 T1000,490 L1000,700 L0,700 Z" fill="#16a34a"/>
`;

const woodenBridgeAndRiver = `
  <!-- Aliran Sungai Berkelok -->
  <path d="M380,480 C420,530 460,600 500,700 L750,700 C700,590 640,520 600,480 Z" fill="url(#riverGrad)"/>
  
  <!-- Percikan & Bebatuan Sungai -->
  <ellipse cx="480" cy="620" rx="35" ry="18" fill="#64748b"/>
  <ellipse cx="475" cy="615" rx="28" ry="12" fill="#94a3b8"/>
  <ellipse cx="620" cy="640" rx="40" ry="20" fill="#475569"/>
  <ellipse cx="615" cy="635" rx="30" ry="14" fill="#64748b"/>
  
  <!-- Ombak / Aliran Air -->
  <path d="M450,550 Q480,540 510,550" stroke="#bae6fd" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M530,620 Q560,610 590,620" stroke="#e0f2fe" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M500,670 Q540,660 580,670" stroke="#bae6fd" stroke-width="4" stroke-linecap="round" fill="none"/>

  <!-- Jembatan Kayu Menyeberang -->
  <path d="M350,490 Q480,440 630,470 L640,510 Q490,480 340,530 Z" fill="url(#bridgeGrad)" filter="url(#comicShadow)"/>
  <!-- Tiang & Pagar Jembatan -->
  <path d="M350,490 Q480,420 630,450" stroke="#92400e" stroke-width="8" fill="none" stroke-linecap="round"/>
  <line x1="390" y1="475" x2="390" y2="520" stroke="#78350f" stroke-width="6"/>
  <line x1="450" y1="460" x2="450" y2="505" stroke="#78350f" stroke-width="6"/>
  <line x1="510" y1="455" x2="510" y2="495" stroke="#78350f" stroke-width="6"/>
  <line x1="570" y1="458" x2="570" y2="492" stroke="#78350f" stroke-width="6"/>
`;

// Karakter Kura-Kura di kiri/tengah
function renderTurtle(cx, cy, scale = 1, expression = 'normal') {
  return `
    <g transform="translate(${cx}, ${cy}) scale(${scale})" filter="url(#comicShadow)">
      <!-- Kaki Kura-Kura -->
      <ellipse cx="-45" cy="40" rx="18" ry="12" fill="#577840" stroke="#2d401e" stroke-width="3"/>
      <ellipse cx="45" cy="40" rx="18" ry="12" fill="#577840" stroke="#2d401e" stroke-width="3"/>
      <ellipse cx="-15" cy="45" rx="16" ry="10" fill="#4d6b38" stroke="#2d401e" stroke-width="3"/>
      <ellipse cx="25" cy="45" rx="16" ry="10" fill="#4d6b38" stroke="#2d401e" stroke-width="3"/>

      <!-- Tempurung Kura-Kura -->
      <ellipse cx="0" cy="10" rx="75" ry="50" fill="#607d3b" stroke="#283b1a" stroke-width="5"/>
      <!-- Motif Pola Tempurung -->
      <polygon points="0,-15 30,-5 30,20 0,30 -30,20 -30,-5" fill="#7a9a4d" stroke="#283b1a" stroke-width="3"/>
      <polygon points="0,-15 45,-30 70,-10 30,-5" fill="#6d8c42" stroke="#283b1a" stroke-width="3"/>
      <polygon points="0,-15 -45,-30 -70,-10 -30,-5" fill="#6d8c42" stroke="#283b1a" stroke-width="3"/>
      <polygon points="0,30 35,45 65,30 30,20" fill="#6d8c42" stroke="#283b1a" stroke-width="3"/>
      <polygon points="0,30 -35,45 -65,30 -30,20" fill="#6d8c42" stroke="#283b1a" stroke-width="3"/>

      <!-- Leher & Kepala Kura-Kura -->
      <path d="M-60,10 Q-80,0 -85,-20 Q-80,-40 -55,-35 Q-40,-15 -45,15 Z" fill="#7da054" stroke="#283b1a" stroke-width="4"/>
      <!-- Mata Kura-Kura -->
      <circle cx="-70" cy="-25" r="7" fill="#ffffff" stroke="#283b1a" stroke-width="2"/>
      <circle cx="-71" cy="-25" r="4" fill="#1e293b"/>
      <circle cx="-73" cy="-27" r="1.5" fill="#ffffff"/>
      <!-- Garis Mulut & Ekspresi -->
      ${
        expression === 'determined'
          ? '<path d="M-82,-15 Q-72,-10 -62,-15" stroke="#283b1a" stroke-width="3" fill="none"/>'
          : expression === 'happy'
          ? '<path d="M-80,-15 Q-70,-6 -60,-15" stroke="#283b1a" stroke-width="3" fill="#ef4444"/>'
          : '<path d="M-80,-14 Q-70,-16 -62,-13" stroke="#283b1a" stroke-width="3" fill="none"/>'
      }
    </g>
  `;
}

// Karakter Kelinci di kanan
function renderRabbit(cx, cy, scale = 1, state = 'laughing') {
  return `
    <g transform="translate(${cx}, ${cy}) scale(${scale})" filter="url(#comicShadow)">
      <!-- Kaki Panjang Kelinci -->
      <ellipse cx="-20" cy="90" rx="14" ry="24" fill="#c49a6c" stroke="#5c3d1e" stroke-width="4"/>
      <ellipse cx="25" cy="90" rx="15" ry="24" fill="#c49a6c" stroke="#5c3d1e" stroke-width="4"/>
      <ellipse cx="-20" cy="110" rx="18" ry="10" fill="#dfbe97" stroke="#5c3d1e" stroke-width="3"/>
      <ellipse cx="25" cy="110" rx="18" ry="10" fill="#dfbe97" stroke="#5c3d1e" stroke-width="3"/>

      <!-- Badan Kelinci -->
      <ellipse cx="0" cy="40" rx="42" ry="55" fill="#c49a6c" stroke="#5c3d1e" stroke-width="4"/>
      <!-- Perut Putih Lembut -->
      <ellipse cx="0" cy="48" rx="26" ry="36" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>

      <!-- Telinga Panjang -->
      ${
        state === 'panicking'
          ? `
          <path d="M-25,-40 Q-50,-120 -20,-130 Q5,-120 -5,-40 Z" fill="#c49a6c" stroke="#5c3d1e" stroke-width="4"/>
          <path d="M-20,-45 Q-40,-115 -18,-122 Q-3,-115 -7,-45 Z" fill="#fbcfe8"/>
          <path d="M15,-40 Q40,-120 15,-130 Q-5,-120 5,-40 Z" fill="#c49a6c" stroke="#5c3d1e" stroke-width="4"/>
          <path d="M13,-45 Q32,-115 14,-122 Q2,-115 5,-45 Z" fill="#fbcfe8"/>
        `
          : `
          <path d="M-20,-40 Q-35,-130 -10,-135 Q10,-125 -5,-40 Z" fill="#c49a6c" stroke="#5c3d1e" stroke-width="4"/>
          <path d="M-17,-45 Q-28,-120 -10,-125 Q4,-120 -7,-45 Z" fill="#fbcfe8"/>
          <path d="M15,-40 Q30,-130 10,-135 Q-5,-125 5,-40 Z" fill="#c49a6c" stroke="#5c3d1e" stroke-width="4"/>
          <path d="M13,-45 Q24,-120 10,-125 Q0,-120 5,-45 Z" fill="#fbcfe8"/>
        `
      }

      <!-- Kepala Kelinci -->
      <circle cx="0" cy="-20" r="42" fill="#c49a6c" stroke="#5c3d1e" stroke-width="4"/>
      <ellipse cx="-18" cy="-10" rx="14" ry="12" fill="#fef3c7"/>
      <ellipse cx="18" cy="-10" rx="14" ry="12" fill="#fef3c7"/>

      <!-- Pipi Pink Merona -->
      <ellipse cx="-26" cy="-15" rx="8" ry="5" fill="#f472b6" opacity="0.6"/>
      <ellipse cx="26" cy="-15" rx="8" ry="5" fill="#f472b6" opacity="0.6"/>

      <!-- Hidung & Mulut -->
      <polygon points="-5,-22 5,-22 0,-16" fill="#f43f5e"/>
      ${
        state === 'laughing'
          ? `
          <!-- Mata tertawa menyipit riang -->
          <path d="M-25,-28 Q-18,-35 -10,-28" stroke="#372412" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M10,-28 Q18,-35 25,-28" stroke="#372412" stroke-width="4" fill="none" stroke-linecap="round"/>
          <!-- Mulut tertawa lebar -->
          <path d="M-16,-12 Q0,10 16,-12 Q0,-8 -16,-12 Z" fill="#dc2626" stroke="#372412" stroke-width="3"/>
          <rect x="-5" y="-12" width="10" height="6" rx="2" fill="#ffffff"/>
        `
          : state === 'panicking'
          ? `
          <!-- Mata terbelalak panik -->
          <circle cx="-16" cy="-28" r="9" fill="#ffffff" stroke="#372412" stroke-width="3"/>
          <circle cx="16" cy="-28" r="9" fill="#ffffff" stroke="#372412" stroke-width="3"/>
          <circle cx="-16" cy="-28" r="4" fill="#0f172a"/>
          <circle cx="16" cy="-28" r="4" fill="#0f172a"/>
          <!-- Mulut menganga kaget -->
          <ellipse cx="0" cy="-6" rx="10" ry="14" fill="#991b1b" stroke="#372412" stroke-width="3"/>
        `
          : state === 'sleeping'
          ? `
          <!-- Mata terpejam pulas -->
          <path d="M-24,-24 Q-16,-20 -8,-24" stroke="#372412" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M8,-24 Q16,-20 24,-24" stroke="#372412" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M-6,-12 Q0,-6 6,-12" stroke="#372412" stroke-width="3" fill="none"/>
        `
          : `
          <circle cx="-16" cy="-26" r="6" fill="#372412"/>
          <circle cx="16" cy="-26" r="6" fill="#372412"/>
          <path d="M-10,-12 Q0,-4 10,-12" stroke="#372412" stroke-width="3" fill="none"/>
        `
      }

      <!-- Tangan Kelinci -->
      <path d="M-35,30 Q-50,45 -35,55" stroke="#c49a6c" stroke-width="16" stroke-linecap="round"/>
      <path d="M35,30 Q50,45 35,55" stroke="#c49a6c" stroke-width="16" stroke-linecap="round"/>
    </g>
  `;
}

// Balon Kata Komik (Speech Bubble)
function renderSpeechBubble(x, y, w, h, text, speakerName, tailX, tailY) {
  return `
    <g filter="url(#comicShadow)">
      <!-- Ekor Balon Ucapan -->
      <polygon points="${x + w / 2 - 15},${y + h - 5} ${x + w / 2 + 15},${y + h - 5} ${tailX},${tailY}" fill="#ffffff" stroke="#1e293b" stroke-width="4"/>
      <!-- Badan Balon Ucapan -->
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="#ffffff" stroke="#1e293b" stroke-width="4"/>
      <polygon points="${x + w / 2 - 12},${y + h - 6} ${x + w / 2 + 12},${y + h - 6} ${tailX},${tailY - 2}" fill="#ffffff"/>
      
      <!-- Label Pembicara -->
      <rect x="${x + 20}" y="${y - 14}" width="${speakerName.length * 11 + 24}" height="26" rx="8" fill="#f59e0b" stroke="#1e293b" stroke-width="2"/>
      <text x="${x + 32}" y="${y + 4}" font-family="'Fredoka', 'Nunito', sans-serif" font-weight="bold" font-size="14" fill="#ffffff">${speakerName}</text>
      
      <!-- Teks Dialog -->
      <text x="${x + w / 2}" y="${y + h / 2 + 4}" font-family="'Fredoka', 'Nunito', 'Comic Sans MS', sans-serif" font-size="18" font-weight="600" fill="#0f172a" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </g>
  `;
}

// Kotak Narasi
function renderNarrationBox(x, y, w, h, text) {
  return `
    <g filter="url(#comicShadow)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#fef3c7" stroke="#92400e" stroke-width="3"/>
      <text x="${x + 20}" y="${y + h / 2 + 5}" font-family="'Nunito', sans-serif" font-size="15" font-weight="bold" fill="#78350f" dominant-baseline="middle">
        📖 ${text}
      </text>
    </g>
  `;
}

// Daftar 10 Scene
const scenes = [
  {
    num: '01',
    content: `
      ${forestBackground}
      ${woodenBridgeAndRiver}
      <!-- Kura-kura di sebelah kiri sungai -->
      ${renderTurtle(280, 520, 1.2, 'normal')}
      <!-- Kelinci berdiri di atas batu tepi kanan sungai -->
      <ellipse cx="800" cy="560" rx="60" ry="25" fill="#64748b" stroke="#334155" stroke-width="4"/>
      ${renderRabbit(800, 420, 1.1, 'laughing')}
      
      <!-- Balon Kata Kelinci -->
      ${renderSpeechBubble(420, 70, 520, 95, '"Lihatlah teman-teman! Kakiku panjang. Aku bisa berlari cepat!"', 'Kelinci', 780, 310)}
      <!-- Narasi -->
      ${renderNarrationBox(40, 40, 360, 50, 'Di tepi sungai, kelinci membanggakan diri')}
    `
  },
  {
    num: '02',
    content: `
      ${forestBackground}
      <!-- Monyet di dahan pohon kiri -->
      <g transform="translate(180, 220)" filter="url(#comicShadow)">
        <path d="M-20,-100 Q-40,0 -10,30" stroke="#78350f" stroke-width="8" fill="none"/>
        <circle cx="-10" cy="30" r="30" fill="#92400e"/>
        <circle cx="-10" cy="30" r="22" fill="#fef3c7"/>
        <circle cx="-18" cy="25" r="4" fill="#0f172a"/>
        <circle cx="-2" cy="25" r="4" fill="#0f172a"/>
        <path d="M-15,35 Q-10,42 -5,35" stroke="#0f172a" stroke-width="3" fill="none"/>
      </g>

      ${renderTurtle(480, 480, 1.4, 'determined')}
      
      <!-- Balon Kata Kura-kura -->
      ${renderSpeechBubble(160, 290, 580, 95, '"Aku tidak lamban, aku hanya tak ingin terburu-buru."', 'Kura-kura', 450, 440)}
      ${renderNarrationBox(40, 40, 420, 50, 'Kura-kura yang mendengarkannya pun merasa jengkel')}
    `
  },
  {
    num: '03',
    content: `
      ${forestBackground}
      ${renderRabbit(680, 380, 1.2, 'laughing')}
      ${renderTurtle(240, 520, 1.1, 'normal')}
      
      <!-- Balon Ledekan Kelinci -->
      ${renderSpeechBubble(320, 90, 540, 95, '"Akui saja jika kau memang lamban, kura-kura! Haha!"', 'Kelinci', 670, 270)}
      ${renderNarrationBox(180, 610, 640, 50, 'Kelinci merasa puas jika teman yang diledeknya merasa berkecil hati')}
    `
  },
  {
    num: '04',
    content: `
      ${forestBackground}
      ${woodenBridgeAndRiver}
      ${renderTurtle(400, 500, 1.3, 'determined')}
      ${renderRabbit(780, 420, 1.1, 'normal')}
      
      <!-- Balon Tantangan Kura-kura -->
      ${renderSpeechBubble(180, 100, 660, 110, '"Aku akan membuktikan bahwa aku tidak lamban. Mari kita lomba lari!"', 'Kura-kura', 360, 440)}
      ${renderNarrationBox(40, 40, 450, 50, 'Kura-kura berani menantang kelinci berlomba lari')}
    `
  },
  {
    num: '05',
    content: `
      ${forestBackground}
      <!-- Garis Start Bendera -->
      <line x1="450" y1="420" x2="450" y2="680" stroke="#f8fafc" stroke-width="8" stroke-dasharray="16,16"/>
      <rect x="420" y="380" width="160" height="40" rx="8" fill="#ef4444" stroke="#7f1d1d" stroke-width="3"/>
      <text x="500" y="406" font-family="'Fredoka', sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">GARIS START</text>
      
      ${renderTurtle(300, 550, 1.1, 'determined')}
      ${renderRabbit(620, 450, 1.1, 'laughing')}
      
      <!-- Monyet Wasit di atas -->
      <g transform="translate(500, 180)" filter="url(#comicShadow)">
        <circle cx="0" cy="0" r="32" fill="#92400e"/>
        <circle cx="0" cy="2" r="24" fill="#fef3c7"/>
        <text x="0" y="8" font-size="18" text-anchor="middle">🐒</text>
      </g>
      ${renderSpeechBubble(250, 60, 500, 90, '"Bersedia... Siap... Satu... Dua... Tiga... Lariiii!"', 'Wasit Monyet', 500, 170)}
      ${renderNarrationBox(40, 40, 360, 50, 'Perlombaan lari resmi dimulai!')}
    `
  },
  {
    num: '06',
    content: `
      ${forestBackground}
      <!-- Garis Debu Kecepatan Kelinci -->
      <path d="M50,550 Q250,530 450,560" stroke="#cbd5e1" stroke-width="18" stroke-linecap="round" opacity="0.6"/>
      <path d="M150,520 Q350,500 550,530" stroke="#94a3b8" stroke-width="12" stroke-linecap="round" opacity="0.5"/>
      <text x="320" y="510" font-family="'Fredoka', sans-serif" font-size="42" font-weight="bold" fill="#f59e0b">WUUUUSH!</text>

      ${renderRabbit(720, 400, 1.2, 'laughing')}
      <!-- Kura-kura masih jauh di kejauhan -->
      ${renderTurtle(120, 560, 0.6, 'determined')}
      
      ${renderSpeechBubble(350, 90, 560, 95, '"Wuuush! Kura-kura masih jauh sekali! Kemenangan milikku!"', 'Kelinci', 710, 280)}
      ${renderNarrationBox(40, 40, 420, 50, 'Kelinci melesat cepat meninggalkan kura-kura')}
    `
  },
  {
    num: '07',
    content: `
      ${forestBackground}
      <!-- Pohon Rindang Besar -->
      <path d="M450,700 Q500,350 420,100 L580,100 Q520,350 560,700 Z" fill="#78350f"/>
      <circle cx="500" cy="180" r="220" fill="#15803d" opacity="0.95"/>
      <circle cx="420" cy="140" r="160" fill="#22c55e" opacity="0.8"/>

      <!-- Kelinci Tidur Pulas di Bawah Pohon -->
      <g transform="translate(520, 520) rotate(15)">
        ${renderRabbit(0, 0, 1.1, 'sleeping')}
      </g>
      <text x="660" y="440" font-family="'Fredoka', sans-serif" font-size="36" font-weight="bold" fill="#3b82f6">Zzz...</text>
      <text x="720" y="400" font-family="'Fredoka', sans-serif" font-size="28" font-weight="bold" fill="#60a5fa">Zzz...</text>

      ${renderSpeechBubble(360, 80, 540, 95, '"Aku tidur sebentar saja di bawah pohon yang sejuk ini..."', 'Kelinci', 550, 440)}
      ${renderNarrationBox(40, 40, 480, 50, 'Kelinci meremehkan lawan dan tertidur pulas')}
    `
  },
  {
    num: '08',
    content: `
      ${forestBackground}
      <!-- Kelinci masih tidur di latar belakang -->
      <g transform="translate(240, 460) scale(0.7) rotate(15)" opacity="0.8">
        ${renderRabbit(0, 0, 1, 'sleeping')}
        <text x="80" y="-40" font-family="'Fredoka', sans-serif" font-size="32" fill="#3b82f6">Zzz...</text>
      </g>

      <!-- Kura-kura gigih di depan -->
      ${renderTurtle(620, 510, 1.3, 'determined')}
      <!-- Tetesan Keringat Kura-kura -->
      <circle cx="510" cy="460" r="6" fill="#38bdf8"/>
      <circle cx="495" cy="480" r="4" fill="#38bdf8"/>

      ${renderSpeechBubble(300, 90, 600, 95, '"Satu langkah demi satu langkah... Aku tak boleh berhenti!"', 'Kura-kura', 580, 440)}
      ${renderNarrationBox(40, 40, 480, 50, 'Kura-kura terus melangkah dengan tekun tanpa henti')}
    `
  },
  {
    num: '09',
    content: `
      ${forestBackground}
      <!-- Kelinci Bangun Kaget & Panik -->
      ${renderRabbit(280, 400, 1.2, 'panicking')}
      
      <!-- Garis Finish di Kanan -->
      <line x1="880" y1="360" x2="880" y2="680" stroke="#f8fafc" stroke-width="8"/>
      <polygon points="880,380 940,410 880,440" fill="#ef4444"/>
      
      <!-- Kura-kura sudah sangat dekat finish! -->
      ${renderTurtle(780, 540, 1.1, 'determined')}

      ${renderSpeechBubble(160, 80, 620, 100, '"Gawaaat! Matahari sudah sore! Kura-kura sudah dekat finish?!"', 'Kelinci Panik', 280, 280)}
      ${renderNarrationBox(40, 620, 480, 50, 'Kelinci panik bangun saat kura-kura hampir sampai!')}
    `
  },
  {
    num: '10',
    content: `
      ${forestBackground}
      <!-- Pita Kemenangan Terputus -->
      <path d="M720,440 Q750,470 780,430" stroke="#ef4444" stroke-width="12" fill="none"/>
      <text x="500" y="240" font-family="'Fredoka', sans-serif" font-size="44" font-weight="bold" fill="#f59e0b" text-anchor="middle">🎉 JUARA RIMBA! 🎉</text>

      <!-- Kura-kura Juara Tersenyum -->
      ${renderTurtle(650, 510, 1.3, 'happy')}
      <!-- Mahkota Daun Kura-kura -->
      <path d="M540,460 L550,440 L560,460 L570,440 L580,460 Z" fill="#eab308" stroke="#78350f" stroke-width="3"/>

      <!-- Kelinci Meminta Maaf Tertunduk -->
      ${renderRabbit(220, 450, 1.0, 'normal')}

      ${renderSpeechBubble(180, 80, 640, 100, '"Selamat, Kura-kura! Ketekunan dan kerendahan hati selalu menang."', 'Semua Sahabat Hutan', 640, 450)}
      ${renderNarrationBox(200, 620, 600, 50, 'Kelinci meminta maaf dan berjanji tidak akan sombong lagi')}
    `
  }
];

scenes.forEach((s) => {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  ${s.content}
</svg>
  `.trim();

  fs.writeFileSync(path.join(targetDir, `scene-${s.num}.svg`), svg, 'utf-8');
});

console.log('Semua 10 asset komik SVG berhasil dibuat di public/assets/comic/');
