import * as fs from 'fs';

const filePath = 'src/data/curriculum.ts';
let content = fs.readFileSync(filePath, 'utf8');

const generateMaze = (idPrefix, title1, q1, title2, q2) => `
      {
        id: "${idPrefix}_1",
        title: "${title1}",
        description: "Robot ile doğru maddeyi bul! Hayaletlerden kaç ve soruları yanıtla.",
        type: "maze",
        mazeGames: [{
          id: "mg_${idPrefix}_1",
          title: "${title1}",
          description: "Robot ile kaç!",
          questions: ${JSON.stringify(q1, null, 12)}
        }]
      },
      {
        id: "${idPrefix}_2",
        title: "${title2}",
        description: "Daha hızlı hayaletlerle zorlu labirent mücadelesi.",
        type: "maze",
        mazeGames: [{
          id: "mg_${idPrefix}_2",
          title: "${title2}",
          description: "Robot ile kaç!",
          questions: ${JSON.stringify(q2, null, 12)}
        }]
      }
`;

const qT1_1 = [
  { id: "q1", questionText: "Suyun donması nasıl bir değişimdir?", options: [ {id:"1", text:"Fiziksel", isCorrect:true}, {id:"2", text:"Kimyasal", isCorrect:false}, {id:"3", text:"Biyolojik", isCorrect:false}, {id:"4", text:"Nükleer", isCorrect:false} ]},
  { id: "q2", questionText: "Demirin paslanması nedir?", options: [ {id:"1", text:"Fiziksel", isCorrect:false}, {id:"2", text:"Kimyasal", isCorrect:true}, {id:"3", text:"Radyoaktif", isCorrect:false}, {id:"4", text:"Biyolojik", isCorrect:false} ]},
  { id: "q3", questionText: "Kağıdın yırtılması?", options: [ {id:"1", text:"Fiziksel", isCorrect:true}, {id:"2", text:"Kimyasal", isCorrect:false}, {id:"3", text:"Elektrik", isCorrect:false}, {id:"4", text:"Biyolojik", isCorrect:false} ]}
];

const qT1_2 = [
  { id: "q1", questionText: "Midenin besinleri sindirmesi?", options: [ {id:"1", text:"Fiziksel", isCorrect:false}, {id:"2", text:"Kimyasal", isCorrect:true}, {id:"3", text:"Radyoaktif", isCorrect:false}, {id:"4", text:"Manyetik", isCorrect:false} ]},
  { id: "q2", questionText: "Gümüşün kararması?", options: [ {id:"1", text:"Fiziksel", isCorrect:false}, {id:"2", text:"Kimyasal", isCorrect:true}, {id:"3", text:"Simya", isCorrect:false}, {id:"4", text:"Yanılsama", isCorrect:false} ]},
  { id: "q3", questionText: "Şekerin suda çözünmesi?", options: [ {id:"1", text:"Fiziksel", isCorrect:true}, {id:"2", text:"Kimyasal", isCorrect:false}, {id:"3", text:"Nükleer", isCorrect:false}, {id:"4", text:"Kuantum", isCorrect:false} ]}
];

const qT2_1 = [
  { id: "q1", questionText: "Maddenin en düzenli hali hangisidir?", options: [ {id:"1", text:"Katı", isCorrect:true}, {id:"2", text:"Sıvı", isCorrect:false}, {id:"3", text:"Gaz", isCorrect:false}, {id:"4", text:"Plazma", isCorrect:false} ]},
  { id: "q2", questionText: "Buz eridiğinde hangi hale geçer?", options: [ {id:"1", text:"Katı", isCorrect:false}, {id:"2", text:"Sıvı", isCorrect:true}, {id:"3", text:"Gaz", isCorrect:false}, {id:"4", text:"Buhar", isCorrect:false} ]},
  { id: "q3", questionText: "Sıkıştırılarak küçültülebilen tek hal?", options: [ {id:"1", text:"Katı", isCorrect:false}, {id:"2", text:"Sıvı", isCorrect:false}, {id:"3", text:"Gaz", isCorrect:true}, {id:"4", text:"Jel", isCorrect:false} ]}
];

