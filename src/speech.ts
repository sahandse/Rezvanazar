let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!voicesPromise) {
    voicesPromise = new Promise((resolve) => {
      const existing = window.speechSynthesis.getVoices();
      if (existing.length > 0) {
        resolve(existing);
        return;
      }
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
      // برخی مرورگرها رویداد voiceschanged را دیر یا هرگز شلیک نمی‌کنند؛
      // بعد از یک مهلت کوتاه با هر لیستی که آماده باشد ادامه می‌دهیم.
      setTimeout(() => resolve(window.speechSynthesis.getVoices()), 500);
    });
  }
  return voicesPromise;
}

function findPersianVoice(voices: SpeechSynthesisVoice[]) {
  return voices.find((voice) => voice.lang?.toLowerCase().startsWith("fa")) ?? null;
}

export async function speakPersian(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const voices = await loadVoices();
  const persianVoice = findPersianVoice(voices);

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fa-IR";
  utterance.rate = 0.95;
  if (persianVoice) {
    utterance.voice = persianVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export async function hasPersianVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const voices = await loadVoices();
  return findPersianVoice(voices) !== null;
}
