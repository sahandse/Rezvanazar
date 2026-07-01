import { useEffect, useState } from "react";
import Classroom from "./components/Classroom";
import LoginModal from "./components/LoginModal";
import Homework from "./components/Homework";
import { students } from "./data/students";
import type { Student } from "./types";

const STORAGE_KEY = "completed-seats";

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
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [completedSeats, setCompletedSeats] = useState<Set<number>>(loadCompleted);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSeats]));
  }, [completedSeats]);

  function handleLoginSuccess(student: Student) {
    setSelectedStudent(null);
    setActiveStudent(student);
  }

  function handleHomeworkComplete() {
    if (activeStudent) {
      setCompletedSeats((prev) => new Set(prev).add(activeStudent.seat));
    }
  }

  function handleExit() {
    setActiveStudent(null);
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>دبستان ایران</h1>
        <p>کلاس تعاملی — سامانه انجام تکلیف</p>
      </header>

      {activeStudent ? (
        <Homework student={activeStudent} onComplete={handleHomeworkComplete} onExit={handleExit} />
      ) : (
        <Classroom students={students} completedSeats={completedSeats} onSeatClick={setSelectedStudent} />
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