const qT2_2 = [
  { id: "q1", questionText: "Tanecikler arası boşluğun en fazla olduğu hal?", options: [ {id:"1", text:"Katı", isCorrect:false}, {id:"2", text:"Sıvı", isCorrect:false}, {id:"3", text:"Gaz", isCorrect:true}, {id:"4", text:"Kristal", isCorrect:false} ]},
  { id: "q2", questionText: "Sıvıdan gaza geçişe ne denir?", options: [ {id:"1", text:"Erime", isCorrect:false}, {id:"2", text:"Donma", isCorrect:false}, {id:"3", text:"Buharlaşma", isCorrect:true}, {id:"4", text:"Süblimleşme", isCorrect:false} ]},
  { id: "q3", questionText: "Katıdan doğrudan gaza geçiş?", options: [ {id:"1", text:"Erime", isCorrect:false}, {id:"2", text:"Yoğuşma", isCorrect:false}, {id:"3", text:"Süblimleşme", isCorrect:true}, {id:"4", text:"Kırağılaşma", isCorrect:false} ]}
];

const qT3_1 = [
  { id: "q1", questionText: "Tepkimelerde girenlerin kütlesi ürünlere eşittir. Bu hangi kanundur?", options: [ {id:"1", text:"Kütlenin Korunumu", isCorrect:true}, {id:"2", text:"Sabit Oranlar", isCorrect:false}, {id:"3", text:"Katlı Oranlar", isCorrect:false}, {id:"4", text:"Avogadro", isCorrect:false} ]},
  { id: "q2", questionText: "A + B -> AB tepkimesi hangi türdür?", options: [ {id:"1", text:"Sentez", isCorrect:true}, {id:"2", text:"Analiz", isCorrect:false}, {id:"3", text:"Yanma", isCorrect:false}, {id:"4", text:"Nötrleşme", isCorrect:false} ]},
  { id: "q3", questionText: "Oksijen (O2) ile giren tepkimelere ne ad verilir?", options: [ {id:"1", text:"Yanma", isCorrect:true}, {id:"2", text:"Bozunma", isCorrect:false}, {id:"3", text:"Sentez", isCorrect:false}, {id:"4", text:"Çökelme", isCorrect:false} ]}
];

const qT3_2 = [
  { id: "q1", questionText: "Dışarıdan ısı alarak gerçekleşen tepkimeler?", options: [ {id:"1", text:"Endotermik", isCorrect:true}, {id:"2", text:"Ekzotermik", isCorrect:false}, {id:"3", text:"İzotermik", isCorrect:false}, {id:"4", text:"Hızlı", isCorrect:false} ]},
  { id: "q2", questionText: "Asit ve Baz birleşirse ne oluşur?", options: [ {id:"1", text:"Tuz ve Su", isCorrect:true}, {id:"2", text:"Sadece Gaz", isCorrect:false}, {id:"3", text:"Patlama", isCorrect:false}, {id:"4", text:"Plazma", isCorrect:false} ]},
  { id: "q3", questionText: "Aktivasyon enerjisini düşüren madde?", options: [ {id:"1", text:"Katalizör", isCorrect:true}, {id:"2", text:"Asit", isCorrect:false}, {id:"3", text:"Su", isCorrect:false}, {id:"4", text:"Isı", isCorrect:false} ]}
];

const qT4_1 = [
  { id: "q1", questionText: "1 mol maddenin içerdiği tanecik sayısına ne ad verilir?", options: [ {id:"1", text:"Avogadro Sayısı", isCorrect:true}, {id:"2", text:"Rutherford Sayısı", isCorrect:false}, {id:"3", text:"Bohr Sayısı", isCorrect:false}, {id:"4", text:"Kütle", isCorrect:false} ]},
  { id: "q2", questionText: "Normal Koşullarda 1 mol gaz kaç litredir?", options: [ {id:"1", text:"22.4 L", isCorrect:true}, {id:"2", text:"24.5 L", isCorrect:false}, {id:"3", text:"10 L", isCorrect:false}, {id:"4", text:"11.2 L", isCorrect:false} ]},
  { id: "q3", questionText: "1 mol C atomu kaç gramdır? (C=12)", options: [ {id:"1", text:"12 gram", isCorrect:true}, {id:"2", text:"1 gram", isCorrect:false}, {id:"3", text:"6 gram", isCorrect:false}, {id:"4", text:"24 gram", isCorrect:false} ]}
];

