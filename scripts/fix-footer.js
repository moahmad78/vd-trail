const fs = require('fs');

let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// The file got mangled and we need to restore the Navigation column.
// Let's find the Column 2: Navigation comment
const searchStr = '{/* Column 2: Navigation */}\r\n <div className="lg:border-l lg:border-slate-200 lg:pl-12">\r\n <ArrowRight size={14} className="text-[#0f172a] opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />\r\n {link.name}\r\n </Link>\r\n </li>\r\n ))}\r\n </ul>\r\n </div>';

const replaceStr = `{/* Column 2: Navigation */}
 <div className="lg:border-l lg:border-slate-200 lg:pl-12">
 <div className="mb-4 lg:mb-10">
 <h5 className="text-card text-sm font-bold text-[#0F172A] mb-2">Navigation</h5>
 <div className="w-5 h-0.5 bg-[#0f172a]" />
 </div>
 <ul className="space-y-2 lg:space-y-4">
 {[
 { name: "Home", href: "/" },
 { name: "About Us", href: "/about" },
 { name: "Our Work", href: "/portfolio" },
 { name: "Careers", href: "/careers" },
 { name: "Blog", href: "/blog" },
 { name: "Contact Us", href: "/contact" }
 ].map((link, idx) => (
 <li key={idx}>
 <Link href={link.href} className="text-neutral-500 hover:text-[#0F172A] transition-all flex items-center gap-2 group text-base">
 <ArrowRight size={14} className="text-[#0f172a] opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
 {link.name}
 </Link>
 </li>
 ))}
 </ul>
 </div>`;

// If line endings are different, let's just use regex replacing from {/* Column 2: Navigation */} to the end of the div
const regex = /\{\/\* Column 2: Navigation \*\/\}\s*<div className="lg:border-l lg:border-slate-200 lg:pl-12">\s*<ArrowRight[\s\S]*?<\/ul>\s*<\/div>/;

if (regex.test(content)) {
  content = content.replace(regex, replaceStr);
  fs.writeFileSync('src/components/Footer.tsx', content, 'utf8');
  console.log('Fixed Footer.tsx');
} else {
  console.log('Regex did not match.');
}
