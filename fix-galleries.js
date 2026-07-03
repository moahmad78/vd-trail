const fs = require('fs');

const hPath = 'D:/VoometDesign/VD-WEB/src/components/HospitalityGallery.tsx';
let hTxt = fs.readFileSync(hPath, 'utf8');
hTxt = hTxt.replace(/const IMAGES = .*?;/s, `const IMAGES = [
  "/Design/hospitality/h1.jpeg",
  "/Design/hospitality/h2.jpeg",
  "/Design/hospitality/h3.jpeg",
  "/Design/hospitality/h4.jpeg",
  "/Design/hospitality/h5.jpeg",
  "/Design/hospitality/h7.jpeg",
  "/Design/hospitality/h8.jpeg",
  "/Design/hospitality/h9.jpeg",
  "/Design/hospitality/h10.jpeg",
  "/Design/hospitality/h11.jpeg",
  "/Design/hospitality/h12.jpeg",
  "/Design/hospitality/h13.jpeg",
  "/Design/hospitality/h14.jpeg",
  "/Design/hospitality/h15.png",
  "/Design/hospitality/h16.png",
  "/Design/hospitality/h17.png",
  "/Design/hospitality/h18.png",
  "/Design/hospitality/h19.png"
];`);
fs.writeFileSync(hPath, hTxt);
console.log('Fixed HospitalityGallery.tsx');

const ePath = 'D:/VoometDesign/VD-WEB/src/components/EducationGallery.tsx';
let eTxt = fs.readFileSync(ePath, 'utf8');
eTxt = eTxt.replace(/const IMAGES = .*?;/s, `const IMAGES = [
  ...Array.from({ length: 15 }, (_, i) => \`/Design/education/e\${i + 1}.jpeg\`),
  ...Array.from({ length: 10 }, (_, i) => \`/Design/education/e\${i + 17}.jpeg\`),
  ...Array.from({ length: 13 }, (_, i) => \`/Design/education/e\${i + 28}.jpeg\`)
];`);
fs.writeFileSync(ePath, eTxt);
console.log('Fixed EducationGallery.tsx');

const rPath = 'D:/VoometDesign/VD-WEB/src/components/ResidentialGallery.tsx';
let rTxt = fs.readFileSync(rPath, 'utf8');
rTxt = rTxt.replace(/const IMAGES = .*?;/s, `const IMAGES = Array.from({ length: 34 }, (_, i) => \`/Design/resedential/r\${i + 1}.jpeg\`);`);
fs.writeFileSync(rPath, rTxt);
console.log('Fixed ResidentialGallery.tsx');
