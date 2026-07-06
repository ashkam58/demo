const fs = require('fs');
const files = ['py_builder.tsx', 'web_builder.tsx', 'world_of_coding.tsx'];
const path = 'c:/Users/ashka/Desktop/cinematic/cinematic-app/src/';

files.forEach(f => {
    let content = fs.readFileSync(path + f, 'utf8');
    
    // Replace \` with `
    content = content.replace(/\\\\`/g, '`');
    content = content.replace(/\\`/g, '`');
    
    fs.writeFileSync(path + f, content);
});
console.log("Repair backticks complete.");
