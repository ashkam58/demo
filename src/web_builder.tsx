import { useState, useEffect } from 'react';
import { 
  Bot, Sparkles, Code, Paintbrush, Layers, Power, 
  ChevronRight, ArrowRight,
  Monitor, LayoutTemplate, Keyboard
} from 'lucide-react';

import { playInteractionSound as playSound } from './audio';
import confetti from 'canvas-confetti';

// --- Shared Components ---
const GlassCard = ({ children, className = "" }: any) => (
  <div className={`bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-3xl overflow-hidden transition-all duration-500 ${className}`}>
    {children}
  </div>
);

const Button = ({ onClick, children, primary = false, className = "" }: any) => (
  <button 
    onClick={() => { playSound('pop'); onClick(); }}
    className={`px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 ${
      primary 
        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1' 
        : 'bg-white hover:bg-slate-50 text-slate-800 shadow-md border border-slate-200'
    } ${className}`}
  >
    {children}
  </button>
);

// --- The Robot Companion (Byte) ---
const Byte = ({ message, mood = 'happy' }: any) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 group pointer-events-none">
      <div className="pointer-events-auto p-12 -m-4">
        <div className="flex items-end gap-4 animate-bounce-slow max-w-sm opacity-0 group-hover:opacity-100 translate-y-12 group-hover:translate-y-0 transition-all duration-500 mb-8 ml-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] border-2 border-white">
              <Bot size={32} color="white" className={mood === 'excited' ? 'animate-pulse' : ''} />
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-indigo-900"></div>
          </div>
          <div className="bg-white text-indigo-950 px-6 py-4 rounded-3xl rounded-bl-none shadow-xl border border-slate-200 transform transition-all">
            <p className="font-bold text-lg">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCENE 1: Introduction & HTML/CSS Toggle ---
