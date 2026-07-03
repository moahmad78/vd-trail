const fs = require('fs');
const path = require('path');

const navPath = path.join('D:\\VoometDesign\\VD-WEB\\src\\components\\StickyServiceNav.tsx');
let content = fs.readFileSync(navPath, 'utf8');

// Replace active state logic
content = content.replace(
  /const isActive = pathname === service\.href;/g,
  `const activeSlug = pathname.split('/').pop();\n                const isActive = activeSlug === service.href.split('/').pop();`
);

fs.writeFileSync(navPath, content, 'utf8');
console.log('Updated StickyServiceNav.tsx');
