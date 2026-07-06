const fs = require('fs');
const content = fs.readFileSync('src/world_of_coding.tsx', 'utf8');
const byteIndex = 11643;
const slice = content.slice(byteIndex - 200, byteIndex + 200);
console.log(slice);
