import { useState, useEffect } from 'react';
import { Play, Sparkles, BrainCircuit, Code2, Volume2, VolumeX, ArrowRight, ArrowUp, ArrowDown, ArrowLeft, RefreshCw, Check, X, Flag, RotateCcw, RotateCw } from 'lucide-react';

// --- CUSTOM ANIMATION STYLES ---
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
    50% { transform: translateY(-30px) rotate(-3deg) scale(1.05); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.4); }
    50% { box-shadow: 0 0 50px rgba(56, 189, 248, 0.8), 0 0 100px rgba(250, 204, 21, 0.6); }
  }
  @keyframes particle-drift {
    0% { transform: translateY(100vh) translateX(0); opacity: 0; }
    20% { opacity: 0.8; }
    80% { opacity: 0.5; }
    100% { transform: translateY(-10vh) translateX(100px); opacity: 0; }
  }
  @keyframes scene-transition {
    0% { opacity: 0; transform: scale(0.95) translateY(20px); filter: blur(10px); }
    100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
  .animate-glow { animation: pulse-glow 3s ease-in-out infinite; }
  .scene-enter { animation: scene-transition 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  
  .bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  }
  
  .text-gradient {
    background: linear-gradient(135deg, #0284c7 0%, #7c3aed 50%, #db2777 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// --- PARTICLE SYSTEM ---
const MagicalBackground = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => {
      const isCloud = i % 5 === 0;
      return {
        id: i,
        left: `${Math.random() * 100}vw`,
        size: isCloud ? Math.random() * 40 + 40 : Math.random() * 12 + 8,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        content: isCloud ? '☁️' : '✨',
        opacity: isCloud ? 0.4 : 0.8
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Animated glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-[100px] animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-300/30 rounded-full mix-blend-multiply filter blur-[100px] animate-float-slow" style={{animationDelay: '-4s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-300/30 rounded-full mix-blend-multiply filter blur-[100px] animate-float-slow" style={{animationDelay: '-2s'}}></div>

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute flex items-center justify-center drop-shadow-md"
          style={{
            left: p.left,
            fontSize: `${p.size}px`,
            animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
            opacity: 0,
            filter: `opacity(${p.opacity})`
          }}
        >
          {p.content}
        </div>
      ))}
    </div>
  );
};

// --- SCENE 1: WELCOME ---
const WelcomeScene = ({ onNext }: any) => (
  <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center px-4 scene-enter">
    <div className="animate-float mb-8">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.5)] rotate-12">
        <Sparkles className="w-12 h-12 text-slate-700" />
      </div>
    </div>
    
    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
      <span className="text-slate-700">THE WORLD OF </span>
      <br />
      <span className="text-gradient">CODING</span>
    </h1>
    
    <p className="text-2xl md:text-2xl text-slate-700 max-w-2xl mb-12 font-medium">
      Everything around you—from video games to spaceships—was created using code. Ready to discover how it works?
    </p>
    
    <button 
      onClick={onNext}
      className="group relative px-8 py-4 bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50  text-slate-900 rounded-full font-bold text-2xl transition-all duration-300 hover:scale-105 animate-glow flex items-center gap-3 overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-sky-300 via-purple-300 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <span className="relative z-10 flex items-center gap-2">
        Start Adventure <Play className="w-5 h-5 fill-current" />
      </span>
    </button>
  </div>
);

