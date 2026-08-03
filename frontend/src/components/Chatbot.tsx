"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
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
    return "Grading uses weighted assessments. Exams lists schedules and halls.";
  if (m.match(/help|module|where/))
    return `Hi ${name.split(" ")[0]} — use the sidebar groups (Overview, People, Academics, Operations). This is a static portfolio demo by ${COMPANY}.`;
  if (m.match(/mia|company|who/))
    return `${COMPANY} built this MIA Campus portfolio demo. Sample snapshot: ${summary.campuses} campuses, ${summary.students.toLocaleString("en-IN")} students.`;
  return `Ask about admissions, students, attendance, grades, fees, transport, hostel, library, or HR. — MIA Assist · ${COMPANY}`;
}

export function Chatbot() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: `Hi — I'm MIA Assist. Ask about any module. Portfolio demo by ${COMPANY} with sample data.`,
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
    await new Promise((r) => setTimeout(r, 350));
    setMessages((m) => [...m, { role: "assistant", content: reply(text, user!.full_name) }]);
    setBusy(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-teal-200 shadow-soft transition hover:scale-105"
        aria-label="Open MIA Assist"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <div className="flex items-center gap-3 bg-panel px-4 py-3.5 text-white">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-teal-200">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold leading-tight">MIA Assist</p>
              <p className="text-[11px] text-white/60">{COMPANY}</p>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user" ? "ml-auto bg-ink text-white" : "border border-slate-200 bg-slate-50 text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-slate-200 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fees, attendance…"
              className="flex-1 rounded-xl border border-slate-200 bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
            <button type="submit" disabled={busy} className="rounded-xl bg-ink p-2.5 text-white disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
