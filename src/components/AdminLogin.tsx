import { useState, type FormEvent } from "react";
import { ADMIN_CREDENTIALS } from "../data/admin";

interface AdminLoginProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLogin({ onClose, onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setError("");
      onSuccess();
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
        <h2 className="modal__title">ورود مدیر</h2>
        <p className="modal__subtitle">پنل مشاهده نمرات و فعالیت دانش‌آموزان</p>
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
            ورود به پنل
          </button>
        </form>
      </div>
    </div>
  );
}
