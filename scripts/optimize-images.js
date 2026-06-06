const fs = require('fs');
const path = require('path');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      if (content.includes('<Image')) {
        const newContent = content.replace(/<Image(?!\s+[^>]*unoptimized)([\s\S]*?)>/g, (match, p1) => {
          return `<Image unoptimized={true}${p1}>`;
        });
        if (newContent !== content) {
          content = newContent;
          changed = true;
        }
      }

      if (content.includes('<img')) {
        const newContent = content.replace(/<img(?![^>]*loading=)([\s\S]*?)>/g, (match, p1) => {
          return `<img loading="lazy" decoding="async"${p1}>`;
        });
        if (newContent !== content) {
          content = newContent;
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', fullPath);
      }
    }
  }
}

processDirectory(path.join(__dirname, '../src'));
console.log('Done optimization.');
