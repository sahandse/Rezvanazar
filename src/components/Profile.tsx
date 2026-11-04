import { useState } from "react";
import type { Team } from "../data/teams";
import { exams, isExamLocked, type Exam } from "../data/exams";
import type { ActivityEntry, Student } from "../types";
import ActivityModal from "./ActivityModal";

interface ProfileProps {
  student: Student;
  seatResults: Record<number, ActivityEntry> | undefined;
  team?: Team;
  onStartExam: (exam: Exam) => void;
  onCompleteActivity: (exam: Exam) => void;
  onExit: () => void;
}

export default function Profile({
  student,
  seatResults,
  team,
  onStartExam,
  onCompleteActivity,
  onExit,
}: ProfileProps) {
  const [shakeId, setShakeId] = useState<number | null>(null);
  const [openActivity, setOpenActivity] = useState<Exam | null>(null);

  function handleLockedClick(id: number) {
    setShakeId(id);
    setTimeout(() => setShakeId(null), 400);
  }

  return (
    <div className="profile">
      <div className="profile__topbar">
        <button className="btn btn--ghost" onClick={onExit}>
          خروج به کلاس
        </button>
      </div>
      <div className="profile__header">
        <div className="profile__avatar">
          {student.name.charAt(0)}
          {team && (
            <img
              className="profile__team-sticker"
              src={team.badge}
              alt={`نشان ${team.name}`}
              width={36}
              height={36}
            />
          )}
        </div>
        <div>
          <span className="profile__badge">کارت دانش‌آموزی</span>
          <h2 className="profile__name">{student.name}</h2>
          <p className="profile__meta">
            صندلی {student.seat} — نام‌کاربری: {student.username}
          </p>
          {team && (
            <p className="profile__team">
              {team.emoji} {team.name}
            </p>
          )}
        </div>
      </div>

      <h3 className="profile__section-title">فعالیت‌های من</h3>
      <div className="profile__exams">
        {exams.map((exam) => {
          const isDone = Boolean(seatResults?.[exam.id]);
          const locked = isExamLocked(exam);

          if (exam.activityType === "activity") {
            return (
              <button
                key={exam.id}
                className={`exam-card exam-card--activity${isDone ? " exam-card--done" : ""}`}
                onClick={() => setOpenActivity(exam)}
              >
                <span className="exam-card__icon">{isDone ? "✅" : "🧪"}</span>
                <span className="exam-card__title">{exam.title}</span>
                <span className="exam-card__desc">{isDone ? "انجام شد" : exam.description}</span>
              </button>
            );
          }

          return (
            <button
              key={exam.id}
              className={`exam-card${locked ? " exam-card--locked" : ""}${
                shakeId === exam.id ? " exam-card--shake" : ""
              }${isDone ? " exam-card--done" : ""}`}
              onClick={() => (locked ? handleLockedClick(exam.id) : onStartExam(exam))}
            >
              <span className="exam-card__icon">{locked ? "🔒" : isDone ? "✅" : "📝"}</span>
              <span className="exam-card__title">{exam.title}</span>
              <span className="exam-card__desc">
                {locked ? "به‌زودی — سؤالات این آزمون هنوز اضافه نشده" : isDone ? "انجام شد" : exam.description}
              </span>
            </button>
          );
        })}
      </div>

      {openActivity && (
        <ActivityModal
          onClose={() => setOpenActivity(null)}
          title={openActivity.title}
          url={openActivity.activityUrl ?? ""}
          onComplete={() => onCompleteActivity(openActivity)}
        />
      )}
    </div>
  );
}
