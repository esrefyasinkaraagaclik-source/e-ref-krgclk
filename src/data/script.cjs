const fs = require('fs');

let content = fs.readFileSync('src/data/curriculum.ts', 'utf8');

const t1_questions = [];
for (let i = 1; i <= 20; i++) {
  t1_questions.push({
    id: "q" + i,
    questionText: `Seviye ${i}: Hangi Değişim? (Zorluk: ${Math.ceil(i/5)})`,
    options: [
      { id: "1", text: "Fiziksel", isCorrect: i % 2 !== 0 },
      { id: "2", text: "Kimyasal", isCorrect: i % 2 === 0 },
      { id: "3", text: "Biyolojik", isCorrect: false },
      { id: "4", text: "Nükleer", isCorrect: false }
    ]
  });
}

const t2_questions = [];
for (let i = 1; i <= 20; i++) {
  t2_questions.push({
    id: "q" + i,
    questionText: `Seviye ${i}: Hangi hal durumu? (Zorluk: ${Math.ceil(i/5)})`,
    options: [
      { id: "1", text: "Katı", isCorrect: i % 3 === 0 },
      { id: "2", text: "Sıvı", isCorrect: i % 3 === 1 },
      { id: "3", text: "Gaz", isCorrect: i % 3 === 2 },
      { id: "4", text: "Plazma", isCorrect: false }
    ]
  });
}

const t3_questions = [];
for (let i = 1; i <= 20; i++) {
  t3_questions.push({
    id: "q" + i,
    questionText: `Seviye ${i}: Hangi tepkime türü? (Zorluk: ${Math.ceil(i/5)})`,
    options: [
      { id: "1", text: "Yanma", isCorrect: i % 4 === 0 },
      { id: "2", text: "Sentez", isCorrect: i % 4 === 1 },
      { id: "3", text: "Analiz", isCorrect: i % 4 === 2 },
      { id: "4", text: "Nötrleşme", isCorrect: i % 4 === 3 }
    ]
  });
}

const themes = [
  { id: "t1_mz_1", q: t1_questions },
  { id: "t1_mz_2", q: t1_questions.slice().reverse() },
  { id: "t2_mz_1", q: t2_questions },
  { id: "t2_mz_2", q: t2_questions.slice().reverse() },
  { id: "t3_mz_1", q: t3_questions },
  { id: "t3_mz_2", q: t3_questions.slice().reverse() }
];

for (const theme of themes) {
  const regex = new RegExp(`(id: "mg_${theme.id}",\\s*title: "[^"]+",\\s*description: "[^"]+",\\s*questions: )\\[.*?\\](?=\\s*\\}\\s*\\])`);
  const match = content.match(regex);
  if (match) {
    content = content.replace(match[0], match[1] + JSON.stringify(theme.q));
  } else {
    console.log("Not found obj format 1:", theme.id);
  }
}

fs.writeFileSync('src/data/curriculum.ts', content, 'utf8');
console.log("Updated effectively!");
