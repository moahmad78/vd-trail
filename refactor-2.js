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
    .replace(/bg-neutral-950(?![a-zA-Z0-9\-\/])/g, 'bg-[#0f172a]')
    .replace(/bg-neutral-900(?![a-zA-Z0-9\-\/])/g, 'bg-[#0f172a]')
    .replace(/bg-zinc-950(?![a-zA-Z0-9\-\/])/g, 'bg-[#0f172a]')
    .replace(/bg-stone-950(?![a-zA-Z0-9\-\/])/g, 'bg-[#0f172a]')
    .replace(/border-black(?![a-zA-Z0-9\-\/])/g, 'border-[#0f172a]')
    .replace(/border-neutral-950(?![a-zA-Z0-9\-\/])/g, 'border-[#0f172a]')
    .replace(/border-neutral-900(?![a-zA-Z0-9\-\/])/g, 'border-[#0f172a]')
    .replace(/text-neutral-950/g, 'text-[#0f172a]'); // The button had text-neutral-950, #0f172a is fine.

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated ' + file);
  }
});
