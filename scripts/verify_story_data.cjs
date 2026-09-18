const fs = require('fs');
const path = require('path');

// 1. Verify comic asset existence
const comicDir = path.join(__dirname, '..', 'public', 'assets', 'comic');
const files = fs.readdirSync(comicDir);
console.log(`Ditemukan ${files.length} file di public/assets/comic:`);
files.forEach(f => console.log(` - ${f}`));

for (let i = 1; i <= 10; i++) {
  const num = i < 10 ? `0${i}` : `${i}`;
  const svgFile = `scene-${num}.svg`;
  if (!files.includes(svgFile)) {
    console.error(`ERROR: File ${svgFile} tidak ditemukan!`);
    process.exit(1);
  }
}
console.log('✅ Semua 10 file scene SVG terverifikasi!');

// 2. Verify Manifest and Favicon
const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
const faviconPath = path.join(__dirname, '..', 'public', 'favicon.svg');

if (!fs.existsSync(manifestPath) || !fs.existsSync(faviconPath)) {
  console.error('ERROR: manifest.json atau favicon.svg hilang!');
  process.exit(1);
}
console.log('✅ Manifest PWA & Favicon terverifikasi!');

console.log('✅ SEMUA UJI INTEGRITAS DATA BERHASIL 100%!');
