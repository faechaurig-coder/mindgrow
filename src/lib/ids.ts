export function uid(prefix = "id"): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}${random}`;
}

export function weekKey(date = new Date()): string {
  const first = new Date(date.getFullYear(), 0, 1);
  const day = Math.floor((date.getTime() - first.getTime()) / 86400000);
  const week = Math.ceil((day + first.getDay() + 1) / 7);
  return `${date.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
