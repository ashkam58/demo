const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/ashka/Desktop/cinematic/cinematic-app/src';

// 1. Update index.tsx
let idx = fs.readFileSync(path.join(dir, 'index.tsx'), 'utf8');
idx = idx.replace(/bg-slate-950 text-slate-100/g, 'bg-gradient-to-br from-[#EAF8FF] via-[#F7EEFF] to-[#FFF7D8] text-slate-600');
idx = idx.replace(/bg-gradient-to-br from-\[#EAF8FF\] via-\[#F7EEFF\] to-\[#FFF7D8\] text-slate-600 overflow-hidden font-sans/g, 'bg-gradient-to-br from-[#EAF8FF] via-[#F7EEFF] to-[#FFF7D8] text-slate-600 overflow-hidden font-sans');
fs.writeFileSync(path.join(dir, 'index.tsx'), idx);

// Helper function to apply Pixar styles
function applyPixarStyles(content) {
  // Typography
  content = content.replace(/font-funky/g, 'font-headings');
  content = content.replace(/text-slate-100/g, 'text-slate-600');
  content = content.replace(/text-white/g, 'text-slate-600');
  content = content.replace(/text-slate-300/g, 'text-slate-500');
  
  // Headings
  content = content.replace(/bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500/g, 'bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#7C3AED] to-[#EC4899] drop-shadow-[0_8px_25px_rgba(0,0,0,0.15)]');
  content = content.replace(/text-slate-800/g, 'text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#7C3AED] to-[#EC4899] drop-shadow-[0_8px_25px_rgba(0,0,0,0.15)]');

  // Main Cards
  content = content.replace(/bg-slate-800\/80 backdrop-blur-xl border-slate-700 shadow-2xl/g, 'bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10');
  content = content.replace(/bg-slate-800\/80 backdrop-blur-md/g, 'bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10');
  
  // Text inside the new dark blue cards needs to be white, not slate-600
  // It's hard to do this perfectly with regex, so we'll leave it as is and fix manually if needed.

  // Buttons
  content = content.replace(/bg-indigo-600 hover:bg-indigo-700/g, 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] shadow-[0_15px_50px_rgba(139,92,246,0.25)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(139,92,246,0.4)] active:scale-95');
  content = content.replace(/bg-indigo-500 hover:bg-indigo-400/g, 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] shadow-[0_15px_50px_rgba(139,92,246,0.25)] hover:-translate-y-1 active:scale-95');

  // Inputs / Small panels
  content = content.replace(/bg-slate-900\/50/g, 'bg-[#FFFDF6] rounded-[30px] border border-slate-200 shadow-sm');
  
  return content;
}

// 2. Update world_of_coding.tsx
let world = fs.readFileSync(path.join(dir, 'world_of_coding.tsx'), 'utf8');
world = applyPixarStyles(world);
// Fix the Maze Grid explicitly
world = world.replace(/w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 \$\{/g, 
  "w-12 h-12 md:w-16 md:h-16 rounded-[20px] flex items-center justify-center text-2xl md:text-3xl transition-all duration-300 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)] border border-white/20 backdrop-blur-md hover:scale-110 hover:shadow-[0_0_20px_rgba(66,232,255,0.6)] ${");
world = world.replace(/bg-slate-800 border-slate-700/g, "bg-white/10");
world = world.replace(/bg-indigo-500\/30 border-indigo-400/g, "bg-[#4F7DFF]/40 border-[#4F7DFF]");
world = world.replace(/bg-green-500\/30 border-green-400/g, "bg-[#34D399]/40 border-[#34D399]");

fs.writeFileSync(path.join(dir, 'world_of_coding.tsx'), world);

// 3. Update py_builder.tsx
let py = fs.readFileSync(path.join(dir, 'py_builder.tsx'), 'utf8');
py = py.replace(/bg-slate-950 text-slate-100/g, 'bg-transparent text-slate-600');
py = applyPixarStyles(py);
fs.writeFileSync(path.join(dir, 'py_builder.tsx'), py);

// 4. Update web_builder.tsx
let web = fs.readFileSync(path.join(dir, 'web_builder.tsx'), 'utf8');
web = web.replace(/bg-slate-950 text-slate-100/g, 'bg-transparent text-slate-600');
web = applyPixarStyles(web);
fs.writeFileSync(path.join(dir, 'web_builder.tsx'), web);

