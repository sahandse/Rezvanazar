export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

// تکلیف تعاملی نمونه — یک آزمون کوتاه ریاضی و عمومی برای کلاس.
export const homeworkQuestions: Question[] = [
  {
    id: 1,
    question: "حاصل ۷ + ۵ کدام است؟",
    options: ["۱۱", "۱۲", "۱۳", "۱۰"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "پایتخت ایران کدام شهر است؟",
    options: ["اصفهان", "شیراز", "تهران", "تبریز"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "کدام گزینه یک عدد زوج است؟",
    options: ["۹", "۱۴", "۲۱", "۳۳"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "جمع‌آوری میوه از درخت مربوط به کدام فصل است؟",
    options: ["بهار", "تابستان", "پاییز", "زمستان"],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "حاصل ۹ × ۳ چند می‌شود؟",
    options: ["۲۴", "۲۷", "۳۰", "۲۱"],
    correctIndex: 1,
  },
  {
    id: 6,
    question: "چند روز یک هفته است؟",
    options: ["۵", "۶", "۷", "۸"],
    correctIndex: 2,
  },
  {
    id: 7,
    question: "حشره‌ای که عسل می‌سازد کدام است؟",
    options: ["زنبور عسل", "مرغ مگس", "کژدم", "مور"],
    correctIndex: 0,
  },
  {
    id: 8,
    question: "پرنده‌ای که بهار است می‌خواند کدام است؟",
    options: ["گنجشک", "کبوتر", "طاووس", "عصفور"],
    correctIndex: 3,
  },
  {
    id: 9,
    question: "حاصل ۱۵ − ۸ چند می‌شود؟",
    options: ["۵", "۶", "۷", "۸"],
    correctIndex: 2,
  },
  {
    id: 10,
    question: "کدام فصل بعد از زمستان می‌آید؟",
    options: ["تابستان", "پاییز", "بهار", "زمستان"],
    correctIndex: 2,
  },
  {
    id: 11,
    question: "کدام یک از موارد زیر یک مادهٔ جامد است؟",
    options: ["آب", "هوا", "یخ", "دود"],
    correctIndex: 2,
  },
  {
    id: 12,
    question: "مادهٔ مایع چه شکلی دارد؟",
    options: ["شکل ثابت دارد", "شکل خود جداره را می‌گیرد", "هیچ شکل ثابتی ندارد", "فقط شکل کره دارد"],
    correctIndex: 1,
  },
  {
    id: 13,
    question: "کدام گزینه برای گازها درست است؟",
    options: ["حجم و شکل ثابت دارند", "حجم ثابت و شکل متغیر دارند", "حجم و شکل متغیر دارند", "فقط شکل ثابت دارند"],
    correctIndex: 2,
  },
  {
    id: 14,
    question: "یخ تبدیل به آب می‌شود. این تغییر حالت ماده به چه نامی می‌نامند؟",
    options: ["انجماد", "ذوب شدن", "بخارشدن", "جوشیدن"],
    correctIndex: 1,
  },
  {
    id: 15,
    question: "آب در یخچال به چه حالتی قرار می‌گیرد؟",
    options: ["مایع", "گاز", "جامد", "پلاسما"],
    correctIndex: 2,
  },
];
