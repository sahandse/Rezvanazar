export function speakPersian(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fa-IR";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}
