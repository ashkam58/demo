import React, { useState, useEffect, useCallback } from 'react';
import { 
  Bot, Sparkles, TerminalSquare, Cpu, Zap, 
  ChevronRight, ArrowRight, Play,
  Box, Database, Code2, PaintBucket
} from 'lucide-react';

import { playInteractionSound as playSound } from './audio';
import confetti from 'canvas-confetti';

// --- Shared Components ---
const GlassPanel = ({ children, className = "", glowing = false }: any) => (
  <div className={`bg-white/70 backdrop-blur-xl border ${glowing ? 'border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.5)]' : 'border-white/50 shadow-xl'} rounded-3xl overflow-hidden transition-all duration-500 ${className}`}>
    {children}
  </div>
);

const Button = ({ onClick, children, primary = false, className = "", color = "green" }: any) => {
  const baseColor = color === "green" ? "from-emerald-400 to-green-500 shadow-green-500/30 hover:shadow-green-500/50" : 
                    color === "blue" ? "from-blue-400 to-indigo-500 shadow-blue-500/30 hover:shadow-blue-500/50" :
                    color === "red" ? "from-rose-400 to-red-500 shadow-red-500/30 hover:shadow-red-500/50" :
                    "from-purple-400 to-fuchsia-500 shadow-purple-500/30 hover:shadow-purple-500/50";
  
  return (
    <button 
      onClick={() => { playSound('pop'); onClick(); }}
      className={`px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 ${
        primary 
          ? `bg-gradient-to-r ${baseColor} text-white shadow-lg` 
          : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-md'
      } ${className}`}
    >
      {children}
    </button>
  );
};

// --- The Robot Companion (Py) ---
const Py = ({ message, mood = 'happy' }: any) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 group pointer-events-none">
      <div className="pointer-events-auto p-12 -m-4">
        <div className="flex items-end gap-4 animate-float max-w-sm opacity-0 group-hover:opacity-100 translate-y-12 group-hover:translate-y-0 transition-all duration-500 mb-8 ml-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-[0_0_30px_rgba(74,222,128,0.5)] border-2 border-green-400">
              <Bot size={32} className={`text-green-500 ${mood === 'excited' ? 'animate-pulse' : ''}`} />
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="bg-white/90 text-emerald-800 px-6 py-4 rounded-3xl rounded-bl-none shadow-xl border border-green-200 backdrop-blur-md">
            <p className="font-mono text-sm tracking-wide leading-relaxed font-bold">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCENE 1: Introduction (HTML vs CSS vs Python) ---
