import { useEffect, useRef, useState } from "react";
import type { Exam } from "../data/exams";
import type { Student } from "../types";
import { playCorrectSound, playWrongSound } from "../sound";
import { hasPersianVoice, speakPersian } from "../speech";
import { downloadCanvasAsPng, drawCertificate } from "../certificate";

interface HomeworkProps {
  student: Student;
  exam: Exam;
  onComplete: (score: number, total: number) => void;
  onExit: () => void;
}

export default function Homework({ student, exam, onComplete, onExit }: HomeworkProps) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [certificateReady, setCertificateReady] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(true);

  const certificateRef = useRef<HTMLCanvasElement>(null);

  const questions = exam.questions ?? [];
  const total = questions.length;
  const question = questions[step];
  const isLast = step === total - 1;

  useEffect(() => {
    hasPersianVoice().then(setVoiceAvailable);
  }, []);

  useEffect(() => {
    if (!finished || !certificateRef.current) return;
    // رسم کارت ناهمگام است (منتظر آماده شدن فونت می‌ماند)، تا «دانلود» روی
    // کارت نیمه‌کشیده یا خالی کلیک نشود.
    drawCertificate(certificateRef.current, {
      name: student.name,
      seat: student.seat,
      score,
      total,
      date: new Date().toLocaleDateString("fa-IR"),
      title: exam.title,
    }).then(() => setCertificateReady(true));
  }, [finished, student, score, total, exam.title]);

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
      onComplete(score, total);
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
          <p className="homework__subtitle">{exam.title}</p>
          <p className="homework__score">
            امتیاز شما: {score} از {total}
          </p>
          <p>این آزمون با موفقیت انجام شد.</p>
          <canvas ref={certificateRef} className="certificate" />
          <div className="homework__actions homework__actions--result">
            <button className="btn btn--ghost" onClick={handleDownloadCertificate} disabled={!certificateReady}>
              {certificateReady ? "دانلود کارت افتخار" : "در حال آماده کردن کارت..."}
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

        <p className="homework__subtitle">{exam.title}</p>

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
            {isLast ? "پایان آزمون" : "سوال بعدی"}
          </button>
        </div>
      </div>
    </div>
  );
}
