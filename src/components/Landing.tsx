import { useState } from "react";

const MESSAGES = [
  "امروز ستارهٔ جدیدی کسب می‌کنی!",
  "تو یک قهرمان علوم هستی!",
  "هر مأموریت تو را قوی‌تر می‌کند!",
  "بزن بریم برای قهرمانی!",
  "تو می‌توانی!",
];

export default function Landing({ onStart }: { onStart: () => void }) {
  const [msg] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  return (
    <div className="landing fade-in" style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <p style={{ fontSize: "1.1rem", color: "var(--ink-muted)" }}>به نام خدا</p>
      <h1 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>آکادمی قهرمانان علوم</h1>
      <div style={{ margin: "1.5rem auto", maxWidth: 480, background: "var(--card)", borderRadius: 24, padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
        <p style={{ fontSize: "1.1rem", color: "var(--chalk)" }}>{msg}</p>
      </div>
      <button className="btn btn--primary" style={{ fontSize: "1.2rem", padding: "1rem 2rem", marginTop: "1.5rem" }} onClick={onStart}>
        شروع ماجراجویی
      </button>
    </div>
  );
}
