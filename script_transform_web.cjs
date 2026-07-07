const fs = require('fs');

function transformWebBuilder() {
  let content = fs.readFileSync('src/web_builder.tsx', 'utf8');

  // Add Swiper imports
  if (!content.includes("import { Swiper, SwiperSlide }")) {
    content = content.replace("import { useState, useEffect } from 'react';", 
      "import { useState, useEffect } from 'react';\nimport { Swiper, SwiperSlide } from 'swiper/react';\nimport { EffectCards, Navigation } from 'swiper/modules';\nimport 'swiper/css';\nimport 'swiper/css/effect-cards';\nimport 'swiper/css/navigation';");
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
      if (swiperInstance.activeIndex === 4) {
        if (onComplete) onComplete();
      } else {
        swiperInstance.slideNext();
      }
    }
  };`);

  // Update nextStep to use swiper
  content = content.replace(/const nextStep = \(\) => setStep\(s => Math.min\(s \+ 1, 4\)\);/,
    `const nextStep = () => swiperInstance?.slideNext();`);

  // Replace main body with Swiper
  const mainRegex = /<div className="w-full flex-1 flex flex-col items-center justify-center">([\s\S]*?)<\/div>/;
  const match = content.match(mainRegex);
  if (match) {
    const swiperBody = `
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Navigation]}
          className="w-full max-w-5xl"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setStep(swiper.activeIndex)}
        >
          <SwiperSlide className="flex items-center justify-center p-4"><SceneAnatomy onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneBuilder onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneXRay onComplete={nextStep} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneGuidedCoding onComplete={() => {
                  if (onComplete) {
                    onComplete();
                  } else {
                    nextStep();
                  }
                }} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><SceneLaunch onComplete={onComplete} /></SwiperSlide>
        </Swiper>
`;
    content = content.replace(match[1], swiperBody);
  }

  fs.writeFileSync('src/web_builder.tsx', content);
}

transformWebBuilder();
console.log("Transformed web_builder.tsx");
