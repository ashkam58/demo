const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/ashka/Desktop/cinematic/cinematic-app/src';
const files = ['world_of_coding.tsx', 'index.tsx', 'py_builder.tsx', 'web_builder.tsx'];

files.forEach(file => {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  
  if (file === 'index.tsx') {
    content = content.replace(/bg-gradient-to-br from-slate-100 to-slate-200/g, 'bg-slate-950');
  }
  
  if (file === 'world_of_coding.tsx') {
    // Remove min-h-screen from scenes to prevent scrolling
    content = content.replace(/min-h-screen/g, 'min-h-[70vh]');
    content = content.replace(/py-20/g, 'py-4');
    
    // Dark mode text colors
    content = content.replace(/text-slate-800/g, 'text-slate-100');
    content = content.replace(/text-slate-600/g, 'text-slate-300');
    
    // Dark mode panels
    content = content.replace(/bg-white/g, 'bg-slate-800/80 backdrop-blur-md border border-slate-700/50 text-white');
    content = content.replace(/bg-sky-50/g, 'bg-slate-900/50');
  }

  fs.writeFileSync(p, content);
});
