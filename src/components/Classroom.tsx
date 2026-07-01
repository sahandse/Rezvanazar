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
            <p className="blackboard__subtext">دبستان پسرانه تشیع ۲ — روی صندلی خود کلیک کنید</p>
          </div>
          <div className="blackboard__tray" />
        </div>

        <div className="teacher" aria-hidden="true">
          <svg viewBox="0 0 100 175" className="teacher__svg">
            <defs>
              <linearGradient id="coatGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a4f63" />
                <stop offset="100%" stopColor="#232f3d" />
              </linearGradient>
              <linearGradient id="scarfGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8f4a56" />
                <stop offset="100%" stopColor="#5f2e39" />
              </linearGradient>
              <radialGradient id="skinGrad" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#fbe0bf" />
                <stop offset="100%" stopColor="#e8b98c" />
              </radialGradient>
            </defs>

            <ellipse cx="50" cy="168" rx="28" ry="6" fill="rgba(0,0,0,0.15)" />

            <rect x="4" y="76" width="6" height="50" rx="3" fill="#c9a15a" />

            <path d="M25 68 Q50 60 75 68 L82 158 Q50 168 18 158 Z" fill="url(#coatGrad)" />
            <path d="M42 66 L50 79 L58 66 Z" fill="#1c2530" />
            <circle cx="50" cy="98" r="1.6" fill="#1c2530" opacity="0.6" />
            <circle cx="50" cy="113" r="1.6" fill="#1c2530" opacity="0.6" />
            <circle cx="50" cy="128" r="1.6" fill="#1c2530" opacity="0.6" />

            <path d="M11 74 Q16 66 26 71 L23 86 Q13 89 8 81 Z" fill="url(#coatGrad)" />
            <ellipse cx="13" cy="80" rx="9" ry="7" fill="url(#skinGrad)" />

            <ellipse cx="38" cy="160" rx="10" ry="5" fill="#2a1c14" />
            <ellipse cx="62" cy="160" rx="10" ry="5" fill="#2a1c14" />

            <path d="M14 54 Q50 -8 86 54 L86 76 Q50 56 14 76 Z" fill="url(#scarfGrad)" />
            <rect x="44" y="58" width="12" height="16" rx="4" fill="url(#skinGrad)" />
            <circle cx="50" cy="44" r="22" fill="url(#skinGrad)" />
            <path d="M27 36 Q50 18 73 36 Q73 27 50 23 Q27 27 27 36 Z" fill="url(#scarfGrad)" />

            <path d="M39 40 Q43 37 47 40" stroke="#4a2f22" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M53 40 Q57 37 61 40" stroke="#4a2f22" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <circle cx="42" cy="46" r="2.6" fill="#33424e" />
            <circle cx="58" cy="46" r="2.6" fill="#33424e" />
            <circle cx="43" cy="45" r="0.8" fill="#fff" opacity="0.8" />
            <circle cx="59" cy="45" r="0.8" fill="#fff" opacity="0.8" />
            <ellipse cx="36" cy="53" rx="4.5" ry="2.8" fill="#e8899a" opacity="0.45" />
            <ellipse cx="64" cy="53" rx="4.5" ry="2.8" fill="#e8899a" opacity="0.45" />
            <path d="M41 57 Q50 63 59 57" stroke="#8a4a3a" strokeWidth="2" fill="none" strokeLinecap="round" />
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
