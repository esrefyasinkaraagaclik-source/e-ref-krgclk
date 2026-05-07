const fs = require('fs');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateQuestionsForTopic(topic, count) {
  let pools = {};
  
  pools['t1'] = [
    { q: "Kağıdın yırtılması ne tür bir değişimdir?", a: "Fiziksel", w: ["Kimyasal", "Nükleer", "Biyolojik"] },
    { q: "Demirin paslanması ne tür bir değişimdir?", a: "Kimyasal", w: ["Fiziksel", "Nükleer", "Hal Değişimi"] },
    { q: "Suyun donması hangi değişime örnektir?", a: "Fiziksel", w: ["Kimyasal", "Nükleer", "Bozunma"] },
    { q: "Ekmeğin sindirilmesi ne tür bir değişimdir?", a: "Kimyasal", w: ["Fiziksel", "Mekanik", "Hal Değişimi"] },
    { q: "Camın kırılması hangi değişime girer?", a: "Fiziksel", w: ["Kimyasal", "Biyolojik", "Plazmatik"] },
    { q: "Elmanın çürümesi ne tür bir değişimdir?", a: "Kimyasal", w: ["Fiziksel", "Mekanik", "Yüzeysel"] },
    { q: "Odunun yanması hangi değişime bir örnektir?", a: "Kimyasal", w: ["Fiziksel", "Hücresel", "Bozunma"] },
    { q: "Gümüşün kararması ne tür bir değişimdir?", a: "Kimyasal", w: ["Fiziksel", "Fizikokimyasal", "Biyolojik"] },
    { q: "Mumun erimesi ne tür bir değişimdir?", a: "Fiziksel", w: ["Kimyasal", "Nükleer", "Bozunma"] },
    { q: "Hamurun mayalanması hangi değişime örnektir?", a: "Kimyasal", w: ["Fiziksel", "Hal Değişimi", "Mekanik"] },
    { q: "Tuzun suda çözünmesi genel olarak ne tür değişime örnektir?", a: "Fiziksel", w: ["Kimyasal", "Parçalanma", "Nükleer"] },
    { q: "Sütün ekşimesi ne tür bir değişimdir?", a: "Kimyasal", w: ["Fiziksel", "Pıhtılaşma", "Buharlaşma"] },
    { q: "Yemeğin pişmesi hangi değişime girer?", a: "Kimyasal", w: ["Fiziksel", "Isısal", "Termik"] },
    { q: "Saçın kesilmesi ne tür bir değişimdir?", a: "Fiziksel", w: ["Kimyasal", "Biyolojik", "Genetik"] },
    { q: "Patatesin soyulması hangi değişime örnektir?", a: "Fiziksel", w: ["Kimyasal", "Botanik", "Enzimatik"] },
    { q: "Yoğurttan ayran yapılması ne tür bir değişimdir?", a: "Fiziksel", w: ["Kimyasal", "Biyolojik", "Mayalanma"] },
    { q: "Kömürün toz haline getirilmesi hangi değişime örnektir?", a: "Fiziksel", w: ["Kimyasal", "Yanma", "Mekanik-Kimyasal"] },
    { q: "Fotosentez olayı ne tür bir değişimdir?", a: "Kimyasal", w: ["Fiziksel", "Sadece Biyolojik", "Optik"] },
    { q: "Şekerin çayda çözünmesi ne tür bir değişimdir?", a: "Fiziksel", w: ["Kimyasal", "Karışım-Kimyasal", "Enzimatik"] },
    { q: "Zeytinyağı ve suyun emülsiyonu nasıl bir süreçtir?", a: "Fiziksel", w: ["Kimyasal", "Biyolojik", "Tepkime"] },
    { q: "Demirin tel ve levha haline getirilmesi hangi değişimdir?", a: "Fiziksel", w: ["Kimyasal", "Metalik", "Nükleer"] },
    { q: "Yaprağın sararması ne tür bir değişimdir?", a: "Kimyasal", w: ["Fiziksel", "Mekanik", "Çözünme"] }
  ];

  pools['t2'] = [
    { q: "Hangi hal belirli bir hacme ve şekle sahiptir?", a: "Katı", w: ["Sıvı", "Gaz", "Plazma"] },
    { q: "Akışkan olup belirli hacmi olan ancak belirli şekli olmayan hal?", a: "Sıvı", w: ["Katı", "Gaz", "Plazma"] },
    { q: "Bulundukları kabı tamamen dolduran ve sıkıştırılabilen hal hangisidir?", a: "Gaz", w: ["Katı", "Sıvı", "Süper Akışkan"] },
    { q: "İyonize olmuş gaz olarak da bilinen maddenin dördüncü hali nedir?", a: "Plazma", w: ["Buhar", "Sıvı", "Katı"] },
    { q: "Buzun suya dönüşmesi olayının adı nedir?", a: "Erime", w: ["Donma", "Buharlaşma", "Süblimleşme"] },
    { q: "Suyun su buharına dönüşmesi olayının adı nedir?", a: "Buharlaşma", w: ["Kaynama", "Erime", "Yoğuşma"] },
    { q: "Gaz halden sıvı hale geçişe ne denir?", a: "Yoğuşma", w: ["Buharlaşma", "Erime", "Kırağılaşma"] },
    { q: "Sıvı halden katı hale geçişe ne denir?", a: "Donma", w: ["Erime", "Süblimleşme", "Depozisyon"] },
    { q: "Katıdan doğrudan gaz haline geçiş olayına ne ad verilir?", a: "Süblimleşme", w: ["Erime", "Buharlaşma", "Kırağılaşma"] },
    { q: "Gazdan doğrudan katı hale geçişe ne ad verilir?", a: "Kırağılaşma", w: ["Süblimleşme", "Yoğuşma", "Donma"] },
    { q: "Güneş'in ve yıldızların büyük kısmı maddenin hangi halindedir?", a: "Plazma", w: ["Gaz", "Sıvı", "Katı"] },
    { q: "Ateş alevi genellikle maddenin hangi haline örnektir?", a: "Plazma", w: ["Gaz", "Katı", "Kimyasal"] },
    { q: "Maddenin en düzensiz olduğu hal (plazma hariç) hangisidir?", a: "Gaz", w: ["Katı", "Sıvı", "Süper katı"] },
    { q: "Cam hangi tür katıya bir örnektir?", a: "Amorf Katı", w: ["Kristal Katı", "Moleküler Katı", "Ağ Örgülü"] },
    { q: "Elmas ve grafit ne tür bir kristal katıdır?", a: "Kovalent Katı", w: ["Metalik Katı", "İyonik Katı", "Moleküler Katı"] },
    { q: "Sofra tuzu (NaCl) hangi tür katı örneğidir?", a: "İyonik Katı", w: ["Kovalent Katı", "Moleküler Katı", "Amorf Katı"] },
    { q: "Su (Buz) hangi tür kristal katıdır?", a: "Moleküler Katı", w: ["İyonik Katı", "Kovalent Katı", "Metalik Katı"] },
    { q: "Demir ve bakır hangi tür katıdır?", a: "Metalik Katı", w: ["Kovalent Katı", "Amorf Katı", "İyonik Katı"] },
    { q: "Suyun kaynama noktası kaç derecedir (saf, 1 atm)?", a: "100°C", w: ["0°C", "50°C", "212°C"] },
    { q: "Sıvıların yüzey alanı arttıkça buharlaşma hızı nasıl değişir?", a: "Artar", w: ["Azalır", "Değişmez", "Önce artar sonra azalır"] }
  ];

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
    { q: "Metalin asitle verdiği tepkime sonucunda genellikle hangi gaz çıkar?", a: "H2 (Hidrojen)", w: ["O2 (Oksijen)", "CO2", "NO2"] },
    { q: "Bir kimyasal denklemi denkleştirirken ne tür sayılar formüllerin başına yazılır?", a: "Katsayı", w: ["Alt İndis", "Üst İndis", "Yük"] },
    { q: "Tepkime okunun solundaki maddelere ne ad verilir?", a: "Girenler", w: ["Ürünler", "Meydana Gelenler", "Sonuçlar"] },
    { q: "Endotermik tepkimeler gerçekleşirken ortamdan ne alırlar?", a: "Isı", w: ["Basınç", "Işık", "Kütle"] },
    { q: "Fotosentez gerçekleşirken enerji olarak güneş ışığı alınır. Bu nedenle...", a: "Endotermiktir", w: ["Ekzotermiktir", "Yanmadır", "Bozunmadır"] },
    { q: "Lavoisier hangi kanunu bulmuştur?", a: "Kütlenin Korunumu", w: ["Katlı Oranlar", "Sabit Oranlar", "Avogadro Yasası"] }
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
    { q: "1 mol NaCl'de kaç tane Na iyonu vardır?", a: "6.02x10^23", w: ["1", "2", "Yarım avogadro"] },
    { q: "Gerçek atom kütlesi ne anlama gelir?", a: "1 tane atomun kütlesi", w: ["1 molün kütlesi", "Bağıl atom kütlesi", "Toplam kütle"] },
    { q: "Bağıl atom kütlesi bulunurken hangi izotop referans alınmıştır?", a: "Karbon-12", w: ["Hidrojen-1", "Oksijen-16", "Azot-14"] },
    { q: "1 amu (akb) Karbon-12 kütlesinin kaçta kaçıdır?", a: "1/12'si", w: ["1/6'sı", "Tamamı", "2 katı"] },
    { q: "88 gram CO2 kaç moldür (C:12, O:16)?", a: "2 mol", w: ["1.5 mol", "1 mol", "0.5 mol"] },
    { q: "0.1 mol glikoz (C6H12O6) içeriğinde kaç mol C atomu vardır?", a: "0.6 mol", w: ["6 mol", "1.2 mol", "0.1 mol"] },
    { q: "5 mol H2O formülünde toplam kaç mol atom içerir?", a: "15 mol", w: ["5 mol", "10 mol", "3 mol"] }
  ];

  pools['t5'] = [
    { q: "Sabit sıcaklıkta basınç ile hacim ters orantılıdır diyen yasa?", a: "Boyle Yasası", w: ["Charles Yasası", "Avogadro Yasası", "Gay-Lussac"] },
    { q: "Sabit basınçta hacmin mutlak sıcaklıkla doğru orantılı olduğunu söyleyen yasa?", a: "Charles Yasası", w: ["Boyle Yasası", "Dalton Yasası", "Graham"] },
    { q: "Sabit hacimde basınç ve sıcaklık (Kelvin) doğru orantılıdır diyen yasa?", a: "Gay-Lussac Yasası", w: ["Avogadro Yasası", "Boyle Yasası", "Hes Yasası"] },
    { q: "Eşit hacimlerde aynı P ve T altında bulunan gazların nesi aynıdır?", a: "Mol sayıları", w: ["Kütleleri", "Özkütleleri", "Hızları"] },
    { q: "P.V = n.R.T denklemine ne ad verilir?", a: "İdeal Gaz Denklemi", w: ["Kısmi Basınç", "Graham Difüzyon", "Van der Waals"] },
    { q: "İdeal gaz denklemindeki R sabiti (atm.L / mol.K cinsi) nedir?", a: "22.4 / 273", w: ["8.314", "1", "0.082 L/mol°C"] },
    { q: "Gazların yayılması olayına (difüzyon) ilişkin yasayı kim bulmuştur?", a: "Graham", w: ["Dalton", "Boyle", "Avogadro"] },
    { q: "Hafif gaz molekülleri ağır gaz moleküllerine göre nasıl hareket eder?", a: "Daha hızlı", w: ["Daha yavaş", "Aynı hızda", "Aralarında fark yoktur"] },
    { q: "Gaz moleküllerinin hızları mutlak sıcaklığın (Kelvin) nesiyle orantılıdır?", a: "Kareköküyle", w: ["Karesiyle", "Kendisiyle", "Küpüyle"] },
    { q: "Dalton'un Kısmi Basınçlar Yasasına göre toplam basınç neye eşittir?", a: "Kısmi basınçlar toplamına", w: ["Hacimler toplamına", "Sıcaklığa", "Mol çarpımına"] },
    { q: "Gaz taneciklerinin enerjisini ve hareketliliğini açıklayan teori nedir?", a: "Kinetik Teori", w: ["Atomik Teori", "Bağ Teorisi", "Gaz yasaları"] },
    { q: "0 Santigrat kaç Kelvin'dir?", a: "273 K", w: ["0 K", "100 K", "-273 K"] },
    { q: "Bütün molekül hareketlerinin durduğu varsayılan 0 K sıcaklığa ne denir?", a: "Mutlak Sıfır", w: ["Donma Noktası", "Kritik Sıcaklık", "Eksi Bir Nokta"] },
    { q: "İdeal olmayan ve doğada bulunan gazlara ne denir?", a: "Gerçek Gazlar", w: ["Asal Gazlar", "Süper Gazlar", "Plazma"] },
    { q: "Gerçek bir gazı ideal gaza yaklaştırmak için sıcaklık ve basınç nasıl olmalı?", a: "Yüksek Sıcaklık - Düşük Basınç", w: ["Düşük Sıcaklık - Düşük Basınç", "Yüksek Basınç - Düşük Sıcaklık", "Yüksek Basınç - Yüksek Sıcaklık"] },
    { q: "Gaz tanecikleri arasındaki esnek çarpışmalarda ne korunur?", a: "Toplam Kinetik Enerji", w: ["Yörünge Yarıçapı", "Bağ Enerjisi", "Sıcaklık"] },
    { q: "Bir gazın sıvılaştırılamadığı sınırı belirleyen en yüksek sıcaklık nedir?", a: "Kritik Sıcaklık", w: ["Kaynama Noktası", "Kırağı Noktası", "Süblimleşme Noktası"] },
    { q: "Gaz moleküllerinin küçük bir delikten boşluğa yayılmasına ne denir?", a: "Efüzyon", w: ["Difüzyon", "Süblimleşme", "Konveksiyon"] },
    { q: "0 °C, 22.4 L hacimde ve 1 atm basınçta ideal gaz kaç moldür?", a: "1 mol", w: ["0.5 mol", "2 mol", "0.25 mol"] },
    { q: "Gaz basıncı, taneciklerin kap içerisindeki birim alana yaptığı ne ile açıklanır?", a: "Çarpma Kuvveti", w: ["Ağırlık", "Ses dalgaları", "Atom yarıçapı"] }
  ];

  pools['t6'] = [
    { q: "Sulu çözeltisine H+ veya H3O+ iyonu veren maddeler nedir?", a: "Asit", w: ["Baz", "Tuz", "Hidrat"] },
    { q: "Sulu çözeltisine OH- (hidroksit) iyonu veren maddeler nedir?", a: "Baz", w: ["Asit", "Tuz", "Oksit"] },
    { q: "Tatları ekşi olan maddeler genellikle hangisidir?", a: "Asitler", w: ["Bazlar", "Nötr tuzlar", "Metal oksitler"] },
    { q: "Tatları acı olan ve ele kayganlık hissi veren kimyasallar?", a: "Bazlar", w: ["Asitler", "Tatlandırıcılar", "Proteinler"] },
    { q: "Oda koşullarında pH değeri 7'den büyük olan çözeltiler nasıldır?", a: "Bazik", w: ["Asidik", "Nötr", "Çok Asidik"] },
    { q: "pH = 2 olan bir çözelti nasıldır?", a: "Kuvvetli Asidik", w: ["Zayıf Asidik", "Bazik", "Nötr"] },
    { q: "Suda %100'e yakın iyonlaşan asitlere ne denir?", a: "Kuvvetli Asit", w: ["Zayıf Asit", "Derişik Asit", "Seyreltik Asit"] },
    { q: "pH metrede 7 numarası neyi ifade eder?", a: "Nötr", w: ["Asitlik", "Baziklik", "Bilinmeyen"] },
    { q: "Asit ve bazın tepkimesi sonucu genelde hangi iki madde oluşur?", a: "Tuz ve Su", w: ["Sadece Su", "Asit gazı", "Amonyak"] },
    { q: "Limon suyu hangi gruba girer?", a: "Asit", w: ["Baz", "Tuz", "Nötr"] },
    { q: "Çamaşır suyu (Sodyum hipoklorit) içeren çözeltinin özelliği?", a: "Bazik", w: ["Asidik", "Nötr", "Zayıf Asit"] },
    { q: "Kanın pH'ı (yaklaşık 7.4) nereye düşer?", a: "Hafif Bazik", w: ["Nötr", "Hafif Asidik", "Kuvvetli Asit"] },
    { q: "Eğer bir çözeltide pH=10 ise ortam hakkında ne diyebiliriz?", a: "Baziktir", w: ["Kuvvetli Asittir", "Nötrdür", "Zayıf Asittir"] },
    { q: "Karınca asidi (Formik asit) zayıf mıdır, kuvvetli mi?", a: "Zayıftır", w: ["Kuvvetlidir", "Bilinmez", "Asit değil, bazdır"] },
    { q: "Turnusol kağıdını bazlar hangi renge çevirir?", a: "Mavi", w: ["Kırmızı", "Sarı", "Yeşil"] },
    { q: "Turnusol kağıdını asitler hangi renge çevirir?", a: "Kırmızı", w: ["Mavi", "Mor", "Renksiz"] },
    { q: "Metil oranj asitlerde yaklaşık hangi rengi alır?", a: "Kırmızı / Pembe", w: ["Sarı", "Mavi", "Yeşil"] },
    { q: "Sıvı sabun genel olarak özellik bakımından nedir?", a: "Bazik", w: ["Asidik", "Nötr", "Zehirli"] },
    { q: "Kezzap'ın formülü nedir?", a: "HNO3", w: ["HCl", "H2SO4", "HBr"] },
    { q: "Tuz ruhunun kimyasal adı/formülü nedir?", a: "Hidroklorik Asit (HCl)", w: ["Sülfürik Asit", "Nitrik Asit", "Asetik Asit"] }
  ];

  pools['t7'] = [
    { q: "Birden fazla saf maddenin kimyasal özellikleri değişmeden fiziksel olarak birleşmesi?", a: "Karışım", w: ["Bileşik", "Element", "Molekül"] },
    { q: "Her yerinde aynı özelliği gösteren, tek görünüm fazlı karışımlara ne denir?", a: "Homojen Karışım", w: ["Heterojen Karışım", "Süspansiyon", "Emülsiyon"] },
    { q: "Madde dağılımı her yerde aynı olmayan karışımlara ne denir?", a: "Heterojen Karışım", w: ["Çözelti", "Alaşım", "Kolloid"] },
    { q: "Tuzlu su ne tür bir karışımdır?", a: "Homojen", w: ["Heterojen", "Emülsiyon", "Süspansiyon"] },
    { q: "Zeytinyağı-Su ne tür bir karışımdır?", a: "Heterojen (Emülsiyon)", w: ["Homojen", "Alaşım", "Gaz çözeltisi"] },
    { q: "Bir sıvının içinde katı madde parçacıkları çözünmeden dağılmışsa buna ne denir?", a: "Süspansiyon", w: ["Emülsiyon", "Çözelti", "Kolloid"] },
    { q: "Ayran ve çamurlu su örneği hangi karışımdır?", a: "Süspansiyon", w: ["Çözelti", "Aerosol", "Emülsiyon"] },
    { q: "İki veya daha fazla birbiri içinde çözünmeyen sıvının dağılması? (Sıvı-Sıvı heterojen)", a: "Emülsiyon", w: ["Süspansiyon", "Aerosol", "Alaşım"] },
    { q: "Sis, duman ve spreyler hangi karışıma örnektir?", a: "Aerosol", w: ["Kolloid", "Süspansiyon", "Çözelti"] },
    { q: "Çıplak gözle homojen görünen ancak mikroskopla fazları ayırt edilebilen karışım?", a: "Kolloid", w: ["Basit Karışım", "Çözelti", "Süspansiyon"] },
    { q: "Metallerin eritilip karıştırılmasıyla oluşan katı-katı çözeltilerine ne denir?", a: "Alaşım", w: ["Kompozit", "Emülsiyon", "Polimer"] },
    { q: "Kum ve çakıl karışımı hangi tür karışımdır?", a: "Basit Karışım", w: ["Aerosol", "Emülsiyon", "Çözelti"] },
    { q: "Bir çözeltide genellikle miktarı daha fazla olan maddeye ne ad verilir?", a: "Çözücü", w: ["Çözünen", "Eriyen", "Süspansiyon"] },
    { q: "Deniz suyu nasıl bir karışımdır?", a: "Homojen", w: ["Heterojen", "Aerosol", "Kolloid"] },
    { q: "Kan hangi karışım türüne örnektir?", a: "Kolloid", w: ["Homojen Çözelti", "Sıvı-Sıvı Emülsiyon", "Gaz Çözeltisi"] },
    { q: "Ayırma hunisi hangi tür karışımları ayırmak için kullanılır?", a: "Sıvı-Sıvı Heterojen", w: ["Katı-Katı homojen", "Sıvı-Gaz homojen", "Aerosol"] },
    { q: "Ayrımsal damıtma, karışımları ayırırken hangi farktan yararlanır?", a: "Kaynama Noktası", w: ["Erime Noktası", "Tanecik Boyutu", "Özkütle"] },
    { q: "Tuzlu suyu buharlaştırarak tuzu dipte toplama yöntemine ne denir?", a: "Buharlaştırma", w: ["Damıtma", "Dekantasyon", "Filtrasyon"] },
    { q: "Demir tozu ve kükürt tozu karışımı en kolay ne ile ayrılır?", a: "Mıknatısla", w: ["Süzmeyle", "Damıtmayla", "Buharlaştırmayla"] },
    { q: "Makarna suyu süzülürken hangi özellik farkından yararlanılır?", a: "Tanecik Boyutu", w: ["Kaynama noktası", "Mıknatıslanma", "Özkütle"] }
  ];

  let raw = pools[topic] || pools['t1'];
  // Shuffle to randomize questions
  raw = shuffle([...raw]);

  let qArray = [];
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
      questionText: `Seviye ${i + 1}: ${qData.q}`,
      options: optsArray
    });
  }
  return qArray;
}

