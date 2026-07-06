import { useState, useEffect } from 'react';
import WorldOfCodingApp from './world_of_coding';
import WebBuilderApp from './web_builder';
import PyBuilderApp from './py_builder';
import { startBGM } from './audio';

// The sequence of modules to run through
const MODULES = [
  { id: 'world_of_coding', name: '1. World of Coding', component: WorldOfCodingApp },
  { id: 'web_builder', name: '2. Web Builder', component: WebBuilderApp },
  { id: 'py_builder', name: '3. Python Academy', component: PyBuilderApp },
];

export default function IntegratedApp() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const handleModuleComplete = () => {
    if (currentModuleIndex < MODULES.length - 1) {
      // Small delay to allow completion sounds/animations to finish
      setTimeout(() => {
        setCurrentModuleIndex(currentModuleIndex + 1);
      }, 500);
    } else {
      setTimeout(() => {
        alert("You have completed all the modules! You are now a master creator.");
      }, 500);
    }
  };

  const jumpToModule = (index: number) => {
    setCurrentModuleIndex(index);
  };

  const CurrentModuleComponent = MODULES[currentModuleIndex].component;

  useEffect(() => {
    const handleInteraction = () => {
      startBGM();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return (
    <div className="relative min-h-dvh bg-gradient-to-br from-[#EAF8FF] via-[#F7EEFF] to-[#FFF7D8] text-slate-700 overflow-x-hidden font-sans">
      
      {/* Top Navigation for the Integrated App */}
      <div className="fixed top-0 left-0 right-0 pt-4 z-[100] flex justify-center pointer-events-none group">
        <div className="pointer-events-auto p-6 -m-6">
          <div className="bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-full px-6 py-3 flex gap-6 shadow-xl opacity-0 group-hover:opacity-100 -translate-y-12 group-hover:translate-y-0 transition-all duration-500">
            {MODULES.map((mod, index) => {
              const isActive = index === currentModuleIndex;
              return (
                <button
                  key={mod.id}
                  onClick={() => jumpToModule(index)}
                  className={`text-sm font-bold transition-all px-4 py-2 rounded-full flex items-center gap-2 ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {mod.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Render the current module */}
      <div className="w-full min-h-dvh relative z-0">
        <CurrentModuleComponent onComplete={handleModuleComplete} />
      </div>

    </div>
  );
}
