import type { Team } from "../data/teams";
import type { Student } from "../types";
import Seat from "./Seat";

interface ClassroomProps {
  students: Student[];
  completedSeats: Set<number>;
  teamForSeat: (seat: number) => Team | undefined;
  onSeatClick: (student: Student) => void;
}

const TEACHER_IMG = `${import.meta.env.BASE_URL}img/teacher-board.png`;

export default function Classroom({ students, completedSeats, teamForSeat, onSeatClick }: ClassroomProps) {
  return (
    <div className="classroom">
      <div className="classroom__front">
        <div className="blackboard">
          <p className="blackboard__text">تکلیف تعاملی امروز</p>
          <p className="blackboard__subtext">دبستان پسرانه تشیع ۲ — روی میز خودت کلیک کن</p>
          <span className="blackboard__chalk" aria-hidden="true" />
          <span className="blackboard__chalk blackboard__chalk--pink" aria-hidden="true" />
          <span className="blackboard__chalk blackboard__chalk--yellow" aria-hidden="true" />
          <div className="blackboard__tray" aria-hidden="true" />
        </div>

        <div className="classroom__teacher photo photo--tilt-left">
          <img src={TEACHER_IMG} alt="نقاشی مدادشمعی از آموزگار کنار تختهٔ سیاه کلاس" />
        </div>
      </div>

      <div className="classroom__seats">
        {students.map((student) => (
          <Seat
            key={student.id}
            student={student}
            completed={completedSeats.has(student.seat)}
            team={teamForSeat(student.seat)}
            onClick={onSeatClick}
          />
        ))}
      </div>

      <p className="classroom__hint">🖍️ روی میز خودت کلیک کن و تکلیف امروز را انجام بده</p>
    </div>
  );
}
