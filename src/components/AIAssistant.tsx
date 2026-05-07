/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Bot, User, Loader2, MinusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

const MODEL_NAME = "gemini-3-flash-preview";

export function AIAssistant() {
  const { userProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

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
            
            KRİTİK GÜVENLİK KURALLARI:
            1. KESİNLİKLE +18, yetişkin içerik, müstehcenlik veya cinsellik içeren konularda konuşma.
            2. Eğer kullanıcı bu tarz bir içerik gönderirse, nazikçe ama kesin bir dille bu tür konuların eğitim platformu için uygun olmadığını belirt ve konuyu kimyaya geri çek.
            3. Küfür, hakaret veya saldırgan dile izin verme.
            4. Her zaman profesyonel, yardımsever ve bilimsel bir dil kullan.
            5. Cevaplarını Maarif Müfredatı ile uyumlu tut.
            
            Kullanıcı adı: ${userProfile?.displayName || 'Öğrenci'}
          `,
          temperature: 0.7,
        },
      });

      const aiResponse = response.text || "Üzgünüm, şu an cevap veremiyorum.";
      setMessages(prev => [...prev, { role: 'model', content: aiResponse }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." }]);
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
            {/* Header */}
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
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            >
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                  <p className="text-slate-400 text-sm px-8">
                    Merhaba! Ben Kimya Asistanıyım. Mol kavramı, tepkime türleri veya asit-bazlar hakkında sorularını sorabilirsin.
                  </p>
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
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-indigo-500/10 text-slate-100 rounded-tr-none' 
                        : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-white/5'
                    }`}>
                      {msg.content}
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

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
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
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg group-hover:bg-cyan-400/30 transition-all -z-10" />
      </motion.button>
    </div>
  );
}
