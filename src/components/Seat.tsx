import type { Team } from "../data/teams";
import type { Student } from "../types";

interface SeatProps {
  student: Student;
  completed: boolean;
  team?: Team;
  onClick: (student: Student) => void;
}

export default function Seat({ student, completed, team, onClick }: SeatProps) {
  return (
    <button
      className={`seat${completed ? " seat--done" : ""}`}
      style={
        !completed && team
          ? { borderColor: team.primary, background: `${team.primary}15` }
          : undefined
      }
      onClick={() => onClick(student)}
      aria-label={`صندلی ${student.seat} - ${student.name}`}
    >
      <span className="seat__number">{student.seat}</span>
      {completed && <span className="seat__badge">✓</span>}
      {team && (
        <span className="seat__jersey" style={{ background: team.primary, color: team.secondary }}>
          {team.number}
        </span>
      )}
      <svg className="seat__icon" viewBox="0 0 64 64" aria-hidden="true">
        <rect x="16" y="14" width="32" height="20" rx="3" fill="#c9a15a" />
        <rect x="10" y="34" width="44" height="6" rx="3" fill="#a9744a" />
        <rect x="14" y="40" width="6" height="16" rx="2" fill="#a9744a" />
        <rect x="44" y="40" width="6" height="16" rx="2" fill="#a9744a" />
      </svg>
      <span className="seat__name">{student.name}</span>
    </button>
  );
}
