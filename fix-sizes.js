const fs = require('fs');

const files = [
  'D:/VoometDesign/VD-WEB/src/components/TrustedNetworkV2.tsx',
  'D:/VoometDesign/VD-WEB/src/components/BrandsSection.tsx'
];

files.forEach(p => {
  let t = fs.readFileSync(p, 'utf8');
  // It's safer to just inject sizes into the Image component
  t = t.replace(/<Image\s+([\s\S]*?)fill\s/g, '<Image $1fill sizes="(max-width: 768px) 120px, 160px" ');
  fs.writeFileSync(p, t);
  console.log('Fixed ' + p);
});
