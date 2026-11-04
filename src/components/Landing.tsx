import { useState } from "react";

const MESSAGES = [
  "امروز یک ستارهٔ طلایی می‌گیری!",
  "تو دانش‌آموز پرتلاش کلاس مایی!",
  "هر تکلیف، یک پله بالاتر!",
  "دفترت آماده‌ست؟ بریم!",
  "تو می‌توانی!",
];

const HERO_IMG = `${import.meta.env.BASE_URL}img/hero-students.png`;

export default function Landing({ onStart }: { onStart: () => void }) {
  const [msg] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  return (
    <div className="landing fade-in">
      <p className="landing__bismillah">به نام خدا</p>
      <h2 className="landing__title taped">کلاس سوم ما 🎒</h2>
      <div className="photo">
        <img src={HERO_IMG} alt="نقاشی مدادشمعی از بچه‌های کلاس در حیاط مدرسه" />
      </div>
      <p className="bubble">{msg}</p>
      <p className="landing__note">روی صندلی خودت کلیک کن و با نام‌کاربری وارد شو</p>
      <button className="btn btn--primary btn--big" onClick={onStart}>
        ✏️ شروع تکلیف
      </button>
    </div>
  );
}
