const fs = require('fs');

function transformPyBuilder() {
  let content = fs.readFileSync('src/py_builder.tsx', 'utf8');

  // Add Swiper imports
  if (!content.includes("import { Swiper, SwiperSlide }")) {
    content = content.replace("import React, { useState, useEffect, useCallback } from 'react';", 
      "import React, { useState, useEffect, useCallback } from 'react';\nimport { Swiper, SwiperSlide } from 'swiper/react';\nimport { EffectCards, Navigation } from 'swiper/modules';\nimport 'swiper/css';\nimport 'swiper/css/effect-cards';\nimport 'swiper/css/navigation';");
  }

  // Add swiperInstance state
  if (!content.includes("const [swiperInstance, setSwiperInstance]")) {
    content = content.replace("const [step, setStep] = useState(0);", 
      "const [step, setStep] = useState(0);\n    const [swiperInstance, setSwiperInstance] = useState<any>(null);");
  }

  // Update handleNext to use swiper
  content = content.replace(/const handleNext = \(\) => \{[\s\S]*?nextStep\(\);\n    \}\n  \};/,
    `const handleNext = () => {
    if (swiperInstance) {
      if (swiperInstance.activeIndex === 5) {
        if (onComplete) onComplete();
      } else {
        swiperInstance.slideNext();
      }
    }
  };`);

  // Update nextStep to use swiper
  content = content.replace(/const nextStep = useCallback\(\(\) => \{[\s\S]*?\}, \[\]\);/,
    `const nextStep = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);`);

  // EXACT REPLACE MAIN BLOCK
  const oldBlock = `{step === 0 && <SceneIntro onComplete={nextStep} />}
          {step === 1 && <SceneTerminal onComplete={nextStep} />}
          {step === 2 && <SceneVariables onComplete={nextStep} />}
          {step === 3 && <SceneBinarySearch onComplete={nextStep} />}
          {step === 4 && <ScenePythonVisualizer onComplete={nextStep} />}
          {step === 5 && <SceneFinale onComplete={onComplete} />}`;
          
  const swiperBody = `<Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Navigation]}
          className="w-full max-w-5xl"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setStep(swiper.activeIndex)}
        >
          <SwiperSlide className="flex items-center justify-center p-4"><SceneIntro onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneTerminal onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneVariables onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneBinarySearch onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><ScenePythonVisualizer onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneFinale onComplete={onComplete} /></SwiperSlide>
        </Swiper>`;
  
  content = content.replace(oldBlock, swiperBody);

  fs.writeFileSync('src/py_builder.tsx', content);
}

transformPyBuilder();
console.log("Transformed py_builder.tsx");
