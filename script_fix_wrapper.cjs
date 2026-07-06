const fs = require('fs');

// Fix world_of_coding.tsx
let content = fs.readFileSync('src/world_of_coding.tsx', 'utf8');
content = content.replace(
  /<div className="min-h-\[70vh\] bg-\[\#FFFDF6\] rounded-\[30px\] border border-slate-200 shadow-sm text-slate-700 font-sans overflow-x-hidden selection:bg-purple-300\/50">/,
  '<div className="min-h-screen text-slate-700 font-sans overflow-x-hidden selection:bg-purple-300/50">'
);
fs.writeFileSync('src/world_of_coding.tsx', content);

// Fix py_builder.tsx
let pyContent = fs.readFileSync('src/py_builder.tsx', 'utf8');
pyContent = pyContent.replace(
  /<div className="bright-bg text-slate-700 font-sans selection:bg-emerald-200 selection:text-slate-900 pb-32">/,
  '<div className="min-h-screen text-slate-700 font-sans selection:bg-emerald-200 selection:text-slate-900 pb-32">'
);
fs.writeFileSync('src/py_builder.tsx', pyContent);

// Fix web_builder.tsx
let webContent = fs.readFileSync('src/web_builder.tsx', 'utf8');
webContent = webContent.replace(
  /<div className="bg-slate-50 min-h-screen text-slate-700 font-sans selection:bg-cyan-200 selection:text-slate-900 overflow-x-hidden">/,
  '<div className="min-h-screen text-slate-700 font-sans selection:bg-cyan-200 selection:text-slate-900 overflow-x-hidden">'
);
fs.writeFileSync('src/web_builder.tsx', webContent);

console.log("Fixed main wrappers in all modules");
