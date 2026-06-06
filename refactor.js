const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('d:/VD-WEB/src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css') || f.endsWith('.jsx') || f.endsWith('.js'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/#0b0f19/g, '#0f172a')
    .replace(/#121212/g, '#0f172a')
    .replace(/#0a0a0a/g, '#0f172a')
    .replace(/bg-black\/(\d+)/g, 'bg-[#0f172a]/$1')
    .replace(/from-black\/(\d+)/g, 'from-[#0f172a]/$1')
    .replace(/via-black\/(\d+)/g, 'via-[#0f172a]/$1')
    .replace(/to-black\/(\d+)/g, 'to-[#0f172a]/$1')
    .replace(/from-black/g, 'from-[#0f172a]')
    .replace(/via-black/g, 'via-[#0f172a]')
    .replace(/to-black/g, 'to-[#0f172a]')
    .replace(/bg-black(?![a-zA-Z0-9\-\/])/g, 'bg-[#0f172a]'); // match bg-black exactly without trailing characters

  // specific overrides for Hero.tsx
  newContent = newContent.replace(/from-\[#0f172a\]\/90 via-\[#0f172a\]\/70 to-transparent/g, 'from-[#0f172a]/95 via-[#0f172a]/60 to-transparent');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated ' + file);
  }
});
