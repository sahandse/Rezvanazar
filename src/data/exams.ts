export interface Exam {
  id: number;
  title: string;
  description: string;
  locked: boolean;
}

// چهار آزمون ثابت برای همه‌ی دانش‌آموزان — فقط اولی باز است، بقیه به‌زودی فعال می‌شوند.
export const exams: Exam[] = [
  {
    id: 1,
    title: "تکلیف تعاملی هفتگی",
    description: "یک آزمون کوتاه ریاضی و عمومی",
    locked: false,
  },
  {
    id: 2,
    title: "آزمون ریاضی",
    description: "آزمون ریاضی پایه سوم",
    locked: false,
  },
  {
    id: 3,
    title: "آزمون علوم",
    description: "آزمون علوم پایه سوم",
    locked: false,
  },
  {
    id: 4,
    title: "آزمون ادبیات فارسی",
    description: "آزمون ادبیات فارسی پایه سوم",
    locked: false,
  },
  {
    id: 5,
    title: "آزمون تاریخ",
    description: "آزمون تاریخ پایه سوم",
    locked: false,
  },
  {
    id: 6,
    title: "آزمون جغرافیا",
    description: "آزمون جغرافیا پایه سوم",
    locked: false,
  },
];
