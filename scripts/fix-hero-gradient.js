const fs = require('fs');

let c = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const oldGradient = /<div className="absolute inset-0 bg-gradient-to-r from-\[\#0f172a\]\/95 via-\[\#0f172a\]\/70 to-transparent z-10 mix-blend-multiply opacity-90" \/>/g;

const newGradient = `<div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10 pointer-events-none mix-blend-multiply opacity-95" />`;

if (oldGradient.test(c)) {
  c = c.replace(oldGradient, newGradient);
  fs.writeFileSync('src/components/Hero.tsx', c);
  console.log('Fixed gradient in Hero.tsx');
} else {
  console.log('Gradient regex did not match.');
}
