import { useEffect, useMemo, useState } from "react";
import type { Student } from "../types";

interface WelcomeAnimationProps {
  student: Student;
  onDone: () => void;
}

const VARIANTS = ["confetti", "bounce", "slide", "zoom"] as const;
type Variant = (typeof VARIANTS)[number];

const CONFETTI_COLORS = ["#4a8c5e", "#a9744a", "#234d3a", "#7a3b46", "#e0b34c"];

export default function WelcomeAnimation({ student, onDone }: WelcomeAnimationProps) {
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
      <div className="welcome__card">
        <p className="welcome__emoji">🎉</p>
        <h2>خوش اومدی، {student.name}!</h2>
        <p>صندلی {student.seat} — بریم سراغ پروفایلت</p>
      </div>
    </div>
  );
}
