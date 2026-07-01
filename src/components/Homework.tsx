import { useEffect, useRef, useState } from "react";
import type { Student } from "../types";
import { homeworkQuestions } from "../data/homework";
import { playCorrectSound, playWrongSound } from "../sound";
import { speakPersian } from "../speech";
import { downloadCanvasAsPng, drawCertificate } from "../certificate";

interface HomeworkProps {
  student: Student;
  onComplete: (score: number, total: number) => void;
  onExit: () => void;
}

export default function Homework({ student, onComplete, onExit }: HomeworkProps) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const certificateRef = useRef<HTMLCanvasElement>(null);

  const question = homeworkQuestions[step];
  const isLast = step === homeworkQuestions.length - 1;

  useEffect(() => {
    if (finished && certificateRef.current) {
      drawCertificate(certificateRef.current, {
        name: student.name,
        seat: student.seat,
        score,
        total: homeworkQuestions.length,
        date: new Date().toLocaleDateString("fa-IR"),
      });
    }
  }, [finished, student, score]);

  function handleAnswer(index: number) {
    if (selected !== null) return;
    setSelected(index);
    if (index === question.correctIndex) {
      setScore((s) => s + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }
  }

  function handleDownloadCertificate() {
    if (certificateRef.current) {
      downloadCanvasAsPng(certificateRef.current, `کارت-افتخار-${student.name}.png`);
    }
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      onComplete(score, homeworkQuestions.length);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
    }
  }

  if (finished) {
    return (
      <div className="homework">
        <div className="homework__card homework__card--result">
          <h2>آفرین، {student.name}! 🎉</h2>
          <p className="homework__score">
            امتیاز شما: {score} از {homeworkQuestions.length}
          </p>
          <p>تکلیف تعاملی امروز با موفقیت انجام شد.</p>
          <canvas ref={certificateRef} className="certificate" />
          <div className="homework__actions homework__actions--result">
            <button className="btn btn--ghost" onClick={handleDownloadCertificate}>
              دانلود کارت افتخار
            </button>
            <button className="btn btn--primary" onClick={onExit}>
              بازگشت به پروفایل
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homework">
      <div className="homework__card">
        <div className="homework__header">
          <span>
            {student.name} — صندلی {student.seat}
          </span>
          <span>
            سوال {step + 1} از {homeworkQuestions.length}
          </span>
        </div>

        <div className="homework__progress">
          <div
            className="homework__progress-bar"
            style={{ width: `${((step + (selected !== null ? 1 : 0)) / homeworkQuestions.length) * 100}%` }}
          />
        </div>

        <div className="homework__question-row">
          <h3 className="homework__question">{question.question}</h3>
          <button
            type="button"
            className="homework__speak-btn"
            onClick={() => speakPersian(question.question)}
            aria-label="خواندن سؤال"
            title="خواندن سؤال"
          >
            🔊
          </button>
        </div>

        <div className="homework__options">
          {question.options.map((option, index) => {
            let cls = "option";
            if (selected !== null) {
              if (index === question.correctIndex) cls += " option--correct";
              else if (index === selected) cls += " option--wrong";
            }
            return (
              <button key={index} className={cls} onClick={() => handleAnswer(index)} disabled={selected !== null}>
                {option}
              </button>
            );
          })}
        </div>

        <div className="homework__actions">
          <button className="btn btn--ghost" onClick={onExit}>
            بازگشت به پروفایل
          </button>
          <button className="btn btn--primary" onClick={handleNext} disabled={selected === null}>
            {isLast ? "پایان تکلیف" : "سوال بعدی"}
          </button>
        </div>
      </div>
    </div>
  );
}
