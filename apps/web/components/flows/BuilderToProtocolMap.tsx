import React from "react";
import { Card } from "../ui/Card";

export function BuilderToProtocolMap() {
  return (
    <Card title="Builder → Protocol Integration Map">
      <pre className="whitespace-pre-wrap text-[10px] text-slate-300">
{AI Builder (Code / Frame / Game / UI)
  → SDK (media / fram / game / code)
    → Contracts (MediaToken / FramToken / GameToken / CodeToken)
      → Marketplace (listings, auctions, sponsors)
        → MC + SubDAO + L3
          → Dashboards + agents + social automation}
      </pre>
    </Card>
  );
}
