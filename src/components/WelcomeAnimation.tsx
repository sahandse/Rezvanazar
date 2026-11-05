import { useEffect, useMemo, useState } from "react";
import { fa } from "../format";
import type { Student } from "../types";
import type { Team } from "../data/teams";

interface WelcomeAnimationProps {
  student: Student;
  team?: Team;
  onDone: () => void;
}

const VARIANTS = ["confetti", "bounce", "slide", "zoom"] as const;
type Variant = (typeof VARIANTS)[number];

const CONFETTI_COLORS = ["#e8503f", "#f0951c", "#f7c948", "#4aa867", "#3d84c6", "#8a5fc0"];

export default function WelcomeAnimation({ student, team, onDone }: WelcomeAnimationProps) {
  const [leaving, setLeaving] = useState(false);
  const variant = useMemo<Variant>(() => VARIANTS[Math.floor(Math.random() * VARIANTS.length)], []);
  const confetti = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.6 + Math.random() * 0.9,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
    []
  );

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 1600);
    const doneTimer = setTimeout(onDone, 1950);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`welcome welcome--${variant}${leaving ? " welcome--leaving" : ""}`}>
      {variant === "confetti" &&
        confetti.map((c, i) => (
          <span
            key={i}
            className="welcome__confetti"
            style={{
              left: `${c.left}%`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              background: c.color,
            }}
          />
        ))}
      <div className="welcome__card taped">
        <p className="welcome__emoji">{team ? `${team.emoji} 🎉` : "🎉"}</p>
        <h2>خوش اومدی، {student.name}!</h2>
        <p>
          صندلی {fa(student.seat)}
          {team ? ` — تیم ${team.name}` : " — بریم سراغ پروفایلت"}
        </p>
      </div>
    </div>
  );
}
