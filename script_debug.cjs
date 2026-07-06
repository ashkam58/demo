const fs = require('fs');
const content = fs.readFileSync('src/world_of_coding.tsx', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(195, 215).join('\n'));
