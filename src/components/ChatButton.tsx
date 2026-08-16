import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageSquare, X, Send, Sparkles, Phone } from 'lucide-react';

interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

const SUGGESTIONS = [
  'Is my MK7 GTI compatible?',
  'How much is a cluster + CarPlay?',
  'Do you come to Marietta?',
  'How long does install take?',
];

const PHONE_HREF = 'tel:+14045676287';

function getReply(input: string): string {
  const q = input.toLowerCase();

  if (/(mk7|mk6|mk5|mk4|gti|golf r|sportwagen|jetta|tiguan|atlas|taos|passat|a3|a4|q5|audi)/.test(q)) {
    if (/(mk6|mk7|gti|golf r|sportwagen)/.test(q)) {
      return 'MK6 & MK7 Golf, GTI, Golf R, and Sportwagen are all in stock — programming takes 2–4 days with your VIN. Cluster only starts at $799, or the cluster + CarPlay bundle starts at $999.';
    }
    if (/(a3|a4|q5)/.test(q)) {
      return 'Audi A3, A4, and Q5 (2014–2020) are in stock with a 2–4 day turnaround. Cluster only starts at $799, or the cluster + CarPlay bundle starts at $999.';
    }
    if (/(mk5|mk4)/.test(q)) {
      return 'MK5 and older are a special order — typically 1–2 weeks. I can get you a quote if you share your exact model and year.';
    }
    if (/(tiguan|atlas|jetta|taos|passat)/.test(q)) {
      return 'The Tiguan, Atlas, Jetta, Taos, and Passat are special order (1–2 weeks). CarPlay is widely available for 2012+ models. Want me to start a quote?';
    }
    return 'Most VW and Audi models from 2012 and newer are eligible for CarPlay. For digital clusters, MK6/MK7 Golf family and Audi A3/A4/Q5 (2014–2020) are in stock. Share your model and year and I can confirm!';
  }

  if (/(price|cost|how much|\$|quote|pricing)/.test(q)) {
    return 'Here\'s our pricing:\n• Digital Cluster Only — from $799 (our main service)\n• Apple CarPlay Only — from $399\n• Cluster + CarPlay — from $999\n• Steering Wheel (MFSW) — custom quote, response within 24 hours\n• Full bundle (Cluster + CarPlay + MFSW) — ask for a bundle quote.\nWould you like to book?';
  }

  if (/(miles|mobile|come to|location|where|area|drive|travel|cumberland|marietta|atlanta|kennesaw|smyrna)/.test(q)) {
    return 'We\'re based in Cumberland, Atlanta, GA and serve the greater Atlanta area. The first 20 miles are free, and it\'s $50 beyond that. We come to your home or office — no shop visit needed.';
  }

  if (/(warranty|guarantee)/.test(q)) {
    return 'Every install is backed by a 30-day workmanship warranty on all work.';
  }

  if (/(how long|timeline|time|days|wait|turnaround)/.test(q)) {
    return 'In-stock vehicles (MK6/MK7 Golf family, Audi A3/A4/Q5 2014–2020): 2–4 days for VIN programming. Special order vehicles: 1–2 weeks. The on-site install itself is done at your location.';
  }

  if (/(carplay)/.test(q)) {
    return 'Wireless Apple CarPlay starts at $399 and is available for most VW and Audi models from 2012 and newer. It retains your factory steering wheel controls.';
  }

  if (/(steering|wheel|mfsw|button)/.test(q)) {
    return 'Steering wheel multifunction (MFSW) button upgrades are available as an add-on to any package. Pricing is custom per vehicle — share your model and I\'ll get you a quote within 24 hours.';
  }

  if (/(book|install|schedule|appointment|get started|begin)/.test(q)) {
    return 'Great! You can book by scrolling to the contact form on this page, or call/text us at (404) 567-6287. Want me to note your vehicle details?';
  }

  if (/(theme|style|layout|look)/.test(q)) {
    return 'We offer several cluster themes — Classic, Sport, Navigation, and Track. You choose your layout when booking. Check the Gallery section to see previews!';
  }

  if (/(hi|hello|hey|yo|sup)/.test(q)) {
    return 'Hey! I\'m the DashForge assistant. I can help with vehicle compatibility, pricing, service area, and booking. What can I help you with?';
  }

  return 'I can help with compatibility, pricing, service area, warranty, and booking. Try asking "Is my MK7 GTI compatible?" or "How much is a cluster + CarPlay?" — or call/text us at (404) 567-6287.';
}

export function ChatButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: "Hey! I'm the DashForge assistant. Ask me about vehicle compatibility, pricing, or booking." },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: getReply(trimmed) }]);
      setTyping(false);
    }, 650);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Panel */}
      <div
        className={`fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm origin-bottom-right transition-all duration-300 sm:right-6 ${
          open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <div className="flex h-[28rem] max-h-[70vh] flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 bg-gradient-to-r from-accent-600 to-accent-500 px-4 py-3.5 dark:border-neutral-800">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">DashForge Assistant</p>
                <p className="text-[11px] text-white/70">Typically replies instantly</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-accent-600 text-white'
                      : 'rounded-bl-md bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
                  <span className="h-2 w-2 animate-pulse-soft rounded-full bg-neutral-400 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-pulse-soft rounded-full bg-neutral-400 [animation-delay:200ms]" />
                  <span className="h-2 w-2 animate-pulse-soft rounded-full bg-neutral-400 [animation-delay:400ms]" />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:border-accent-400 hover:text-accent-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-accent-500/50 dark:hover:text-accent-400"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-neutral-200 p-3 dark:border-neutral-800">
            <a
              href={PHONE_HREF}
              aria-label="Call DashForge"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-neutral-500 transition-colors hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-400"
            >
              <Phone className="h-5 w-5" />
            </a>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-600 text-white transition-colors hover:bg-accent-500"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={`fixed bottom-5 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-accent-600 px-4 py-3.5 text-sm font-semibold text-white shadow-2xl shadow-accent-600/30 transition-all duration-300 hover:bg-accent-500 sm:right-6 ${
          open ? 'scale-90 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <MessageSquare className="h-5 w-5" />
        <span className="hidden sm:inline">Ask AI</span>
        <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
      </button>

      {/* Close (X) button when open */}
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close chat"
        className={`fixed bottom-5 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-neutral-800 text-white shadow-2xl transition-all duration-300 hover:bg-neutral-700 sm:right-6 dark:bg-neutral-700 dark:hover:bg-neutral-600 ${
          open ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
        }`}
      >
        <X className="h-6 w-6" />
      </button>
    </>
  );
}