let content = fs.readFileSync('src/data/curriculum.ts', 'utf8');

const mazes = [
  { id: "mg_t1_mz_1", topic: "t1" },
  { id: "mg_t1_mz_2", topic: "t1" },
  { id: "mg_t2_mz_1", topic: "t2" },
  { id: "mg_t2_mz_2", topic: "t2" },
  { id: "mg_t3_mz_1", topic: "t3" },
  { id: "mg_t3_mz_2", topic: "t3" },
  { id: "mg_t4_mz_1", topic: "t4" },
  { id: "mg_t4_mz_2", topic: "t4" },
  { id: "mg_t5_mz_1", topic: "t5" },
  { id: "mg_t5_mz_2", topic: "t5" },
  { id: "mg_t6_mz_1", topic: "t6" },
  { id: "mg_t6_mz_2", topic: "t6" },
  { id: "mg_t7_mz_1", topic: "t7" },
  { id: "mg_t7_mz_2", topic: "t7" }
];

mazes.forEach(m => {
  // Regex that captures everything up to `questions: [` and then ignores what's inside, and captures from the inner array's closing bracket
  // Given we replaced all maze questions with the basic two or []
  
  // Try to find the exact block for this maze
  const searchPattern = new RegExp(`(id:\\s*"${m.id}"[\\s\\S]*?questions:\\s*\\[)[\\s\\S]*?(\\]\\n?\\s*\\}\\s*\\])`);
  
  content = content.replace(searchPattern, (match, prefix, suffix) => {
    let newQs = generateQuestionsForTopic(m.topic, 20);
    let strQs = JSON.stringify(newQs, null, 2);
    // remove the outer brackets from json string
    strQs = strQs.replace(/^\s*\[\s*\n/, '').replace(/\n\s*\]\s*$/, '');
    return prefix + "\n" + strQs + "\n" + suffix;
  });
});

fs.writeFileSync('src/data/curriculum.ts', content);
console.log('Done!');
