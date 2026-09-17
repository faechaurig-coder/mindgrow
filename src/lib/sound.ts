import { unlockSpeech } from "./speech";

let ctx: AudioContext | null = null;
let audioOn = true;

export function setAudioEnabled(on: boolean) {
  audioOn = on;
}

export function unlockAudio() {
  unlockSpeech();
  if (typeof window === "undefined") return;
  const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === "suspended") void ctx.resume();
}

function now() {
  return ctx?.currentTime ?? 0;
}

function tone(freq: number, start: number, dur: number, gain = 0.08, type: OscillatorType = "sine") {
  if (!ctx || !audioOn) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

export function playTap() {
  tone(420, now(), 0.06, 0.03, "triangle");
}

export function playMicro() {
  tone(660, now(), 0.05, 0.028, "sine");
}

export function playSuccess() {
  const t = now();
  tone(523, t, 0.1, 0.05);
  tone(659, t + 0.07, 0.12, 0.04);
}

export function playRetry() {
  tone(312, now(), 0.1, 0.028, "triangle");
}

export function playSparkle() {
  tone(880, now(), 0.08, 0.03, "sine");
}

export function playNiloCheer() {
  const t = now();
  tone(330, t, 0.1, 0.04);
  tone(392, t + 0.09, 0.1, 0.04);
  tone(494, t + 0.18, 0.16, 0.045);
}

export function playGrow() {
  playNiloCheer();
}

export function playNiloHello() {
  const t = now();
  tone(392, t, 0.1, 0.035);
  tone(494, t + 0.1, 0.12, 0.03);
}

export function playNiloOops() {
  tone(280, now(), 0.09, 0.025, "sine");
}

export function playLumiGlow() {
  const t = now();
  tone(740, t, 0.08, 0.02, "sine");
  tone(990, t + 0.07, 0.12, 0.018, "sine");
}

export function playCamiShift() {
  const t = now();
  tone(349, t, 0.07, 0.03, "triangle");
  tone(415, t + 0.08, 0.09, 0.028, "triangle");
}

export function playTikoKnock() {
  const t = now();
  tone(196, t, 0.05, 0.04, "square");
  tone(246, t + 0.06, 0.06, 0.03, "square");
}

export function playCritter(name: string) {
  if (name === "lumi" || name === "lumen") return playLumiGlow();
  if (name === "cami") return playCamiShift();
  if (name === "tiko") return playTikoKnock();
  if (name === "nilo") return playNiloHello();
  if (name === "rana") return playTap();
  if (name === "cometa" || name === "lucero") return playSparkle();
  playMicro();
}