const qT4_2 = [
  { id: "q1", questionText: "Oda Koşullarında 1 mol gaz kaç litre hacim kaplar?", options: [ {id:"1", text:"24.5 L", isCorrect:true}, {id:"2", text:"22.4 L", isCorrect:false}, {id:"3", text:"11.2 L", isCorrect:false}, {id:"4", text:"44.8 L", isCorrect:false} ]},
  { id: "q2", questionText: "Bir bileşikteki en sade element oranını gösteren formül?", options: [ {id:"1", text:"Basit Formül", isCorrect:true}, {id:"2", text:"Gerçek Formül", isCorrect:false}, {id:"3", text:"Molekül Formülü", isCorrect:false}, {id:"4", text:"Kütle", isCorrect:false} ]},
  { id: "q3", questionText: "n = m / Ma formülündeki 'm' neyi ifade eder?", options: [ {id:"1", text:"Kütle (Gram)", isCorrect:true}, {id:"2", text:"Mol", isCorrect:false}, {id:"3", text:"Hacim", isCorrect:false}, {id:"4", text:"Basınç", isCorrect:false} ]}
];

const qT5_1 = [
  { id: "q1", questionText: "Gazların basıncını ölçen alet?", options: [ {id:"1", text:"Barometre", isCorrect:true}, {id:"2", text:"Termometre", isCorrect:false}, {id:"3", text:"Altametre", isCorrect:false}, {id:"4", text:"Voltmetre", isCorrect:false} ]},
  { id: "q2", questionText: "Gaz yasalarında sıcaklık birimi nedir?", options: [ {id:"1", text:"Kelvin", isCorrect:true}, {id:"2", text:"Celsius", isCorrect:false}, {id:"3", text:"Fahrenheit", isCorrect:false}, {id:"4", text:"Newton", isCorrect:false} ]},
  { id: "q3", questionText: "Basınç ve Hacim arasındaki ilişkiyi kim buldu?", options: [ {id:"1", text:"Boyle", isCorrect:true}, {id:"2", text:"Charles", isCorrect:false}, {id:"3", text:"Avogadro", isCorrect:false}, {id:"4", text:"Dalton", isCorrect:false} ]}
];

const qT5_2 = [
  { id: "q1", questionText: "PV = nRT denklemindeki R nedir?", options: [ {id:"1", text:"İdeal Gaz Sabiti", isCorrect:true}, {id:"2", text:"Basınç", isCorrect:false}, {id:"3", text:"Direnç", isCorrect:false}, {id:"4", text:"Hız", isCorrect:false} ]},
  { id: "q2", questionText: "0 Kelvin (Mutlak sıfır) kaç santigrat derecedir?", options: [ {id:"1", text:"-273", isCorrect:true}, {id:"2", text:"0", isCorrect:false}, {id:"3", text:"100", isCorrect:false}, {id:"4", text:"-100", isCorrect:false} ]},
  { id: "q3", questionText: "Gazların dar bir delikten sızmasına ne denir?", options: [ {id:"1", text:"Efüzyon", isCorrect:true}, {id:"2", text:"Difüzyon", isCorrect:false}, {id:"3", text:"Erime", isCorrect:false}, {id:"4", text:"Kaynama", isCorrect:false} ]}
];

const qT6_1 = [
  { id: "q1", questionText: "Suda çözündüğünde H+ iyonu veren maddeler?", options: [ {id:"1", text:"Asit", isCorrect:true}, {id:"2", text:"Baz", isCorrect:false}, {id:"3", text:"Tuz", isCorrect:false}, {id:"4", text:"Metal", isCorrect:false} ]},
  { id: "q2", questionText: "pH 7'den büyükse ortam nedir?", options: [ {id:"1", text:"Bazik", isCorrect:true}, {id:"2", text:"Asidik", isCorrect:false}, {id:"3", text:"Nötr", isCorrect:false}, {id:"4", text:"Metalik", isCorrect:false} ]},
  { id: "q3", questionText: "Tuz ruhu formülü nedir?", options: [ {id:"1", text:"HCl", isCorrect:true}, {id:"2", text:"HNO3", isCorrect:false}, {id:"3", text:"H2SO4", isCorrect:false}, {id:"4", text:"NaOH", isCorrect:false} ]}
];

const qT6_2 = [
  { id: "q1", questionText: "Turnusol kağıdını kırmızıya çeviren maddeler?", options: [ {id:"1", text:"Asit", isCorrect:true}, {id:"2", text:"Baz", isCorrect:false}, {id:"3", text:"Tuz", isCorrect:false}, {id:"4", text:"Saf su", isCorrect:false} ]},
  { id: "q2", questionText: "Sofra tuzunun formülü?", options: [ {id:"1", text:"NaCl", isCorrect:true}, {id:"2", text:"NaF", isCorrect:false}, {id:"3", text:"CaCl2", isCorrect:false}, {id:"4", text:"KMnO4", isCorrect:false} ]},
  { id: "q3", questionText: "Akü asidi (Zaç yağı) nedir?", options: [ {id:"1", text:"H2SO4", isCorrect:true}, {id:"2", text:"HCl", isCorrect:false}, {id:"3", text:"HNO3", isCorrect:false}, {id:"4", text:"H2O", isCorrect:false} ]}
];


