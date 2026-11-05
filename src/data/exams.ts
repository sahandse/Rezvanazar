import type { Question } from "../types";

export interface Exam {
  id: number;
  title: string;
  description: string;
  activityType: "homework" | "activity";
  // برای آزمون‌ها: فهرست سؤال‌ها. برای فعالیت: نشانی صفحهٔ فعالیت.
  questions?: Question[];
  activityUrl?: string;
}

// فهرست تکالیف = فقط فعالیت‌هایی که نشانی‌شان را آموزگار فرستاده است.
// برای افزودن آزمون داخلی، یک مورد با activityType: "homework" و فهرست
// questions به همین آرایه اضافه کنید (id را عوض نکنید؛ نتایج به صندلی
// و id آزمون ذخیره شده‌اند).
export const exams: Exam[] = [
  {
    id: 7,
    title: "فعالیت سوم: جامد، مایع، گاز",
    description: "تست تعاملی حالت‌های ماده",
    activityType: "activity",
    activityUrl: "https://view.genially.com/6a59fe5f05bae8182ff49b9d",
  },
  {
    id: 8,
    title: "ازمایشگاه علوم",
    description: "فعالیت تعاملی علوم",
    activityType: "activity",
    activityUrl: "https://view.genially.com/6a550f11994c60ee8e3a3c38",
  },
  {
    id: 9,
    title: "اتاق فرار آموزشی",
    description: "فعالیت تعاملی Escape room",
    activityType: "activity",
    activityUrl: "https://view.genially.com/6a8f266101ebf7d27c5b96c4",
  },
  {
    id: 10,
    title: "کوییز",
    description: "پرسش و پاسخ تعاملی",
    activityType: "activity",
    activityUrl: "https://view.genially.com/6a5905942c39f1048d660472",
  },
  {
    id: 11,
    title: "بازی Breakout",
    description: "بازی آموزشی Breakout",
    activityType: "activity",
    activityUrl: "https://view.genially.com/6a8ed2f2ee3b32364c0ac89d",
  },
  {
    id: 12,
    title: "بازی کلاسی (Padlet)",
    description: "بازی تعاملی پدلت",
    activityType: "activity",
    activityUrl: "https://arcade.padlet.com/game/gjDZZ2llKD?link_shared=1",
  },
];

export function isExamLocked(exam: Exam) {
  return exam.activityType === "homework" && (exam.questions?.length ?? 0) === 0;
}
