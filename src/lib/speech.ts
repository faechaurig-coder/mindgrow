let unlocked = false;
let voiceOn = true;

export function setVoiceEnabled(on: boolean) {
  voiceOn = on;
}

export function unlockSpeech() {
  unlocked = true;
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const probe = new SpeechSynthesisUtterance(" ");
  probe.volume = 0;
  window.speechSynthesis.speak(probe);
}

export function speak(text: string, lang = "es-MX") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  if (!unlocked || !voiceOn) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.92;
  utterance.pitch = 1.05;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function hush() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}
