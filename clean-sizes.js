const fs = require('fs');

const files = [
  'D:/VoometDesign/VD-WEB/src/components/TrustedNetworkV2.tsx',
  'D:/VoometDesign/VD-WEB/src/components/BrandsSection.tsx'
];

files.forEach(p => {
  let t = fs.readFileSync(p, 'utf8');
  
  // Clean up duplicate sizes
  t = t.replace(/sizes="\(max-width: 768px\) 120px, 160px"\s+sizes="[^"]+"/g, 'sizes="(max-width: 768px) 120px, 160px"');
  t = t.replace(/sizes="[^"]+"\s+sizes="\(max-width: 768px\) 120px, 160px"/g, 'sizes="(max-width: 768px) 120px, 160px"');
  
  fs.writeFileSync(p, t);
  console.log('Cleaned ' + p);
});
