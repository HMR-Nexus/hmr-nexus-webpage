import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Minimize2, ExternalLink } from 'lucide-react';

const API_URL = import.meta.env.VITE_CHAT_API_URL || 'https://hmr-nexus-bot-production.up.railway.app';
const TG_BOT  = 'https://t.me/NexusEngineeringBot';

// Unique session ID per browser tab
const SESSION_ID = Math.random().toString(36).slice(2);

// Rate limiting: max messages per window
const RATE_LIMIT = { maxMessages: 10, windowMs: 60_000 };

interface Message {
  role: 'user' | 'bot';
  text: string;
  ts: number;
}

const QUICK_ACTIONS = [
  { label: '📡 Fibra Óptica',      text: '¿Qué servicios de fibra óptica ofrecen?' },
  { label: '💻 Software',          text: '¿Qué soluciones de software desarrollan?' },
  { label: '📋 Solicitar cotización', text: 'Quiero solicitar una cotización para un proyecto' },
  { label: '📞 Contacto',          text: '¿Cómo puedo contactarlos directamente?' },
];

export function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const sendTimestamps = useRef<number[]>([]);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Greeting on first open
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => {
        setMessages([{
          role: 'bot',
          text: '👋 ¡Hola! Soy el asistente de **Nexus Engineering**.\n\n¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre nuestros servicios de fibra óptica, software, proyectos o ayudarte a solicitar una cotización.',
          ts: Date.now(),
        }]);
      }, 400);
    }
  }, [open, hasGreeted]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    // Rate limiting
    const now = Date.now();
    sendTimestamps.current = sendTimestamps.current.filter(ts => now - ts < RATE_LIMIT.windowMs);
    if (sendTimestamps.current.length >= RATE_LIMIT.maxMessages) {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: 'Has enviado muchos mensajes. Por favor espera un momento antes de continuar.',
        ts: now,
      }]);
      return;
    }
    sendTimestamps.current.push(now);

    const userMsg: Message = { role: 'user', text: text.trim(), ts: now };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), sessionId: SESSION_ID }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = typeof data.reply === 'string'
        ? data.reply.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, '')
        : 'Respuesta no válida.';
      setMessages(prev => [...prev, { role: 'bot', text: reply, ts: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: 'Lo siento, tuve un problema de conexión. Puedes contactarnos directamente en **info@hmr-nexus.com** o vía Telegram.',
        ts: Date.now(),
      }]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderText = useCallback((text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
        {i < lines.length - 1 && <br />}
      </span>
    ));
  }, []);

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            aria-label="Abrir chat con asistente Nexus"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0066ff, #a855f7)' }}
          >
            <Bot className="w-6 h-6 text-white" />
            {/* Ping dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-[#10b981] rounded-full border-2 border-[#050a14]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="widget"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{ height: '520px', background: '#060d18' }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #0066ff22, #a855f722)' }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0066ff, #a855f7)' }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-semibold leading-tight">Nexus Assistant</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span className="text-[#10b981] text-[11px]">En línea · IA</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={TG_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Continuar en Telegram"
                  className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar chat"
                  className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin overscroll-contain">
              {messages.length === 0 && !loading && (
                <div className="text-center text-[#475569] text-xs mt-8">
                  Iniciando conversación...
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.ts}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-white rounded-tr-sm'
                        : 'text-[#cbd5e1] rounded-tl-sm border border-white/[0.06]'
                    }`}
                    style={msg.role === 'user'
                      ? { background: 'linear-gradient(135deg, #0066ff, #0052cc)' }
                      : { background: '#0d1829' }
                    }
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#0d1829] border border-white/[0.06] px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#3d8bff]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick actions — show after greeting, no user messages yet */}
              {messages.length === 1 && !loading && (
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {QUICK_ACTIONS.map(a => (
                    <button
                      key={a.label}
                      onClick={() => sendMessage(a.text)}
                      className="text-left px-3 py-2 rounded-xl text-xs text-[#94a3b8] hover:text-white border border-white/[0.06] hover:border-[#0066ff]/40 hover:bg-[#0066ff]/10 transition-all leading-tight"
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.06] flex-shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                aria-label="Message"
                placeholder="Escribe tu mensaje…"
                disabled={loading}
                autoComplete="off"
                maxLength={500}
                className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white placeholder-[#475569] outline-none focus-visible:border-[#0066ff]/50 transition-colors disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Enviar mensaje"
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #0066ff, #a855f7)' }}
              >
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            </form>

            {/* Footer branding */}
            <div className="text-center text-[#1e2a3a] text-[10px] py-1.5 flex-shrink-0">
              Powered by Nexus Engineering AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
