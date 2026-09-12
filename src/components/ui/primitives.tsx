"use client";

import type { ReactNode } from "react";

export function PrimaryButton({
  children,
  onClick,
  tone = "navy",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: "navy" | "amber" | "sage";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const bg =
    tone === "amber"
      ? "bg-[linear-gradient(180deg,#f0c56a_0%,#d4923c_52%,#b07428_100%)]"
      : tone === "sage"
        ? "bg-[linear-gradient(180deg,#7ea072_0%,#4f7a62_55%,#355545_100%)]"
        : "bg-[linear-gradient(180deg,#2a3d62_0%,#16233d_56%,#0e1628_100%)]";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn-3d w-full rounded-full ${bg} px-5 py-4 text-[16px] font-semibold tracking-wide text-white disabled:opacity-40`}
      style={{ textShadow: "0 1px 0 rgba(0,0,0,0.18)" }}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="w-full py-3 text-[15px] font-medium text-[#4f7a62]">
      {children}
    </button>
  );
}

export function ChoiceChip({
  label,
  selected,
  onClick,
  emoji,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  emoji?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl px-3 py-3 text-left text-[15px] transition ${
        selected
          ? "btn-3d bg-[linear-gradient(180deg,#2a3d62,#16233d)] text-white"
          : "tile-3d text-[#243044]"
      }`}
    >
      {emoji ? <span className="mr-2">{emoji}</span> : null}
      {label}
    </button>
  );
}

export function Dots({ value, muted }: { value: number; muted?: boolean }) {
  return (
    <div className="flex gap-1.5" aria-label={`${value} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 rounded-full ${
            i < value
              ? muted
                ? "bg-[#d4923c99] shadow-[0_0_8px_#d4923c55]"
                : "bg-[#d4923c] shadow-[0_0_10px_#d4923c88]"
              : "bg-[#16233d18]"
          }`}
        />
      ))}
    </div>
  );
}

export function ProgressPips({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex justify-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 rounded-full transition-all ${
            i === current ? "w-7 bg-white shadow-[0_0_10px_#fff]" : i < current ? "w-2 bg-white/85" : "w-2 bg-white/25"
          }`}
        />
      ))}
    </div>
  );
}
