import { useState } from "react";
import type { Team } from "../data/teams";
import type { Student } from "../types";
import { exams } from "../data/exams";

interface ProfileProps {
  student: Student;
  completed: boolean;
  team?: Team;
  onStartExam: () => void;
  onExit: () => void;
}

export default function Profile({ student, completed, team, onStartExam, onExit }: ProfileProps) {
  const [shakeId, setShakeId] = useState<number | null>(null);

  function handleLockedClick(id: number) {
    setShakeId(id);
    setTimeout(() => setShakeId(null), 400);
  }

  return (
    <div className="profile">
      <div className="profile__topbar">
        <button className="btn btn--ghost profile__exit" onClick={onExit}>
          خروج به کلاس
        </button>
      </div>
      <div className="profile__header">
        <div
          className="profile__avatar"
          style={team ? { background: team.primary, color: team.secondary } : undefined}
        >
          {student.name.charAt(0)}
        </div>
        <div>
          <span className="profile__badge">کارت دانش‌آموزی</span>
          <h2 className="profile__name">{student.name}</h2>
          <p className="profile__meta">
            صندلی {student.seat} — نام‌کاربری: {student.username}
          </p>
          {team && (
            <p className="profile__team" style={{ color: team.primary }}>
              ⚽ {team.name} (شماره {team.number})
            </p>
          )}
        </div>
      </div>

      <h3 className="profile__section-title">آزمون‌های من</h3>
      <div className="profile__exams">
        {exams.map((exam) => {
          const isDone = exam.id === 1 && completed;
          return (
            <button
              key={exam.id}
              className={`exam-card${exam.locked ? " exam-card--locked" : ""}${
                shakeId === exam.id ? " exam-card--shake" : ""
              }${isDone ? " exam-card--done" : ""}`}
              onClick={() => (exam.locked ? handleLockedClick(exam.id) : onStartExam())}
            >
              <span className="exam-card__icon">{exam.locked ? "🔒" : isDone ? "✅" : "📝"}</span>
              <span className="exam-card__title">{exam.title}</span>
              <span className="exam-card__desc">
                {isDone ? "انجام شد" : exam.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
