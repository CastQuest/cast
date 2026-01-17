import React from "react";
import { Card } from "../ui/Card";

export function McGraph() {
  return (
    <Card title="Market Cap (MC) — V1 → V2 → V3">
      <div className="h-40 rounded-md border border-dashed border-slate-700 bg-slate-950/40 p-3 text-[11px] text-slate-400">
        [MC chart placeholder]  
        MC = Σ(MEDIA + FRAM + GAME + CODE + SubDAO + L3) + buyback_multiplier  
        • V1: MEDIA-only, Base-only  
        • V2: Multi-chain, multi-asset  
        • V3: Adds sponsorship, AI DAO, treasury yield
      </div>
    </Card>
  );
}
