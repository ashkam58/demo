const fs = require('fs');
const files = ['py_builder.tsx', 'web_builder.tsx', 'world_of_coding.tsx'];
const path = 'c:/Users/ashka/Desktop/cinematic/cinematic-app/src/';

files.forEach(f => {
    let content = fs.readFileSync(path + f, 'utf8');
    // Replace \${ with ${
    content = content.replace(/\\\$\{/g, '${');
    
    // In React templates, we often need \n, \s, etc. in regexes.
    // The previous write_to_file calls might have resulted in \\s instead of \s if we used double escape.
    content = content.replace(/\\\\s/g, '\\s');
    content = content.replace(/\\\\n/g, '\\n');
    content = content.replace(/\\\\\(/g, '\\(');
    content = content.replace(/\\\\\)/g, '\\)');
    
    fs.writeFileSync(path + f, content);
});
console.log("Repair complete.");