// --- SCENE 2: WHAT IS CODING ---
const CodingScene = ({ onNext }: any) => {
  const [robotAction, setRobotAction] = useState('idle');

  const handleAction = (action: string) => {
    setRobotAction(action);
    setTimeout(() => setRobotAction('idle'), 1500);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 scene-enter max-w-6xl mx-auto py-4">
      <div className="bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 rounded-3xl p-8 md:p-12 w-full flex flex-col md:flex-row gap-12 items-center">
        
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
            <Code2 className="w-5 h-5" />
            <span className="font-semibold tracking-wider uppercase text-sm">Chapter 1: Coding</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-headings font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#7C3AED] to-[#EC4899] drop-shadow-[0_8px_25px_rgba(0,0,0,0.15)] mb-6 tracking-tight drop-shadow-sm">
          Welcome to the<br/>World of Coding
        </h2>  <p className="text-2xl text-slate-700 leading-relaxed">
            Coding is simply giving instructions to a computer. Computers aren't actually smart—they just follow your commands exactly!
          </p>

          <div className="bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50 /80 rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-slate-700 font-semibold mb-4 flex items-center gap-2">
              <span className="bg-indigo-500 w-8 h-8 rounded-full flex items-center justify-center text-slate-700 text-sm">1</span>
              Give Byte an instruction:
            </h3>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => handleAction('jump')} className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] shadow-[0_15px_50px_rgba(139,92,246,0.25)] hover:-translate-y-1 active:scale-95 text-white rounded-xl font-medium transition-colors shadow-md active:scale-95">
                Jump()
              </button>
              <button onClick={() => handleAction('spin')} className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white rounded-xl font-medium transition-colors shadow-md active:scale-95">
                Spin()
              </button>
              <button onClick={() => handleAction('glow')} className="px-6 py-3 bg-pink-500 hover:bg-pink-400 text-white rounded-xl font-medium transition-colors shadow-md active:scale-95">
                Glow()
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative w-48 h-48">
              {/* Pixar Robot */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 animate-float
                ${robotAction === 'jump' ? '-translate-y-20' : ''}
                ${robotAction === 'spin' ? 'rotate-180' : ''}
                ${robotAction === 'glow' ? 'scale-110 drop-shadow-[0_0_40px_rgba(66,232,255,0.8)]' : 'drop-shadow-[0_20px_30px_rgba(66,232,255,0.3)]'}
              `}>
                <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-[40px] flex flex-col items-center justify-center relative overflow-hidden border-b-8 border-slate-300 shadow-[inset_0_5px_15px_rgba(255,255,255,1)]">
                  {/* Screen / Face */}
                  <div className="w-24 h-16 bg-slate-800 rounded-2xl flex flex-col items-center justify-center relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                    {/* Eyes */}
                    <div className="flex gap-3 mt-1">
                      <div className={`w-5 h-6 rounded-full ${robotAction === 'idle' ? 'bg-[#42E8FF] shadow-[0_0_15px_#42E8FF] animate-pulse' : 'bg-pink-400 shadow-[0_0_15px_#f472b6]'}`}></div>
                      <div className={`w-5 h-6 rounded-full ${robotAction === 'idle' ? 'bg-[#42E8FF] shadow-[0_0_15px_#42E8FF] animate-pulse' : 'bg-pink-400 shadow-[0_0_15px_#f472b6]'}`}></div>
                    </div>
                  </div>
                  
                  {/* Antenna Parts */}
                  <div className="absolute top-0 w-6 h-3 bg-slate-300 rounded-b-full"></div>
                </div>
                {/* External Antenna sticking out top */}
                <div className="absolute top-2 w-2 h-6 bg-slate-400 -z-10"></div>
                <div className="absolute top-0 w-4 h-4 rounded-full bg-[#42E8FF] shadow-[0_0_10px_#42E8FF] animate-bounce"></div>
                
                {/* Floor Shadow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/10 rounded-[100%] blur-sm"></div>
              </div>
            
            {/* Speech bubble */}
            <div className="absolute -top-16 -right-16 bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50  text-slate-900 px-4 py-2 rounded-2xl rounded-bl-none font-bold shadow-xl animate-float">
              {robotAction === 'idle' ? "Hi! I'm Byte!" : 
               robotAction === 'jump' ? "Wheee!" :
               robotAction === 'spin' ? "Dizzy!" : "So shiny!"}
            </div>
          </div>
        </div>
      </div>
      
      <button onClick={onNext} className="mt-8 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] shadow-[0_15px_50px_rgba(139,92,246,0.25)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(139,92,246,0.4)] active:scale-95 text-white rounded-full flex items-center gap-2 shadow-lg transition-all hover:scale-105">
        Next: Algorithms <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// --- SCENE 3: WHAT IS AN ALGORITHM ---
const AlgorithmScene = ({ onNext }: any) => {
  const [path, setPath] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });
  const [success, setSuccess] = useState(false);
  const gridSize = 3;
  const targetPos = { x: 2, y: 2 };

  const addStep = (dir: string) => {
    if (!running && path.length < 6 && !success) setPath([...path, dir]);
  };

  const reset = () => {
    setPath([]);
    setRobotPos({ x: 0, y: 0 });
    setRunning(false);
    setSuccess(false);
  };

  const runAlgorithm = async () => {
    if (path.length === 0 || running) return;
    setRunning(true);
    
    let currentX = 0;
    let currentY = 0;

    for (let i = 0; i < path.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      
      if (path[i] === 'right' && currentX < gridSize - 1) currentX++;
      if (path[i] === 'left' && currentX > 0) currentX--;
      if (path[i] === 'down' && currentY < gridSize - 1) currentY++;
      if (path[i] === 'up' && currentY > 0) currentY--;
      
      setRobotPos({ x: currentX, y: currentY });
      
      if (currentX === targetPos.x && currentY === targetPos.y) {
        setTimeout(() => setSuccess(true), 500);
        break;
      }
    }
    setTimeout(() => setRunning(false), 500);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 scene-enter max-w-6xl mx-auto py-4">
      <div className="text-center mb-8">
        <h2 className="text-5xl md:text-7xl font-headings font-bold text-slate-700 mb-4">
          What is an <span className="text-gradient">Algorithm?</span>
        </h2>
        <p className="text-2xl text-slate-700 max-w-2xl mx-auto">
          An algorithm is simply a step-by-step recipe to solve a problem. Build a sequence of steps to help Byte reach the battery!
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 rounded-3xl p-8 w-full flex flex-col lg:flex-row gap-12 items-start">
        
        {/* The Grid Game */}
        <div className="flex-1 w-full flex justify-center">
          <div className="relative bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50 /50 p-4 rounded-2xl border border-white inline-block shadow-xl">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => {
                const x = i % 3;
                const y = Math.floor(i / 3);
                const isTarget = x === targetPos.x && y === targetPos.y;
                const isRobot = x === robotPos.x && y === robotPos.y;
                return (
                    <div key={i} className={`w-20 h-20 md:w-24 md:h-24 rounded-[20px] border-2 flex items-center justify-center transition-all duration-300 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)] border-white/20 backdrop-blur-md hover:scale-110 hover:shadow-[0_0_20px_rgba(66,232,255,0.6)]
                      ${isTarget ? 'bg-gradient-to-b from-[#FFE566] to-[#FFAA00] border-[#FFC857] shadow-[0_0_30px_rgba(255,213,74,0.6)]' : 'bg-white/10'}
                    `}>
                      {isTarget && !isRobot && (
                        <div className="relative">
                          <div className="text-4xl animate-bounce drop-shadow-[0_0_15px_rgba(255,213,74,0.8)]">🔋</div>
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <div className="w-16 h-16 bg-[#FFE566] rounded-full filter blur-[20px] opacity-40 animate-pulse"></div>
                          </div>
                        </div>
                      )}
                      {isRobot && (
                      <div className="w-14 h-14 bg-cyan-400 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.6)] z-10 transition-all duration-300">
                         <span className="text-2xl">🤖</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {success && (
              <div className="absolute inset-0 bg-green-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-col z-20 scene-enter border border-green-400">
                <div className="bg-green-500 text-slate-700 p-4 rounded-full mb-2 shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-green-700">Algorithm Solved!</h3>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 w-full space-y-6">
          <div className="bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50 /80 rounded-2xl p-6 border border-slate-200 h-full shadow-sm">
            <h3 className="text-slate-700 font-bold text-xl mb-4">1. Build your algorithm:</h3>
            
            <div className="grid grid-cols-3 gap-2 w-48 mb-6 mx-auto">
              <div />
              <button onClick={() => addStep('up')} disabled={running || success} className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg flex justify-center disabled:opacity-50 active:scale-95 transition-all shadow-sm"><ArrowUp /></button>
              <div />
              <button onClick={() => addStep('left')} disabled={running || success} className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg flex justify-center disabled:opacity-50 active:scale-95 transition-all shadow-sm"><ArrowLeft /></button>
              <button onClick={() => addStep('down')} disabled={running || success} className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg flex justify-center disabled:opacity-50 active:scale-95 transition-all shadow-sm"><ArrowDown /></button>
              <button onClick={() => addStep('right')} disabled={running || success} className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg flex justify-center disabled:opacity-50 active:scale-95 transition-all shadow-sm"><ArrowRight /></button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 min-h-[80px] flex gap-2 flex-wrap items-center border border-slate-200 shadow-inner">
              {path.length === 0 && <span className="text-slate-400 text-sm italic">Add steps to the list...</span>}
              {path.map((step, i) => (
                <div key={i} className="bg-sky-400 text-slate-700 p-2 rounded flex items-center text-sm font-bold animate-enter shadow-sm">
                  {step === 'up' && <ArrowUp size={16} />}
                  {step === 'down' && <ArrowDown size={16} />}
                  {step === 'left' && <ArrowLeft size={16} />}
                  {step === 'right' && <ArrowRight size={16} />}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button 
                onClick={runAlgorithm}
                disabled={path.length === 0 || running || success}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all"
              >
                <Play className="w-5 h-5 fill-current" /> Run Algorithm
              </button>
              <button 
                onClick={reset}
                className="px-4 py-3 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-xl flex items-center justify-center transition-all shadow-sm"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {success && (
        <button onClick={onNext} className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-xl flex items-center gap-2 hover:scale-105 transition-all animate-glow shadow-xl">
          Next: What is AI? <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

// --- SCENE 4: WHAT IS AI ---
const AIScene = ({ onNext }: any) => {
  const [confidence, setConfidence] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const trainingData = [
    { type: 'cat', emoji: '🐱', isCat: true },
    { type: 'dog', emoji: '🐶', isCat: false },
    { type: 'cat2', emoji: '🙀', isCat: true },
    { type: 'car', emoji: '🚗', isCat: false },
    { type: 'cat3', emoji: '😸', isCat: true },
  ];

  const handleGuess = (guessIsCat: boolean) => {
    const isCorrect = guessIsCat === trainingData[currentImageIndex].isCat;
    
    setFeedback(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      setConfidence(prev => Math.min(prev + 25, 100));
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentImageIndex < trainingData.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      }
    }, 1000);
  };

  const isComplete = confidence >= 100 || currentImageIndex >= trainingData.length - 1;

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 scene-enter max-w-6xl mx-auto py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 border border-purple-200 mb-6">
          <BrainCircuit className="w-5 h-5" />
          <span className="font-semibold tracking-wider uppercase text-sm">Chapter 3: Artificial Intelligence</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-headings font-bold text-slate-700 mb-4">
          What is <span className="text-gradient">AI?</span>
        </h2>
        <p className="text-2xl text-slate-700 max-w-2xl mx-auto">
          AI is not magic. It's a system that <b>learns from examples</b>. Let's train this AI brain to recognize Cats!
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 rounded-3xl p-8 w-full max-w-4xl mx-auto flex flex-col items-center relative overflow-hidden">
        
        {/* Brain Visualizer */}
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50  flex items-center justify-center border-4 border-purple-200 relative z-10 shadow-xl">
            <BrainCircuit className={`w-16 h-16 ${confidence > 50 ? 'text-pink-500 animate-pulse' : 'text-purple-400'} transition-colors duration-1000`} />
          </div>
          {/* Synapses glowing behind */}
          <div className="absolute inset-0 bg-pink-400/40 blur-3xl rounded-full" style={{ opacity: confidence / 100 }}></div>
        </div>

        {/* Confidence Meter */}
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between text-sm font-bold text-purple-600 mb-2">
            <span>AI Brain Confidence</span>
            <span>{confidence}%</span>
          </div>
          <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-700 ease-out"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Training Area */}
        {!isComplete ? (
          <div className="flex flex-col items-center w-full">
            <h3 className="text-2xl text-slate-700 font-bold mb-4">Is this a Cat?</h3>
            
            <div className="relative w-32 h-32 bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50  rounded-2xl flex items-center justify-center text-6xl mb-6 border border-slate-200 shadow-xl">
              <span className="animate-enter">{trainingData[currentImageIndex].emoji}</span>
              
              {/* Feedback Overlay */}
              {feedback && (
                <div className={`absolute inset-0 flex items-center justify-center rounded-2xl backdrop-blur-sm
                  ${feedback === 'correct' ? 'bg-green-100/80 border-2 border-green-400' : 'bg-red-100/80 border-2 border-red-400'}
                `}>
                  {feedback === 'correct' ? <Check className="w-16 h-16 text-green-600" /> : <X className="w-16 h-16 text-red-600" />}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => handleGuess(true)} 
                disabled={feedback !== null}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xl shadow-md active:scale-95 transition-all"
              >
                Yes
              </button>
              <button 
                onClick={() => handleGuess(false)} 
                disabled={feedback !== null}
                className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-xl shadow-md active:scale-95 transition-all"
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center scene-enter">
            <div className="w-20 h-20 bg-emerald-100 border-4 border-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Sparkles className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-bold text-slate-700 mb-4">Training Complete!</h3>
            <p className="text-slate-700 mb-8 max-w-md mx-auto">
              The AI learned the pattern by looking at examples and receiving feedback. That's how machine learning works!
            </p>
            <button onClick={onNext} className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-xl flex items-center gap-2 hover:scale-105 transition-all mx-auto shadow-xl">
              Next: Master the Maze <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SCENE 5: MAZE GAME (NEW) ---
const MazeGameScene = ({ onNext }: any) => {
  const [level, setLevel] = useState(0);
  const [commands, setCommands] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [robotState, setRobotState] = useState({ x: 0, y: 0, dir: 'right' }); // dir: 'up', 'right', 'down', 'left'
  const [status, setStatus] = useState('idle'); // idle, running, success, fail
  
  const levels = [
    { target: {x: 2, y: 0}, walls: [], hint: "Just move forward twice to reach the flag!" },
    { target: {x: 2, y: 2}, walls: [{x: 1, y: 0}, {x: 2, y: 1}], hint: "You'll need to turn right and then left to go around the walls." },
    { target: {x: 0, y: 4}, walls: [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 3}, {x: 1, y: 3}], hint: "Think about which way you are facing before moving forward. Turn right first!" },
    { target: {x: 4, y: 4}, walls: [{x: 1, y: 0}, {x: 1, y: 2}, {x: 3, y: 2}, {x: 3, y: 4}], hint: "A zig-zag path! Plan your turns carefully." },
    { target: {x: 4, y: 0}, walls: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 1, y: 2}, {x: 3, y: 3}], hint: "The final challenge. Trace the path with your finger first!" }
  ];

  const currentLevel = levels[level];
  const gridSize = 5;

  const resetGame = () => {
    setRobotState({ x: 0, y: 0, dir: 'right' });
    setStatus('idle');
  };

  const clearCommands = () => {
    if (running) return;
    setCommands([]);
    resetGame();
  };

  const addCommand = (cmd: string) => {
    if (running || status === 'success') return;
    setCommands([...commands, cmd]);
    resetGame();
  };

  const runCommands = async () => {
    if (commands.length === 0 || running) return;
    setRunning(true);
    setStatus('running');
    resetGame();
    
    let currentX = 0;
    let currentY = 0;
    let currentDir = 'right';

    for (let i = 0; i < commands.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      
      const cmd = commands[i];
      if (cmd === 'forward') {
        let nx = currentX; let ny = currentY;
        if (currentDir === 'right') nx++;
        if (currentDir === 'left') nx--;
        if (currentDir === 'down') ny++;
        if (currentDir === 'up') ny--;
        
        // check boundaries
        if (nx < 0 || nx >= gridSize || ny < 0 || ny >= gridSize) {
          setStatus('fail');
          setRunning(false);
          return;
        }
        // check walls
        if (currentLevel.walls.some(w => w.x === nx && w.y === ny)) {
          setStatus('fail');
          setRunning(false);
          return;
        }
        currentX = nx; currentY = ny;
      } else if (cmd === 'left') {
        const dirs = ['up', 'left', 'down', 'right'];
        currentDir = dirs[(dirs.indexOf(currentDir) + 1) % 4];
      } else if (cmd === 'right') {
        const dirs = ['up', 'right', 'down', 'left'];
        currentDir = dirs[(dirs.indexOf(currentDir) + 1) % 4];
      }
      
      setRobotState({ x: currentX, y: currentY, dir: currentDir });
    }
    
    setTimeout(() => {
      if (currentX === currentLevel.target.x && currentY === currentLevel.target.y) {
        setStatus('success');
      } else {
        setStatus('fail');
      }
      setRunning(false);
    }, 500);
  };

  const nextLevel = () => {
    if (level < levels.length - 1) {
      setLevel(level + 1);
      setCommands([]);
      resetGame();
    } else {
      onNext();
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 scene-enter max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 mb-6">
          <Flag className="w-5 h-5" />
          <span className="font-semibold tracking-wider uppercase text-sm">Chapter 4: The Logic Maze (Level {level + 1}/5)</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-headings font-bold text-slate-700 mb-4">
          Master the <span className="text-gradient">Maze!</span>
        </h2>
        <p className="text-2xl text-slate-700 max-w-2xl mx-auto font-medium bg-amber-100/50 p-3 rounded-xl border border-amber-200">
          💡 Hint: {currentLevel.hint}
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 rounded-3xl p-8 w-full flex flex-col lg:flex-row gap-12 items-start">
        
        {/* The Grid Game */}
        <div className="flex-1 w-full flex justify-center relative">
          <div className="relative bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50 /50 p-4 rounded-2xl border border-white inline-block shadow-xl">
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 25 }).map((_, i) => {
                const x = i % 5;
                const y = Math.floor(i / 5);
                const isTarget = x === currentLevel.target.x && y === currentLevel.target.y;
                const isRobot = x === robotState.x && y === robotState.y;
                const isWall = currentLevel.walls.some(w => w.x === x && w.y === y);
                
                return (
                    <div key={i} className={`w-12 h-12 sm:w-16 sm:h-16 rounded-[16px] border-2 flex items-center justify-center transition-all duration-300 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)] border-white/20 backdrop-blur-md hover:scale-110 hover:shadow-[0_0_20px_rgba(66,232,255,0.6)]
                      ${isTarget ? 'bg-gradient-to-b from-[#34D399] to-[#0F9F6E] border-green-400 shadow-[0_0_30px_rgba(52,211,153,0.6)]' : isWall ? 'bg-slate-700/50 border-slate-900/50' : 'bg-white/10'}
                    `}>
                      {isTarget && !isRobot && (
                         <div className="relative">
                            <Flag className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-bounce" />
                         </div>
                      )}
                      {isWall && <div className="text-2xl opacity-50">🧱</div>}
                    {isRobot && (
                      <div className={`w-10 h-10 bg-cyan-400 rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.6)] z-10 transition-all duration-300
                        ${robotState.dir === 'up' ? '-rotate-90' : robotState.dir === 'down' ? 'rotate-90' : robotState.dir === 'left' ? 'rotate-180' : ''}
                      `}>
                         <ArrowRight className="text-slate-700" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {status === 'success' && (
              <div className="absolute inset-0 bg-green-100/90 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-col z-20 scene-enter border border-green-400">
                <div className="bg-green-500 text-slate-700 p-4 rounded-full mb-2 shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-4">Level Cleared!</h3>
                <button onClick={nextLevel} className="px-6 py-2 bg-green-600 text-white rounded-full font-bold shadow-md hover:scale-105 transition-all">
                  {level < levels.length - 1 ? 'Next Level' : 'Finish Game'}
                </button>
              </div>
            )}
            {status === 'fail' && (
              <div className="absolute inset-0 bg-red-100/90 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-col z-20 scene-enter border border-red-400">
                <div className="bg-red-500 text-slate-700 p-4 rounded-full mb-2 shadow-[0_0_30px_rgba(239,68,68,0.6)]">
                  <X className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-red-700 mb-4">Oops! Try Again.</h3>
                <button onClick={resetGame} className="px-6 py-2 bg-red-600 text-white rounded-full font-bold shadow-md hover:scale-105 transition-all">
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 w-full space-y-6">
          <div className="bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50 /80 rounded-2xl p-6 border border-slate-200 h-full shadow-sm">
            <h3 className="text-slate-700 font-bold text-xl mb-4">1. Write your code:</h3>
            
            <div className="flex justify-center gap-3 mb-6">
              <button onClick={() => addCommand('left')} disabled={running || status === 'success'} className="px-4 py-3 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-xl flex flex-col items-center disabled:opacity-50 active:scale-95 transition-all shadow-sm font-bold text-sm">
                <RotateCcw className="mb-1" /> Turn Left
              </button>
              <button onClick={() => addCommand('forward')} disabled={running || status === 'success'} className="px-4 py-3 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-xl flex flex-col items-center disabled:opacity-50 active:scale-95 transition-all shadow-sm font-bold text-sm">
                <ArrowUp className="mb-1" /> Move Fwd
              </button>
              <button onClick={() => addCommand('right')} disabled={running || status === 'success'} className="px-4 py-3 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-xl flex flex-col items-center disabled:opacity-50 active:scale-95 transition-all shadow-sm font-bold text-sm">
                <RotateCw className="mb-1" /> Turn Right
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 min-h-[120px] flex gap-2 flex-wrap items-start border border-slate-200 shadow-inner">
              {commands.length === 0 && <span className="text-slate-400 text-sm italic">Add commands to build your logic...</span>}
              {commands.map((step, i) => (
                <div key={i} className="bg-indigo-500 text-slate-700 p-2 px-3 rounded-lg flex items-center gap-1 text-sm font-bold animate-enter shadow-sm">
                  {step === 'forward' && <><ArrowUp size={14} /> FWD</>}
                  {step === 'left' && <><RotateCcw size={14} /> LFT</>}
                  {step === 'right' && <><RotateCw size={14} /> RGT</>}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button 
                onClick={runCommands}
                disabled={commands.length === 0 || running || status === 'success'}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all"
              >
                <Play className="w-5 h-5 fill-current" /> Run Code
              </button>
              <button 
                onClick={clearCommands}
                className="px-4 py-3 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-xl flex items-center justify-center transition-all shadow-sm"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- SCENE 6: FINALE ---
const FinaleScene = ({ onComplete, onRestart }: any) => (
  <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center px-4 scene-enter">
    
    <div className="animate-float-slow mb-8 relative">
      <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-50 rounded-full animate-pulse-glow"></div>
      <div className="relative w-32 h-32 rounded-[2rem] bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 flex items-center justify-center shadow-2xl">
        <Code2 className="w-16 h-16 text-slate-700" />
      </div>
    </div>
    
    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
      <span className="text-slate-700">Become a </span>
      <span className="text-gradient">Creator</span>
    </h1>
    
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-2xl md:text-2xl text-slate-700 font-medium mb-12">
      <div className="bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50 /60 px-6 py-4 rounded-2xl border border-white backdrop-blur-sm shadow-sm">
        <span className="text-slate-400 line-through mr-2">Play Games</span>
        <span className="text-indigo-600 font-bold">Make Games</span>
      </div>
      <div className="bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50 /60 px-6 py-4 rounded-2xl border border-white backdrop-blur-sm shadow-sm">
        <span className="text-slate-400 line-through mr-2">Use Apps</span>
        <span className="text-pink-500 font-bold">Build Apps</span>
      </div>
    </div>
    
    <button 
      onClick={onComplete || onRestart}
      className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-xl transition-all duration-300 hover:bg-indigo-700 hover:scale-105 flex items-center gap-2 shadow-xl"
    >
      {onComplete ? (
        <><ArrowRight className="w-5 h-5" /> Continue Journey</>
      ) : (
        <><RefreshCw className="w-5 h-5" /> Start Again</>
      )}
    </button>
  </div>
);


// --- MAIN APP COMPONENT ---
export default function App({ onComplete }: any) {
  const [currentScene, setCurrentScene] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => setSoundEnabled(!soundEnabled);

  const nextScene = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScene(prev => prev + 1);
  };

  const restart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScene(0);
  };

  return (
    <div className="min-h-[70vh] bg-[#FFFDF6] rounded-[30px] border border-slate-200 shadow-sm text-slate-700 font-sans overflow-x-hidden selection:bg-purple-300/50">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Global Background Layer */}
      <MagicalBackground />

      {/* Global Header/Nav */}
      <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="pointer-events-auto flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-500 ${i === currentScene ? 'w-8 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]' : i < currentScene ? 'w-4 bg-indigo-300' : 'w-4 bg-slate-200'}`}
            />
          ))}
        </div>
        
        <button 
          onClick={toggleSound}
          className="pointer-events-auto w-12 h-12 rounded-full bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50 /80 border border-slate-200 shadow-sm flex items-center justify-center hover:bg-gradient-to-br from-[#2D4A7C] via-[#314E8D] to-[#4258C5] rounded-[40px] backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.2),_0_20px_60px_rgba(79,125,255,0.25)] text-white border border-white/10 border border-slate-700/50  transition-colors"
          title="Toggle Ambient Music"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
        </button>
      </div>

      {/* Scene Manager */}
      <main className="relative z-10 w-full max-w-7xl mx-auto">
        {currentScene === 0 && <WelcomeScene onNext={nextScene} />}
        {currentScene === 1 && <CodingScene onNext={nextScene} />}
        {currentScene === 2 && <AlgorithmScene onNext={nextScene} />}
        {currentScene === 3 && <AIScene onNext={nextScene} />}
        {currentScene === 4 && <MazeGameScene onNext={nextScene} />}
        {currentScene === 5 && <FinaleScene onRestart={restart} onComplete={onComplete} />}
      </main>

    </div>
  );
}
