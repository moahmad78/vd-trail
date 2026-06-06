const fs = require('fs');

let c = fs.readFileSync('src/components/TierTable.tsx', 'utf8');

if (!c.includes('import Link')) {
  c = c.replace(/import \{ motion \} from "framer-motion";/, 'import { motion } from "framer-motion";\nimport Link from "next/link";');
}

c = c.replace(
  /<div className="col-span-1 bg-\[\#0f172a\] p-5 rounded-xl flex items-center justify-center shadow-lg">\s*<span className="text-white font-bold text-base mb-2">Standard<\/span>\s*<\/div>/g,
  `<Link href="/contact?tier=standard" className="col-span-1 bg-[#0f172a] p-5 rounded-xl flex flex-col items-center justify-center shadow-lg hover:bg-[#324A61] transition-colors group">
                <span className="text-white font-bold text-base mb-2">Standard</span>
                <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold group-hover:text-white transition-colors">Select Tier →</span>
              </Link>`
);

c = c.replace(
  /<div className="col-span-1 bg-\[\#0f172a\] p-5 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-accent ring-offset-2">\s*<span className="text-white font-bold text-base mb-2">Medium<\/span>\s*<\/div>/g,
  `<Link href="/contact?tier=medium" className="col-span-1 bg-[#0f172a] p-5 rounded-xl flex flex-col items-center justify-center shadow-lg ring-2 ring-slate-400 ring-offset-2 hover:bg-[#324A61] transition-colors group">
                <span className="text-white font-bold text-base mb-2">Medium</span>
                <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold group-hover:text-white transition-colors">Select Tier →</span>
              </Link>`
);

c = c.replace(
  /<div className="col-span-1 bg-\[\#0f172a\] p-5 rounded-xl flex items-center justify-center shadow-lg">\s*<span className="text-white font-bold text-base mb-2">Luxury<\/span>\s*<\/div>/g,
  `<Link href="/contact?tier=luxury" className="col-span-1 bg-[#0f172a] p-5 rounded-xl flex flex-col items-center justify-center shadow-lg hover:bg-[#324A61] transition-colors group">
                <span className="text-white font-bold text-base mb-2">Luxury</span>
                <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold group-hover:text-white transition-colors">Select Tier →</span>
              </Link>`
);

fs.writeFileSync('src/components/TierTable.tsx', c);
console.log('Fixed TierTable links');
