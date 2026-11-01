import type { Question } from "../types";

export const statesOfMatterQuestions: Question[] = [
  {
    id: 1,
    question: "کدام یک از موارد زیر یک مادهٔ جامد است؟",
    options: ["آب", "هوا", "یخ", "دود"],
    correctIndex: 2,
  },
  {
    id: 2,
    question: "مادهٔ مایع چه شکلی دارد؟",
    options: ["شکل ثابت دارد", "شکل ظرف خود را می‌گیرد", "هیچ شکلی ندارد", "فقط شکل کره دارد"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "کدام گزینه برای گازها درست است؟",
    options: ["حجم و شکل ثابت دارند", "حجم ثابت و شکل متغیر دارند", "حجم و شکل متغیر دارند", "فقط شکل ثابت دارند"],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "یخ تبدیل به آب می‌شود. این تغییر حالت ماده به چه نامی می‌نامند؟",
    options: ["انجماد", "ذوب شدن", "بخارشدن", "جوشیدن"],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "آب در فریزر به چه حالتی قرار می‌گیرد؟",
    options: ["مایع", "گاز", "جامد", "پلاسما"],
    correctIndex: 2,
  },
];
