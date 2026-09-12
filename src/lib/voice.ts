import { speak } from "./speech";

export const VOICE_MANIFEST: Record<string, string> = {
  // Grabados futuros: "nilo_hello": "/audio/nilo_hello.mp3"
};

let recordedOn = true;

export function setRecordedVoiceEnabled(on: boolean) {
  recordedOn = on;
}

export function playVoice(id: string, fallback: string) {
  const src = VOICE_MANIFEST[id];
  if (recordedOn && src && typeof Audio !== "undefined") {
    const clip = new Audio(src);
    clip.volume = 0.7;
    void clip.play().catch(() => speak(fallback));
    return;
  }
  speak(fallback);
}
