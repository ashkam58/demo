const fs = require('fs');

function transformWorldOfCoding() {
  let content = fs.readFileSync('src/world_of_coding.tsx', 'utf8');

  // Add Swiper imports
  if (!content.includes("import { Swiper, SwiperSlide }")) {
    content = content.replace("import { useState, useEffect } from 'react';", 
      "import { useState, useEffect } from 'react';\nimport { Swiper, SwiperSlide } from 'swiper/react';\nimport { EffectCards, Navigation } from 'swiper/modules';\nimport 'swiper/css';\nimport 'swiper/css/effect-cards';\nimport 'swiper/css/navigation';");
  }

  // Add swiperInstance state
  if (!content.includes("const [swiperInstance, setSwiperInstance]")) {
    content = content.replace("const [currentScene, setCurrentScene] = useState(0);", 
      "const [currentScene, setCurrentScene] = useState(0);\n    const [swiperInstance, setSwiperInstance] = useState<any>(null);");
  }

  // Update restart to use swiper
  content = content.replace(/const restart = \(\) => \{[\s\S]*?setCurrentScene\(0\);[\s\S]*?\};/,
    `const restart = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentScene(0);
      swiperInstance?.slideTo(0);
    };`);

  // Update handleNext to use swiper
  content = content.replace(/const handleNext = \(\) => \{[\s\S]*?setCurrentScene\(prev => prev \+ 1\);\n    \}\n  \};/,
    `const handleNext = () => {
    if (swiperInstance) {
      if (swiperInstance.activeIndex === 5) {
        if (onComplete) onComplete();
      } else {
        swiperInstance.slideNext();
      }
    }
  };`);

  // Update nextScene to use swiper
  content = content.replace(/const nextScene = \(\) => \{[\s\S]*?setCurrentScene\(prev => prev \+ 1\);\n  \};/,
    `const nextScene = () => {
    swiperInstance?.slideNext();
  };`);

  // Replace main body with Swiper
  const mainRegex = /<main className="[^"]*">([\s\S]*?)<\/main>/;
  const match = content.match(mainRegex);
  if (match) {
    const swiperBody = `
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Navigation]}
          className="w-full max-w-5xl"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setCurrentScene(swiper.activeIndex)}
        >
          <SwiperSlide className="flex items-center justify-center p-4"><WelcomeScene onNext={nextScene} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><CodingScene onNext={nextScene} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><AlgorithmScene onNext={nextScene} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><AIScene onNext={nextScene} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><MazeGameScene onNext={nextScene} /></SwiperSlide>
          <SwiperSlide className="flex items-center justify-center p-4"><FinaleScene onRestart={restart} onComplete={onComplete} /></SwiperSlide>
        </Swiper>
`;
    content = content.replace(match[1], swiperBody);
  }

  fs.writeFileSync('src/world_of_coding.tsx', content);
}

transformWorldOfCoding();
console.log("Transformed world_of_coding.tsx");
