const fs = require('fs');

let c = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

c = c.replace(
  /import \{ Menu, X, ChevronDown \} from "lucide-react";/g,
  'import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";'
);

const searchRegex = /<div className="absolute top-full left-1\/2 -translate-x-1\/2 hidden group-hover:block pt-1">[\s\S]*?<\/div>\s*<\/div>/;

const replaceStr = `<ul className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl p-2 hidden group-hover:block transition-all duration-200 z-50">
  {/* Residential Node */}
  <li>
    <Link href="/services/residential" className="flex items-center px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors">
      RESIDENTIAL
    </Link>
  </li>

  {/* Hospitality Node (Triggers Level 2 Nested Group) */}
  <li className="relative group/sub">
    <button className="w-full flex items-center px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors outline-none">
      <span>HOSPITALITY</span>
      <ChevronRight size={12} className="ml-auto text-slate-400 group-hover\\/sub:text-[#0f172a] transition-transform group-hover\\/sub:translate-x-0.5" />
    </button>

    {/* LEVEL 2: NESTED FLYOUT CARD (Service Apartments, Boutique Hotel, PG) */}
    <ul className="absolute left-full top-0 ml-1.5 w-60 bg-white border border-slate-100 rounded-xl shadow-xl p-2 hidden group-hover\\/sub:block transition-all duration-200 animate-in fade-in slide-in-from-left-2 duration-150">
      <li>
        <Link href="/services/hospitality/service-apartments" className="block px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors">
          SERVICE APARTMENTS
        </Link>
      </li>
      <li>
        <Link href="/services/hospitality/boutique-hotel" className="block px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors">
          BOUTIQUE HOTEL
        </Link>
      </li>
      <li>
        <Link href="/services/hospitality/pg-accommodation" className="block px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors">
          P.G ACCOMMODATION
        </Link>
      </li>
    </ul>
  </li>

  {/* Educational Node */}
  <li>
    <Link href="/services/educational" className="flex items-center px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors">
      EDUCATIONAL
    </Link>
  </li>
</ul>`;

if (searchRegex.test(c)) {
  c = c.replace(searchRegex, replaceStr);
  fs.writeFileSync('src/components/Navbar.tsx', c);
  console.log('Fixed Navbar UI successfully');
} else {
  console.log('Regex did not match.');
}
