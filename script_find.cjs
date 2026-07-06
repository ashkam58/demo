const fs = require('fs');
const content = fs.readFileSync('src/world_of_coding.tsx', 'utf8');
const byteIndex = 11643;
const textUpToByte = Buffer.from(content).slice(0, byteIndex).toString('utf8');
const lines = textUpToByte.split('\n');
console.log('Error is around line: ' + lines.length);
console.log('Line content: ' + content.split('\n')[lines.length - 1]);
console.log('Next line: ' + content.split('\n')[lines.length]);
