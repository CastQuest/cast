import React from "react";
import { Card } from "../ui/Card";

export function BuybackFlowDiagram() {
  return (
    <Card title="Buyback Flow — V3">
      <pre className="whitespace-pre-wrap text-[10px] text-slate-300">
{User Action
  → FeeManager (QUEST)
    → BuybackRouter
      → CAST buybacks (multi-chain)
        → Treasury + pools
          → MC update via indexers
            → Dashboards + agents}
      </pre>
    </Card>
  );
}
