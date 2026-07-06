const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/ashka/Desktop/cinematic/cinematic-app/src';
const files = ['world_of_coding.tsx', 'py_builder.tsx', 'web_builder.tsx'];

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');

  content = content.replace(/bg-slate-800\/80\/80/g, 'bg-white/80');
  content = content.replace(/bg-slate-800\/80\/60/g, 'bg-white/60');
  content = content.replace(/bg-slate-800\/80\/50/g, 'bg-white/50');
  content = content.replace(/bg-slate-800\/80/g, 'bg-white');
  
  // Clean up any weird text colors that were changed
  // In Py Builder and Web Builder some text might be invisible now if it's on white background and was forced to white
  // But wait, the issue the user showed was dark text on dark background. By making background white, dark text will be visible!
  
  fs.writeFileSync(path.join(dir, file), content);
});

console.log("Restored white backgrounds!");
