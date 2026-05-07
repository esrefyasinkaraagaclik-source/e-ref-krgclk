import fs from 'fs';

let content = fs.readFileSync('src/data/curriculum.ts', 'utf8');

content = content.replace(/\n      \{\n        id: "t[1-6]_mz_1"[\s\S]*?(?=id: "tema[2-7]",)/g, "");
content = content.replace(/\n      \{\n        id: "t7_mz_1"[\s\S]*$/, "\n];\n");

fs.writeFileSync('src/data/curriculum.ts', content);
console.log("Cleaned corrupted inserts");
