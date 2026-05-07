import fs from 'fs';

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateQuestionsForTopic(topic: string, count: number) {
  let pools: Record<string, any[]> = {};
  
  pools['t3'] = [
    { q: "İki veya daha fazla maddenin birleşerek tek bir madde oluşturduğu tepkime?", a: "Sentez", w: ["Analiz", "Yanma", "Asit-Baz"] },
    { q: "Bir bileşiğin daha basit maddelere ayrıştığı tepkime türü hangisidir?", a: "Analiz (Bozunma)", w: ["Sentez", "Yanma", "Çökelme"] },
    { q: "Maddelerin oksijen gazı ile tepkimeye girdiği durumlara ne denir?", a: "Yanma", w: ["Bozunma", "Sentez", "Nötralleşme"] },
    { q: "Asit ve bazın tepkimeye girerek tuz ve su oluşturduğu tepkimeler?", a: "Nötralleşme", w: ["Sentez", "Çökelme", "Analiz"] },
    { q: "İki sulu çözeltinin karışarak katı bir madde oluşturduğu tepkimeler?", a: "Çözünme-Çökelme", w: ["Yanma", "Sentez", "Nötralleşme"] },
    { q: "CH4 + 2O2 -> CO2 + 2H2O ne tür bir tepkimedir?", a: "Yanma", w: ["Nötralleşme", "Sentez", "Redoks olmayan"] },
    { q: "HCl + NaOH -> NaCl + H2O ne tür bir tepkimedir?", a: "Asit-Baz", w: ["Yanma", "Çökelme", "Analiz"] },
    { q: "H2 + 1/2 O2 -> H2O ne tür bir tepkimedir?", a: "Sentez", w: ["Analiz", "Nötralleşme", "Çökelme"] },
    { q: "CaCO3 -> CaO + CO2 ne tür bir tepkimedir?", a: "Analiz", w: ["Sentez", "Yanma", "Redoks"] },
    { q: "Gümüş nitrat ile potasyum iyodür sulu çözeltileri karışınca Gümüş İyodür katısı ne olur?", a: "Çöker", w: ["Buharlaşır", "Yanar", "Süblimleşir"] },
    { q: "Yanma tepkimeleri genellikle ne tür tepkimelerdir?", a: "Ekzotermik", w: ["Endotermik", "İzotermik", "Atermik"] },
    { q: "Tepkimeye giren maddelerin kütleleri toplamı ürünlerin kütleleri toplamına eşittir diyen kanun?", a: "Kütlenin Korunumu", w: ["Sabit Oranlar", "Katlı Oranlar", "Hacim Korunumu"] },
    { q: "Kimyasal tepkimelerde hangi zerreceklerin alışverişi bağ kopması ve oluşumunu sağlar?", a: "Elektron", w: ["Proton", "Nötron", "Çekirdek"] },
    { q: "Nötralleşme tepkimelerinde net iyon denklemi neyin oluşumunu gösterir?", a: "Su (H2O)", w: ["Tuz (NaCl)", "Gaz çıkışı", "Çökelek"] },
    { q: "Metalin asitle verdiği tepkime sonucunda genellikle hangi gaz çıkar?", a: "H2", w: ["O2", "CO2", "NO2"] },
    { q: "Bir kimyasal denklemi denkleştirirken ne tür sayılar formüllerin başına yazılır?", a: "Katsayı", w: ["Alt İndis", "Üst İndis", "Yük"] },
    { q: "Tepkime okunun solundaki maddelere ne ad verilir?", a: "Girenler", w: ["Ürünler", "Meydana Gelenler", "Sonuçlar"] },
    { q: "Endotermik tepkimeler gerçekleşirken ortamdan ne alırlar?", a: "Isı", w: ["Basınç", "Işık", "Kütle"] },
    { q: "Fotosentez gerçekleşirken enerji olarak güneş ışığı alınır. Bu nedenle...", a: "Endotermiktir", w: ["Ekzotermiktir", "Yanmadır", "Bozunmadır"] },
    { q: "Lavoisier hangi kanunu bulmuştur?", a: "Kütlenin Kor.", w: ["Katlı Oranlar", "Sabit Oranlar", "Avogadro Yasası"] }
  ];

  pools['t4'] = [
    { q: "Avogadro sayısı (N_A) yaklaşık olarak kaçtır?", a: "6.02x10^23", w: ["10^23", "6.02x10^24", "10^24"] },
    { q: "1 mol C atomu kaç gramdır (C: 12)?", a: "12 g", w: ["6 g", "1 g", "24 g"] },
    { q: "Suyun (H2O) mol kütlesi kaçtır (H:1, O:16)?", a: "18 g/mol", w: ["16 g/mol", "17 g/mol", "20 g/mol"] },
    { q: "CO2 gazının mol kütlesi kaçtır (C:12, O:16)?", a: "44 g/mol", w: ["28 g/mol", "32 g/mol", "12 g/mol"] },
    { q: "Bütün gazların 1 molü standart şartlarda (0°C, 1 atm) kaç Litre hacim kaplar?", a: "22.4 L", w: ["24.5 L", "11.2 L", "1 L"] },
    { q: "Oda koşullarında (25°C, 1 atm) 1 mol ideal gaz kaç Litre hacim kaplar?", a: "24.5 L", w: ["22.4 L", "11.2 L", "22.5 L"] },
    { q: "Kaç tane molekül 1 mol yapar?", a: "Avogadro sayısı kadar", w: ["10 milyon", "Milyar", "1 Trilyon"] },
    { q: "0.5 mol Su (H2O) kaç gramdır (H:1, O:16)?", a: "9 g", w: ["18 g", "4.5 g", "36 g"] },
    { q: "36 gram Su (H2O) kaç moldür (H:1, O:16)?", a: "2 mol", w: ["1 mol", "0.5 mol", "3 mol"] },
    { q: "N2 gazının mol kütlesi kaçtır (N:14)?", a: "28 g/mol", w: ["14 g/mol", "7 g/mol", "42 g/mol"] },
    { q: "CH4'ün (Metan) mol kütlesi kaçtır (C:12, H:1)?", a: "16 g/mol", w: ["14 g/mol", "18 g/mol", "12 g/mol"] },
    { q: "1 mol O2 molekülünde kaç mol oksijen atomu vardır?", a: "2", w: ["1", "4", "0.5"] },
    { q: "Standart şartlarda 11.2 L hacim kaplayan bir ideal gaz kaç moldür?", a: "0.5 mol", w: ["1 mol", "2 mol", "0.25 mol"] },
    { q: "1 mol NaCl'de kaç tane Na iyonu vardır?", a: "N_A", w: ["1", "2", "N_A/2"] },
    { q: "Gerçek atom kütlesi ne anlama gelir?", a: "1 tane atomun kütlesi", w: ["1 molün kütlesi", "Bağıl atom kütlesi", "Toplam kütle"] },
    { q: "Bağıl atom kütlesi bulunurken hangi izotop referans alınmıştır?", a: "Karbon-12", w: ["Hidrojen-1", "Oksijen-16", "Azot-14"] },
    { q: "1 amu (akb) Karbon-12 kütlesinin kaçta kaçıdır?", a: "1/12'si", w: ["1/6'sı", "Tamamı", "2 katı"] },
    { q: "88 gram CO2 kaç moldür (C:12, O:16)?", a: "2 mol", w: ["1.5 mol", "1 mol", "0.5 mol"] },
    { q: "0.1 mol glikoz (C6H12O6) içeriğinde kaç mol C atomu vardır?", a: "0.6 mol", w: ["6 mol", "1.2 mol", "0.1 mol"] },
    { q: "5 mol H2O formülünde toplam kaç mol atom içerir?", a: "15 mol", w: ["5 mol", "10 mol", "3 mol"] }
  ];

  let raw = pools[topic] || pools['t3'];
  raw = shuffle([...raw]);

  let qArray: any[] = [];
  for (let i = 0; i < Math.min(count, raw.length); i++) {
    const qData = raw[i];
    let optsArray = [
      { id: "1", text: qData.a, isCorrect: true },
      { id: "2", text: qData.w[0] || "Yanlış 1", isCorrect: false },
      { id: "3", text: qData.w[1] || "Yanlış 2", isCorrect: false },
      { id: "4", text: qData.w[2] || "Yanlış 3", isCorrect: false }
    ];
    optsArray = shuffle(optsArray);
    
    qArray.push({
      id: "q" + (i + 1),
      questionText: `Seviye ${i + 1}: ${qData.q.replace(/"/g, "'")}`,
      options: optsArray
    });
  }
  return qArray;
}

let content = fs.readFileSync('src/data/curriculum.ts', 'utf8');

const mazes = [
  { id: "mg_t3_mz_1", topic: "t3" },
  { id: "mg_t3_mz_2", topic: "t3" },
  { id: "mg_t4_mz_1", topic: "t4" },
  { id: "mg_t4_mz_2", topic: "t4" }
];

mazes.forEach(m => {
  const searchPattern = new RegExp(`(id:\\s*"${m.id}"[\\s\\S]*?questions:\\s*\\[)\\s*\\]`);
  
  content = content.replace(searchPattern, (match, prefix) => {
    let newQs = generateQuestionsForTopic(m.topic, 20);
    let strQs = JSON.stringify(newQs, null, 2);
    strQs = strQs.replace(/^\s*\[\s*\n/, '').replace(/\n\s*\]\s*$/, '');
    
    return prefix + "\n" + strQs + "\n          ]";
  });
});

fs.writeFileSync('src/data/curriculum.ts', content);
console.log('Fixed file t3t4!');
