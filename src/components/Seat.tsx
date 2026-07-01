import type { Student } from "../types";

interface SeatProps {
  student: Student;
  completed: boolean;
  onClick: (student: Student) => void;
}

export default function Seat({ student, completed, onClick }: SeatProps) {
  return (
    <button
      className={`seat${completed ? " seat--done" : ""}`}
      onClick={() => onClick(student)}
      aria-label={`صندلی ${student.seat} - ${student.name}`}
    >
      <span className="seat__number">{student.seat}</span>
      {completed && <span className="seat__badge">✓</span>}
      <svg className="seat__icon" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="14" y="8" width="36" height="6" rx="2" fill="#8a5a34" />
        <rect x="16" y="14" width="32" height="20" rx="2" fill="#a86f42" />
        <rect x="10" y="34" width="44" height="6" rx="2" fill="#7a4a2a" />
        <rect x="14" y="40" width="6" height="16" rx="2" fill="#5c3a20" />
        <rect x="44" y="40" width="6" height="16" rx="2" fill="#5c3a20" />
      </svg>
      <span className="seat__name">{student.name}</span>
    </button>
  );
}
