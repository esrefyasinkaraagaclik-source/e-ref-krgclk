import { execSync } from 'child_process';
execSync('git checkout src/data/curriculum.ts');
console.log("Restored!");
