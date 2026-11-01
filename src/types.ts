export interface Student {
  id: number;
  seat: number;
  name: string;
  username: string;
  password: string;
}

export interface ActivityEntry {
  score?: number;
  total?: number;
  completedAt: string;
}

// نتایج به صندلی و سپس شناسهٔ آزمون نگه داشته می‌شوند.
export type ActivityLog = Record<number, Record<number, ActivityEntry>>;

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}
