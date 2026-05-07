const fs = require('fs');

function findClosingBracket(str, startIdx) {
  let count = 0;
  let inString = false;
  let escape = false;

  for (let i = startIdx; i < str.length; i++) {
    const char = str[i];
    
    if (escape) {
      escape = false;
      continue;
    }
    
    if (char === '\\\\') {
      escape = true;
      continue;
    }
    
    if (char === '"' && !escape) {
      inString = !inString;
      continue;
    }
    
    if (!inString) {
      if (char === '[') count++;
      else if (char === ']') count--;
      
      if (count === 0 && char === ']') {
        return i;
      }
    }
  }
  return -1;
}

let code = fs.readFileSync('src/data/curriculum.ts', 'utf8');

// I will look for \`questions: [\` and find the matching bracket, then I pull it out!
let i = 0;
while (true) {
  let qIdx = code.indexOf('questions: [', i);
  if (qIdx === -1) break;
  let startIdx = qIdx + 11; // index of '[' 
  let endIdx = findClosingBracket(code, startIdx);
  if (endIdx !== -1) {
    let arrStr = code.substring(startIdx, endIdx + 1);
    try {
      let q = JSON.parse(arrStr);
      // It's a valid JSON array? 
      // If NOT a valid JSON array, it means it's heavily broken.
      // We know the broken ones start with `[` and then have garbage.
      // Wait, let's just REPLACE all these questions arrays completely.
    } catch(e) {}
  }
  i = endIdx !== -1 ? endIdx + 1 : qIdx + 1;
}
