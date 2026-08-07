import { useState } from "react";
import { teams } from "../data/teams";
import type { Student } from "../types";

interface TeamPickerProps {
  student: Student;
  onChoose: (teamId: string) => void;
}

export default function TeamPicker({ student, onChoose }: TeamPickerProps) {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  function handleImageError(teamId: string) {
    setImgErrors((prev) => ({ ...prev, [teamId]: true }));
  }

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
            {!imgErrors[team.id] ? (
              <img
                className="team-card__image"
                src={team.image}
                alt={team.player}
                loading="lazy"
                onError={() => handleImageError(team.id)}
              />
            ) : (
              <div
                className="team-card__image team-card__image--fallback"
                style={{ background: team.primary, color: team.secondary }}
              >
                {team.player.charAt(0)}
              </div>
            )}
            <span className="team-card__jersey" style={{ background: team.primary, color: team.secondary }}>
              {team.number}
            </span>
            <span className="team-card__name">{team.name}</span>
            <span className="team-card__player">{team.player}</span>
            <span className="team-card__bio">{team.bio}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
