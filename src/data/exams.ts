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
    description: "به‌زودی فعال می‌شود",
    locked: true,
  },
  {
    id: 3,
    title: "آزمون علوم",
    description: "به‌زودی فعال می‌شود",
    locked: true,
  },
  {
    id: 4,
    title: "آزمون ادبیات فارسی",
    description: "به‌زودی فعال می‌شود",
    locked: true,
  },
];
