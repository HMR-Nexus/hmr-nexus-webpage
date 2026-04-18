import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minimize2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_CHAT_API_URL || 'https://hmr-nexus-bot-production.up.railway.app';
const TG_BOT  = 'https://t.me/NexusEngineeringBot';

const RATE_LIMIT = { maxMessages: 10, windowMs: 60_000 };

interface Message {
  role: 'user' | 'bot';
  text: string;
  ts: number;
}

const QUICK_ACTIONS = [
  { label: 'FIBRA ÓPTICA',   text: '¿Qué servicios de fibra óptica ofrecen?' },
  { label: 'SOFTWARE',       text: '¿Qué soluciones de software desarrollan?' },
  { label: 'COTIZACIÓN',     text: 'Quiero solicitar una cotización para un proyecto' },
  { label: 'CONTACTO',       text: '¿Cómo puedo contactarlos directamente?' },
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

  // Fix #1: stable session ID that survives re-renders and HMR
  const sessionId = useRef(
    typeof crypto !== 'undefined'
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => {
        setMessages([{
          role: 'bot',
          text: 'Hola. Soy el asistente de **Nexus Engineering**.\n\n¿En qué puedo ayudarte? Puedo responder sobre fibra óptica, software, proyectos o cotizaciones.',
          ts: Date.now(),
        }]);
      }, 400);
    }
  }, [open, hasGreeted]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const now = Date.now();
    sendTimestamps.current = sendTimestamps.current.filter(ts => now - ts < RATE_LIMIT.windowMs);
    if (sendTimestamps.current.length >= RATE_LIMIT.maxMessages) {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: '[RATE LIMIT] Demasiados mensajes. Espera un momento.',
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
        body: JSON.stringify({ message: text.trim(), sessionId: sessionId.current }),
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
        text: '[ERROR] Problema de conexión. Contacta directamente: **info@hmr-nexus.com**',
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
            ? <strong key={j} className="text-nd-text-display font-medium">{part.slice(2, -2)}</strong>
            : part
        )}
        {i < lines.length - 1 && <br />}
      </span>
    ));
  }, []);

  return (
    <>
      {/* Floating button — NEXUS brand, square, mono */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(true)}
            aria-label="Abrir chat con asistente Nexus"
            className="fixed bottom-6 right-[4.75rem] z-50 flex items-center gap-2 bg-ink px-4 py-2.5 hover:bg-graphite transition-colors"
            style={{ border: '1px solid var(--rule-strong)' }}
          >
            <span className="dot-accent animate-pulse-laser" />
            <span className="mono-tag text-paper">ASK NEXUS</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="widget"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] flex flex-col overflow-hidden bg-ink"
            style={{ height: '540px', border: '1px solid var(--rule-strong)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0 rule-bottom">
              <span className="dot-accent animate-pulse-laser" />
              <div className="flex-1 min-w-0">
                <div className="mono-tag text-paper">NEXUS · ASSISTANT</div>
                <div className="mono-tag text-paper/50" style={{ fontSize: 9, marginTop: 2 }}>
                  ONLINE · FIBRA · SOFTWARE · OPS
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={TG_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Continuar en Telegram"
                  className="mono-tag text-paper/50 hover:text-[color:var(--accent)] transition-colors"
                >
                  TG ↗
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar chat"
                  className="text-paper/50 hover:text-paper transition-colors"
                >
                  <Minimize2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 overscroll-contain">
              {messages.length === 0 && !loading && (
                <div className="text-center mono-tag text-paper/40 mt-8">
                  [CONNECTING...]
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.ts}
                  className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <span className="mono-tag text-[color:var(--accent)] pt-1 flex-shrink-0" style={{ width: 28 }}>NX</span>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 text-[14px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-paper text-ink'
                        : 'bg-graphite text-paper border border-[color:var(--rule)]'
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                  {msg.role === 'user' && (
                    <span className="mono-tag text-paper/60 pt-1 flex-shrink-0" style={{ width: 28, textAlign: 'right' }}>YOU</span>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-start gap-2 justify-start">
                  <span className="mono-tag text-[color:var(--accent)] pt-1 flex-shrink-0" style={{ width: 28 }}>NX</span>
                  <div className="mono-tag text-paper/60 px-3 py-2">
                    [TYPING...]
                  </div>
                </div>
              )}

              {/* Quick actions */}
              {messages.length === 1 && !loading && (
                <div className="grid grid-cols-2 gap-1.5 pt-2">
                  {QUICK_ACTIONS.map(a => (
                    <button
                      key={a.label}
                      onClick={() => sendMessage(a.text)}
                      className="text-left px-3 py-2.5 mono-tag text-paper/75 hover:text-paper hover:bg-paper/5 transition-colors"
                      style={{ border: '1px solid var(--rule)' }}
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
              className="flex items-center gap-2 px-4 py-3 rule-top flex-shrink-0"
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
                className="flex-1 bg-transparent border-b px-0 py-2 text-[14px] text-paper placeholder:text-paper/35 outline-none transition-colors disabled:opacity-40"
                style={{ borderColor: 'var(--rule-strong)' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Enviar mensaje"
                className="px-3 py-2 bg-laser text-ink mono-tag disabled:opacity-30 transition-opacity hover:opacity-90"
              >
                →
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mono-tag text-paper/35 py-2 flex-shrink-0" style={{ fontSize: 9 }}>
              NEXUS ENGINEERING · AI ASSISTANT
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
