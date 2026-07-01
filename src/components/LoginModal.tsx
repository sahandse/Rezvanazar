import { useState, type FormEvent } from "react";
import type { Student } from "../types";

interface LoginModalProps {
  student: Student;
  onClose: () => void;
  onSuccess: (student: Student) => void;
}

export default function LoginModal({ student, onClose, onSuccess }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (username.trim() === student.username && password === student.password) {
      setError("");
      onSuccess(student);
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal${shake ? " modal--shake" : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal__close" onClick={onClose} aria-label="بستن">
          ×
        </button>
        <div className="modal__banner">
          <h2 className="modal__title">ورود به کلاس</h2>
          <p className="modal__subtitle">
            صندلی {student.seat} — {student.name}
          </p>
        </div>
        <div className="modal__body">
          <form className="modal__form" onSubmit={handleSubmit}>
            <label className="field">
              <span>نام کاربری</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                autoComplete="off"
              />
            </label>
            <label className="field">
              <span>رمز عبور</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </label>
            {error && <p className="modal__error">{error}</p>}
            <button type="submit" className="btn btn--primary">
              ورود به کلاس
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
