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
            <path d="M18 145 Q45 156 72 145 L67 64 Q45 57 23 64 Z" fill="#7a3b46" />
            <ellipse cx="33" cy="148" rx="9" ry="5" fill="#3c2a1e" />
            <ellipse cx="57" cy="148" rx="9" ry="5" fill="#3c2a1e" />
            <path d="M13 48 Q45 -6 77 48 L77 68 Q45 50 13 68 Z" fill="#7a3b46" />
            <circle cx="45" cy="42" r="20" fill="#f0c8a0" />
            <path d="M23 34 Q45 20 67 34 Q67 26 45 22 Q23 26 23 34 Z" fill="#7a3b46" />
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
