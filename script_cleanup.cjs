const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/ashka/Desktop/cinematic/cinematic-app/src';
const files = ['world_of_coding.tsx', 'py_builder.tsx', 'web_builder.tsx'];

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');

  // Remove conflicting text colors when text-white is already there
  content = content.replace(/text-white(.*?)text-slate-(600|800|900|700)/g, 'text-white$1');
  content = content.replace(/text-slate-(600|800|900|700)(.*?)text-white/g, 'text-white$2');
  content = content.replace(/text-white text-slate-600 text-slate-900/g, 'text-white');
  content = content.replace(/text-white border border-white\/10 border border-slate-700\/50 text-slate-600 text-slate-900/g, 'text-white border border-white/10');
  content = content.replace(/text-white border border-white\/10 border border-slate-700\/50 text-slate-600\/50/g, 'text-white/80 border border-white/10');
  content = content.replace(/text-white border border-white\/10 border border-slate-700\/50 text-slate-600\/80/g, 'text-white border border-white/10');

  // Fix Buttons text color to white
  content = content.replace(/text-slate-600 rounded-xl/g, 'text-white rounded-xl');
  content = content.replace(/text-slate-600 rounded-full/g, 'text-white rounded-full');

  // Ensure headings are legible
  content = content.replace(/text-slate-500/g, 'text-slate-700'); // make body text darker on light background
  content = content.replace(/text-slate-600/g, 'text-slate-700');

  // Fix buttons in py/web builders
  content = content.replace(/text-slate-700 rounded-xl/g, 'text-white rounded-xl');
  content = content.replace(/text-slate-700 rounded-full/g, 'text-white rounded-full');

  fs.writeFileSync(path.join(dir, file), content);
});
