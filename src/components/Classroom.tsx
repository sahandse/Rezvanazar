import type { Student } from "../types";
import Seat from "./Seat";

interface ClassroomProps {
  students: Student[];
  completedSeats: Set<number>;
  onSeatClick: (student: Student) => void;
}

export default function Classroom({ students, completedSeats, onSeatClick }: ClassroomProps) {
  return (
    <div className="classroom">
      <div className="classroom__front">
        <div className="blackboard">
          <div className="blackboard__frame">
            <p className="blackboard__text">تکلیف تعاملی امروز</p>
            <p className="blackboard__subtext">دبستان ایران — روی صندلی خود کلیک کنید</p>
          </div>
          <div className="blackboard__tray" />
        </div>

        <div className="teacher" aria-hidden="true">
          <svg viewBox="0 0 90 160" className="teacher__svg">
            <ellipse cx="45" cy="152" rx="26" ry="6" fill="rgba(0,0,0,0.15)" />
            <rect x="26" y="70" width="38" height="60" rx="14" fill="#2f5d62" />
            <rect x="20" y="128" width="20" height="30" rx="6" fill="#33424e" />
            <rect x="50" y="128" width="20" height="30" rx="6" fill="#33424e" />
            <circle cx="45" cy="42" r="22" fill="#f0c8a0" />
            <path d="M23 34 Q45 8 67 34 Q67 20 45 16 Q23 20 23 34 Z" fill="#3c2a1e" />
            <rect x="10" y="72" width="18" height="10" rx="5" fill="#f0c8a0" />
            <rect x="0" y="66" width="6" height="46" rx="3" fill="#c9a15a" />
            <circle cx="38" cy="44" r="2.5" fill="#33424e" />
            <circle cx="52" cy="44" r="2.5" fill="#33424e" />
            <path d="M37 52 Q45 57 53 52" stroke="#33424e" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="classroom__seats">
        {students.map((student) => (
          <Seat
            key={student.id}
            student={student}
            completed={completedSeats.has(student.seat)}
            onClick={onSeatClick}
          />
        ))}
      </div>
    </div>
  );
}
