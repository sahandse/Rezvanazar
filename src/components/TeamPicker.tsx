import type { CSSProperties } from "react";
import { teams } from "../data/teams";
import type { Student } from "../types";

interface TeamPickerProps {
  student: Student;
  onChoose: (teamId: string) => void;
}

export default function TeamPicker({ student, onChoose }: TeamPickerProps) {
  return (
    <div className="team-picker taped">
      <h2 className="team-picker__title">تیمت رو انتخاب کن، {student.name}!</h2>
      <p className="team-picker__subtitle">شماره پیراهنت رو بردار؛ رنگ تیمت میز و کارت دانش‌آموزیت رو قشنگ می‌کنه</p>
      <div className="team-picker__grid">
        {teams.map((team) => (
          <button
            key={team.id}
            className="team-card"
            style={
              {
                "--team-primary": team.primary,
                "--team-ink": team.ink,
                "--team-soft": team.soft,
              } as CSSProperties
            }
            onClick={() => onChoose(team.id)}
          >
            <span className="team-card__jersey">شماره {team.number}</span>
            <img
              className="team-card__badge"
              src={team.badge}
              alt={`نشان ${team.name}`}
              width={100}
              height={100}
              loading="lazy"
            />
            <span className="team-card__name">
              {team.emoji} {team.name}
            </span>
            <span className="team-card__motto">{team.motto}</span>
            <span className="team-card__pick">انتخاب این تیم</span>
          </button>
        ))}
      </div>
    </div>
  );
}