const qT7_1 = [
  { id: "q1", questionText: "Her tarafında aynı özelliği gösteren karışımlar?", options: [ {id:"1", text:"Homojen", isCorrect:true}, {id:"2", text:"Heterojen", isCorrect:false}, {id:"3", text:"Kolloid", isCorrect:false}, {id:"4", text:"Süspansiyon", isCorrect:false} ]},
  { id: "q2", questionText: "Zeytinyağı ve su nasıl bir karışımdır?", options: [ {id:"1", text:"Emülsiyon", isCorrect:true}, {id:"2", text:"Çözelti", isCorrect:false}, {id:"3", text:"Alaşım", isCorrect:false}, {id:"4", text:"Süspansiyon", isCorrect:false} ]},
  { id: "q3", questionText: "Kum ve suyu birbirinden ayırma yöntemi?", options: [ {id:"1", text:"Süzme", isCorrect:true}, {id:"2", text:"Damıtma", isCorrect:false}, {id:"3", text:"Mıknatıs", isCorrect:false}, {id:"4", text:"Ayrımsal Damıtma", isCorrect:false} ]}
];

const qT7_2 = [
  { id: "q1", questionText: "Metalleri eritip karıştırarak elde edilen karışım?", options: [ {id:"1", text:"Alaşım", isCorrect:true}, {id:"2", text:"Çözücü", isCorrect:false}, {id:"3", text:"Aerosol", isCorrect:false}, {id:"4", text:"Kolloid", isCorrect:false} ]},
  { id: "q2", questionText: "Kan, deniz suyu ve ayran nasıl karışımdır?", options: [ {id:"1", text:"Heterojen", isCorrect:true}, {id:"2", text:"Homojen", isCorrect:false}, {id:"3", text:"Saf", isCorrect:false}, {id:"4", text:"Element", isCorrect:false} ]},
  { id: "q3", questionText: "Demir tozu ve kükürt tozunu en kolay nasıl ayırırız?", options: [ {id:"1", text:"Mıknatısla", isCorrect:true}, {id:"2", text:"Suya atıp süzerek", isCorrect:false}, {id:"3", text:"Isıtarak", isCorrect:false}, {id:"4", text:"Damıtarak", isCorrect:false} ]}
];

const inserts = {
  "tema1": generateMaze("t1_mz", "Labirent 1: Fiziksel Değişimler", qT1_1, "Labirent 2: Kimyasal Değişimler+", qT1_2),
  "tema2": generateMaze("t2_mz", "Labirent 1: Katılar ve Sıvılar", qT2_1, "Labirent 2: Gazlar ve Plazma+", qT2_2),
  "tema3": generateMaze("t3_mz", "Labirent 1: Tepkime Türleri", qT3_1, "Labirent 2: Karışık Tepkimeler+", qT3_2),
  "tema4": generateMaze("t4_mz", "Labirent 1: Mol Hesaplamaları", qT4_1, "Labirent 2: Mol Uzmanı+", qT4_2),
  "tema5": generateMaze("t5_mz", "Labirent 1: Gaz Yasaları", qT5_1, "Labirent 2: Kinetik Uzmanlık+", qT5_2),
  "tema6": generateMaze("t6_mz", "Labirent 1: pH Özellikleri", qT6_1, "Labirent 2: Asit Baz Formülleri+", qT6_2),
  "tema7": generateMaze("t7_mz", "Labirent 1: Karışımlar", qT7_1, "Labirent 2: Alaşımlar ve Ayırma+", qT7_2),
};

const parts = content.split(/(id: "tema[1-7]",\s+title: ".*?",\s+description: ".*?",\s+order: [1-7],\s+modules: \[)/g);

let newContent = "";
for (let i = 0; i < parts.length; i++) {
  newContent += parts[i];
  if (parts[i].match(/id: "(tema[1-7])",/)) {
    const themeId = parts[i].match(/id: "(tema[1-7])",/)[1];
    // Next part is the modules start
    newContent += parts[i+1];
    newContent += inserts[themeId] + ",";
    i++;
  }
}

fs.writeFileSync(filePath, newContent);
console.log("Successfully injected maze modules.");
