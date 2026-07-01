import { useEffect, useState } from "react";
import Classroom from "./components/Classroom";
import LoginModal from "./components/LoginModal";
import WelcomeAnimation from "./components/WelcomeAnimation";
import Profile from "./components/Profile";
import Homework from "./components/Homework";
import { students } from "./data/students";
import type { Student } from "./types";

const STORAGE_KEY = "completed-seats";

type View = "welcome" | "profile" | "exam";

function loadCompleted(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function App() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [session, setSession] = useState<Student | null>(null);
  const [view, setView] = useState<View>("welcome");
  const [completedSeats, setCompletedSeats] = useState<Set<number>>(loadCompleted);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSeats]));
  }, [completedSeats]);

  function handleLoginSuccess(student: Student) {
    setSelectedStudent(null);
    setSession(student);
    setView("welcome");
  }

  function handleHomeworkComplete() {
    if (session) {
      setCompletedSeats((prev) => new Set(prev).add(session.seat));
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
