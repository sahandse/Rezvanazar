import { useCallback, useEffect, useMemo, useState } from "react";
import Landing from "./components/Landing";
import Classroom from "./components/Classroom";
import LoginModal from "./components/LoginModal";
import TeamPicker from "./components/TeamPicker";
import WelcomeAnimation from "./components/WelcomeAnimation";
import Profile from "./components/Profile";
import Homework from "./components/Homework";
import { students } from "./data/students";
import { teams } from "./data/teams";
import type { Exam } from "./data/exams";
import { notifyExamResult as notifyExamResultTelegram, notifyLogin as notifyLoginTelegram } from "./notifyTelegram";
import { notifyExamResult as notifyExamResultBale, notifyLogin as notifyLoginBale } from "./notifyBale";
import type { ActivityEntry, ActivityLog, Student } from "./types";

const STORAGE_KEY = "activity-log";
const TEAM_STORAGE_KEY = "team-choices";

type View = "team-select" | "welcome" | "profile" | "exam";
type TeamChoices = Record<number, string>;

function loadActivityLog(): ActivityLog {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, ActivityEntry | Record<string, ActivityEntry>>;
    // نسخهٔ پیشین نتایج را فقط بر پایهٔ صندلی ذخیره می‌کرد (بدون شناسهٔ آزمون).
    // آن‌ها را به آزمون ۱ (تکلیف هفتگی) منتقل می‌کنیم تا رکوردها پاک نشوند.
    return Object.fromEntries(
      Object.entries(parsed).map(([seat, value]) => [
        seat,
        "completedAt" in value ? { "1": value } : value,
      ]),
    ) as ActivityLog;
  } catch {
    return {};
  }
}

function loadTeamChoices(): TeamChoices {
  try {
    const raw = localStorage.getItem(TEAM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [session, setSession] = useState<Student | null>(null);
  const [view, setView] = useState<View>("welcome");
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [activityLog, setActivityLog] = useState<ActivityLog>(loadActivityLog);
  const [teamChoices, setTeamChoices] = useState<TeamChoices>(loadTeamChoices);

  const completedSeats = useMemo(() => new Set(Object.keys(activityLog).map(Number)), [activityLog]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teamChoices));
  }, [teamChoices]);

  function teamForSeat(seat: number) {
    const teamId = teamChoices[seat];
    return teams.find((team) => team.id === teamId);
  }

  const appTheme = session ? teamForSeat(session.seat) : undefined;

  const handleWelcomeDone = useCallback(() => setView("profile"), []);

  function recordResult(seat: number, examId: number, entry: ActivityEntry) {
    setActivityLog((prev) => ({
      ...prev,
      [seat]: { ...prev[seat], [examId]: entry },
    }));
  }

  function handleLoginSuccess(student: Student) {
    setSelectedStudent(null);
    setSession(student);
    setView(teamChoices[student.seat] ? "welcome" : "team-select");
    notifyLoginTelegram(student);
    notifyLoginBale(student);
  }

  function handleTeamChosen(teamId: string) {
    if (session) {
      setTeamChoices((prev) => ({ ...prev, [session.seat]: teamId }));
      setView("welcome");
    }
  }

  function handleStartExam(exam: Exam) {
    setActiveExam(exam);
    setView("exam");
  }

  function handleHomeworkComplete(score: number, total: number) {
    if (!session || !activeExam) return;
    recordResult(session.seat, activeExam.id, { score, total, completedAt: new Date().toISOString() });
    notifyExamResultTelegram(session, activeExam.title, score, total);
    notifyExamResultBale(session, activeExam.title, score, total);
  }

  function handleActivityComplete(exam: Exam) {
    if (!session) return;
    recordResult(session.seat, exam.id, { completedAt: new Date().toISOString() });
  }

  function handleBackToProfile() {
    setActiveExam(null);
    setView("profile");
  }

  function handleExitToClassroom() {
    setActiveExam(null);
    setSession(null);
  }

  const appThemeStyle = appTheme
    ? ({
        "--team-primary": appTheme.primary,
        "--team-ink": appTheme.ink,
        "--team-soft": appTheme.soft,
      } as React.CSSProperties)
    : undefined;

  return (
    <div className="app" style={appThemeStyle}>
      <header className="app__header">
        <h1>آکادمی قهرمانان علوم</h1>
        <p>پایه سوم ابتدایی — آموزگار و طراح: آیدا رضوان‌آذر</p>
      </header>

      {!session && showLanding && <Landing onStart={() => setShowLanding(false)} />}

      {!session && !showLanding && (
        <Classroom
          students={students}
          completedSeats={completedSeats}
          teamForSeat={teamForSeat}
          onSeatClick={setSelectedStudent}
        />
      )}

      {session && view === "team-select" && <TeamPicker student={session} onChoose={handleTeamChosen} />}

      {session && view === "welcome" && (
        <WelcomeAnimation student={session} team={appTheme} onDone={handleWelcomeDone} />
      )}

      {session && view === "profile" && (
        <Profile
          student={session}
          seatResults={activityLog[session.seat]}
          team={appTheme}
          onStartExam={handleStartExam}
          onCompleteActivity={handleActivityComplete}
          onExit={handleExitToClassroom}
        />
      )}

      {session && view === "exam" && activeExam && (
        <Homework
          student={session}
          exam={activeExam}
          onComplete={handleHomeworkComplete}
          onExit={handleBackToProfile}
        />
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
