import React from "react";
import { Card } from "../ui/Card";

const tokens = [
  { symbol: "CAST", label: "Governance" },
  { symbol: "QUEST", label: "Fees + Buybacks" },
  { symbol: "MEDIA", label: "Content" },
  { symbol: "FRAM", label: "Frames / UI" },
  { symbol: "GAME", label: "Games" },
  { symbol: "CODE", label: "Code Modules" },
  { symbol: "SPONSOR", label: "Sponsorship" },
];

export function TokenBalances() {
  return (
    <Card title="Token Balances">
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        {tokens.map((t) => (
          <div
            key={t.symbol}
            className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950/40 px-2 py-1"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-slate-100">
                {t.symbol}
              </span>
              <span className="text-[10px] text-slate-500">
                {t.label}
              </span>
            </div>
            <span className="text-[11px] text-slate-300">
              0.00
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
