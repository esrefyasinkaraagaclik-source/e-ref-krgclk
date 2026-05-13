import { Konu, Module, MoleculeData } from "../types/curriculum";
import { molecules } from "./molecules";

const moleculeList = Object.values(molecules);

const generateMoleculeQuiz = () => {
  return moleculeList.map((correctMol) => {
    const wrongMols = moleculeList
      .filter((m) => m.name !== correctMol.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [correctMol, ...wrongMols].sort(() => 0.5 - Math.random());
    const answerIndex = options.findIndex((m) => m.name === correctMol.name);

    return {
      id: `q_${correctMol.name}`,
      q: `Aşağıdaki 3 boyutlu modellerden hangisi ${correctMol.name} (${correctMol.formula}) molekülüne aittir?`,
      optionType: "molecule" as const,
      moleculeOptions: options,
      answer: answerIndex,
    };
  });
};

export const curriculum: Konu[] = [
  {
    id: "konu1",
    title: "1. KONU: FİZİKSEL VE KİMYASAL DEĞİŞİMLER",
    description: "Maddede meydana gelen fiziksel ve kimyasal değişimler, değişimlerin göstergeleri.",
    order: 1,
    modules: [
      {
        id: "t1_m1",
        title: "Fiziksel ve Kimyasal Değişimler",
        description: "Günlük hayattaki olayların fiziksel mi yoksa kimyasal değişim mi olduğunu eşleştirin.",
        theory: [
          {
            id: "t1_m1_th1",
            type: "text",
            text: "**Fiziksel Değişim**\nMaddenin kimlik özelliğinin değişmediği, sadece dış görünüşünde (şekil, fiziksel hâl vb.) meydana gelen değişimlerdir. Değişim sonrası yeni bir madde oluşmaz. Maddenin tanecik yapısı sabit kalır.\n\n**Örnekler:**\n- Buzun erimesi\n- Camın kırılması\n- Kâğıdın yırtılması\n- Şekerin suda çözünmesi"
          },
          {
            id: "t1_m1_th2",
            type: "text",
            text: "**Kimyasal Değişim**\nMaddenin iç yapısının (kimlik özelliğinin) değişerek yeni maddelerin oluştuğu değişimlerdir. Bu değişimlerde atomlar arası bağlar kopar veya yeni bağlar oluşur. Genellikle geri dönüşümü zordur.\n\n**Örnekler:**\n- Demirin paslanması\n- Odunun yanması\n- Sütün mayalanması\n- Meyvenin çürümesi"
          }
        ],
        type: "matching",
        pairs: [
          { left: "Buzun erimesi", right: "Fiziksel Değişim", rightType: "text" },
          { left: "Demirin paslanması", right: "Kimyasal Değişim", rightType: "text" },
          { left: "Sütten yoğurt elde edilmesi", right: "Kimyasal Değişim", rightType: "text" },
          { left: "Camın kırılması", right: "Fiziksel Değişim", rightType: "text" },
          { left: "Gümüşün kararması", right: "Kimyasal Değişim", rightType: "text" },
          { left: "Şekerin suda çözünmesi", right: "Fiziksel Değişim", rightType: "text" }
        ]
      },
      {
        id: "t1_m2",
        title: "Kimyasal Değişimin Göstergeleri",
        description: "Kimyasal değişimlerin göstergelerini keşfet ve soruları yanıtla.",
        type: "mindmap",
        mindmapNodes: [
          {
            id: "renk", label: "Renk değişimi", color: "bg-red-500",
            question: {
              text: "Aşağıdaki olaylardan hangisi renk değişiminin kimyasal bir tepkimeye işaret ettiğine örnektir?",
              options: [
                { text: "Kesilen elmanın kararması", isCorrect: true, svgId: "apple_brown" },
                { text: "Suya mürekkep damlatılması", isCorrect: false, svgId: "ink_water" }
              ]
            }
          },
          {
            id: "gaz", label: "Gaz çıkışı", color: "bg-blue-500",
            question: {
              text: "Hangi görseldeki gaz çıkışı kimyasal bir değişimi gösterir?",
              options: [
                { text: "Suyun kaynaması", isCorrect: false, svgId: "boiling_water" },
                { text: "Karbonata limon sıkılması", isCorrect: true, svgId: "lemon_baking_soda" }
              ]
            }
          },
          {
            id: "kati", label: "Katı oluşumu", color: "bg-orange-400",
            question: {
              text: "İki sıvı karıştırıldığında katı oluşumu (çökelme) kimyasal değişime kanıttır. Hangisi buna örnektir?",
              options: [
                { text: "Sütten peynir eldesi", isCorrect: true, svgId: "cheese_making" },
                { text: "Suyun donarak buza dönüşmesi", isCorrect: false, svgId: "ice_melting" }
              ]
            }
          },
          {
            id: "isi_isik", label: "Işık oluşumu", color: "bg-yellow-500",
            question: {
              text: "Hangi olayda açığa çıkan ışık kimyasal bir tepkimenin göstergesidir?",
              options: [
                { text: "Ampulün yanması", isCorrect: false, svgId: "lightbulb" },
                { text: "Odunun yanması", isCorrect: true, svgId: "burning_wood" }
              ]
            }
          },
          {
            id: "koku", label: "Koku değişimi", color: "bg-teal-500",
            question: {
              text: "Koku değişimi hangi durumda kimyasal bir değişimi gösterir?",
              options: [
                { text: "Yemeğin bozulması (ekşimesi)", isCorrect: true, svgId: "spoiled_food" },
                { text: "Odanın parfüm kokması", isCorrect: false, svgId: "perfume" }
              ]
            }
          },
          {
            id: "enerji", label: "Enerji değişimi", color: "bg-emerald-500",
            question: {
              text: "Kimyasal tepkimelerde enerji (ısı) değişimi gözlenir. Hangisi kimyasal bir ısı değişimidir?",
              options: [
                { text: "Havai fişek patlaması", isCorrect: true, svgId: "fireworks" },
                { text: "Buzun erimesi", isCorrect: false, svgId: "ice_melting" }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "konu2",
    title: "2. KONU: ELEMENT BİLEŞİK KARIŞIM",
    description: "Tanecikler dünyasında element, bileşik ve karışımların incelenmesi.",
    order: 2,
    modules: [
      {
        id: "t2_m1",
        title: "Maddeyi Sınıflandır",
        description: "Tanecik modellerine bakarak maddelerin element, bileşik veya karışım olduğuna karar verin.",
        theory: [
          {
            id: "t2_m1_th1",
            type: "text",
            text: "**Madde Sınıflandırması**\nMaddeler tanecik yapılarına göre saf maddeler ve saf olmayan maddeler (karışımlar) olarak ikiye ayrılırlar.\n\n**1. Elementler:**\nAynı tür atomlardan oluşurlar. Tanecik modelinde tek bir renk ve boyuttaki küreler veya aynı renk kürelerin oluşturduğu çiftler (moleküler element) görülür.\n\n**2. Bileşikler:**\nFarklı tür atomların belirli oranlarda birleşmesiyle oluşurlar. Tanecik modelinde farklı renk ve boyuttaki kürelerin birbirine bağlandığı (moleküller) görülür."
          },
          {
            id: "t2_m1_th2",
            type: "text",
            text: "**3. Karışımlar:**\nBirden fazla saf maddenin kimyasal özelliklerini kaybetmeden bir arada bulunmasıdır. Tanecik modelinde farklı farklı moleküllerin veya atomların birbirine bağlanmadan serbestçe dolaştığı görülür."
          }
        ],
        type: "classification",
        classifications: [
          {
            id: "c1",
            title: "Madde Sınıflandırma",
            description: "Tanecik modellerini inceleyin.",
            options: [
              { id: "element", label: "Element", colorClass: "hover:border-cyan-500 hover:text-cyan-400" },
              { id: "compound", label: "Bileşik", colorClass: "hover:border-emerald-500 hover:text-emerald-400" },
              { id: "mixture", label: "Karışım", colorClass: "hover:border-amber-500 hover:text-amber-400" }
            ],
            items: [
              { id: "i1", molecule: molecules.h2o, correctType: "compound", explanation: "Farklı cins atomlar (H ve O) belirli oranda birleşerek yeni bir saf madde oluşturmuştur." },
              { id: "i2", molecule: molecules.n2, correctType: "element", explanation: "Aynı cins atomlardan (sadece Azot) oluşan saf maddedir." },
              { id: "i3", molecule: molecules.he, correctType: "element", explanation: "Aynı cins atomlardan oluşan tek atomlu (monatomik) elementtir." },
              { id: "i4", molecule: molecules.mixture_air, correctType: "mixture", explanation: "Farklı cins moleküller (N₂ ve O₂) kimyasal bağ kurmadan bir aradadır." },
              { id: "i5", molecule: molecules.co2, correctType: "compound", explanation: "Karbon ve Oksijen atomları kimyasal bağ ile birleşerek bileşik oluşturmuştur." },
              { id: "i6", molecule: molecules.mixture_salt_water, correctType: "mixture", explanation: "Su molekülleri ve tuz iyonları (Na⁺, Cl⁻) bir arada bulunur, kimyasal olarak birleşmemişlerdir." },
              { id: "i7", molecule: molecules.nh3, correctType: "compound", explanation: "Farklı cins atomlar (N ve H) birleşerek yeni bir saf madde oluşturmuştur." },
              { id: "i8", molecule: molecules.o2, correctType: "element", explanation: "Aynı cins atomlardan oluşan iki atomlu (diatomik) bir elementtir." },
              { id: "i9", molecule: molecules.h2, correctType: "element", explanation: "Aynı cins atomlardan oluşan element molekülüdür." },
              { id: "i10", molecule: molecules.ch4, correctType: "compound", explanation: "Karbon ve Hidrojen atomları kimyasal bağ ile birleşerek bileşik oluşturmuştur." }
            ]
          }
        ]
      },
      {
        id: "t2_m2",
        title: "Atom, Molekül, İyon",
        description: "Tanecik modellerine bakarak maddenin atom, molekül veya iyon olduğuna karar verin.",
        type: "classification",
        classifications: [
          {
            id: "c2",
            title: "Tanecik Türünü Belirle",
            description: "Tanecik modellerini inceleyin.",
            options: [
              { id: "atom", label: "Atom", colorClass: "hover:border-blue-500 hover:text-blue-400" },
              { id: "molecule", label: "Molekül", colorClass: "hover:border-purple-500 hover:text-purple-400" },
              { id: "ion", label: "İyon", colorClass: "hover:border-pink-500 hover:text-pink-400" }
            ],
            items: [
              { id: "i1", molecule: molecules.atom_he, correctType: "atom", explanation: "Tek bir çekirdek etrafında bulunan elektronlardan oluşan, kimyasal bağ yapmamış tekil taneciktir." },
              { id: "i2", molecule: molecules.h2o, correctType: "molecule", explanation: "Birden fazla atomun kovalent bağ ile birleşerek oluşturduğu bağımsız tanecik grubudur." },
              { id: "i3", molecule: molecules.ion_na, correctType: "ion", explanation: "Elektron vermiş veya almış, elektrik yüklü taneciktir (Na⁺)." },
              { id: "i4", molecule: molecules.o2, correctType: "molecule", explanation: "Aynı cins iki atomun kovalent bağ ile birleştiği bir element molekülüdür." },
              { id: "i5", molecule: molecules.atom_c, correctType: "atom", explanation: "Tekil bir karbon atomudur." },
              { id: "i6", molecule: molecules.ion_cl, correctType: "ion", explanation: "Elektron alarak eksi (-) yükle yüklenmiş bir iyondur (Cl⁻)." }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "konu3",
    title: "3. KONU: KİMYASAL TEPKİMELER",
    description: "Kimyasal tepkimelerin modellenmesi, denkleştirilmesi ve tepkime türleri.",
    order: 3,
    modules: [
      {
        id: "t3_m1",
        title: "Tepkime Türleri Sınıflandırma",
        description: "Verilen tepkime denklemlerini türlerine göre analiz et.",
        theory: [
          {
            id: "t3_m1_th1",
            type: "text",
            text: "**Kimyasal Tepkime Türleri**\nKimyasal tepkimeler, maddelerin birbirleriyle olan etkileşimlerine göre farklı sınıflara ayrılırlar.\n\n**1. Yanma Tepkimeleri:**\nBir maddenin O₂ gazı ile tepkimeye girmesidir. Genellikle dışarıya ısı ve ışık verirler."
          },
          {
            id: "t3_m1_th2",
            type: "text",
            text: "**2. Asit-Baz Tepkimeleri:**\nBir asit ile bir bazın birleşerek tuz ve genellikle su oluşturmasıdır.\n\n**3. Çözünme-Çökelme Tepkimeleri:**\nİki tane sulu çözeltinin karışarak katı bir madde (çökelek) oluşturmasıdır.\n\n**4. İndirgenme-Yükseltgenme (Redoks) Tepkimeleri:**\nElektron alışverişi ile gerçekleşen tepkimelerdir. Bir madde elektron verirken (yükseltgenme), diğeri elektron alır (indirgenme)."
          }
        ],
        type: "reaction-classification",
        reactionClassifications: [
          {
            id: "rt1",
            title: "Tepkime Sınıflandırması",
            description: "Kimyasal denklemleri inceleyin ve sınıflandırın.",
            options: [
              { id: "combustion", label: "Yanma", colorClass: "hover:border-red-500 hover:text-red-400" },
              { id: "acidbase", label: "Asit-Baz", colorClass: "hover:border-emerald-500 hover:text-emerald-400" },
              { id: "precipitation", label: "Çözünme-Çökelme", colorClass: "hover:border-amber-500 hover:text-amber-400" },
              { id: "redox", label: "Redoks", colorClass: "hover:border-indigo-500 hover:text-indigo-400" }
            ],
            items: [
              {
                id: "re1",
                equation: "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(s)",
                reactants: [{ formula: "CH₄", state: "g", color: "text-blue-400" }, { formula: "O₂", state: "g", color: "text-red-400" }],
                products: [{ formula: "CO₂", state: "g", color: "text-purple-400" }, { formula: "H₂O", state: "s", color: "text-cyan-400" }],
                correctType: "combustion",
                explanation: "O₂ gazı girenler tarafında yer aldığı için bu bir yanma tepkimesidir."
              },
              {
                id: "re4",
                equation: "HCl(suda) + NaOH(suda) → \nNaCl(suda) + H₂O(s)",
                reactants: [{ formula: "HCl", state: "suda", color: "text-red-400" }, { formula: "NaOH", state: "suda", color: "text-blue-400" }],
                products: [{ formula: "NaCl", state: "suda" }, { formula: "H₂O", state: "s", color: "text-cyan-400" }],
                correctType: "acidbase",
                explanation: "Bir asit (HCl) ile bir bazın (NaOH) tepkimeye girerek tuz ve su oluşturduğu asit-baz (nötralleşme) tepkimesidir."
              },
              {
                id: "re5",
                equation: "AgNO₃(suda) + NaCl(suda) → \nAgCl(k) + NaNO₃(suda)",
                reactants: [{ formula: "AgNO₃", state: "suda" }, { formula: "NaCl", state: "suda" }],
                products: [{ formula: "AgCl", state: "k", color: "text-orange-400" }, { formula: "NaNO₃", state: "suda" }],
                correctType: "precipitation",
                explanation: "İki sulu çözeltinin karışması sonucu suda çözünmeyen katı bir madde (AgCl) oluştuğu çözünme-çökelme tepkimesidir."
              },
              {
                id: "re6",
                equation: "Zn(k) + Cu²⁺(suda) → \nZn²⁺(suda) + Cu(k)",
                reactants: [{ formula: "Zn", state: "k" }, { formula: "Cu²⁺", state: "suda" }],
                products: [{ formula: "Zn²⁺", state: "suda" }, { formula: "Cu", state: "k" }],
                correctType: "redox",
                explanation: "Zn atomu elektron vererek yükseltgenirken, Cu²⁺ iyonu elektron alarak indirgenir. Bu bir redoks tepkimesidir."
              }
            ]
          }
        ]
      },
      {
        id: "t3_m2",
        title: "Tepkime Denkleştirme Oyunu",
        description: "Girenler ve çıkanlar arasındaki atom sayılarını eşitle.",
        type: "reaction",
        reactions: [
          {
            id: "r1",
            title: "Suyun Oluşumu",
            description: "Hidrojen ve oksijen gazlarından su oluşumu",
            reactants: [
              { molecule: molecules.h2, correctCoefficient: 2 },
              { molecule: molecules.o2, correctCoefficient: 1 }
            ],
            products: [
              { molecule: molecules.h2o, correctCoefficient: 2 }
            ]
          },
          {
            id: "r2",
            title: "Amonyak Oluşumu",
            description: "Azot ve hidrojen gazlarından amonyak oluşumu",
            reactants: [
              { molecule: molecules.n2, correctCoefficient: 1 },
              { molecule: molecules.h2, correctCoefficient: 3 }
            ],
            products: [
              { molecule: molecules.nh3, correctCoefficient: 2 }
            ]
          },
          {
            id: "r3",
            title: "Metan Yanması",
            description: "Metan gazının oksijenle yanması",
            reactants: [
              { molecule: molecules.ch4, correctCoefficient: 1 },
              { molecule: molecules.o2, correctCoefficient: 2 }
            ],
            products: [
              { molecule: molecules.co2, correctCoefficient: 1 },
              { molecule: molecules.h2o, correctCoefficient: 2 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "konu4",
    title: "4. KONU: MOL KAVRAMI",
    description: "Maddenin miktarını ifade etme: Mol, kütle, tanecik sayısı hacim.",
    order: 4,
    modules: [
      {
        id: "t4_m1",
        title: "Mol - Kütle Hesaplamaları",
        description: "Atomik veya moleküler düzeyde kütle ve mol ilişkisini kur.",
        theory: [
          {
            id: "t4_m1_th1",
            type: "text",
            text: "**Mol Kavramı Nedir?**\nKimyada çok küçük olan atom ve molekülleri saymak yerine kullanılan ölçü birimine **mol** denir. 1 mol madde, Avogadro sayısı kadar (6,02 x 10²³) tanecik içerir.\n\n**Temel Formüller:**\n- m: kütle, MA: mol kütlesi, n: mol sayısı\n- **n = m / MA** (Kütleden mole geçiş)\n- **n = N / N_A** (Tanecik sayısından mole geçiş)\n- **n = V / 22,4** (NKA'da gaz hacminden mole geçiş)"
          }
        ],
        type: "mole-calculation",
        moleCalculations: [
          {
            id: "mc1",
            title: "Mol Hesaplama Pratiği",
            description: "Verilen değerlere göre istenen kavramı hesapla.",
            items: [
              {
                id: "q1", calcType: "mass", questionText: "2 Mol H₂O kaç gramdır?", givenValue: "Su (H₂O) için miktar: 2 mol", subText: "(H: 1, O: 16)",
                options: [
                  { id: "o1", label: "18 gram", isCorrect: false },
                  { id: "o2", label: "36 gram", isCorrect: true },
                  { id: "o3", label: "9 gram", isCorrect: false },
                  { id: "o4", label: "72 gram", isCorrect: false }
                ],
                explanation: "H₂O mol kütlesi = (2.1) + 16 = 18 g/mol. 2 mol H₂O = 2 . 18 = 36 gram."
              },
              {
                id: "q2", calcType: "particle", questionText: "0.5 Mol Karbondioksit (CO₂) gazı kaç tane molekül içerir?", givenValue: "0.5 mol CO₂ molekülü", subText: "(N_A: Avogadro Sayısı, N_A ≈ 6.02 x 10²³)",
                options: [
                  { id: "o1", label: "3.01 x 10²³", isCorrect: true },
                  { id: "o2", label: "6.02 x 10²³", isCorrect: false },
                  { id: "o3", label: "1.505 x 10²³", isCorrect: false },
                  { id: "o4", label: "1.204 x 10²⁴", isCorrect: false }
                ],
                explanation: "Mol sayısı = Tanecik Sayısı / N_A. 0.5 = Tanecik / (6.02x10²³) -> 3.01x10²³ tane molekül."
              },
              {
                id: "q3", calcType: "volume", questionText: "Normal Şartlar Altında (NKA) 11.2 Litre hacim kaplayan CH₄ gazı kaç moldür?", givenValue: "NKA'da 11.2L CH₄", subText: "(NKA'da 1 mol gaz 22.4 L hacim kaplar)",
                options: [
                  { id: "o1", label: "1 Mol", isCorrect: false },
                  { id: "o2", label: "2 Mol", isCorrect: false },
                  { id: "o3", label: "0.5 Mol", isCorrect: true },
                  { id: "o4", label: "0.25 Mol", isCorrect: false }
                ],
                explanation: "Mol = Hacim / 22.4. Mol = 11.2 / 22.4 = 0.5 moldür."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "konu5",
    title: "5. KONU: GAZLAR",
    description: "Gazların genel özellikleri ve davranışları.",
    order: 5,
    modules: [
      {
        id: "t5_m1",
        title: "Gazların Genel Özellikleri",
        description: "Gazların temel özelliklerini kavram haritasında keşfedin.",
        theory: [
          {
            id: "t5_m1_th1",
            type: "text",
            text: "**Gazların Genel Özellikleri**\n\n1. Gaz tanecikleri arasındaki boşluklar çok fazladır.\n2. Gazlar bulundukları kabın her noktasına basınç uygularlar.\n3. Gaz tanecikleri sürekli ve gelişigüzel hareket ederler (Brown hareketi).\n4. Gazlar birbiriyle her oranda karışarak homojen karışımlar oluştururlar.\n5. Gazlar sıkıştırılabilir ve ısıtıldıklarında genleşirler."
          }
        ],
        type: "mindmap",
        mindmapNodes: [
          {
            id: "sikistirilma", label: "Sıkıştırılabilme", color: "bg-blue-500",
            question: {
              text: "Gazlar arasındaki boşluklar çok fazladır, bu sayede yüksek basınç altında sıkıştırılabilirler. Hangi görsel sıkıştırılabilme (örneğin bir şırınga içinde) özelliğini gösterir?",
              options: [
                { text: "Gazların sıkıştırılması", isCorrect: true, svgId: "gas_compress" },
                { text: "Katıların sıkıştırılamaması", isCorrect: false, svgId: "solid_block" }
              ]
            }
          },
          {
            id: "yayilma", label: "Yayılıcılık", color: "bg-pink-500",
            question: {
              text: "Gaz tanecikleri bulundukları ortama hızla yayılarak her yeri kaplarlar. Odaya sıkılan parfümün kokusunun her yerden duyulması hangi olaya en iyi örnektir?",
              options: [
                { text: "Odaya parfüm sıkılması", isCorrect: true, svgId: "perfume" },
                { text: "Su buharının yoğunlaşması", isCorrect: false, svgId: "boiling_water" }
              ]
            }
          },
          {
            id: "genlesme", label: "Genleşme", color: "bg-red-500",
            question: {
              text: "Bütün gazlar ısıtıldıklarında hacimleri artar (genleşirler). Sıcak hava balonlarının uçması gazların bu özelliği sayesindedir. Hangi görsel genleşmeyi temsil eder?",
              options: [
                { text: "Isıtılan kabın ucundaki balonun şişmesi", isCorrect: true, svgId: "gas_expand" },
                { text: "Buzun erimesi (Katı hal değişimi)", isCorrect: false, svgId: "ice_melting" }
              ]
            }
          },
          {
            id: "homojen", label: "Homojen Karışım", color: "bg-purple-500",
            question: {
              text: "Gazlar kendi aralarında her oranda ve her zaman tamamen iç içe geçerek homojen karışımlar (çözeltiler) oluştururlar. Atmosfer bunun bir örneğidir. Hangi görsel bunu temsil etmektedir?",
              options: [
                { text: "Farklı gazların iç içe geçip tamamen karışması", isCorrect: true, svgId: "gas_mix" },
                { text: "Zeytinyağı ve suyun heterojen kalması", isCorrect: false, svgId: "oil_water" }
              ]
            }
          },
          {
            id: "basinc", label: "Basınç Yapma", color: "bg-emerald-500",
            question: {
              text: "Gaz tanecikleri sürekli hareket halindedir ve kabın iç yüzeylerine çarparak her noktaya eşit oranda kuvvet (basınç) uygularlar. Hangi görsel gaz basıncını temsil eder?",
              options: [
                { text: "Taneciklerin kabın çeperlerine çarpması", isCorrect: true, svgId: "gas_pressure" },
                { text: "Elmanın çürümesi", isCorrect: false, svgId: "apple_brown" }
              ]
            }
          }
        ]
      },
      {
        id: "t5_m2",
        title: "Gaz Kanunları Dedektifi",
        description: "Gaz kanunlarını; formülleri ve sabit tutulan değerleri ile eşleştirin.",
        theory: [
          {
            id: "t5_m2_th1",
            type: "text",
            text: "**İdeal Gaz Yasası**\n\nGazların basınç (P), hacim (V), mol sayısı (n) ve mutlak sıcaklık (T) arasındaki ilişkiyi açıklar.\n\n**PV = nRT**\n\n- P: Basınç (atm)\n- V: Hacim (L)\n- n: Mol sayısı\n- R: İdeal gaz sabiti (0,082 veya 22,4/273)\n- T: Mutlak sıcaklık (Kelvin)"
          }
        ],
        type: "matching",
        pairs: [
          { left: "Boyle Kanunu\n(Sabit T ve n)", right: "P₁·V₁ = P₂·V₂", rightType: "text" },
          { left: "Charles Kanunu\n(Sabit P ve n)", right: "V₁/T₁ = V₂/T₂", rightType: "text" },
          { left: "Gay-Lussac Kanunu\n(Sabit V ve n)", right: "P₁/T₁ = P₂/T₂", rightType: "text" },
          { left: "Avogadro Kanunu\n(Sabit P ve T)", right: "V₁/n₁ = V₂/n₂", rightType: "text" },
          { left: "İdeal Gaz Denklemi\n(Tümü değişebilir)", right: "P·V = n·R·T", rightType: "text" }
        ]
      },
      {
        id: "t5_m3",
        title: "Basınç ve Hacim Dönüşümleri",
        description: "Gaz hesaplamalarında kullanılan temel ölçü birimlerini birbirleri cinsinden eşleştirin.",
        theory: [
          {
            id: "t5_m3_th1",
            type: "text",
            text: "**Gazlarda Birim Dönüşümleri**\n\n- **Basınç:** 1 atm = 76 cmHg = 760 mmHg = 760 Torr\n- **Sıcaklık:** T(K) = t(°C) + 273\n- **Hacim:** 1 L = 1000 mL = 1000 cm³"
          }
        ],
        type: "matching",
        pairs: [
          { left: "1 Atmosfer (atm) basınç", right: "76 cmHg (760 mmHg)", rightType: "text" },
          { left: "1 Torr basınç", right: "1 mmHg", rightType: "text" },
          { left: "Mutlak Sıfır Noktası (0 Kelvin)", right: "-273.15 °C", rightType: "text" },
          { left: "1 Litre (L) hacim", right: "1000 mL", rightType: "text" },
          { left: "Doğadaki Standart Şartlar (Sıcaklık ve Basınç)", right: "25 °C ve 1 atm", rightType: "text" }
        ]
      },
      {
        id: "t5_m4",
        title: "Kinetik Teori Kavramları",
        description: "Gazların özelliklerini ve davranışlarını açıklayan Kinetik Teori kavramlarını eşleştirin.",
        theory: [
          {
            id: "t5_m4_th1",
            type: "text",
            text: "**Kinetik Teori**\n\n1. Gaz tanecikleri öz hacimleri, bulundukları kabın hacmi yanında ihmal edilebilecek kadar küçüktür.\n2. Gaz tanecikleri arasındaki itme ve çekme kuvvetleri yok kabul edilir.\n3. Gaz taneciklerinin kinetik enerjileri mutlak sıcaklık ile doğru orantılıdır.\n4. Aynı sıcaklıktaki tüm gazların ortalama kinetik enerjileri eşittir."
          }
        ],
        type: "matching",
        pairs: [
          { left: "Gazın başka bir gaz içinde yayılması", right: "Difüzyon", rightType: "text" },
          { left: "Gazın küçük bir delikten boşluğa yayılması", right: "Efüzyon (Dışarı Sızma)", rightType: "text" },
          { left: "Gazların davranışlarını matematiksel modellerle açıklayan teori", right: "Kinetik Teori", rightType: "text" },
          { left: "Ortalama kinetik enerjinin bağlı olduğu tek değişken", right: "Mutlak Sıcaklık (Kelvin)", rightType: "text" },
          { left: "Kinetik teorinin varsaydığı tanecikler arası kuvvet", right: "Sıfır kabul edilir", rightType: "text" }
        ]
      },
      {
        id: "t5_m5",
        title: "Atmosferdeki Gazlar ve Etkileri",
        description: "Atmosferde bulunan gazları ve dünya üzerinde yarattıkları çevresel etkileri eşleştirin.",
        theory: [
          {
            id: "t5_m5_th1",
            type: "text",
            text: "**Atmosfer ve Çevre**\n\nAtmosferdeki gazlar dünyamız için hayati öneme sahiptir ancak insan faaliyetleri sonucu bazı gazların oranının değişmesi çevresel sorunlara yol açar.\n\n- **Sera Etkisi:** CO₂, CH₄ gibi gazların ısıyı tutması sonucu küresel ısınma oluşur.\n- **Ozon Tabakası:** O₃ gazı güneşten gelen zararlı UV ışınlarını süzer.\n- **Asit Yağmurları:** SO₂ ve NO₂ gazlarının su buharıyla birleşerek asit oluşturmasıdır."
          }
        ],
        type: "matching",
        pairs: [
          { left: "Karbondioksit (CO₂) gazının atmosferde aşırı birikmesi", right: "Sera Etkisi (Küresel Isınma)", rightType: "text" },
          { left: "SO₂ (Kükürtdioksit) ve NO₂ (Azotdioksit) gazlarının suyla birleşmesi", right: "Asit Yağmurları", rightType: "text" },
          { left: "Güneşin zararlı UV ışınlarını süzen gaz bulutu", right: "Ozon Tabakası (O₃)", rightType: "text" },
          { left: "Klima ve buzdolaplarında kullanılan çevreye zararlı eski gazlar", right: "CFC (Kloroflorokarbon)", rightType: "text" },
          { left: "Atmosferin %78'ini oluşturan yaşamın temel gazı", right: "Azot (N₂) Gazı", rightType: "text" }
        ]
      },
      {
        id: "t5_m6",
        title: "Gaz Yasaları ve Kanunları",
        description: "Gazların hacim, sıcaklık, basınç ve mol sayısıyla olan ilişkilerini (yasaları) eşleştirin.",
        theory: [
          {
            id: "t5_m6_th1",
            type: "text",
            text: "**Gaz Yasaları Özeti**\n\n- **Boyle:** P₁V₁ = P₂V₂ (Sıcaklık ve mol sabit)\n- **Charles:** V₁/T₁ = V₂/T₂ (Basınç ve mol sabit)\n- **Gay-Lussac:** P₁/T₁ = P₂/T₂ (Hacim ve mol sabit)\n- **Avogadro:** V₁/n₁ = V₂/n₂ (Basınç ve sıcaklık sabit)"
          }
        ],
        type: "matching",
        pairs: [
          { left: "Basınç ve Hacim Ters Orantılıdır (P-V)", right: "Boyle Yasası", rightType: "text" },
          { left: "Hacim ve Mutlak Sıcaklık Doğru Orantılıdır (V-T)", right: "Charles Yasası", rightType: "text" },
          { left: "Basınç ve Mutlak Sıcaklık Doğru Orantılıdır (P-T)", right: "Gay-Lussac Yasası", rightType: "text" },
          { left: "Hacim ve Mol Sayısı Doğru Orantılıdır (V-n)", right: "Avogadro Yasası", rightType: "text" },
          { left: "Tüm gazların uyduğu varsayılan formül (PV=nRT)", right: "İdeal Gaz Denklemi", rightType: "text" }
        ]
      }
    ]
  }
];
