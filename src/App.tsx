import { useEffect, useMemo, useState } from "react";
import Classroom from "./components/Classroom";
import LoginModal from "./components/LoginModal";
import WelcomeAnimation from "./components/WelcomeAnimation";
import Profile from "./components/Profile";
import Homework from "./components/Homework";
import { students } from "./data/students";
import { notifyExamResult as notifyExamResultTelegram, notifyLogin as notifyLoginTelegram } from "./notifyTelegram";
import { notifyExamResult as notifyExamResultBale, notifyLogin as notifyLoginBale } from "./notifyBale";
import type { ActivityLog, Student } from "./types";

const STORAGE_KEY = "activity-log";

type View = "welcome" | "profile" | "exam";

function loadActivityLog(): ActivityLog {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function App() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [session, setSession] = useState<Student | null>(null);
  const [view, setView] = useState<View>("welcome");
  const [activityLog, setActivityLog] = useState<ActivityLog>(loadActivityLog);

  const completedSeats = useMemo(() => new Set(Object.keys(activityLog).map(Number)), [activityLog]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activityLog));
  }, [activityLog]);

  function handleLoginSuccess(student: Student) {
    setSelectedStudent(null);
    setSession(student);
    setView("welcome");
    notifyLoginTelegram(student);
    notifyLoginBale(student);
  }

  function handleHomeworkComplete(score: number, total: number) {
    if (session) {
      setActivityLog((prev) => ({
        ...prev,
        [session.seat]: { score, total, completedAt: new Date().toISOString() },
      }));
      notifyExamResultTelegram(session, score, total);
      notifyExamResultBale(session, score, total);
    }
  }

  function handleExitToClassroom() {
    setSession(null);
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>دبستان پسرانه تشیع ۲</h1>
        <p>پایه سوم ابتدایی — آموزگار و طراح: آیدا رضوان‌آذر</p>
      </header>

      {!session && (
        <Classroom students={students} completedSeats={completedSeats} onSeatClick={setSelectedStudent} />
      )}

      {session && view === "welcome" && (
        <WelcomeAnimation student={session} onDone={() => setView("profile")} />
      )}

      {session && view === "profile" && (
        <Profile
          student={session}
          completed={completedSeats.has(session.seat)}
          onStartExam={() => setView("exam")}
          onExit={handleExitToClassroom}
        />
      )}

      {session && view === "exam" && (
        <Homework student={session} onComplete={handleHomeworkComplete} onExit={() => setView("profile")} />
      )}

      {selectedStudent && (
        <LoginModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSuccess={handleLoginSuccess}
        />
      )}

    </div>
  );
}

export default App;
