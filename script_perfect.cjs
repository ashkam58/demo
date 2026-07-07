const fs = require('fs');

const buttonHtml = `
      {/* Global Next Button */}
      <button 
        onClick={handleNext}
        className="fixed bottom-6 right-6 z-[9999] bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md px-6 py-2 rounded-full text-white/90 transition-all shadow-lg text-sm font-bold border border-white/20 hover:scale-105 flex items-center gap-2"
      >
        Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
`;

function removeTimeouts(content) {
  content = content.replace(/const timer = setTimeout\(onNext, \d+\);\s*return \(\) => clearTimeout\(timer\);/g, '');
  content = content.replace(/const timer = setTimeout\(onComplete, \d+\);\s*return \(\) => clearTimeout\(timer\);/g, '');
  content = content.replace(/const timer = setTimeout\(onComplete \|\| onRestart, \d+\);\s*return \(\) => clearTimeout\(timer\);/g, '');
  content = content.replace(/const timer3 = setTimeout\(onComplete, \d+\);\s*return \(\) => \{ clearTimeout\(timer1\); clearTimeout\(timer2\); clearTimeout\(timer3\); \};/g, 'return () => { clearTimeout(timer1); clearTimeout(timer2); };');
  // NOTE: I am NOT removing setTimeout(nextLevel, 4000) anymore! So the minigames keep their functionality.
  return content;
}

// 1. world_of_coding.tsx
let woc = fs.readFileSync('src/world_of_coding.tsx', 'utf8');
woc = woc.replace('export default function App({ onComplete }: any) {', 
`export default function App({ onComplete }: any) {
  const handleNext = () => {
    if (currentScene === 5) {
      if (onComplete) onComplete();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentScene(prev => prev + 1);
    }
  };`);
woc = woc.replace('<main className="relative z-10 w-full max-w-7xl mx-auto">', 
                  '<main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center flex-1 min-h-[90vh]">');
woc = woc.replace('</main>', `</main>\n${buttonHtml}`);
woc = removeTimeouts(woc);
fs.writeFileSync('src/world_of_coding.tsx', woc);


// 2. py_builder.tsx
let py = fs.readFileSync('src/py_builder.tsx', 'utf8');
py = py.replace('export default function App({ onComplete }: any) {', 
`export default function App({ onComplete }: any) {
  const handleNext = () => {
    if (step >= 5) {
      if (onComplete) onComplete();
    } else {
      setStep(s => Math.min(s + 1, 5));
    }
  };`);
py = py.replace('<div className="min-h-screen text-slate-700 font-sans selection:bg-emerald-200 selection:text-slate-900 pb-32">',
                '<div className="min-h-screen text-slate-700 font-sans selection:bg-emerald-200 selection:text-slate-900 pb-32 flex flex-col justify-center relative">');
let lastDivPy = py.lastIndexOf('</div>');
py = py.substring(0, lastDivPy) + buttonHtml + py.substring(lastDivPy);
py = removeTimeouts(py);
fs.writeFileSync('src/py_builder.tsx', py);


// 3. web_builder.tsx
let web = fs.readFileSync('src/web_builder.tsx', 'utf8');
web = web.replace('export default function App({ onComplete }: any) {', 
`export default function App({ onComplete }: any) {
  const handleNext = () => {
    if (currentScene === 5) {
      if (onComplete) onComplete();
    } else {
      setCurrentScene(prev => prev + 1);
    }
  };`);
web = web.replace('<div className="min-h-screen text-slate-700 font-sans selection:bg-cyan-200 selection:text-slate-900 overflow-x-hidden">',
                  '<div className="min-h-screen text-slate-700 font-sans selection:bg-cyan-200 selection:text-slate-900 overflow-x-hidden flex flex-col justify-center relative">');
let lastDivWeb = web.lastIndexOf('</div>');
web = web.substring(0, lastDivWeb) + buttonHtml + web.substring(lastDivWeb);
web = removeTimeouts(web);
fs.writeFileSync('src/web_builder.tsx', web);

console.log("Safe perfect script execution complete!");
