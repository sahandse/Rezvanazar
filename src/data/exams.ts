export interface Exam {
  id: number;
  title: string;
  description: string;
  locked: boolean;
  activityType?: "homework" | "activity";
}

export const exams: Exam[] = [
  {
    id: 1,
    title: "تکلیف تعاملی هفتگی",
    description: "یک آزمون کوتاه ریاضی و عمومی",
    locked: false,
    activityType: "homework",
  },
  {
    id: 2,
    title: "آزمون ریاضی",
    description: "آزمون ریاضی پایه سوم",
    locked: false,
    activityType: "homework",
  },
  {
    id: 3,
    title: "آزمون علوم",
    description: "آزمون علوم پایه سوم",
    locked: false,
    activityType: "homework",
  },
  {
    id: 4,
    title: "آزمون ادبیات فارسی",
    description: "آزمون ادبیات فارسی پایه سوم",
    locked: false,
    activityType: "homework",
  },
  {
    id: 5,
    title: "آزمون تاریخ",
    description: "آزمون تاریخ پایه سوم",
    locked: false,
    activityType: "homework",
  },
  {
    id: 6,
    title: "آزمون جغرافیا",
    description: "آزمون جغرافیا پایه سوم",
    locked: false,
    activityType: "homework",
  },
  {
    id: 7,
    title: "فعالیت سوم: جامد، مایع، گاز",
    description: "تست تعاملی حالت‌های ماده",
    locked: false,
    activityType: "activity",
  },
];
