const fs = require('fs');

let c = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

c = c.replace(/uppercase text-slate-950 hover:text-\[\#324A61\] text-xs font-black/g, 'text-xs font-medium tracking-wider uppercase text-slate-600 hover:text-[#0f172a]');
c = c.replace(/uppercase text-slate-950 hover:text-\[\#324A61\] text-sm font-black/g, 'text-sm font-medium tracking-wider uppercase text-slate-600 hover:text-[#0f172a]');
c = c.replace(/uppercase text-slate-950 group-hover:text-\[\#324A61\] text-xs font-black/g, 'text-xs font-medium tracking-wider uppercase text-slate-600 group-hover:text-[#0f172a]');

// Remove Blog and Careers from Desktop and Mobile menus
c = c.replace(/<Link href="\/blog".*?<\/Link>\s*/g, '');
c = c.replace(/<Link href="\/careers".*?<\/Link>\s*/g, '');

fs.writeFileSync('src/components/Navbar.tsx', c);
console.log('Fixed Navbar');
