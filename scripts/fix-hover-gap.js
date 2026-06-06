const fs = require('fs');

let c = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const regex = /<ul className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl p-2 hidden group-hover:block transition-all duration-200 z-50">[\s\S]*?<\/ul>/;

const replaceStr = `<ul className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl p-2 hidden group-hover:block transition-all duration-200 z-50 overflow-visible">
  <li>
    <Link className="flex items-center px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors" href="/services/residential">
      RESIDENTIAL
    </Link>
  </li>

  <li className="relative group">
    <button className="w-full flex items-center px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors outline-none">
      <span>HOSPITALITY</span>
      <ChevronRight className="ml-auto text-slate-400 group-hover:text-[#0f172a] transition-transform group-hover:translate-x-0.5" size={12}/>
    </button>

    <div className="absolute left-full top-0 pl-2 w-60 hidden group-hover:block transition-all duration-200 z-50">
      <ul className="bg-white border border-slate-100 rounded-xl shadow-xl p-2 animate-in fade-in slide-in-from-left-2 duration-150">
        <li>
          <Link className="block px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors" href="/services/hospitality/service-apartments">
            SERVICE APARTMENTS
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors" href="/services/hospitality/boutique-hotel">
            BOUTIQUE HOTEL
          </Link>
        </li>
        <li>
          <Link className="block px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors" href="/services/hospitality/pg-accommodation">
            P.G ACCOMMODATION
          </Link>
        </li>
      </ul>
    </div>
  </li>

  <li>
    <Link className="flex items-center px-4 py-2.5 text-xs font-medium tracking-wider text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors" href="/services/educational">
      EDUCATIONAL
    </Link>
  </li>
</ul>`;

if (regex.test(c)) {
  c = c.replace(regex, replaceStr);
  fs.writeFileSync('src/components/Navbar.tsx', c);
  console.log('Fixed hover dead-zone');
} else {
  console.log('Regex did not match.');
}
