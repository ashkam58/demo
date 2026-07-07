const fs = require('fs');

['src/world_of_coding.tsx', 'src/py_builder.tsx', 'src/web_builder.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/className="lesson-fit/g, 'className="lesson-fit mt-24');
  fs.writeFileSync(file, content);
});

console.log("Added mt-24 to lesson-fit wrappers");
