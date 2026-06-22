import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Calendar,
  Star,
  CheckCircle2,
  Scale,
} from "lucide-react";
import { toast } from "sonner";
import { chatTurn } from "@/lib/chat.functions";
import { submitLead, submitFeedback } from "@/lib/leads.functions";
import { practiceAreas } from "@/lib/practice-areas";

type Tab = "chat" | "consult" | "feedback";
type ChatMessage = { role: "user" | "assistant"; content: string };

const newSessionId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("chat");

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open NKM assistant"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-clay text-paper-text pl-5 pr-6 py-3.5 shadow-xl hover:bg-clay-2 transition-all group"
        >
          <span className="w-9 h-9 rounded-full bg-brass-soft text-ink flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </span>
          <span className="text-sm font-mono tracking-wider uppercase">Ask NKM</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-[9999] w-[min(420px,calc(100vw-2rem))] h-[min(640px,calc(100vh-2rem))] bg-stone border border-line shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-ink text-paper-text px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-brass text-ink flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </span>
              <div>
                <div className="font-serif text-base font-semibold tracking-tight">NKM Advocates</div>
                <div className="text-[11px] text-paper-text-dim font-mono uppercase tracking-wider">Online · We reply in 1 business day</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-paper-text-dim hover:text-paper-text transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 border-b border-line bg-card text-xs font-mono uppercase tracking-wider">
            <TabButton active={tab === "chat"} onClick={() => setTab("chat")}>
              <MessageCircle className="w-3.5 h-3.5" /> Chat
            </TabButton>
            <TabButton active={tab === "consult"} onClick={() => setTab("consult")}>
              <Calendar className="w-3.5 h-3.5" /> Book
            </TabButton>
            <TabButton active={tab === "feedback"} onClick={() => setTab("feedback")}>
              <Star className="w-3.5 h-3.5" /> Feedback
            </TabButton>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            {tab === "chat" && <ChatPanel />}
            {tab === "consult" && <ConsultPanel onDone={() => setTab("chat")} />}
            {tab === "feedback" && <FeedbackPanel onDone={() => setTab("chat")} />}
          </div>
        </div>
      )}
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 py-3 transition-colors ${
        active
          ? "bg-stone text-ink border-b-2 border-brass -mb-px"
          : "text-ink-text hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function ChatPanel() {
  const sessionIdRef = useRef<string>(newSessionId());
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello, and welcome to NKM Advocates. I can answer questions about our practice areas, the firm, or how to schedule a confidential consultation. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const callChat = useServerFn(chatTurn);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await callChat({
        data: { sessionId: sessionIdRef.current, messages: next },
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble reaching our assistant. Please use the Book tab to send your enquiry directly to our team.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-card/60">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-ink text-paper-text"
                  : "bg-stone border border-line text-ink-text"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-stone border border-line px-4 py-2.5 text-sm text-ink-text flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-brass" />
              Thinking…
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-line p-3 bg-stone">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Ask about a practice area or our process…"
            className="flex-1 resize-none bg-stone border border-line px-3 py-2 text-sm text-ink-text focus:outline-none focus:border-brass transition-colors max-h-32"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="w-10 h-10 flex items-center justify-center bg-brass text-ink hover:bg-brass-soft disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="mt-2 text-[10px] text-ink-text/60 font-mono text-center uppercase tracking-wider">
          AI assistant · Not legal advice
        </p>
      </div>
    </>
  );
}

function ConsultPanel({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const call = useServerFn(submitLead);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    setLoading(true);
    try {
      await call({ data: { ...form, source: "widget" } });
      setDone(true);
      toast.success("Enquiry sent — we'll reply within one business day.");
    } catch (err) {
      console.error(err);
      toast.error("Could not send your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-10 bg-card/60">
        <CheckCircle2 className="w-12 h-12 text-brass" />
        <h3 className="mt-4 font-serif text-2xl text-ink font-semibold tracking-tight">Thank you, {form.name.split(" ")[0]}.</h3>
        <p className="mt-2 text-sm text-ink-text">
          Your enquiry has been received. Our team will be in touch within one business day at <strong>{form.email}</strong>.
        </p>
        <button onClick={onDone} className="mt-6 text-sm text-brass font-mono uppercase tracking-wider hover:underline">
          Back to chat
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex-1 overflow-y-auto p-5 space-y-3 bg-card/60">
      <div>
        <Label>Full name *</Label>
        <Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Jane Wanjiru" />
      </div>
      <div>
        <Label>Email *</Label>
        <Input type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="jane@example.com" />
      </div>
      <div>
        <Label>Phone</Label>
        <Input type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+254 700 000 000" />
      </div>
      <div>
        <Label>Service needed</Label>
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full bg-stone border border-line px-3 py-2 text-sm text-ink-text focus:outline-none focus:border-brass"
        >
          <option value="">Select a practice area</option>
          {practiceAreas.map((p) => (
            <option key={p.slug} value={p.title}>{p.title}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>Brief description</Label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          placeholder="A few sentences about your matter…"
          className="w-full bg-stone border border-line px-3 py-2 text-sm text-ink-text focus:outline-none focus:border-brass resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-clay text-paper-text py-3 text-sm font-mono tracking-wider uppercase hover:bg-clay-2 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Request Consultation
      </button>
      <p className="text-[11px] text-ink-text/60 font-mono text-center">
        Your details are confidential and used only to respond to your enquiry.
      </p>
    </form>
  );
}

function FeedbackPanel({ onDone }: { onDone: () => void }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const call = useServerFn(submitFeedback);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }
    setLoading(true);
    try {
      await call({ data: { rating, comment, email } });
      setDone(true);
    } catch (err) {
      console.error(err);
      toast.error("Could not send your feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-10 bg-card/60">
        <CheckCircle2 className="w-12 h-12 text-brass" />
        <h3 className="mt-4 font-serif text-2xl text-ink font-semibold tracking-tight">Thank you.</h3>
        <p className="mt-2 text-sm text-ink-text">
          Your feedback helps us serve our clients better.
        </p>
        <button onClick={onDone} className="mt-6 text-sm text-brass font-mono uppercase tracking-wider hover:underline">
          Back to chat
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex-1 overflow-y-auto p-5 space-y-4 bg-card/60">
      <div>
        <Label>How would you rate your experience?</Label>
        <div className="flex gap-1.5 mt-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              className="p-1"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  n <= (hover || rating) ? "fill-brass text-brass" : "text-line"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>Comments</Label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="What did you like? What could we improve?"
          className="w-full bg-stone border border-line px-3 py-2 text-sm text-ink-text focus:outline-none focus:border-brass resize-none"
        />
      </div>
      <div>
        <Label>Email (optional)</Label>
        <Input type="email" value={email} onChange={setEmail} placeholder="So we can follow up" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-clay text-paper-text py-3 text-sm font-mono tracking-wider uppercase hover:bg-clay-2 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Submit Feedback
      </button>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-mono font-medium uppercase tracking-wider text-ink mb-1.5">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-stone border border-line px-3 py-2 text-sm text-ink-text focus:outline-none focus:border-brass"
    />
  );
}