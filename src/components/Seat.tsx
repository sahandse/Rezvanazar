import type { Team } from "../data/teams";
import type { Student } from "../types";

interface SeatProps {
  student: Student;
  completed: boolean;
  team?: Team;
  onClick: (student: Student) => void;
}

const DESK_IMG = `${import.meta.env.BASE_URL}img/seat-desk.png`;

export default function Seat({ student, completed, team, onClick }: SeatProps) {
  return (
    <button
      className={`seat${completed ? " seat--done" : ""}`}
      onClick={() => onClick(student)}
      aria-label={`میز ${student.seat} — ${student.name}`}
    >
      <span className="seat__number">{student.seat}</span>
      {team && (
        <span className="seat__team" aria-hidden="true" title={team.name}>
          {team.emoji}
        </span>
      )}
      {completed && <span className="seat__badge" aria-hidden="true" />}
      <img className="seat__desk" src={DESK_IMG} alt="" width={68} height={68} />
      <span className="seat__name">{student.name}</span>
      <span className="seat__state">{completed ? "انجام شد" : "کلیک کن"}</span>
    </button>
  );
}
