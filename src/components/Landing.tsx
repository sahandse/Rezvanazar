import { useState } from "react";

const MESSAGES = [
  "امروز یک گل قشنگ می‌زنی!",
  "تو مهاجم پرتلاش کلاس مایی!",
  "هر تکلیف، یک گل زیبا ⚽",
  "توپ دست توئه؛ بریم تمرین!",
  "تمرین کن، قهرمان می‌شی!",
];

const HERO_IMG = `${import.meta.env.BASE_URL}img/hero-boys.svg`;

export default function Landing({ onStart }: { onStart: () => void }) {
  const [msg] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  return (
    <div className="landing fade-in">
      <p className="landing__bismillah">به نام خدا</p>
      <h2 className="landing__title taped">پسرای کلاس سوم ⚽</h2>
      <div className="photo">
        <img src={HERO_IMG} alt="نقاشی مدادشمعی از پسرها در حیاط مدرسه، کنار دروازهٔ فوتبال" />
      </div>
      <p className="bubble">{msg}</p>
      <p className="landing__note">روی صندلی خودت کلیک کن و با نام‌کاربری وارد شو</p>
      <button className="btn btn--primary btn--big" onClick={onStart}>
        ✏️ شروع تکلیف
      </button>
    </div>
  );
}
