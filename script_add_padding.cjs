const fs = require('fs');

['src/world_of_coding.tsx', 'src/py_builder.tsx', 'src/web_builder.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('flex-col justify-center relative"', 'flex-col justify-center relative pt-24 pb-12"');
  content = content.replace('flex flex-col items-center justify-center flex-1 min-h-[90vh]"', 'flex flex-col items-center justify-center flex-1 min-h-[90vh] pt-24 pb-12"');
  fs.writeFileSync(file, content);
});

console.log("Added pt-24 pb-12 to all modules");
