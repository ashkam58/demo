const fs = require('fs');
let content = fs.readFileSync('src/web_builder.tsx', 'utf8');

const regex = /<div className="w-full flex-1 flex flex-col items-center justify-center">([\s\S]*?)<\/div>\s*<\/main>/;
const match = content.match(regex);
if (match) {
  const newBlock = `<div className="w-full flex-1 flex flex-col items-center justify-center">
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
          </div>
        </main>`;
  content = content.replace(match[0], newBlock);
  fs.writeFileSync('src/web_builder.tsx', content);
  console.log("Transformed web_builder.tsx using Regex targeting </main>");
} else {
  console.log("Regex did not match");
}
