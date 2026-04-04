import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Minimize2, ExternalLink } from 'lucide-react';

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
      {/* Floating button — Nothing: text label, no ambiguous icon */}
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
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-nd-surface border border-nd-border-visible rounded-full px-4 py-2.5 hover:border-nd-text-secondary transition-colors duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-nd-success flex-shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-nd-text-secondary">Chat</span>
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
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-lg overflow-hidden border border-nd-border-visible bg-nd-surface"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0 border-b border-nd-border">
              <Bot className="w-4 h-4 text-nd-text-disabled" strokeWidth={1.5} />
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-nd-text-display">Nexus Assistant</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-nd-success" />
                  <span className="font-mono text-[10px] text-nd-text-disabled">ONLINE</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={TG_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Continuar en Telegram"
                  className="p-1.5 text-nd-text-disabled hover:text-nd-text-display transition-colors duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar chat"
                  className="p-1.5 text-nd-text-disabled hover:text-nd-text-display transition-colors duration-200"
                >
                  <Minimize2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Messages — Fix #3: clearer visual distinction */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 overscroll-contain">
              {messages.length === 0 && !loading && (
                <div className="text-center font-mono text-[10px] text-nd-text-disabled mt-8 uppercase tracking-[0.08em]">
                  [CONNECTING...]
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.ts}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Bot avatar */}
                  {msg.role === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-nd-surface-raised border border-nd-border flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-nd-text-disabled" strokeWidth={1.5} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-nd-text-display text-nd-black rounded-lg rounded-br-sm font-medium'
                        : 'bg-nd-surface-raised text-nd-text-primary border border-nd-border rounded-lg rounded-bl-sm'
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                  {/* User marker */}
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-nd-text-display flex items-center justify-center flex-shrink-0">
                      <span className="text-nd-black text-[9px] font-mono font-bold">YOU</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-nd-surface-raised border border-nd-border flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-nd-text-disabled" strokeWidth={1.5} />
                  </div>
                  <div className="font-mono text-[11px] text-nd-text-disabled px-3 py-2">
                    [TYPING...]
                  </div>
                </div>
              )}

              {/* Quick actions */}
              {messages.length === 1 && !loading && (
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {QUICK_ACTIONS.map(a => (
                    <button
                      key={a.label}
                      onClick={() => sendMessage(a.text)}
                      className="text-left px-3 py-2 font-mono text-[10px] uppercase tracking-[0.06em] text-nd-text-secondary border border-nd-border hover:border-nd-border-visible hover:text-nd-text-display transition-colors duration-200 rounded-sm leading-tight"
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
              className="flex items-center gap-2 px-3 py-3 border-t border-nd-border flex-shrink-0"
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
                className="flex-1 bg-transparent border-b border-nd-border-visible px-0 py-2 text-sm text-nd-text-display font-sans placeholder:text-nd-text-disabled outline-none focus:border-nd-text-primary transition-colors duration-200 disabled:opacity-40"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Enviar mensaje"
                className="w-8 h-8 rounded-full bg-nd-text-display flex items-center justify-center flex-shrink-0 disabled:opacity-30 transition-opacity duration-200 hover:bg-nd-text-primary"
              >
                <Send className="w-3.5 h-3.5 text-nd-black" />
              </button>
            </form>

            {/* Footer */}
            <div className="text-center font-mono text-[9px] uppercase tracking-[0.1em] text-nd-text-disabled py-1.5 flex-shrink-0">
              Nexus Engineering AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
