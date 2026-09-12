"use client";

import type { ReactNode } from "react";

export function AppShell({
  children,
  mood = "parent",
}: {
  children: ReactNode;
  mood?: "parent" | "child";
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className={`phone-shell ${mood === "child" ? "child-sky" : "parent-paper"}`}>
        <div className="relative h-full min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
