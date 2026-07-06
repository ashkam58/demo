const fs = require('fs');

let content = fs.readFileSync('src/world_of_coding.tsx', 'utf8');

content = content.replace(/bg-green-500 text-slate-700/g, 'bg-green-500 text-white');
content = content.replace(/bg-red-500 text-slate-700/g, 'bg-red-500 text-white');
content = content.replace(/bg-indigo-500 text-slate-700/g, 'bg-indigo-500 text-white');
content = content.replace(/bg-sky-400 text-slate-700/g, 'bg-sky-400 text-slate-900');

fs.writeFileSync('src/world_of_coding.tsx', content);

console.log('Fixed button/badge text colors');
