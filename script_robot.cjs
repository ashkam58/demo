const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/ashka/Desktop/cinematic/cinematic-app/src';

const pixarRobotSnippet = `
          <div className="relative group animate-float drop-shadow-[0_20px_30px_rgba(66,232,255,0.3)]">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-[20px] flex flex-col items-center justify-center relative overflow-hidden border-b-4 border-slate-300 shadow-[inset_0_5px_15px_rgba(255,255,255,1)]">
              {/* Screen / Face */}
              <div className="w-12 h-8 bg-slate-800 rounded-xl flex flex-col items-center justify-center relative shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                {/* Eyes */}
                <div className="flex gap-1 mt-0.5">
                  <div className="w-2 h-3 rounded-full bg-[#42E8FF] shadow-[0_0_10px_#42E8FF] animate-pulse"></div>
                  <div className="w-2 h-3 rounded-full bg-[#42E8FF] shadow-[0_0_10px_#42E8FF] animate-pulse"></div>
                </div>
              </div>
              {/* Antenna Parts */}
              <div className="absolute top-0 w-4 h-2 bg-slate-300 rounded-b-full"></div>
            </div>
            {/* External Antenna sticking out top */}
            <div className="absolute top-1 w-1 h-3 bg-slate-400 -z-10 left-[48%]"></div>
            <div className="absolute top-0 w-2 h-2 rounded-full bg-[#42E8FF] shadow-[0_0_8px_#42E8FF] animate-bounce left-[46%]"></div>
          </div>
`;

// Replace Byte in web_builder.tsx
let web = fs.readFileSync(path.join(dir, 'web_builder.tsx'), 'utf8');
web = web.replace(/<div className="relative">[\s\S]*?<div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-indigo-900"><\/div>\s*<\/div>/, pixarRobotSnippet.trim());
fs.writeFileSync(path.join(dir, 'web_builder.tsx'), web);

// Replace Py in py_builder.tsx
let py = fs.readFileSync(path.join(dir, 'py_builder.tsx'), 'utf8');
py = py.replace(/<div className="relative">[\s\S]*?<div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"><\/div>\s*<\/div>/, pixarRobotSnippet.trim());
fs.writeFileSync(path.join(dir, 'py_builder.tsx'), py);
