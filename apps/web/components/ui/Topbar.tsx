"use client";

import React from "react";

export function Topbar() {
  return (
    <header className="cq-topbar flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-4 py-3">
      <div className="text-sm font-medium text-slate-200">
        CASTQUEST V3 — Autonomous Creative Economy
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span>Network: Base + L2s + L3s + Solana</span>
        <span className="h-1 w-1 rounded-full bg-emerald-400" />
        <span>PR48–PR66 aligned</span>
      </div>
    </header>
  );
}
