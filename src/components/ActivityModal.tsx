import { useEffect, useRef, useState } from "react";

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  onComplete: () => void;
}

export default function ActivityModal({ isOpen, onClose, title, url, onComplete }: ActivityModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIframeLoaded(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleClose() {
    onComplete();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="activity-modal-overlay" onClick={handleClose}>
      <div className="activity-modal" onClick={(e) => e.stopPropagation()}>
        <div className="activity-modal__header">
          <h2 className="activity-modal__title">{title}</h2>
          <button className="activity-modal__close" onClick={handleClose} aria-label="بستن">
            ×
          </button>
        </div>
        <div className="activity-modal__body">
          {!iframeLoaded && (
            <div className="activity-modal__loader">
              <p>در حال بارگذاری فعالیت...</p>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={url}
            title={title}
            onLoad={() => setIframeLoaded(true)}
            allow="camera; microphone; fullscreen; display-capture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
