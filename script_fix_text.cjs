const fs = require('fs');

let content = fs.readFileSync('src/world_of_coding.tsx', 'utf8');

const replacements = [
  // CodingScene
  { from: 'className="text-5xl md:text-7xl font-headings font-bold text-slate-700 mb-4"', to: 'className="text-5xl md:text-7xl font-headings font-bold text-white mb-4"' },
  { from: 'className="text-2xl text-slate-700 leading-relaxed"', to: 'className="text-2xl text-blue-100 leading-relaxed"' },
  { from: 'className="text-slate-700 font-semibold mb-4 flex items-center gap-2"', to: 'className="text-white font-semibold mb-4 flex items-center gap-2"' },
  { from: 'text-slate-700 text-sm">1</span>', to: 'text-white text-sm">1</span>' },

  // AlgorithmScene
  { from: 'className="text-2xl text-slate-700 max-w-2xl mx-auto"', to: 'className="text-2xl text-blue-100 max-w-2xl mx-auto"' },
  { from: 'className="text-slate-700 font-bold text-xl mb-4">1. Build your algorithm:</h3>', to: 'className="text-white font-bold text-xl mb-4">1. Build your algorithm:</h3>' },
  
  // AIScene
  { from: 'className="text-2xl text-slate-700 font-bold mb-4">Is this a Cat?</h3>', to: 'className="text-2xl text-white font-bold mb-4">Is this a Cat?</h3>' },
  { from: 'className="text-3xl font-bold text-slate-700 mb-4">Training Complete!</h3>', to: 'className="text-3xl font-bold text-white mb-4">Training Complete!</h3>' },
  { from: 'className="text-slate-700 mb-8 max-w-md mx-auto"', to: 'className="text-blue-100 mb-8 max-w-md mx-auto"' },
  
  // MazeGameScene
  { from: 'className="text-slate-700 font-bold text-xl mb-4">1. Write your code:</h3>', to: 'className="text-white font-bold text-xl mb-4">1. Write your code:</h3>' },
];

replacements.forEach(r => {
  content = content.replace(r.from, r.to);
  // Also global replace for the exact strings in case they appear multiple times
  content = content.split(r.from).join(r.to);
});

// Clean up messed up card classes
content = content.replace(/border border-white\/10 border border-slate-700\/50 \/80/g, 'border border-white/10');
content = content.replace(/border border-white\/10 border border-slate-700\/50 \/60/g, 'border border-white/10');
content = content.replace(/border border-white\/10 border border-slate-700\/50 \/50/g, 'border border-white/10');
content = content.replace(/border border-white\/10 border border-slate-700\/50  text-slate-900/g, 'border border-white/10 text-white');
content = content.replace(/text-white border border-white\/10 border border-slate-700\/50/g, 'text-white border border-white/10');

// Fix text inside speech bubble (was text-slate-900, now fixed by above but let's be sure)
// Actually the above replace fixed text-slate-900 in speech bubble.

fs.writeFileSync('src/world_of_coding.tsx', content);

console.log('Fixed world_of_coding.tsx text colors');
