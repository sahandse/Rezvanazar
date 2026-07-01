let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    const AudioContextCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContext = new AudioContextCtor();
  }
  return audioContext;
}

function playTones(frequencies: number[], noteDuration: number) {
  const ctx = getAudioContext();
  const startTime = ctx.currentTime;
  frequencies.forEach((frequency, i) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    const noteStart = startTime + i * noteDuration;
    const noteEnd = noteStart + noteDuration;
    gain.gain.setValueAtTime(0.16, noteStart);
    gain.gain.exponentialRampToValueAtTime(0.001, noteEnd);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(noteStart);
    oscillator.stop(noteEnd);
  });
}

export function playCorrectSound() {
  playTones([523.25, 659.25, 783.99], 0.12);
}

export function playWrongSound() {
  playTones([311.13, 233.08], 0.18);
}