const SceneIntro = ({ onComplete }: any) => {
  const [stage, setStage] = useState(0); // 0: HTML, 1: CSS, 2: Python

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 2000);
    const timer2 = setTimeout(() => { setStage(2); playSound('success'); }, 4000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto mt-12 gap-8 text-slate-800">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black mb-4">Evolution of a Web App</h2>
        <p className="text-slate-600 font-mono">Watch how code transforms static text into an intelligent machine.</p>
      </div>

      <div className="flex gap-8 items-center w-full justify-center">
        {/* HTML Stage */}
        <div className={`transition-all duration-1000 ${stage >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} text-center`}>
          <div className="bg-white p-6 w-48 h-64 border border-slate-300 mb-4 flex flex-col justify-start shadow-sm">
            <h1 className="text-slate-800 font-serif text-lg mb-2">My Robot</h1>
            <button className="bg-slate-200 border border-slate-400 text-slate-800 px-2 py-1 text-sm">Click me</button>
          </div>
          <div className="font-mono text-slate-500">&lt;html&gt; (Structure)</div>
        </div>

        <ArrowRight className={`text-slate-400 transition-all duration-500 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`} size={32} />

        {/* CSS Stage */}
        <div className={`transition-all duration-1000 ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 absolute'} text-center`}>
          <div className="bg-gradient-to-br from-indigo-400 to-purple-500 p-6 w-48 h-64 rounded-3xl shadow-xl border border-white mb-4 flex flex-col justify-center items-center">
            <h1 className="text-white font-bold text-xl mb-4 drop-shadow-sm">My Robot</h1>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-full font-bold shadow-md">Hover Me</button>
          </div>
          <div className="font-mono text-indigo-600 font-bold">CSS (Style)</div>
        </div>

        <ArrowRight className={`text-slate-400 transition-all duration-500 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`} size={32} />

        {/* Python Stage */}
        <div className={`transition-all duration-1000 ${stage >= 2 ? 'opacity-100 scale-110' : 'opacity-0 scale-50 absolute'} text-center`}>
          <div className="bg-white p-6 w-56 h-72 rounded-3xl shadow-[0_0_40px_rgba(74,222,128,0.5)] border-2 border-emerald-400 mb-4 flex flex-col justify-center items-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Bot size={64} className="text-emerald-500 mb-4 animate-bounce-slow" />
            <h1 className="text-emerald-600 font-mono font-bold text-xl mb-4">AI Online</h1>
            <div className="text-xs text-slate-600 font-mono text-left w-full bg-slate-100 p-3 rounded-xl border border-slate-200">
              {">"} analyzing...<br/>
              {">"} user detected<br/>
              {">"} awaiting input_
            </div>
          </div>
          <div className="font-mono text-emerald-600 font-bold text-lg drop-shadow-sm">PYTHON (Brain)</div>
        </div>
      </div>

      {stage === 2 && (
        <div className="animate-fade-in-up mt-12">
          <Button primary onClick={onComplete} color="green">
            Give me superpowers <Zap size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

// --- SCENE 2: The Terminal (Hello World) ---
const SceneTerminal = ({ onComplete }: any) => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleType = (e: any) => {
    setCode(e.target.value);
    playSound('type');
  };

  const handleRun = () => {
    playSound('laser');
    
    // Simple parser for the educational demo
    let currentOutput: string[] = [];
    if (code.includes('print(')) {
      const match = code.match(/print\s*\(\s*["'](.*?)["']\s*\)/);
      if (match) {
        currentOutput.push(match[1]);
        if (match[1].toLowerCase().includes("wizard")) {
          setTimeout(() => {
            playSound('success');
            setIsSuccess(true);
          }, 500);
        }
      } else {
        currentOutput.push("SyntaxError: Check your quotes and parentheses.");
      }
    } else {
      currentOutput.push("Try using the print() function!");
    }
    
    setOutput(currentOutput);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto mt-8 gap-8">
      <GlassPanel className="w-full flex flex-col shadow-2xl" glowing={isSuccess}>
        {/* Terminal Header */}
        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between rounded-t-3xl">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-slate-300 font-mono text-sm flex items-center gap-2">
            <TerminalSquare size={16} /> PyTerm 3.11
          </div>
        </div>
        
        {/* Editor */}
        <div className="p-6 relative bg-slate-900">
          <div className="text-emerald-400/80 font-mono text-sm mb-4">
            # Challenge: Make the computer say "I am a Python Wizard!"
          </div>
          <div className="flex font-mono text-lg">
            <div className="text-slate-600 select-none pr-4 text-right">
              1<br/>2
            </div>
            <textarea 
              value={code}
              onChange={handleType}
              className="bg-transparent w-full outline-none text-emerald-400 resize-none h-24 caret-white"
              spellCheck="false"
              placeholder='print("...")'
            />
          </div>
          <button 
            onClick={handleRun}
            className="absolute bottom-6 right-6 bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 px-6 py-2 rounded-xl font-mono flex items-center gap-2 transition-all font-bold"
          >
            <Play size={16} fill="currentColor" /> RUN CODE
          </button>
        </div>

        {/* Output */}
        <div className="bg-slate-950 p-6 min-h-[120px] font-mono rounded-b-3xl">
          <div className="text-slate-500 text-xs mb-2">OUTPUT CONSOLE:</div>
          {output.map((line, i) => (
            <div key={i} className={`text-lg ${line.includes('Error') ? 'text-rose-400' : 'text-slate-200'} animate-fade-in`}>
              {">"} {line}
            </div>
          ))}
          {output.length === 0 && <div className="text-slate-600 animate-pulse">{">"} waiting for execution...</div>}
        </div>
      </GlassPanel>

      {isSuccess && (
        <div className="animate-fade-in-up">
          <Button primary onClick={onComplete} color="green">
            Awesome! Next Lesson <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

// --- SCENE 3: Variables (The Magic Containers) ---
const SceneVariables = ({ onComplete }: any) => {
  const [vars, setVars] = useState<{name: string | null, score: string | null}>({ name: null, score: null });
  
  const handleAssign = (key: 'name'|'score', value: string) => {
    playSound('laser');
    setVars(prev => ({ ...prev, [key]: value }));
  };

  const isComplete = vars.name && vars.score;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center mt-8 gap-12">
      <div className="text-center text-slate-800">
        <h2 className="text-4xl font-black mb-2">Variables are Magic Containers</h2>
        <p className="text-slate-600 font-mono text-lg">Click a value to store it in a variable.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 w-full justify-center items-center">
        
        {/* Values to assign */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => handleAssign('name', '"Alex"')}
            className={`px-6 py-4 rounded-xl font-mono text-xl border-2 transition-all font-bold ${vars.name === '"Alex"' ? 'opacity-0 scale-50' : 'bg-white border-purple-400 text-purple-600 hover:bg-purple-50 shadow-md'}`}
          >
            "Alex"
          </button>
          <button 
            onClick={() => handleAssign('score', '9000')}
            className={`px-6 py-4 rounded-xl font-mono text-xl border-2 transition-all font-bold ${vars.score === '9000' ? 'opacity-0 scale-50' : 'bg-white border-blue-400 text-blue-600 hover:bg-blue-50 shadow-md'}`}
          >
            9000
          </button>
        </div>

        <ArrowRight className="text-slate-400 hidden md:block" size={48} />

        {/* The Variables (Containers) */}
        <div className="flex gap-8">
          <GlassPanel className={`w-48 h-48 flex flex-col items-center justify-center relative transition-all duration-500 bg-white ${vars.name ? 'border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)]' : ''}`}>
            <Box size={48} className={vars.name ? 'text-purple-500' : 'text-slate-400'} />
            <div className="font-mono mt-4 text-slate-500 font-bold">player_name</div>
            {vars.name && (
              <div className="absolute inset-0 flex items-center justify-center bg-purple-500/10 backdrop-blur-sm animate-fade-in">
                <span className="font-mono text-2xl text-purple-700 font-black drop-shadow-sm">{vars.name}</span>
              </div>
            )}
          </GlassPanel>

          <GlassPanel className={`w-48 h-48 flex flex-col items-center justify-center relative transition-all duration-500 bg-white ${vars.score ? 'border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : ''}`}>
            <Database size={48} className={vars.score ? 'text-blue-500' : 'text-slate-400'} />
            <div className="font-mono mt-4 text-slate-500 font-bold">high_score</div>
            {vars.score && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10 backdrop-blur-sm animate-fade-in">
                <span className="font-mono text-2xl text-blue-700 font-black drop-shadow-sm">{vars.score}</span>
              </div>
            )}
          </GlassPanel>
        </div>
      </div>

      {/* Live Output */}
      <div className="w-full max-w-2xl bg-slate-900 rounded-3xl p-6 shadow-2xl font-mono text-white mt-8 h-32 flex flex-col justify-center border-4 border-slate-700">
        {isComplete ? (
          <div className="animate-fade-in-up text-lg">
            <span className="text-emerald-400">{"> "}Welcome back,</span> <span className="text-purple-300 font-bold">{vars.name}</span>!<br/>
            <span className="text-emerald-400">{"> "}Your current high score is:</span> <span className="text-blue-300 font-bold">{vars.score}</span>
          </div>
        ) : (
          <div className="text-slate-500 animate-pulse text-lg">{"> "} Waiting for variables to be assigned...</div>
        )}
      </div>

      {isComplete && (
        <div className="animate-fade-in-up mt-4">
          <Button primary onClick={() => { playSound('success'); onComplete(); }} color="green">
            Perfect! Proceed to Algorithms <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};


// --- SCENE 4: Binary Search (The Masterpiece Visualizer) ---
const SceneBinarySearch = ({ onComplete }: any) => {
  const MAX = 1000;
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(MAX);
  const [stepCount, setStepCount] = useState(0);
  const [found, setFound] = useState(false);
  const [isStarting, setIsStarting] = useState(true);

  const guess = Math.floor((low + high) / 2);
  const rangeTotal = high - low + 1;
  const leftPercent = ((low - 1) / MAX) * 100;
  const widthPercent = (rangeTotal / MAX) * 100;
  const guessPercentRelative = ((guess - low) / rangeTotal) * 100;

  const handleHigher = () => {
    playSound('laser');
    setLow(guess + 1);
    setStepCount(s => s + 1);
  };

  const handleLower = () => {
    playSound('laser');
    setHigh(guess - 1);
    setStepCount(s => s + 1);
  };

  const handleFound = () => {
    playSound('success');
    setFound(true);
  };

  const reset = () => {
    setLow(1);
    setHigh(MAX);
    setStepCount(0);
    setFound(false);
    setIsStarting(true);
  };

  if (isStarting) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto mt-12 gap-8 animate-fade-in">
        <Cpu size={80} className="text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse" />
        <h2 className="text-5xl font-black text-slate-800 text-center tracking-tight">The AI Mind Reader</h2>
        <p className="text-xl text-slate-600 text-center mb-8">
          Think of ANY number between <span className="text-indigo-600 font-bold">1</span> and <span className="text-indigo-600 font-bold">1000</span>.<br/>
          I will find it using an algorithm called <strong>Binary Search</strong>.
        </p>
        <Button primary onClick={() => { playSound('pop'); setIsStarting(false); }} className="text-2xl px-12 py-6 shadow-xl">
          I have a number <Play className="ml-2" fill="currentColor"/>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-4 flex flex-col gap-8 animate-fade-in">
      
      {/* Top HUD */}
      <div className="grid grid-cols-3 gap-6">
        <GlassPanel className="p-6 text-center bg-white">
          <div className="text-slate-500 font-mono text-sm uppercase tracking-wider mb-2 font-bold">Search Space</div>
          <div className="text-3xl font-black text-slate-800">{rangeTotal} <span className="text-sm font-normal text-slate-500">numbers left</span></div>
        </GlassPanel>
        <GlassPanel className="p-6 text-center border-emerald-400 bg-white" glowing>
          <div className="text-emerald-600 font-mono text-sm uppercase tracking-wider mb-2 font-bold">Current Range</div>
          <div className="text-3xl font-black text-slate-800">{low} <span className="text-slate-400 mx-2">→</span> {high}</div>
        </GlassPanel>
        <GlassPanel className="p-6 text-center bg-white">
          <div className="text-slate-500 font-mono text-sm uppercase tracking-wider mb-2 font-bold">Guesses Taken</div>
          <div className="text-3xl font-black text-slate-800">{stepCount}</div>
        </GlassPanel>
      </div>

      {/* Visualizer Bar */}
      <div className="w-full bg-slate-200 rounded-full h-32 relative overflow-hidden shadow-inner border border-slate-300">
        {/* The active range bar */}
        <div 
          className="absolute h-full bg-emerald-100 border-x-4 border-emerald-500 transition-all duration-1000 ease-in-out flex flex-col justify-center shadow-[inset_0_0_20px_rgba(16,185,129,0.2)]"
          style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
        >
          {/* Grid lines inside active area */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(90deg, transparent 95%, #10b981 100%)', backgroundSize: '20px 100%' }}></div>
          
          {/* The Midpoint (Guess) Line */}
          <div 
            className="absolute h-[120%] w-1 bg-emerald-600 top-[-10%] z-20 shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-1000 ease-in-out flex flex-col items-center"
            style={{ left: `${guessPercentRelative}%` }}
          >
            {/* Value flag */}
            <div className="absolute -top-10 bg-emerald-500 text-white font-black px-4 py-1 rounded-full text-xl shadow-lg transform -translate-x-1/2 whitespace-nowrap">
              Is it {guess}?
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {!found ? (
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="flex gap-6 w-full justify-center">
            <Button onClick={handleLower} color="blue" className="w-64 text-xl">
              👇 It's Lower
            </Button>
            <Button primary onClick={handleFound} color="green" className="w-64 text-xl shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              🎉 That's It!
            </Button>
            <Button onClick={handleHigher} color="red" className="w-64 text-xl">
              👆 It's Higher
            </Button>
          </div>
          <p className="text-slate-700 font-medium text-sm max-w-lg text-center mt-4 bg-amber-100/50 p-4 rounded-xl border border-amber-200">
            💡 Notice how every single guess eliminates exactly HALF of all remaining possibilities. A random guess would take hundreds of tries. Binary search takes maximum 10 tries for 1000 numbers!
          </p>
        </div>
      ) : (
        <div className="text-center animate-fade-in-up mt-8">
          <h2 className="text-4xl font-black text-emerald-600 mb-4 drop-shadow-sm">I read your mind in {stepCount} steps!</h2>
          <p className="text-slate-600 text-xl mb-8 font-medium">This is the power of algorithms. Now let's build something visual.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset} className="bg-white text-slate-800">Play Again</Button>
            <Button primary onClick={onComplete}>Enter Python Canvas <ArrowRight/></Button>
          </div>
        </div>
      )}
    </div>
  );
};


// --- SCENE 5: Python Visualizer (UPGRADED) ---
const ScenePythonVisualizer = ({ onComplete }: any) => {
  const [level, setLevel] = useState(0);
  const [code, setCode] = useState("");
  const [elements, setElements] = useState<React.ReactNode[]>([]);
  const [success, setSuccess] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const levels = [
    { title: "The Glowing Sun", instruction: "Create a massive sun! Use draw_circle(150, '#fcd34d')", expectedCode: "draw_circle(150, '#fcd34d')" },
    { title: "The Monolith", instruction: "Draw a mysterious base. Use draw_square(160, '#a855f7')", expectedCode: "draw_square(160, '#a855f7')" },
    { title: "The Portal", instruction: "Combine them! Draw a purple square, then a cyan circle on top.", expectedCode: "draw_square(160, '#a855f7')\ndraw_circle(80, '#22d3ee')" }
  ];

  const currentLevel = levels[level];

  const handleType = (e: any) => {
    setCode(e.target.value);
    playSound('type');
  };

  const executeCode = () => {
    playSound('laser');
    const newElements: React.ReactNode[] = [];
    
    const lines = code.split('\n');
    let hasSun = false;
    let hasMonolith = false;
    let hasPortalSquare = false;
    let hasPortalCircle = false;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const circleMatch = trimmed.match(/draw_circle\(\s*(\d+)\s*,\s*["']([^"']+)["']\s*\)/);
      if (circleMatch) {
        const size = parseInt(circleMatch[1]);
        const color = circleMatch[2].toLowerCase();
        
        if (level === 0 && size > 50 && (color === '#fcd34d' || color === 'yellow' || color === 'gold')) hasSun = true;
        if (level === 2 && size > 20 && (color === '#22d3ee' || color === 'cyan' || color === 'blue' || color === 'lightblue')) hasPortalCircle = true;

        newElements.push(
          <div key={`c-${index}`} className="absolute animate-extreme-bounce" style={{ 
            width: size * 2, height: size * 2, 
            backgroundColor: color, 
            borderRadius: '50%',
            top: '50%', left: '50%', 
            color: color, // For the box-shadow currentColor trick
            boxShadow: `0 0 60px ${color}80, inset 0 0 30px rgba(255,255,255,0.5)`,
            zIndex: index
          }} />
        );
      }

      const squareMatch = trimmed.match(/draw_square\(\s*(\d+)\s*,\s*["']([^"']+)["']\s*\)/);
      if (squareMatch) {
        const size = parseInt(squareMatch[1]);
        const color = squareMatch[2].toLowerCase();

        if (level === 1 && size > 50 && (color === '#a855f7' || color === 'purple' || color === 'violet')) hasMonolith = true;
        if (level === 2 && size > 50 && (color === '#a855f7' || color === 'purple' || color === 'violet')) hasPortalSquare = true;

        newElements.push(
          <div key={`s-${index}`} className="absolute animate-extreme-bounce" style={{ 
            width: size, height: size, 
            backgroundColor: color,
            top: '50%', left: '50%', 
            color: color,
            boxShadow: `0 0 60px ${color}80, inset 0 0 30px rgba(255,255,255,0.3)`,
            borderRadius: '24px',
            zIndex: index
          }} />
        );
      }
    });

    setElements(newElements);
    
    let passed = false;
    if (level === 0 && hasSun) passed = true;
    if (level === 1 && hasMonolith) passed = true;
    if (level === 2 && hasPortalSquare && hasPortalCircle) passed = true;

    if (passed) {
      setTimeout(() => {
        setSuccess(true);
        setCelebrate(true);
        playSound('success');
        setTimeout(() => setCelebrate(false), 1200);
      }, 500);
    } else {
      setSuccess(false);
    }
  };

  const nextLevel = () => {
    if (level < levels.length - 1) {
      setLevel(level + 1);
      setCode("");
      setElements([]);
      setSuccess(false);
    } else {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto mt-8 gap-8">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes extreme-bounce {
          0% { transform: translate(-50%, -50%) scale(0) rotate(-45deg); opacity: 0; }
          60% { transform: translate(-50%, -50%) scale(1.3) rotate(10deg); opacity: 1; box-shadow: 0 0 100px currentColor; }
          100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-extreme-bounce {
          animation: extreme-bounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .celebrate-glow {
          animation: pulse-glow 1s ease-in-out infinite alternate;
        }
        @keyframes pulse-glow {
          from { box-shadow: 0 0 30px #10b981, inset 0 0 20px #10b981; border-color: #34d399; }
          to { box-shadow: 0 0 80px #10b981, inset 0 0 60px #10b981; border-color: #6ee7b7; }
        }
      `}} />

      <div className="bg-white/80 p-6 rounded-3xl backdrop-blur-md border border-white text-center w-full shadow-2xl">
        <h2 className="text-4xl font-black text-slate-800 mb-2 flex items-center justify-center gap-3">
          <PaintBucket className="text-indigo-600" size={36}/> Python Canvas
        </h2>
        <p className="text-slate-600 font-bold text-lg">Use Python commands to conjure shapes into existence!</p>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-8">
        
        {/* Editor Side */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-indigo-100 border-2 border-indigo-200 p-6 rounded-3xl shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
            <p className="font-black text-indigo-900 mb-2 text-xl tracking-tight">Level {level + 1}: {currentLevel.title}</p>
            <p className="text-indigo-800 text-xl font-medium leading-tight relative z-10">{currentLevel.instruction}</p>
            <div className="mt-4 pt-4 border-t border-indigo-200/50">
              <code className="block text-indigo-600 bg-indigo-50 p-2 rounded-lg mb-2 font-bold shadow-sm">draw_circle(size, "color")</code>
              <code className="block text-indigo-600 bg-indigo-50 p-2 rounded-lg font-bold shadow-sm">draw_square(size, "color")</code>
            </div>
          </div>
          
          <div className={`bg-slate-900 rounded-3xl p-6 shadow-2xl relative flex-1 min-h-[300px] border-4 transition-all duration-300 ${success ? 'border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.3)]' : 'border-slate-700'}`}>
            <div className="absolute top-0 left-0 w-full p-3 bg-slate-800 rounded-t-2xl border-b border-slate-700 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-400 text-xs ml-4 font-mono font-bold">main.py</span>
            </div>
            
            <textarea 
              value={code}
              onChange={handleType}
              className="w-full h-full mt-10 bg-transparent text-emerald-400 font-mono text-3xl outline-none resize-none caret-white leading-relaxed"
              placeholder="# Type your commands..."
              spellCheck="false"
            />

            <button 
              onClick={executeCode}
              className="absolute bottom-6 right-6 bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] px-8 py-4 rounded-xl font-mono flex items-center gap-3 transition-all transform hover:scale-105 font-black text-xl"
            >
              <Play size={24} fill="currentColor" /> RUN SCRIPT
            </button>
          </div>
        </div>

        {/* Output Side */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white/80 border border-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="font-black text-slate-700 text-xl tracking-tight">Canvas Output</span>
            {success && <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-black animate-pulse shadow-sm">Masterpiece! 🎉</span>}
          </div>
          
          <div className={`bg-slate-800 rounded-[3rem] p-8 shadow-2xl flex-1 min-h-[400px] flex items-center justify-center border-[12px] border-slate-700 relative overflow-hidden transition-all duration-500 ${celebrate ? 'celebrate-glow scale-105' : ''}`}>
            
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.5) 2px, transparent 2px)', 
              backgroundSize: '40px 40px' 
            }}></div>

            {elements.length === 0 ? (
              <div className="text-slate-500 font-mono text-center flex flex-col items-center gap-4 animate-pulse">
                <Sparkles size={48} className="opacity-50" />
                <p className="text-xl font-bold">Awaiting Instructions...</p>
              </div>
            ) : (
              elements
            )}
          </div>
        </div>
      </div>

      {success && (
        <div className="animate-fade-in-up w-full mt-4 flex justify-center">
          <Button primary onClick={nextLevel} className="text-2xl px-12 py-6 shadow-[0_0_40px_rgba(74,222,128,0.5)] bg-gradient-to-r from-emerald-400 to-green-500 hover:scale-110">
             {level < levels.length - 1 ? 'Next Level! 🚀' : 'Complete Python Canvas! 🏆'}
          </Button>
        </div>
      )}
    </div>
  );
};


// --- SCENE 6: Grand Finale (The Constellation) ---
const SceneFinale = ({ onComplete }: any) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-200/40 via-transparent to-transparent pointer-events-none"></div>
      
      <Sparkles size={80} className="text-emerald-500 mb-8 animate-pulse drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
      
      <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 mb-6 text-center drop-shadow-sm">
        You Are A Creator
      </h1>
      
      <p className="text-xl md:text-2xl text-slate-600 max-w-2xl text-center leading-relaxed font-medium mb-16">
        You are no longer just playing games or using apps.<br/>
        With Code, you now have the power to build them.
      </p>

      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mb-12">
        {['Coding', 'Algorithms', 'AI', 'HTML', 'CSS', 'PYTHON'].map((skill, i) => (
          <div 
            key={skill}
            className={`px-6 py-3 rounded-full font-bold text-lg backdrop-blur-md border ${
              skill === 'PYTHON' 
                ? 'bg-emerald-100 border-emerald-400 text-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-bounce-slow' 
                : 'bg-white border-slate-200 text-slate-500 shadow-sm'
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {skill} {skill === 'PYTHON' && '🚀'}
          </div>
        ))}
      </div>
      
      {onComplete && (
        <div className="animate-fade-in-up mt-8">
          <Button primary onClick={onComplete} color="green" className="text-xl px-12 py-6 shadow-xl">
            Complete Journey <ArrowRight className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};


// --- MAIN APP COMPONENT ---
export default function App({ onComplete }: any) {
  const [step, setStep] = useState(0);

  // Global styles for animations, glowing grids, and themes
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .bright-bg {
        background: linear-gradient(-45deg, #f0fdf4, #dcfce7, #fdf4ff, #f0fdfa);
        background-size: 400% 400%;
        animation: gradient 20s ease infinite;
        min-height: 100vh;
        width: 100%;
        position: relative;
        overflow-x: hidden;
      }
      .cyber-grid-light {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(to right, rgba(16,185,129,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16,185,129,0.1) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
        z-index: 0;
      }
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(1deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      .animate-float {
        animation: float 5s ease-in-out infinite;
      }
      .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-bounce-slow {
        animation: bounce 3s infinite;
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
        50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
      }
      /* Custom scrollbar for terminal */
      textarea::-webkit-scrollbar {
        width: 8px;
      }
      textarea::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.2); 
      }
      textarea::-webkit-scrollbar-thumb {
        background: rgba(16,185,129,0.5); 
        border-radius: 4px;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const nextStep = useCallback(() => {
    setStep(s => Math.min(s + 1, 5));
  }, []);

  // Determine Py's message based on step
  let botMessage = "";
  let botMood = "happy";
  
  switch(step) {
    case 0:
      botMessage = "Initiating Python Sequence. HTML and CSS were just the beginning. Ready to build a brain?";
      botMood = "excited";
      break;
    case 1:
      botMessage = "Type exactly what I show you in the terminal. The computer will execute your command.";
      break;
    case 2:
      botMessage = "Variables store data. Think of them like labeled boxes holding treasure!";
      break;
    case 3:
      botMessage = "Watch closely. Binary search eliminates HALF the possibilities every single time. It's incredibly fast.";
      botMood = "excited";
      break;
    case 4:
      botMessage = "Time to draw with code! Write some python functions to render graphics.";
      botMood = "excited";
      break;
    case 5:
      botMessage = "Module Complete. You are a Certified Python Wizard. The digital universe awaits.";
      botMood = "happy";
      break;
  }

  return (
    <div className="bright-bg text-slate-800 font-sans selection:bg-emerald-200 selection:text-slate-900 pb-32">
      <div className="cyber-grid-light"></div>
      
      {/* Navigation / Progress Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        
        <div className="group pointer-events-none">
          <div className="pointer-events-auto p-6 -m-6">
            <div className="bg-white/80 backdrop-blur-md border border-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg opacity-0 group-hover:opacity-100 -translate-y-8 group-hover:translate-y-0 transition-all duration-500">
              <Code2 className="text-emerald-500" size={24} />
              <span className="text-slate-800 font-black tracking-widest text-xl font-mono">PYTHON_ACADEMY</span>
            </div>
          </div>
        </div>
        
        <div className="group pointer-events-none">
          <div className="pointer-events-auto p-6 -m-6">
            <div className="bg-white/80 backdrop-blur-md border border-white px-6 py-3 rounded-full flex gap-2 shadow-lg opacity-0 group-hover:opacity-100 -translate-y-8 group-hover:translate-y-0 transition-all duration-500">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div 
                  key={i} 
                  className={`w-8 h-2 rounded-full transition-all duration-500 ${
                    i < step ? 'bg-emerald-500 shadow-sm' : 
                    i === step ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse w-12' : 
                    'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-32 px-6 flex flex-col items-center min-h-screen relative z-10 w-full max-w-7xl mx-auto">
        
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          
          {step === 0 && <SceneIntro onComplete={nextStep} />}
          {step === 1 && <SceneTerminal onComplete={nextStep} />}
          {step === 2 && <SceneVariables onComplete={nextStep} />}
          {step === 3 && <SceneBinarySearch onComplete={nextStep} />}
          {step === 4 && <ScenePythonVisualizer onComplete={nextStep} />}
          {step === 5 && <SceneFinale onComplete={onComplete} />}

        </div>
      </main>

      {/* The Robot Companion */}
      <Py message={botMessage} mood={botMood} />

    </div>
  );
}