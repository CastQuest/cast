import React from "react";
import { Card } from "../ui/Card";

export function SocialAutomationFlow() {
  return (
    <Card title="Social Automation Flow">
      <pre className="whitespace-pre-wrap text-[10px] text-slate-300">
{On-chain events
  → SocialAutomationAgent
    → Bots (Farcaster / Reddit / X / Discord / Telegram)
      → Timeline + dashboards
        → Feedback into agents + governance}
      </pre>
    </Card>
  );
}
