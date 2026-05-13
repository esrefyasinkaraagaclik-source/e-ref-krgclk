import { molecules } from "./molecules";

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-in-the-blank' | 'matching';

export interface ExerciseQuestion {
  id: string;
  type: QuestionType;
  topic: string;
  question: string;
  options?: string[];
  answer: string | number | boolean;
  explanation?: string;
  points: number;
}

export const exercises: Record<string, ExerciseQuestion[]> = {
  "konu1": [
    {
      id: "t1_q1",
      type: "multiple-choice",
      topic: "Fiziksel ve Kimyasal Değişimler",
      question: "Aşağıdaki olaylardan hangisi kimyasal bir değişimdir?",
      options: ["Şekerin suda çözünmesi", "Camın kırılması", "Gümüşün kararması", "Buzun erimesi"],
      answer: 2,
      explanation: "Gümüşün kararması bir oksitlenme (kimyasal tepkime) olayıdır.",
      points: 10
    },
    {
      id: "t1_q2",
      type: "true-false",
      topic: "Fiziksel ve Kimyasal Değişimler",
      question: "Kimyasal değişimlerde maddenin sadece dış görünüşü değişir.",
      answer: false,
      explanation: "Kimyasal değişimlerde maddenin iç yapısı (kimlik özelliği) değişir.",
      points: 10
    },
    {
      id: "t1_q3",
      type: "multiple-choice",
      topic: "Değişimin Göstergeleri",
      question: "Aşağıdakilerden hangisi kimyasal bir değişimin gerçekleştiğinin kesin kanıtı değildir?",
      options: ["Gaz çıkışı", "Renk değişimi", "Sıcaklık değişimi", "Hal değişimi (Erime/Donma)"],
      answer: 3,
      explanation: "Hal değişimleri (erime, donma, buharlaşma) fiziksel değişimlerdir.",
      points: 10
    },
    {
      id: "t1_q4",
      type: "true-false",
      topic: "Fiziksel ve Kimyasal Değişimler",
      question: "Sütten yoğurt eldesi kimyasal bir değişimdir.",
      answer: true,
      explanation: "Mayalanma süreci maddenin kimyasal yapısını değiştirir.",
      points: 10
    },
    {
      id: "t1_q5",
      type: "multiple-choice",
      topic: "Değişimler",
      question: "Hangisi fiziksel bir değişimdir?",
      options: ["Odunun yanması", "Demirin paslanması", "Şekerin suda çözünmesi", "Yumurtanın pişmesi"],
      answer: 2,
      explanation: "Çözünme olayları genellikle fizikseldir; şekerin moleküler yapısı değişmez.",
      points: 10
    },
    {
      id: "t1_q6",
      type: "multiple-choice",
      topic: "Değişimin Göstergeleri",
      question: "Karbonata limon sıkıldığında açığa çıkan gazlar neyin göstergesidir?",
      options: ["Fiziksel değişim", "Kimyasal değişim", "Hal değişimi", "Buharlaşma"],
      answer: 1,
      explanation: "Gaz çıkışı, yeni bir maddenin oluştuğunu (CO2) gösteren kimyasal bir değişim belirtisidir.",
      points: 10
    },
    {
      id: "t1_q7",
      type: "fill-in-the-blank",
      topic: "Kimyasal Değişim",
      question: "Demirin paslanması maddede meydana gelen ......... bir değişimdir.",
      answer: "kimyasal",
      explanation: "Maddenin iç yapısı değiştiği için kimyasal değişimdir.",
      points: 10
    }
  ],
  "konu2": [
    {
      id: "t2_q1",
      type: "multiple-choice",
      topic: "Element ve Bileşikler",
      question: "Aşağıdakilerden hangisi bir bileşiktir?",
      options: ["O2", "He", "H2O", "Fe"],
      answer: 2,
      explanation: "H2O (Su), farklı cins atomların belirli oranda birleşmesiyle oluşmuş bir bileşiktir.",
      points: 10
    },
    {
      id: "t2_q2",
      type: "multiple-choice",
      topic: "Karışımlar",
      question: "Hangisi homojen bir karışımdır?",
      options: ["Ayran", "Tuzlu su", "Süt", "Toprak"],
      answer: 1,
      explanation: "Tuzlu su (çözelti) her noktasında aynı özelliği gösteren homojen bir karışımdır.",
      points: 10
    },
    {
      id: "t2_q3",
      type: "true-false",
      topic: "Element ve Bileşikler",
      question: "Elementler fiziksel yöntemlerle daha basit maddelere ayrıştırılabilir.",
      answer: false,
      explanation: "Elementler en basit saf maddelerdir ve ne fiziksel ne de kimyasal yollarla daha basit maddelere ayrıştırılamazlar.",
      points: 10
    },
    {
      id: "t2_q4",
      type: "true-false",
      topic: "Bileşikler",
      question: "Bileşiği oluşturan elementler arasında sabit bir kütle oranı vardır.",
      answer: true,
      explanation: "Sabit Oranlar Kanunu'na göre bileşenler belirli oranlarda birleşir.",
      points: 10
    },
    {
      id: "t2_q5",
      type: "multiple-choice",
      topic: "Karışımlar",
      question: "Zeytinyağı-su karışımı ne tür bir karışımdır?",
      options: ["Çözelti", "Emülsiyon", "Süspansiyon", "Aerosol"],
      answer: 1,
      explanation: "İki sıvının heterojen karışmasıyla oluşan sistemlere emülsiyon denir.",
      points: 15
    },
    {
      id: "t2_q6",
      type: "multiple-choice",
      topic: "Tanecik Türleri",
      question: "Atomun elektron alması veya vermesi sonucu oluşan yüklü taneciğe ne denir?",
      options: ["Molekül", "Kovalent bağ", "İyon", "Bileşik"],
      answer: 2,
      explanation: "Yüklü atom veya atom gruplarına iyon denir.",
      points: 10
    },
    {
      id: "t2_q7",
      type: "fill-in-the-blank",
      topic: "Karışımlar",
      question: "Homojen karışımlara genel olarak ......... adı verilir.",
      answer: "çözelti",
      explanation: "Tuzlu su gibi her noktada aynı özelliği gösteren karışımlara çözelti denir.",
      points: 10
    }
  ],
  "konu3": [
    {
      id: "t3_q2",
      type: "multiple-choice",
      topic: "Denkleştirme",
      question: "CH4 + 2O2 → CO2 + 2H2O tepkimesi için hangisi yanlıştır?",
      options: ["Yanma tepkimesidir", "Atom türü korunmuştur", "Katsayılar toplamı girenlerde 3'tür", "Toplam molekül sayısı korunmuştur"],
      answer: 3,
      explanation: "Girenlerde 1+2=3 molekül, ürünlerde 1+2=3 molekül vardır. Molekül sayısı her zaman korunmayabilir, ancak bu tepkimede korunmuştur.",
      points: 15
    },
    {
      id: "t3_q3",
      type: "true-false",
      topic: "Kimya Kanunları",
      question: "Kimyasal tepkimelerde toplam kütle her zaman korunur.",
      answer: true,
      explanation: "Lavoisier Kütlenin Korunumu Yasası'na göre kütle var olmaz, yok olmaz.",
      points: 10
    },
    {
      id: "t3_q4",
      type: "multiple-choice",
      topic: "Tepkime Türleri",
      question: "Asit + Baz → Tuz + Su tepkimelerine ne denir?",
      options: ["Yanma", "Nötralleşme", "Çözünme-Çökelme", "Redoks"],
      answer: 1,
      explanation: "Asit ve bazın tepkimesi sonucu tuz ve su oluşuyorsa buna nötralleşme denir.",
      points: 10
    },
    {
      id: "t3_q5",
      type: "fill-in-the-blank",
      topic: "Kanunlar",
      question: "Kütlenin Korunumu Yasası'nı bulan bilim insanı ......... 'dır.",
      answer: "Lavoisier",
      explanation: "Modern kimyanın babası olarak kabul edilen Antoine Lavoisier tarafından bulunmuştur.",
      points: 10
    },
    {
      id: "t3_q6",
      type: "multiple-choice",
      topic: "Tepkime Türleri",
      question: "Pb(NO3)2(suda) + 2KI(suda) -> PbI2(k) + 2KNO3(suda) tepkimesinin türü nedir?",
      options: ["Yanma", "Asit-Baz", "Çözünme-Çökelme", "Nötralleşme"],
      answer: 2,
      explanation: "İki sulu çözeltiden katı bir çökelek (PbI2) oluştuğu için çözünme-çökelme tepkimesidir.",
      points: 20
    },
    {
      id: "t3_q7",
      type: "multiple-choice",
      topic: "Tepkime Türleri",
      question: "Elektron alışverişi ile gerçekleşen tepkimelere ne ad verilir?",
      options: ["Asit-Baz", "Redoks", "Nötralleşme", "Çözünme"],
      answer: 1,
      explanation: "Elektron alışverişinin olduğu (indirgenme ve yükseltgenme) tepkimelere Redoks tepkimeleri denir.",
      points: 10
    }
  ],
  "konu4": [
    {
      id: "t4_q1",
      type: "multiple-choice",
      topic: "Mol Hesaplama",
      question: "36 gram H2O kaç moldür? (H:1, O:16)",
      options: ["1 mol", "2 mol", "3 mol", "4 mol"],
      answer: 1,
      explanation: "H2O = 18 g/mol. n = m/MA = 36/18 = 2 mol.",
      points: 15
    },
    {
      id: "t4_q2",
      type: "multiple-choice",
      topic: "Avogadro Sayısı",
      question: "1 mol atom içeren H2 gazı kaç moldür?",
      options: ["0.5 mol", "1 mol", "2 mol", "6.02x10^23 mol"],
      answer: 0,
      explanation: "H2 molekülünde 2 atom vardır. 1 mol atom içermesi için molekülün 0.5 mol olması gerekir.",
      points: 20
    },
    {
      id: "t4_q3",
      type: "true-false",
      topic: "Hacim-Mol",
      question: "NKA'da 22.4 litre hacim kaplayan her gaz 1 moldür.",
      answer: true,
      explanation: "Normal Koşullar Altında (0 °C, 1 atm) 1 mol ideal gaz 22.4 L hacim kaplar.",
      points: 10
    },
    {
      id: "t4_q4",
      type: "multiple-choice",
      topic: "Mol Kütlesi",
      question: "C3H8 bileşiğinin mol kütlesi kaçtır? (C:12, H:1)",
      options: ["36", "40", "44", "48"],
      answer: 2,
      explanation: "(3 * 12) + (8 * 1) = 36 + 8 = 44 g/mol.",
      points: 15
    }
  ],
  "konu5": [
    {
      id: "t5_q1",
      type: "multiple-choice",
      topic: "Gaz Yasaları",
      question: "P . V = n . R . T denklemindeki R nedir?",
      options: ["Basınç sabiti", "İdeal gaz sabiti", "Hacim katsayısı", "Sıcaklık derecesi"],
      answer: 1,
      explanation: "R, ideal gaz sabitidir (0.082 veya 22.4/273).",
      points: 10
    },
    {
      id: "t5_q2",
      type: "true-false",
      topic: "Kinetik Teori",
      question: "Aynı sıcaklıktaki tüm gazların ortalama kinetik enerjileri eşittir.",
      answer: true,
      explanation: "Ortalama kinetik enerji sadece mutlak sıcaklığa (Kelvin) bağlıdır.",
      points: 15
    },
    {
      id: "t5_q3",
      type: "multiple-choice",
      topic: "Sıcaklık Dönüşümü",
      question: "27 °C kaç Kelvin'dir?",
      options: ["0 K", "273 K", "300 K", "246 K"],
      answer: 2,
      explanation: "K = C + 273. 27 + 273 = 300 K.",
      points: 10
    },
    {
      id: "t5_q4",
      type: "matching",
      topic: "Gaz Yasaları",
      question: "Gaz yasalarını açıklamalarıyla eşleştiriniz.",
      options: ["Boyle Yasası", "Charles Yasası", "Gay-Lussac Yasası", "Avogadro Yasası"],
      answer: "P-V ilişkisi, V-T ilişkisi, P-T ilişkisi, V-n ilişkisi",
      explanation: "Boyle: Basınç-Hacim, Charles: Hacim-Sıcaklık, Gay-Lussac: Basınç-Sıcaklık, Avogadro: Hacim-Mol sayısı.",
      points: 25
    },
    {
      id: "t5_q5",
      type: "fill-in-the-blank",
      topic: "Gazlar",
      question: "Gazların birbiri içinde dağılması olayına ......... denir.",
      answer: "difüzyon",
      explanation: "Gaz taneciklerinin gelişigüzel hareketi sonucu birbiri içinde yayılmasına difüzyon denir.",
      points: 10
    }
  ],
  "matching_section": [
    {
      id: "m1_q1",
      type: "matching",
      topic: "Semboller ve Adlar",
      question: "Aşağıdaki element sembollerini adlarıyla eşleştiriniz.",
      options: ["Na", "Fe", "Cu", "Ag"],
      answer: "Sodyum, Demir, Bakır, Gümüş",
      explanation: "Na: Sodyum, Fe: Demir, Cu: Bakır, Ag: Gümüş.",
      points: 20
    }
  ],
  "konu6": [
    {
      id: "t6_q1",
      type: "multiple-choice",
      topic: "Sıvı Çözeltiler",
      question: "Derişim birimi olan 'Molarite'nin tanımı nedir?",
      options: ["1 kg çözücüdeki mol sayısı", "1 L çözeltideki mol sayısı", "100 g çözeltideki çözünen kütlesi", "Çözünen mol sayısı / Toplam mol sayısı"],
      answer: 1,
      explanation: "Molarite (M), 1 litre çözeltide çözünmüş olan maddenin mol sayısıdır.",
      points: 15
    },
    {
      id: "t6_q2",
      type: "true-false",
      topic: "Çözünürlük",
      question: "Sıcaklık arttıkça tüm katıların sudaki çözünürlüğü artar.",
      answer: false,
      explanation: "Bazı katıların çözünmesi ekzotermiktir ve sıcaklık arttıkça çözünürlükleri azalabilir.",
      points: 10
    }
  ]
};

