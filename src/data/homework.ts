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
];
