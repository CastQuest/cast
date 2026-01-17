import React from "react";
import { Card } from "../ui/Card";

export function GovernanceFlowDiagram() {
  return (
    <Card title="Governance + AI DAO Flow">
      <pre className="whitespace-pre-wrap text-[10px] text-slate-300">
{CAST holders
  → GovernanceV2
    → Proposals (parameters, agents, treasury)
      → AI DAO (advisory, analysis)
        → Execution (timelock, contracts)
          → Indexers + dashboards}
      </pre>
    </Card>
  );
}
