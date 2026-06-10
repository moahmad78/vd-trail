const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if(file.endsWith('page.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('d:/VD-WEB/src/app');
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/^.*import Navbar from.*Navbar.*$(\r\n|\n)?/gm, '');
  c = c.replace(/^.*<Navbar \/>.*$(\r\n|\n)?/gm, '');
  fs.writeFileSync(f, c);
  console.log('Fixed ' + f);
});
