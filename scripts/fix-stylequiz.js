const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(process.cwd(), 'public', 'assets', 'quiz');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const images = [
  { name: 'modern.jpg', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600' },
  { name: 'minimalist.jpg', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600' },
  { name: 'industrial.jpg', url: 'https://images.unsplash.com/photo-1590483734724-383b85ad65e7?q=80&w=600' },
  { name: 'biophilic.jpg', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600' }
];

async function download() {
  for (const img of images) {
    const dest = path.join(dir, img.name);
    console.log('Downloading', img.url, 'to', dest);
    await new Promise((resolve, reject) => {
      https.get(img.url, (res) => {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    });
  }
  
  // Update StyleQuiz.tsx
  let c = fs.readFileSync('src/components/StyleQuiz.tsx', 'utf8');
  
  // Replace imports
  if (!c.includes('import Image from "next/image"')) {
    c = c.replace(/import { Check, Loader2, Sparkles, ArrowRight, Heart } from"lucide-react";/, 'import { Check, Loader2, Sparkles, ArrowRight, Heart } from"lucide-react";\nimport Image from "next/image";');
  }

  // Replace image URLs
  c = c.replace(/"https:\/\/images\.unsplash\.com\/photo-1600210492486-724fe5c67fb0\?q=80&w=600"/g, '"/assets/quiz/modern.jpg"');
  c = c.replace(/"https:\/\/images\.unsplash\.com\/photo-1618221195710-dd6b41faaea6\?q=80&w=600"/g, '"/assets/quiz/minimalist.jpg"');
  c = c.replace(/"https:\/\/images\.unsplash\.com\/photo-1590483734724-383b85ad65e7\?q=80&w=600"/g, '"/assets/quiz/industrial.jpg"');
  c = c.replace(/"https:\/\/images\.unsplash\.com\/photo-1523050854058-8df90110c9f1\?q=80&w=600"/g, '"/assets/quiz/biophilic.jpg"');

  // Replace <img> with <Image>
  c = c.replace(/<img loading="lazy" decoding="async" src={style\.image} alt={style\.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" \/>/g, '<Image unoptimized={true} src={style.image} alt={style.name} fill className="object-cover transition-transform group-hover:scale-110" sizes="(max-width: 768px) 100vw, 300px" priority={false} />');

  fs.writeFileSync('src/components/StyleQuiz.tsx', c);
  console.log('StyleQuiz.tsx updated and assets downloaded');
}

download();
