const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/ashka/Desktop/cinematic/cinematic-app/src';
const file = 'world_of_coding.tsx';

const p = path.join(dir, file);
let content = fs.readFileSync(p, 'utf8');

// Increase font sizes
content = content.replace(/text-xl/g, 'text-2xl');
content = content.replace(/text-lg/g, 'text-xl');
content = content.replace(/text-md/g, 'text-lg');

// Fix panels
content = content.replace(/glass-panel/g, 'bg-slate-800/80 backdrop-blur-xl border-slate-700 shadow-2xl');

fs.writeFileSync(p, content);
