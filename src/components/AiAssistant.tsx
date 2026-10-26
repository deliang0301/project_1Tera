import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { 
  Bot, Send, Sparkles, Copy, Check, RotateCcw, HelpCircle, 
  Lightbulb, Zap, Sun, Wind, Battery, Droplets, Cpu, ArrowRight 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AiAssistantProps {
  currentUser?: UserProfile | null;
  onNavigateToTab?: (tab: any) => void;
}

const PRESET_QUESTIONS = [
  {
    icon: Sun,
    category: 'Fotovoltaik',
    prompt: 'Jelaskan cara kerja kristal perovskit pada sel surya tandem dan mengapa efisiensinya bisa menembus di atas 30%?'
  },
  {
    icon: Wind,
    category: 'Angin Samudra',
    prompt: 'Mengapa turbin angin terapung dibangun di laut dalam (>60m) dan bagaimana anjungan apungnya bisa tetap tegak stabil?'
  },
  {
    icon: Battery,
    category: 'Baterai & Sodium',
    prompt: 'Apa perbedaan utama baterai solid-state dan sodium-ion dengan baterai litium smartphone saat ini?'
  },
  {
    icon: Droplets,
    category: 'Hidrogen Hijau',
    prompt: 'Bagaimana proses elektrolisis menghasilkan hidrogen hijau dan mengapa disebut Power-to-X untuk dekarbonisasi?'
  },
  {
    icon: Cpu,
    category: 'Smart Grid AI',
    prompt: 'Bagaimana algoritma AI menyeimbangkan frekuensi jaringan 50 Hz dalam hitungan milidetik saat awan mendung datang?'
  },
  {
    icon: Zap,
    category: 'Kalkulasi Praktis',
    prompt: 'Jika tagihan listrik rumah saya Rp 750.000 per bulan, berapa kWp panel surya dan estimasi penghematannya?'
  }
];

export const AiAssistant: React.FC<AiAssistantProps> = ({ currentUser, onNavigateToTab }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg_initial',
        role: 'model',
        text: `Halo ${currentUser ? currentUser.name : 'Sobat EBT'}! Saya adalah **Bantu AI DeLiangTerra** ⚡\n\nSaya siap membantu Anda mendalami konsep ilmiah energi masa depan, menghitung potensi panel surya rumah, konsultasi rangkaian DIY, hingga strategi stabilitas grid.\n\nSilakan pilih salah satu pertanyaan cepat di bawah atau ketik pertanyaan ilmiah Anda!`,
        timestamp: 'Baru saja'
      }
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || inputPrompt).trim();
    if (!question || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      // Build history for context
      const historyPayload = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error('Gagal menghubungi asisten AI');
      }

      const data = await res.json();
      const replyText = data.reply || 'Maaf, saya belum dapat memproses jawaban saat ini. Silakan coba lagi.';

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `bot_err_${Date.now()}`,
        role: 'model',
        text: `Maaf, terjadi kendala saat memproses respons (${err.message || 'Koneksi error'}). Silakan periksa kembali pesan Anda.`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg_init_${Date.now()}`,
        role: 'model',
        text: `Percakapan telah direset. Silakan tanyakan hal apa pun seputar sains energi baru dan terbarukan!`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header with Yellow-Silver Gradient title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-3">
          <Bot className="w-4 h-4 text-amber-400" />
          <span>BANTU AI DELIANGTERRA</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-silver tracking-tight">
          Asisten Cerdas Sains & Konsultasi EBT
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
          Tanyakan apa saja seputar fotovoltaik perovskit, turbin laut dalam, hidrogen hijau, baterai sodium, hingga kalkulasi penghematan atap rumah Anda.
        </p>
      </div>

      {/* Main 2-Column Chat Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Chat Stream */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col h-[680px]">
          {/* Chat Top bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-semibold text-slate-200">Sesi Konsultasi Aktif</span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] font-mono text-amber-300">Model Gemini 3.8 Flash</span>
            </div>

            <button
              onClick={handleResetChat}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Reset Chat"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Bersihkan</span>
            </button>
          </div>

          {/* Messages scroll box */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 font-bold ${
                    isUser
                      ? 'bg-amber-400 text-slate-950 font-display'
                      : 'bg-slate-800 border border-amber-400/40 text-amber-400 shadow-md'
                  }`}>
                    {isUser ? (currentUser?.avatarInitials || 'YOU') : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed transition-all ${
                    isUser
                      ? 'bg-amber-400/15 border border-amber-400/40 text-yellow-100 rounded-tr-none'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                  }`}>
                    <div className="whitespace-pre-wrap space-y-2">
                      {msg.text}
                    </div>

                    {/* Metadata & Copy action */}
                    <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="hover:text-amber-300 flex items-center gap-1 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-amber-400" />
                              <span className="text-amber-400">Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl rounded-tl-none p-4 text-xs text-amber-300 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Bantu AI sedang menganalisis literasi sains & merumuskan penjelasan...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="pt-3 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Tanyakan konsep ilmiah, rumus, atau konsultasi proyek EBT..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-yellow-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputPrompt.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">Kirim</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (4 cols): Quick Questions & Recommended Modules */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Prompts */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Pertanyaan Populer (Klik Cepat):</span>
            </div>

            <div className="space-y-2">
              {PRESET_QUESTIONS.map((q, idx) => {
                const IconComponent = q.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q.prompt)}
                    className="w-full text-left p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-400/60 transition-all text-xs group flex items-start gap-2.5"
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-mono text-amber-400 font-semibold uppercase">
                        {q.category}
                      </div>
                      <div className="text-slate-300 group-hover:text-yellow-200 transition-colors line-clamp-2 mt-0.5">
                        {q.prompt}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shortcut Card to Interactive Tools */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Eksplorasi Lab & Game DeLiangTerra</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Setelah berkonsultasi dengan AI, Anda dapat menguji langsung teori daya di simulator lab atau game Grid Master.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => onNavigateToTab && onNavigateToTab('pengetahuan')}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-amber-400/50 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span>Buka Sandbox Pengetahuan</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                onClick={() => onNavigateToTab && onNavigateToTab('game')}
                className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span>Uji di Grid Master Kota</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
