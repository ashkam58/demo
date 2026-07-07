const fs = require('fs');
let content = fs.readFileSync('src/web_builder.tsx', 'utf8');

// Imports
if (!content.includes("import { Swiper, SwiperSlide }")) {
  content = content.replace("import { useState, useEffect } from 'react';", 
    "import { useState, useEffect } from 'react';\nimport { Swiper, SwiperSlide } from 'swiper/react';\nimport { EffectCards, Navigation } from 'swiper/modules';\nimport 'swiper/css';\nimport 'swiper/css/effect-cards';\nimport 'swiper/css/navigation';");
}

// State
if (!content.includes("const [swiperInstance, setSwiperInstance]")) {
  content = content.replace("const [step, setStep] = useState(0);", 
    "const [step, setStep] = useState(0);\n    const [swiperInstance, setSwiperInstance] = useState<any>(null);");
}

// handleNext
content = content.replace(/const handleNext = \(\) => \{[\s\S]*?nextStep\(\);\n    \}\n  \};/,
  `const handleNext = () => {
    if (swiperInstance) {
      if (swiperInstance.activeIndex === 4) {
        if (onComplete) onComplete();
      } else {
        swiperInstance.slideNext();
      }
    }
  };`);

// nextStep
content = content.replace(/const nextStep = \(\) => setStep\(s => Math.min\(s \+ 1, 4\)\);/,
  `const nextStep = () => swiperInstance?.slideNext();`);

// The big block
const oldBlock = `          <div className="w-full flex-1 flex flex-col items-center justify-center">
            
            {step === 0 && (
              <div className="text-center animate-fade-in-up max-w-3xl">
                <div className="mb-8 inline-block p-4 bg-white/60 rounded-3xl backdrop-blur-md border border-white 
shadow-xl animate-float">
                  <Sparkles size={64} className="text-amber-400 mx-auto" />
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r 
from-indigo-500 via-purple-500 to-pink-500 mb-6 drop-shadow-sm">
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
  
          </div>`;

const newBlock = `          <div className="w-full flex-1 flex flex-col items-center justify-center">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Navigation]}
          className="w-full max-w-5xl"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setStep(swiper.activeIndex)}
        >
          <SwiperSlide className="flex items-center justify-center p-4">
              <div className="text-center animate-fade-in-up max-w-3xl lesson-fit mt-24">
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
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneAnatomy onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneBuilder onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneXRay onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneGuidedCoding onComplete={() => {
                  if (onComplete) {
                    onComplete();
                  } else {
                    alert("Congratulations! You've mastered HTML & CSS basics! Proceed to JavaScript.");
                    swiperInstance?.slideTo(0);
                  }
                }} /></SwiperSlide>
        </Swiper>
          </div>`;

content = content.replace(oldBlock.replace(/\r/g, ''), newBlock);

fs.writeFileSync('src/web_builder.tsx', content);
console.log("Transformed web_builder.tsx exactly");
