let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  const immediate = window.speechSynthesis.getVoices();
  if (immediate.length > 0) {
    cachedVoices = immediate;
    return Promise.resolve(immediate);
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = (voices: SpeechSynthesisVoice[]) => {
      if (settled) return;
      settled = true;
      window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
      // فقط وقتی لیست واقعاً پر است کش می‌کنیم؛ در غیر این صورت دفعه‌ی
      // بعد دوباره تلاش می‌کنیم (چون بعضی مرورگرها دیرتر لیست را پر می‌کنند).
      if (voices.length > 0) cachedVoices = voices;
      resolve(voices);
    };
    const handleVoicesChanged = () => finish(window.speechSynthesis.getVoices());

    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
    setTimeout(() => finish(window.speechSynthesis.getVoices()), 1000);
  });
}

function findPersianVoice(voices: SpeechSynthesisVoice[]) {
  return voices.find((voice) => voice.lang?.toLowerCase().startsWith("fa")) ?? null;
}

export async function speakPersian(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const voices = cachedVoices.length > 0 ? cachedVoices : await loadVoices();
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
  const voices = cachedVoices.length > 0 ? cachedVoices : await loadVoices();
  return findPersianVoice(voices) !== null;
}
