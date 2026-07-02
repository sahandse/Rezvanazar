import { teams } from "../data/teams";
import type { Student } from "../types";

interface TeamPickerProps {
  student: Student;
  onChoose: (teamId: string) => void;
}

export default function TeamPicker({ student, onChoose }: TeamPickerProps) {
  return (
    <div className="team-picker">
      <h2 className="team-picker__title">تیمت رو انتخاب کن، {student.name}! ⚽</h2>
      <p className="team-picker__subtitle">این تیم رنگ صندلی و کارتت تو کلاس می‌مونه</p>
      <div className="team-picker__grid">
        {teams.map((team) => (
          <button
            key={team.id}
            className="team-card"
            style={{ borderColor: team.primary }}
            onClick={() => onChoose(team.id)}
          >
            <span className="team-card__jersey" style={{ background: team.primary, color: team.secondary }}>
              {team.number}
            </span>
            <span className="team-card__name">{team.name}</span>
            <span className="team-card__player">{team.player}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
