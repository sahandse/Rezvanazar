import { useState, useEffect } from "react";
import type { Team } from "../data/teams";
import type { Student } from "../types";
import { exams } from "../data/exams";
import ActivityModal from "./ActivityModal";

interface ProfileProps {
  student: Student;
  completed: boolean;
  team?: Team;
  onStartExam: () => void;
  onExit: () => void;
}

const ACTIVITY_STORAGE_KEY = "activity-completion";

function loadActivityCompletion(): Record<number, boolean> {
  try {
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function Profile({ student, completed, team, onStartExam, onExit }: ProfileProps) {
  const [shakeId, setShakeId] = useState<number | null>(null);
  const [activityOpen, setActivityOpen] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState<Record<number, boolean>>(loadActivityCompletion);

  useEffect(() => {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activityCompleted));
  }, [activityCompleted]);

  function handleLockedClick(id: number) {
    setShakeId(id);
    setTimeout(() => setShakeId(null), 400);
  }

  function handleActivityComplete() {
    setActivityCompleted((prev) => ({ ...prev, [student.seat]: true }));
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

      <h3 className="profile__section-title">فعالیت‌های من</h3>
      <div className="profile__exams">
        {exams.map((exam) => {
          const isDone = exam.id === 1 && completed;
          const isActivityDone = exam.activityType === "activity" && activityCompleted[student.seat];
          if (exam.activityType === "activity") {
            return (
              <button
                key={exam.id}
                className={`exam-card exam-card--activity${isActivityDone ? " exam-card--done" : ""}`}
                style={{ borderColor: team?.primary }}
                onClick={() => setActivityOpen(true)}
              >
                <span className="exam-card__icon">{isActivityDone ? "✅" : "🧪"}</span>
                <span className="exam-card__title">{exam.title}</span>
                <span className="exam-card__desc">{isActivityDone ? "انجام شد" : exam.description}</span>
              </button>
            );
          }
          return (
            <button
              key={exam.id}
              className={`exam-card${exam.locked ? " exam-card--locked" : ""}${
                shakeId === exam.id ? " exam-card--shake" : ""
              }${isDone ? " exam-card--done" : ""}`}
              style={!exam.locked && !isDone ? { borderColor: team?.primary } : undefined}
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

      <ActivityModal
        isOpen={activityOpen}
        onClose={() => setActivityOpen(false)}
        title="فعالیت سوم: جامد، مایع، گاز"
        url="https://view.genially.com/6a59fe5f05bae8182ff49b9d"
        onComplete={handleActivityComplete}
      />
    </div>
  );
}

