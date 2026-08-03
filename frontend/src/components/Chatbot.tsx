"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { COMPANY, summary } from "@/data/mock";

type Msg = { role: "user" | "assistant"; content: string };

function reply(message: string, name: string) {
  const m = message.toLowerCase();
  if (m.match(/fee|payment|invoice/))
    return "Open Fees for structures and invoices. Sample dues and paid receipts are preloaded for the demo.";
  if (m.match(/attend|absent|rfid/))
    return "Attendance includes RFID, biometric, QR, classroom, and bus modes. Check Attendance for today’s snapshot.";
  if (m.match(/admission|enroll|merit/))
    return "Admissions shows the pipeline from application to enrollment, including merit ranks and interview states.";
  if (m.match(/exam|grade|result/))
    return "Grading uses weighted assessments (e.g. 40% internal + 60% final). Exams lists schedules and halls.";
  if (m.match(/help|module|where/))
    return `Hi ${name.split(" ")[0]} — browse Dashboard, Admissions, Students, Academics, Fees, Operations, HR, and Analytics. This is a static portfolio demo by ${COMPANY}.`;
  if (m.match(/mia|company|who/))
    return `${COMPANY} built this MIA Campus portfolio demo. All figures are sample data — ${summary.campuses} campuses, ${summary.students.toLocaleString("en-IN")} students.`;
  return `I can guide you through admissions, students, attendance, grades, fees, transport, hostel, library, and HR. Ask about any module. — MIA Assist · ${COMPANY}`;
}

export function Chatbot() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: `Hi — I'm MIA Assist. Ask about any module. This is a portfolio demo by ${COMPANY} with sample data.`,
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  if (!user) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || busy) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    setMessages((m) => [...m, { role: "assistant", content: reply(text, user!.full_name) }]);
    setBusy(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-xl shadow-[var(--brand)]/30 transition hover:scale-105 hover:bg-[var(--brand-2)]"
        aria-label="Open MIA Assist"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--panel)] shadow-2xl fade-in">
          <div className="flex items-center gap-3 bg-[var(--sidebar)] px-4 py-3.5 text-white">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--brand)]">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="font-semibold leading-tight">MIA Assist</p>
              <p className="text-[11px] text-white/65">AI guide · {COMPANY}</p>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-[var(--brand)] text-white"
                    : "border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]"
                }`}
              >
                {m.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-[var(--line)] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fees, attendance…"
              className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 text-sm outline-none focus:border-[var(--brand)]"
            />
            <button type="submit" disabled={busy} className="rounded-xl bg-[var(--brand)] p-2.5 text-white disabled:opacity-50">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
