import { useEffect, useRef, useState } from "react";
import type { Student } from "../types";
import { homeworkQuestions } from "../data/homework";
import { statesOfMatterQuestions } from "../data/activities";
import { playCorrectSound, playWrongSound } from "../sound";
import { hasPersianVoice, speakPersian } from "../speech";
import { downloadCanvasAsPng, drawCertificate } from "../certificate";

interface HomeworkProps {
  student: Student;
  onComplete: (score: number, total: number, examId: number) => void;
  onExit: () => void;
  activityMode?: boolean;
  examId?: number;
}

export default function Homework({ student, onComplete, onExit, activityMode = false, examId = 1 }: HomeworkProps) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(true);

  const certificateRef = useRef<HTMLCanvasElement>(null);

  const questions = activityMode ? statesOfMatterQuestions : homeworkQuestions;
  const question = questions[step];
  const isLast = step === questions.length - 1;
  const total = questions.length;

  useEffect(() => {
    hasPersianVoice().then(setVoiceAvailable);
  }, []);

  useEffect(() => {
    if (finished && certificateRef.current) {
      const title = activityMode ? "فعالیت جامد مایع گاز" : "تکلیف تعاملی";
      drawCertificate(certificateRef.current, {
        name: student.name,
        seat: student.seat,
        score,
        total,
        date: new Date().toLocaleDateString("fa-IR"),
        title,
      });
    }
  }, [finished, student, score, total, activityMode]);

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
      const filename = activityMode ? `فعالیت-جامد-مایع-گاز-${student.name}.png` : `کارت-افتخار-${student.name}.png`;
      downloadCanvasAsPng(certificateRef.current, filename);
    }
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      onComplete(score, total, examId);
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
            امتیاز شما: {score} از {total}
          </p>
          <p>{activityMode ? "فعالیت حالت‌های ماده با موفقیت انجام شد." : "تکلیف تعاملی امروز با موفقیت انجام شد."}</p>
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
            سوال {step + 1} از {total}
          </span>
        </div>

        <div className="homework__progress">
          <div
            className="homework__progress-bar"
            style={{ width: `${((step + (selected !== null ? 1 : 0)) / total) * 100}%` }}
          />
        </div>

        <div className="homework__question-row">
          <h3 className="homework__question">{question.question}</h3>
          <button
            type="button"
            className={`homework__speak-btn${voiceAvailable ? "" : " homework__speak-btn--fallback"}`}
            onClick={() => speakPersian(question.question)}
            aria-label="خواندن سؤال"
            title={
              voiceAvailable
                ? "خواندن سؤال"
                : "صدای فارسی روی این دستگاه نصب نیست؛ با صدای پیش‌فرض خوانده می‌شود"
            }
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
