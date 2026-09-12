export type HapticKind = "tap" | "success" | "major" | "errorSoft";

export function haptic(kind: HapticKind) {
  if (typeof navigator === "undefined" || !navigator.vibrate) return;
  const pattern = kind === "tap" ? 8 : kind === "success" ? 16 : kind === "major" ? [12, 40, 18] : 10;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* web no-op */
  }
}
