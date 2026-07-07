const fs = require('fs');
const path = require('path');

const files = [
  'HospitalityGallery.tsx',
  'ResidentialGallery.tsx',
  'EducationGallery.tsx',
  'CommercialGallery.tsx'
].map(f => path.join('D:\\VoometDesign\\VD-WEB\\src\\components', f));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. ESC key handler
  content = content.replace(
    /if \(e\.key === "Escape"\) setLightboxIndex\(null\);/g,
    `if (e.key === "Escape") {
        setLightboxIndex(null);
        document.body.style.overflow = "";
        document.body.classList.remove("lightbox-open");
      }`
  );

  // 2. Body scroll lock useEffect
  content = content.replace(
    /document\.body\.style\.overflow = "hidden";/g,
    `document.body.style.overflow = "hidden";
      document.body.classList.add("lightbox-open");`
  );
  
  content = content.replace(
    /document\.body\.style\.overflow = "";/g,
    `document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");`
  );

  // 3. Fullscreen Lightbox CSS classes
  content = content.replace(
    /className="fixed inset-0 z-\[100\] flex items-center justify-center bg-black\/95"/g,
    `className="fixed inset-0 z-[99999] flex items-center justify-center bg-[rgba(0,0,0,0.97)]"`
  );

  // 4. onClick handlers for closing
  content = content.replace(
    /onClick=\{\(\) => setLightboxIndex\(null\)\}/g,
    `onClick={() => {
              setLightboxIndex(null);
              document.body.style.overflow = '';
              document.body.classList.remove('lightbox-open');
            }}`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
});
