const fs = require('fs');
const path = require('path');

const replacements = {
  // Careers: Replace Living Room with Office / Collaborative workspace
  'src/app/careers/page.tsx': [
    { old: '1600210492486-724fe5c67fb0', new: '1522071820081-009f0129c71c' }, // Team collaboration
  ],
  // Fabrication: Replace Living Room with Workshop / Carpentry
  'src/app/fabrication/page.tsx': [
    { old: '1600210492486-724fe5c67fb0', new: '1504917595417-6020a16b06b1' }, // Woodworking/Fabrication
  ],
  // Services
  'src/components/FabricationModule.tsx': [
    { old: '1590483734724-383b85ad65e7', new: '1504917595417-6020a16b06b1' } // Woodworking
  ],
  'src/components/LogoMarquee.tsx': [
    // Logos should be abstract patterns/monochrome
    { old: '1566073771259-6a8506099945', new: '1557682257-2f9c37a3a5f3' } 
  ],
  'src/components/ClientMarquee.tsx': [
    // Testimonial face avatars
    { old: '1519494026892-80bbd2d6fd0d', new: '1573496359142-b8d87734a5a2' }
  ],
  'src/components/TestimonialSlider.tsx': [
    { old: '1472099645785-5658abf4ff4e', new: '1573496359142-b8d87734a5a2' },
    { old: '1438761681033-6461ffad8d80', new: '1580489944761-15a19d654956' },
    { old: '1612349317150-e413f6a5b16d', new: '1560250097-0b93528c311a' }
  ],
  // The big portfolio/service grids where repeats happen
  'src/components/Gallery.tsx': [
    { old: '1600210492486-724fe5c67fb0', new: '1545324418-cc1a3fa10c00' } // Modern architecture instead of living room again
  ],
  'src/app/portfolio/page.tsx': [
    // Replace duplicate images with distinct beautiful ones
    { old: '1521587760476-6c12a4b040da', new: '1600210492486-724fe5c67fb0' }, // This was failing earlier but wait, let me just do a general string replacement.
  ]
};

function processFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  
  const rules = replacements[filePath];
  for (const rule of rules) {
    if (content.includes(rule.old)) {
      content = content.split(rule.old).join(rule.new);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

for (const f of Object.keys(replacements)) {
  processFile(f.replace(/\//g, path.sep));
}
