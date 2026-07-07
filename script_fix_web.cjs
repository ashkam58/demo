const fs = require('fs');

let web = fs.readFileSync('src/web_builder.tsx', 'utf8');
web = web.replace(`  const handleNext = () => {
    if (currentScene === 5) {
      if (onComplete) onComplete();
    } else {
      setCurrentScene(prev => prev + 1);
    }
  };`, `  const handleNext = () => {
    if (step >= 4) {
      if (onComplete) onComplete();
    } else {
      nextStep();
    }
  };`);
fs.writeFileSync('src/web_builder.tsx', web);
console.log("Fixed web_builder.tsx handleNext!");
