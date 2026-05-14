

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, User, Loader2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useParams } from 'react-router-dom';
import { useCurriculum } from '../contexts/CurriculumContext';
import { exercises } from '../data/exercises';
import { collection, query, where, orderBy, getDocs, addDoc, deleteDoc, doc, serverTimestamp, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

const MODEL_NAME = "gemini-3-flash-preview";

export function AIAssistant() {
  const { userProfile, awardBadge } = useAuth();
  const { konular } = useCurriculum();
  const location = useLocation();
  const params = useParams();
  
  const [activeExerciseThemeId, setActiveExerciseThemeId] = useState<string | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (!userProfile?.uid) return;

    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, 'chats'),
          where('userId', '==', userProfile.uid),
          limit(50) 
        );
        const querySnapshot = await getDocs(q);
        const loadedMessages = querySnapshot.docs
          .map(doc => ({
            role: doc.data().role as 'user' | 'model',
            content: doc.data().content,
            timestamp: doc.data().timestamp?.toDate() || new Date(0)
          }))
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
          .map(({ role, content }) => ({ role, content }));
        setMessages(loadedMessages);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'chats');
      }
    };

    fetchMessages();
  }, [userProfile?.uid]);

  
  const suggestions = useMemo(() => {
    const path = location.pathname;
    
    if (path === '/exercises') {
      return [
        "1. soruyu açıkla",
        "Bu konuyla ilgili ipucu ver",
        "Hangi konular sınavda çıkar?",
        "Yanlışlarımı nasıl düzeltirim?"
      ];
    }
    
    if (path.startsWith('/module/')) {
      return [
        "Bu konuyu özetle",
        "Bu konuyla ilgili soru sor",
        "Önemli terimleri açıkla",
        "Bu konunun günlük hayattaki yeri ne?"
      ];
    }

    if (path === '/lab') {
      return [
        "Sanal lab nasıl kullanılır?",
        "Deney adımlarını anlat",
        "Güvenlik kuralları nelerdir?",
        "Hangi araçlar mevcut?"
      ];
    }

    if (path === '/map') {
      return [
        "Sıradaki modül hangisi?",
        "Nasıl rozet kazanırım?",
        "İlerlememi nasıl görürüm?",
        "Zorluk seviyeleri nasıl?"
      ];
    }

    return [
      "Mol kavramı nedir?",
      "Kimyasal tepkimeler nelerdir?",
      "Nasıl puan toplarım?",
      "Platformda neler yapabilirim?"
    ];
  }, [location.pathname]);

  
  useEffect(() => {
    const handleThemeChange = (e: any) => {
      setActiveExerciseThemeId(e.detail.themeId);
    };
    window.addEventListener('exercise-theme-changed', handleThemeChange);
    
    
    if (location.pathname === '/exercises') {
      const stored = localStorage.getItem('active-exercise-theme');
      if (stored) setActiveExerciseThemeId(stored);
    }

    return () => window.removeEventListener('exercise-theme-changed', handleThemeChange);
  }, [location.pathname]);

  const ai = useMemo(() => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is missing. AI Assistant will not function.");
    }
    return new GoogleGenAI({ apiKey: key || '' });
  }, []);

  
  const pageContext = useMemo(() => {
    const path = location.pathname;
    
    let detailedContext = "";

    if (path === '/') detailedContext = "Ana sayfa. ReaksiyonLab'ın genel tanıtımı.";
    else if (path === '/login') detailedContext = "Giriş sayfası.";
    else if (path === '/register') detailedContext = "Kayıt sayfası.";
    else if (path === '/dashboard') detailedContext = "Öğrenci paneli. Rozetler: " + (userProfile?.badges?.join(', ') || 'Yok') + ". Puan: " + (userProfile?.totalScore || 0);
    else if (path === '/map') detailedContext = "Başarı Haritası (Müfredat yolu).";
    else if (path === '/lectures') detailedContext = "Konu Anlatımları listesi.";
    else if (path === '/games') detailedContext = "Eğitici Oyunlar listesi.";
    else if (path === '/admin') detailedContext = "Yönetici paneli.";
    else if (path === '/references') detailedContext = "Kaynakça.";
    else if (path === '/lab') detailedContext = "Sanal Laboratuvar. Kimya deneyleri odası.";
    else if (path === '/poster') detailedContext = "Proje Posteri sayfası.";
    
    
    if (path === '/exercises') {
      const activeThemeId = activeExerciseThemeId || localStorage.getItem('active-exercise-theme') || (konular.length > 0 ? konular[0].id : null);
      
      let allExercisesStr = "";
      const currentKonu = konular.find(k => k.id === activeThemeId);
      
      if (activeThemeId && exercises[activeThemeId]) {
        const qList = exercises[activeThemeId];
        allExercisesStr = `ŞU AN GÖRÜNTÜLENEN KONU: ${currentKonu?.title || activeThemeId}\n${qList.map((q, i) => `${i+1}. Soru: ${q.question}\n   Seçenekler: ${q.options?.join(', ')}\n   Cevap: ${q.answer}\n   Açıklama: ${q.explanation}`).join('\n')}`;
      } else {
        
        allExercisesStr = Object.entries(exercises).map(([konuId, qList]) => {
          const konu = konular.find(k => k.id === konuId);
          return `KONU: ${konu?.title || konuId}\n${qList.map((q, i) => `${i+1}. Soru: ${q.question}\n   Seçenekler: ${q.options?.join(', ')}\n   Cevap: ${q.answer}\n   Açıklama: ${q.explanation}`).join('\n')}`;
        }).join('\n\n');
      }

      detailedContext = `Soru Bankası sayfası. 
      Kullanıcı şu an "${currentKonu?.title || activeThemeId}" konusunu görüntülüyor.
      
      BU KONUDAKİ SORULAR (BURADA ÖNCELİKLİ OLARAK SADECE BU KONUYLA İLGİLEN):
      ${allExercisesStr}`;
    }
    
    
    if (path.startsWith('/module/')) {
      const moduleId = path.split('/').pop();
      let moduleFound = null;
      let konuName = "";
      
      for (const konu of konular) {
        const mod = konu.modules.find(m => m.id === moduleId);
        if (mod) {
          moduleFound = mod;
          konuName = konu.title;
          break;
        }
      }
      
      if (moduleFound) {
        let interactionContext = "";
        
        if (moduleFound.questions) {
          interactionContext += `SORULAR VE CEVAPLARI:\n${moduleFound.questions.map((q, i) => `Soru ${i+1}: ${q.q}\nSeçenekler: ${q.options?.join(', ')}\nDoğru Cevap: ${q.options?.[q.answer] || q.answer}`).join('\n\n')}\n`;
        }
        
        if (moduleFound.moleCalculations) {
          interactionContext += `MOL HESAPLAMA SORULARI:\n${moduleFound.moleCalculations.map(mc => mc.items.map(item => `Soru: ${item.questionText}\nVerilen: ${item.givenValue}\nAçıklama: ${item.explanation}`).join('\n')).join('\n')}\n`;
        }
        
        if (moduleFound.classifications) {
          interactionContext += `SINIFLANDIRMA ETKİNLİĞİ:\n${moduleFound.classifications.map(c => `Başlık: ${c.title}\nİçerik: ${c.items.map(item => `${item.molecule.name} -> Doğru Tip: ${item.correctType}`).join(', ')}`).join('\n')}\n`;
        }

        if (moduleFound.reactions) {
          interactionContext += `TEPKİME DENKLEŞTİRME:\n${moduleFound.reactions.map(r => `Tepkime: ${r.title}\n${r.description}`).join('\n')}\n`;
        }

        const theoryStr = moduleFound.blocks ? 
          `SAYFA İÇERİĞİ/TEORİ:\n${moduleFound.blocks.filter(b => b.type === 'text').map(b => b.text).join('\n')}` : 
          "";

        detailedContext = `Kullanıcı şu an "${konuName}" konusu altındaki "${moduleFound.title}" modülünde.
        Modül Türü: ${moduleFound.type}
        
        ${theoryStr}
        
        ${interactionContext}
        
        NOT: Eğer kullanıcı bu sayfadaki soruları çözmekte zorlanıyorsa, ona cevabı direkt söylemek yerine ipucu vererek yönlendir.`;
      }
    }
    
    return detailedContext || "Bilinmeyen sayfa.";
  }, [location.pathname, konular, userProfile, activeExerciseThemeId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const userMessage = text || input.trim();
    if (!userMessage || isLoading) return;
    
    if (!process.env.GEMINI_API_KEY) {
      setMessages(prev => [...prev, { role: 'model', content: "Hata: API anahtarı eksik. Bu özellik şu an kullanılamıyor." }]);
      return;
    }

    if (!text) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    
    if (userProfile?.uid) {
      try {
        await addDoc(collection(db, 'chats'), {
          userId: userProfile.uid,
          role: 'user',
          content: userMessage,
          timestamp: serverTimestamp()
        });

        
        if (userProfile.badges && !userProfile.badges.includes('ai_explorer')) {
           awardBadge('ai_explorer');
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'chats');
      }
    }

    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: [...messages, { role: 'user', content: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `
            Sen ReaksiyonLab platformunun uzman kimya asistanısın. 
            Görevin öğrencilere 10. sınıf kimya konularında yardımcı olmaktır.
            
            MEVCUT SAYFA BİLGİSİ:
            Kullanıcı şu an ReaksiyonLab'ın şu bölümünde:
            ---
            ${pageContext}
            ---
            
            ÖNEMLİ: Eğer kullanıcı "1. soruyu çöz" gibi genel bir istekte bulunursa, YUKARIDAKİ "ŞU AN GÖRÜNTÜLENEN KONU" veya "SAYFADAKİ SORULAR" bölümündeki ilk soruyu baz al. Başka konulardan bahsetme.
            
            YAZIM VE FORMAT KURALLARI (KRİTİK):
            1. KESİNLİKLE "$" veya "$$" gibi LaTeX matematik işaretleri kullanma.
            2. Kimyasal formülleri H2O, CO2, CaCO3 şeklinde DÜZ METİN olarak yaz.
            3. Matematiksel işlemleri düz metin veya unicode karakterlerle yaz (örneğin: P*V = n*R*T veya P·V = n·R·T).
            4. Markdown başlıkları (#, ##) ve listeleri kullanabilirsin ama karmaşık sembollerden kaçın.
            
            TEMEL KURALLAR:
            1. Yanıtlarını 10. sınıf seviyesinde, anlaşılır ve eğitici tut.
            2. Eğer bir soru çözülüyorsa, cevabı PAT diye söylemek yerine, öğrenciyi düşünmeye sevk edecek ipuçları ver. Ancak ısrar ederse veya açıklamalı çözüm isterse tam çözümü yap.
            3. Maarif Müfredatına (Türkiye) sadık kal.
            
            GÜVENLİK VE ETİK:
            - Kesinlikle uygunsuz, +18, şiddet veya nefret söylemi içeren konulara girme.
            - Kullanıcının şahsi verilerini isteme.
            
            Kullanıcı: ${userProfile?.displayName || 'Öğrenci'}
          `,
          temperature: 0.7,
        },
      });

      const aiResponse = response.text || "Üzgünüm, bir hata oluştu ve yanıt oluşturulamadı.";
      setMessages(prev => [...prev, { role: 'model', content: aiResponse }]);

      
      if (userProfile?.uid) {
        try {
          await addDoc(collection(db, 'chats'), {
            userId: userProfile.uid,
            role: 'model',
            content: aiResponse,
            timestamp: serverTimestamp()
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, 'chats');
        }
      }
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      let errorMsg = "Bir hata oluştu. Lütfen tekrar deneyin.";
      if (error.message?.includes('API_KEY_INVALID')) {
        errorMsg = "Hata: Geçersiz API anahtarı.";
      } else if (error.message?.includes('QUOTA_EXCEEDED')) {
        errorMsg = "Hata: Çok fazla istek gönderildi. Lütfen biraz bekleyin.";
      }
      setMessages(prev => [...prev, { role: 'model', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    if (!userProfile?.uid) {
      setMessages([]);
      return;
    }

    if (!confirm("Sohbet geçmişini silmek istediğinizden emin misiniz?")) return;

    setIsLoading(true);
    try {
      const q = query(collection(db, 'chats'), where('userId', '==', userProfile.uid));
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map(d => deleteDoc(doc(db, 'chats', d.id)));
      await Promise.all(deletePromises);
      setMessages([]);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'chats');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[400px] max-w-[calc(100vw-2rem)] h-[500px] glass-card flex flex-col shadow-2xl overflow-hidden border-cyan-500/30"
          >
            {}
            <div className="p-4 bg-gradient-to-r from-indigo-900 to-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <Bot className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-none">Kimya Asistanı</h3>
                  <span className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">Yapay Zeka Destekli</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    disabled={isLoading}
                    title="Sohbeti Temizle"
                    className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors disabled:opacity-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            >
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-400 text-sm px-8 mb-4">
                    Merhaba! Ben Kimya Asistanıyım. Mol kavramı, tepkime türleri veya asit-bazlar hakkında sorularını sorabilirsin.
                  </p>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-2 mx-8">
                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                      {location.pathname === '/exercises' 
                        ? `Konu: ${konular.find(k => k.id === (activeExerciseThemeId || konular[0]?.id))?.title?.split(':')?.[1]?.trim() || 'Soru Bankası'}` 
                        : 'Sayfa içeriği analiz edildi'}
                    </p>
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border ${
                      msg.role === 'user' 
                        ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400' 
                        : 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed markdown-body ${
                      msg.role === 'user' 
                        ? 'bg-indigo-500/10 text-slate-100 rounded-tr-none' 
                        : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-white/5'
                    }`}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center text-slate-500 text-xs pl-10">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Asistan yazıyor...
                  </div>
                </div>
              )}
            </div>

            {}
            <div className="p-4 border-t border-white/10 bg-black/20 space-y-4">
              {}
              {messages.length < 8 && (
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      disabled={isLoading}
                      className="text-[11px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full transition-all whitespace-nowrap disabled:opacity-50 shrink-0"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Bir soru sor..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-white/20 relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="close" className="w-7 h-7" />
          ) : (
            <MessageSquare key="open" className="w-7 h-7" />
          )}
        </AnimatePresence>
        {}
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg group-hover:bg-cyan-400/30 transition-all -z-10" />
      </motion.button>
    </div>
  );
}
