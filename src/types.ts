export interface Student {
  id: number;
  seat: number;
  name: string;
  username: string;
  password: string;
}

export interface ActivityEntry {
  score: number;
  total: number;
  completedAt: string;
}

export type ActivityLog = Record<number, ActivityEntry>;
