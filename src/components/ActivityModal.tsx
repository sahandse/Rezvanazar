import { useEffect, useState } from "react";

interface ActivityModalProps {
  onClose: () => void;
  title: string;
  url: string;
  onComplete: () => void;
}

// این کامپوننت را والد فقط زمانی render می‌کند که فعالیت باز باشد؛ با بستن،
// iframe واقعاً از بین می‌رود و وضعیت بارگذاری هم پاک می‌شود.
export default function ActivityModal({ onClose, title, url, onComplete }: ActivityModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [loadTimedOut, setLoadTimedOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // اگر سرویس بیرونی اجازهٔ نمایش در iframe را نداد، دکمه نباید برای
    // دانش‌آموز قفل بماند؛ بعد از چند ثانیه راهنمای «تب جدید» را نشان می‌دهیم.
    const timeout = setTimeout(() => setLoadTimedOut(true), 8000);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timeout);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleFinish() {
    onComplete();
    onClose();
  }

  return (
    <div className="activity-modal-overlay" onClick={onClose}>
      <div
        className="activity-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="activity-modal__header">
          <h2 className="activity-modal__title">{title}</h2>
          <div className="activity-modal__controls">
            {/* بعضی سرویس‌ها اجازهٔ نمایش در iframe نمی‌دهند؛ این لینک همیشه کار می‌کند. */}
            <a
              className="activity-modal__open"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              باز کردن در تب جدید
            </a>
            <button className="activity-modal__close" onClick={onClose} aria-label="بستن بدون ثبت">
              ×
            </button>
          </div>
        </div>
        <div className="activity-modal__body">
          {!iframeLoaded && (
            <div className="activity-modal__loader">
              <p>
                {loadTimedOut
                  ? "فعالیت بارگذاری نشد؛ با «باز کردن در تب جدید» امتحان کنید."
                  : "در حال بارگذاری فعالیت..."}
              </p>
            </div>
          )}
          <iframe
            src={url}
            title={title}
            onLoad={() => setIframeLoaded(true)}
            allow="camera; microphone; fullscreen; display-capture"
            allowFullScreen
          />
        </div>
        <div className="activity-modal__footer">
          {/* ثبت فقط با این دکمه انجام می‌شود؛ بستن پنجره به‌تنهایی فعالیت را انجام‌شده حساب نمی‌کند. */}
          <button
            className="btn btn--primary"
            onClick={handleFinish}
            disabled={!iframeLoaded && !loadTimedOut}
          >
            {iframeLoaded || loadTimedOut ? "پایان فعالیت و ثبت" : "در حال بارگذاری..."}
          </button>
        </div>
      </div>
    </div>
  );
}
