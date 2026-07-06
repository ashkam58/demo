const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/ashka/Desktop/cinematic/cinematic-app/src';

// Fix index.tsx
let idx = fs.readFileSync(path.join(dir, 'index.tsx'), 'utf8');
idx = idx.replace(/bg-gradient-to-br from-slate-100 to-slate-200/g, 'bg-slate-950 text-slate-100');
idx = idx.replace(/bg-gradient-to-br from-sky-50 to-indigo-50/g, 'bg-slate-950 text-slate-100');
fs.writeFileSync(path.join(dir, 'index.tsx'), idx);

// Fix py_builder.tsx
let py = fs.readFileSync(path.join(dir, 'py_builder.tsx'), 'utf8');
py = py.replace(/bg-sky-50/g, 'bg-slate-950 text-slate-100');
py = py.replace(/text-slate-800/g, 'text-white');
py = py.replace(/text-slate-600/g, 'text-slate-300');
py = py.replace(/bg-white/g, 'bg-slate-800/80');
py = py.replace(/glass-panel/g, 'bg-slate-800/80 backdrop-blur-xl border-slate-700 shadow-2xl');
py = py.replace(/min-h-screen/g, 'min-h-[70vh]');
fs.writeFileSync(path.join(dir, 'py_builder.tsx'), py);

// Fix web_builder.tsx
let web = fs.readFileSync(path.join(dir, 'web_builder.tsx'), 'utf8');
web = web.replace(/bg-sky-50/g, 'bg-slate-950 text-slate-100');
web = web.replace(/text-slate-800/g, 'text-white');
web = web.replace(/text-slate-600/g, 'text-slate-300');
web = web.replace(/bg-white/g, 'bg-slate-800/80');
web = web.replace(/glass-panel/g, 'bg-slate-800/80 backdrop-blur-xl border-slate-700 shadow-2xl');
web = web.replace(/min-h-screen/g, 'min-h-[70vh]');
fs.writeFileSync(path.join(dir, 'web_builder.tsx'), web);

// Fix world_of_coding.tsx again because first script failed before completing everything maybe?
let world = fs.readFileSync(path.join(dir, 'world_of_coding.tsx'), 'utf8');
world = world.replace(/min-h-screen/g, 'min-h-[70vh]');
world = world.replace(/py-20/g, 'py-4');
world = world.replace(/text-slate-800/g, 'text-slate-100');
world = world.replace(/text-slate-600/g, 'text-slate-300');
world = world.replace(/bg-white/g, 'bg-slate-800/80');
fs.writeFileSync(path.join(dir, 'world_of_coding.tsx'), world);
