import fs from 'fs';

let content = fs.readFileSync('src/data/curriculum.ts', 'utf8');

const t3t4 = `
  {
    id: "tema3",
    title: "3. TEMA: KİMYASAL TEPKİMELER",
    description: "Kimyasal tepkimeleri modelleme ve denkleştirme.",
    order: 3,
    modules: [
    ]
  },
  {
    id: "tema4",
    title: "4. TEMA: MOL KAVRAMI",
    description: "Maddenin miktarını ifade etme ve mol.",
    order: 4,
    modules: [
    ]
  },
`;

content = content.replace('  {\n    id: "tema5",', t3t4 + '  {\n    id: "tema5",');
fs.writeFileSync('src/data/curriculum.ts', content);