const SceneAnatomy = ({ onComplete }: any) => {
  const [cssOn, setCssOn] = useState(true);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto mt-12 gap-8">
      <div className="flex items-center gap-4 bg-white/50 p-2 rounded-full backdrop-blur-md border border-white shadow-sm">
        <button 
          onClick={() => { setCssOn(false); playSound('switch'); }}
          className={`px-6 py-2 rounded-full font-bold transition-all ${!cssOn ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}
        >
          <Code className="inline mr-2" size={18}/> HTML Only
        </button>
        <button 
          onClick={() => { setCssOn(true); playSound('switch'); }}
          className={`px-6 py-2 rounded-full font-bold transition-all ${cssOn ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
        >
          <Paintbrush className="inline mr-2" size={18}/> CSS ON
        </button>
      </div>

      <div className="w-full relative perspective-[1000px]">
        {/* The Website Mockup */}
        <div className={`w-full mx-auto bg-white transition-all duration-1000 origin-top overflow-hidden
          ${cssOn ? 'rounded-3xl shadow-2xl rotate-x-12 scale-95 border-4 border-white' : 'rounded-none shadow-sm rotate-x-0 scale-100 border border-slate-300'}`}>
          
          {/* Header */}
          <div className={cssOn ? 'bg-indigo-600 p-6 flex justify-between items-center' : 'p-4 border-b border-gray-300 bg-white'}>
            <h1 className={cssOn ? 'text-3xl font-extrabold text-white tracking-tight' : 'text-blue-800 text-xl underline font-serif'}>
              {cssOn ? 'FlixNet' : 'Welcome to My Webpage'}
            </h1>
            <ul className={cssOn ? 'flex gap-6 text-white/90 font-medium' : 'list-disc pl-8 font-serif text-slate-800'}>
              <li className={cssOn ? 'hover:text-white cursor-pointer' : 'text-blue-800 underline'}>Home</li>
              <li className={cssOn ? 'hover:text-white cursor-pointer' : 'text-blue-800 underline'}>Movies</li>
              <li className={cssOn ? 'hover:text-white cursor-pointer' : 'text-blue-800 underline'}>Series</li>
            </ul>
          </div>

          {/* Hero Section */}
          <div className={cssOn ? 'p-12 bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative overflow-hidden' : 'p-4 bg-white text-black'}>
            {cssOn && <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>}
            <h2 className={cssOn ? 'text-5xl font-black mb-4 relative z-10' : 'text-2xl font-bold font-serif'}>
              Learn to Code Today
            </h2>
            <p className={cssOn ? 'text-xl text-white/90 max-w-lg mb-8 relative z-10' : 'font-serif mb-4'}>
              Discover the magic behind websites. Turn plain text into beautiful interactive experiences.
            </p>
            <button className={cssOn ? 'bg-white text-indigo-900 px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform' : 'bg-gray-200 border border-gray-400 px-2 py-1 text-black'}>
              Start Watching
            </button>
          </div>

          {/* Grid Section */}
          <div className={cssOn ? 'p-12 grid grid-cols-3 gap-8 bg-slate-50' : 'p-4 bg-white text-black'}>
            {[1, 2, 3].map(i => (
              <div key={i} className={cssOn ? 'bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition-transform' : 'mb-8'}>
                <img 
                  src={`https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80`} 
                  alt="Code" 
                  className={cssOn ? 'w-full h-48 object-cover' : 'w-48 h-auto mb-2'} 
                />
                <div className={cssOn ? 'p-6' : ''}>
                  <h3 className={cssOn ? 'text-xl font-bold text-gray-800 mb-2' : 'font-bold font-serif'}>Module {i}</h3>
                  <p className={cssOn ? 'text-gray-500' : 'font-serif'}>Description of the video goes here. It is very interesting.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button primary onClick={onComplete} className="mt-8">
        I understand! Let's build <ArrowRight />
      </Button>
    </div>
  );
};

// --- SCENE 2: The CSS Magic Builder ---
const SceneBuilder = ({ onComplete }: any) => {
  const [styles, setStyles] = useState({
    borderRadius: 0,
    padding: 20,
    hue: 220,
    shadow: 0,
    spacing: 16
  });

  const handleStyleChange = (key: string, value: number) => {
    setStyles(prev => ({ ...prev, [key]: value }));
  };

  const isBeautiful = styles.borderRadius > 15 && styles.shadow > 10;

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto mt-8 items-start">
      
      {/* Controls / CSS Inspector */}
      <GlassCard className="flex-1 p-8 w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Paintbrush className="text-pink-500"/> CSS Playground
        </h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-slate-600 font-mono text-sm font-bold">
              <span>border-radius</span>
              <span>{styles.borderRadius}px</span>
            </div>
            <input type="range" min="0" max="100" value={styles.borderRadius} onChange={(e) => handleStyleChange('borderRadius', Number(e.target.value))} className="w-full accent-pink-500" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-slate-600 font-mono text-sm font-bold">
              <span>padding</span>
              <span>{styles.padding}px</span>
            </div>
            <input type="range" min="10" max="64" value={styles.padding} onChange={(e) => handleStyleChange('padding', Number(e.target.value))} className="w-full accent-blue-500" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-slate-600 font-mono text-sm font-bold">
              <span>background-color (hue)</span>
              <span>{styles.hue}deg</span>
            </div>
            <input type="range" min="0" max="360" value={styles.hue} onChange={(e) => handleStyleChange('hue', Number(e.target.value))} className="w-full" style={{background: 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)'}}/>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-slate-600 font-mono text-sm font-bold">
              <span>box-shadow</span>
              <span>{styles.shadow}px</span>
            </div>
            <input type="range" min="0" max="50" value={styles.shadow} onChange={(e) => handleStyleChange('shadow', Number(e.target.value))} className="w-full accent-purple-500" />
          </div>
        </div>

        {isBeautiful && (
          <div className="mt-8 animate-fade-in">
            <Button primary onClick={() => { playSound('success'); onComplete(); }} className="w-full">
              Looks Amazing! Next <ChevronRight />
            </Button>
          </div>
        )}
      </GlassCard>

      {/* Live Preview */}
      <div className="flex-1 w-full flex justify-center items-center p-8 relative min-h-[400px]">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 rounded-3xl"></div>
        
        {/* Target Card */}
        <div 
          className="relative transition-all duration-300 max-w-sm w-full"
          style={{
            backgroundColor: `hsl(${styles.hue}, 80%, 60%)`,
            borderRadius: `${styles.borderRadius}px`,
            padding: `${styles.padding}px`,
            boxShadow: `0 ${styles.shadow}px ${styles.shadow * 2}px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.4)`,
            color: 'white'
          }}
        >
          <div className="flex flex-col items-center text-center" style={{ gap: `${styles.spacing}px` }}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
              alt="Profile" 
              style={{
                borderRadius: `${styles.borderRadius > 50 ? 50 : styles.borderRadius}%`,
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                border: '4px solid rgba(255,255,255,0.5)',
                transition: 'all 0.3s ease'
              }}
            />
            <div>
              <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: styles.borderRadius > 20 ? 'sans-serif' : 'serif' }}>Alex Developer</h3>
              <p className="opacity-90">Building the web of tomorrow.</p>
            </div>
            <button 
              className="bg-white text-gray-900 font-bold py-2 px-6 hover:scale-105 transition-transform shadow-md"
              style={{ borderRadius: `${styles.borderRadius / 2}px` }}
            >
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCENE 3: X-Ray Mode ---
const SceneXRay = ({ onComplete }: any) => {
  const [xrayOn, setXrayOn] = useState(false);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto mt-8 gap-8">
      <div className="bg-white/60 p-6 rounded-3xl backdrop-blur-md border border-white text-center w-full shadow-xl">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">The Browser's X-Ray Vision</h2>
        <p className="text-slate-600 mb-6 font-medium">Browsers read tags to understand what things are. Turn on X-Ray mode to see the hidden HTML tags!</p>
        
        <button 
          onClick={() => { setXrayOn(!xrayOn); playSound('switch'); }}
          className={`px-8 py-4 rounded-2xl font-bold text-xl flex items-center gap-3 mx-auto transition-all shadow-md ${
            xrayOn ? 'bg-red-500 text-white animate-pulse' : 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:scale-105'
          }`}
        >
          <Layers /> {xrayOn ? 'Turn X-Ray OFF' : 'ACTIVATE X-RAY MODE'}
        </button>
      </div>

      {/* Interactive Canvas */}
      <div className="w-full bg-white p-12 rounded-3xl shadow-xl overflow-hidden relative border border-slate-200">
        <style dangerouslySetInnerHTML={{__html: `
          .xray-mode * {
            outline: 2px dashed rgba(239, 68, 68, 0.5) !important;
            position: relative;
          }
          .xray-mode *:hover {
            outline: 3px solid rgba(239, 68, 68, 1) !important;
            background: rgba(239, 68, 68, 0.1);
          }
          .xray-mode *:hover::before {
            content: "<" !important;
            color: red !important;
          }
          .xray-mode *:hover::after {
            content: ">" !important;
            color: red !important;
          }
          .xray-mode *:hover::before, .xray-mode *:hover::after {
            position: absolute;
            top: -24px;
            left: 0;
            background: #ef4444;
            color: white;
            padding: 2px 6px;
            font-size: 12px;
            font-family: monospace;
            border-radius: 4px;
            z-index: 100;
          }
          
          .xray-mode h1:hover::before { content: "<h1>"; }
          .xray-mode p:hover::before { content: "<p>"; }
          .xray-mode button:hover::before { content: "<button>"; }
          .xray-mode img:hover::before { content: "<img>"; }
          .xray-mode div:hover::before { content: "<div>"; }
          .xray-mode section:hover::before { content: "<section>"; }
        `}} />

        <div className={`transition-all duration-500 ${xrayOn ? 'xray-mode cursor-crosshair' : ''}`}>
          <section className="text-center max-w-2xl mx-auto">
            <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">The Future of Web</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Every beautiful website you see is just a combination of structure (HTML) and style (CSS) painted by your browser.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-200">Get Started</button>
              <button className="bg-slate-100 text-gray-800 px-8 py-4 rounded-xl font-bold border border-slate-200">Learn More</button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80" alt="Code" className="w-full h-32 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-gray-900">Logic</h3>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80" alt="Design" className="w-full h-32 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-gray-900">Design</h3>
              </div>
            </div>
          </section>
        </div>
      </div>

      {xrayOn && (
        <div className="animate-fade-in-up w-full mt-4 flex justify-center">
          <Button primary onClick={() => { playSound('success'); onComplete(); }}>
            Ready to Type Code! <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

// --- SCENE 4: GUIDED CODING (UPGRADED) ---
const SceneGuidedCoding = ({ onComplete }: any) => {
  const [level, setLevel] = useState(0);
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const challenges = [
    { type: 'html', instruction: "Create the Cyberspace Core. Type <div class='neon-core'></div>", expected: "<div class='neon-core'></div>", hint: "Use single quotes for the class!" },
    { type: 'css', instruction: "Give it deep space energy! Type background: #a855f7;", expected: "background: #a855f7;", hint: "Don't forget the semicolon!" },
    { type: 'css', instruction: "Make it a perfect circle! Type border-radius: 50%;", expected: "border-radius: 50%;", hint: "50% makes it round." },
    { type: 'css', instruction: "Add a massive neon glow! Type box-shadow: 0 0 150px #a855f7;", expected: "box-shadow: 0 0 150px #a855f7;", hint: "This creates an intense purple shadow." },
    { type: 'css', instruction: "Spin it up to full power! Type transform: rotate(45deg) scale(1.5);", expected: "transform: rotate(45deg) scale(1.5);", hint: "This scales and rotates it." },
  ];

  const currentChallenge = challenges[level];

  // Accumulate CSS
  const passedCss = challenges.slice(0, level).filter(c => c.type === 'css').map(c => c.expected).join(' ');
  const currentCss = currentChallenge.type === 'css' ? code : '';
  const finalCss = passedCss + ' ' + currentCss;

  // Auto-check code
  useEffect(() => {
    const clean = (s: string) => s.replace(/\s+/g, '').replace(/"/g, "'").toLowerCase();
    if (clean(code) === clean(currentChallenge.expected)) {
      if (!success) {
        setSuccess(true);
        setCelebrate(true);
        playSound('success');
        setTimeout(() => setCelebrate(false), 800);
      }
    } else {
      if (success) {
        setSuccess(false);
      }
    }
  }, [code, currentChallenge, success]);

  const nextLevel = () => {
    if (level < challenges.length - 1) {
      setLevel(level + 1);
      setCode("");
      setSuccess(false);
    } else {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto mt-8 gap-8">
      <div className="bg-white/80 p-6 rounded-3xl backdrop-blur-md border border-white text-center w-full shadow-2xl">
        <h2 className="text-4xl font-black text-slate-800 mb-2 flex items-center justify-center gap-3">
          <Keyboard className="text-indigo-600" size={36} /> You are the Developer
        </h2>
        <p className="text-slate-600 font-bold text-lg">Bring the cyberspace core to life! Type the code exactly as shown to see the magic happen instantly.</p>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-8">
        
        {/* Editor Side */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-indigo-100 border-2 border-indigo-200 p-6 rounded-3xl shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
            <p className="font-black text-indigo-900 mb-2 text-xl tracking-tight">Challenge {level + 1}/5</p>
            <p className="text-indigo-800 text-2xl font-medium leading-tight relative z-10">{currentChallenge.instruction}</p>
          </div>
          
          <div className={`bg-slate-900 rounded-3xl p-6 shadow-2xl relative flex-1 min-h-[300px] border-4 transition-all duration-300 ${success ? 'border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.3)]' : 'border-slate-700'}`}>
            <div className="absolute top-0 left-0 w-full p-3 bg-slate-800 rounded-t-2xl border-b border-slate-700 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-400 text-xs ml-4 font-mono font-bold">
                {currentChallenge.type === 'html' ? 'index.html' : 'style.css'}
              </span>
            </div>
            
            <textarea 
              value={code}
              onChange={(e) => { setCode(e.target.value); playSound('type'); }}
              className="w-full h-full mt-10 bg-transparent text-emerald-400 font-mono text-3xl outline-none resize-none caret-white"
              placeholder="Type your code here..."
              spellCheck="false"
            />
          </div>
        </div>

        {/* Output Side */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white/80 border border-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="font-black text-slate-700 text-xl tracking-tight">Live Preview</span>
            {success && <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-black animate-pulse shadow-sm">Code Match! 🎉</span>}
          </div>
          
          <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl flex-1 min-h-[400px] flex items-center justify-center border-4 border-slate-800 relative overflow-hidden">
             
             {/* Tech Grid Background */}
             <div className="absolute inset-0 opacity-20" style={{ 
               backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)', 
               backgroundSize: '30px 30px' 
             }}></div>

             <div className={`w-full h-full flex items-center justify-center relative transition-all duration-500 ${celebrate ? 'scale-110' : 'hover:scale-105'}`}>

                {/* Target Styles */}
                <style dangerouslySetInnerHTML={{__html: `
                  .neon-core {
                    width: 140px;
                    height: 140px;
                    background: transparent;
                    border: 4px solid rgba(168, 85, 247, 0.3);
                    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                    z-index: 10;
                    ${finalCss}
                  }
                  .neon-core::before {
                    content: '';
                    position: absolute;
                    inset: -20px;
                    border: 2px dashed rgba(6, 182, 212, ${level >= 3 ? '0.8' : '0.1'});
                    border-radius: 50%;
                    animation: spin-forward 10s linear infinite;
                    pointer-events: none;
                    transition: all 0.5s;
                  }
                  .neon-core::after {
                    content: '';
                    position: absolute;
                    inset: -40px;
                    border: 1px solid rgba(168, 85, 247, ${level >= 4 ? '0.5' : '0.1'});
                    border-radius: 50%;
                    animation: spin-backward 15s linear infinite;
                    pointer-events: none;
                    transition: all 0.5s;
                  }
                  @keyframes spin-forward { 100% { transform: rotate(360deg); } }
                  @keyframes spin-backward { 100% { transform: rotate(-360deg); } }
                `}} />

                {/* Core Rendering */}
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: level === 0 ? code : "<div class='neon-core'></div>" 
                  }} 
                  className="relative z-10"
                />
             </div>

          </div>
        </div>
      </div>

      {success && (
        <div className="animate-fade-in-up w-full mt-4 flex justify-center">
          <Button primary onClick={nextLevel} className="text-2xl px-12 py-6 shadow-[0_0_40px_rgba(74,222,128,0.5)] bg-gradient-to-r from-emerald-400 to-green-500 hover:scale-110">
            {level < challenges.length - 1 ? 'Execute & Next Level! 🚀' : 'Mission Accomplished! 🏆'}
          </Button>
        </div>
      )}
    </div>
  );
};


// --- MAIN APP COMPONENT ---
export default function App({ onComplete }: any) {
  const [step, setStep] = useState(0);

  // Global styles for animations and background
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .sunrise-bg {
        background: linear-gradient(-45deg, #fef3c7, #ffe4e6, #e0e7ff, #fef3c7);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
        min-height: 100vh;
        width: 100%;
        position: relative;
        overflow-x: hidden;
      }
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animate-bounce-slow {
        animation: bounce 3s infinite;
      }
      .perspective-[1000px] {
        perspective: 1000px;
      }
      .rotate-x-12 {
        transform: rotateX(12deg);
      }
      .rotate-x-0 {
        transform: rotateX(0deg);
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const nextStep = () => setStep(s => Math.min(s + 1, 4));

  // Determine Byte's message based on step
  let botMessage = "";
  let botMood = "happy";
  
  switch(step) {
    case 0:
      botMessage = "Hi! I'm Byte. Today we are going inside the browser to see how websites are built!";
      botMood = "excited";
      break;
    case 1:
      botMessage = "HTML is the skeleton (content). CSS is the paint (style). Try turning CSS off to see the naked HTML!";
      break;
    case 2:
      botMessage = "Whoa! Let's use CSS powers. Drag the sliders to paint this card.";
      break;
    case 3:
      botMessage = "Every box on a website is an HTML tag. Turn on X-Ray to reveal them!";
      botMood = "excited";
      break;
    case 4:
      botMessage = "Now YOU write the code! Type exactly what I tell you to build the pieces.";
      botMood = "excited";
      break;
  }

  return (
    <div className="sunrise-bg text-slate-900 font-sans selection:bg-pink-300 selection:text-slate-900 pb-32">
      
      {/* Navigation / Progress Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        
        <div className="group pointer-events-none">
          <div className="pointer-events-auto p-6 -m-6">
            <div className="bg-white/60 backdrop-blur-xl border border-white px-6 py-3 rounded-full flex items-center gap-3 shadow-xl opacity-0 group-hover:opacity-100 -translate-y-8 group-hover:translate-y-0 transition-all duration-500">
              <Monitor className="text-indigo-500" size={24} />
              <span className="text-slate-800 font-black tracking-widest text-xl">WEB BUILDER</span>
            </div>
          </div>
        </div>
        
        <div className="group pointer-events-none">
          <div className="pointer-events-auto p-6 -m-6">
            <div className="bg-white/60 backdrop-blur-xl border border-white px-6 py-3 rounded-full flex gap-2 shadow-xl opacity-0 group-hover:opacity-100 -translate-y-8 group-hover:translate-y-0 transition-all duration-500">
              {[0, 1, 2, 3, 4].map(i => (
                <div 
                  key={i} 
                  className={`w-10 h-2 rounded-full transition-all duration-500 ${
                    i <= step ? 'bg-gradient-to-r from-pink-500 to-indigo-500 shadow-sm' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-32 px-6 flex flex-col items-center min-h-screen relative z-10">
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-40 left-20 animate-float opacity-40 pointer-events-none text-indigo-300">
          <Code size={100} />
        </div>
        <div className="absolute bottom-40 right-20 animate-float opacity-40 pointer-events-none text-pink-300" style={{ animationDelay: '2s' }}>
          <LayoutTemplate size={120} />
        </div>

        {/* Scene Container */}
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          
          {step === 0 && (
            <div className="text-center animate-fade-in-up max-w-3xl">
              <div className="mb-8 inline-block p-4 bg-white/60 rounded-3xl backdrop-blur-md border border-white shadow-xl animate-float">
                <Sparkles size={64} className="text-amber-400 mx-auto" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6 drop-shadow-sm">
                Enter The DOM
              </h1>
              <p className="text-2xl text-slate-700 mb-12 font-medium">
                Put on your magic glasses. We are going inside the machine to see what websites are made of.
              </p>
              <Button primary onClick={nextStep} className="text-2xl px-12 py-6 rounded-full mx-auto shadow-xl">
                Start Adventure <Power className="ml-2"/>
              </Button>
            </div>
          )}

          {step === 1 && (
            <div className="w-full animate-fade-in">
              <SceneAnatomy onComplete={nextStep} />
            </div>
          )}

          {step === 2 && (
            <div className="w-full animate-fade-in">
              <SceneBuilder onComplete={nextStep} />
            </div>
          )}

          {step === 3 && (
            <div className="w-full animate-fade-in">
              <SceneXRay onComplete={nextStep} />
            </div>
          )}

          {step === 4 && (
            <div className="w-full animate-fade-in">
              <SceneGuidedCoding onComplete={() => {
                if (onComplete) {
                  onComplete();
                } else {
                  alert("Congratulations! You've mastered HTML & CSS basics! Proceed to JavaScript.");
                  setStep(0);
                }
              }} />
            </div>
          )}

        </div>
      </main>

      {/* The Robot Companion */}
      <Byte message={botMessage} mood={botMood} />

    </div>
  );
}