import React from "react";
import { Card } from "../ui/Card";

const events = [
  "[Farcaster] Frame minted → FRAM",
  "[Marketplace] MEDIA listed on Base",
  "[DAO] Proposal #12: Adjust buyback multiplier",
  "[Treasury] Yield strategy rebalanced",
  "[Social] X bot posted auction summary",
];

export function ActivityStream() {
  return (
    <Card title="Activity Stream (On-chain + Social)">
      <ul className="flex flex-col gap-1 text-[11px] text-slate-300">
        {events.map((e, idx) => (
          <li
            key={idx}
            className="rounded-md border border-slate-800 bg-slate-950/40 px-2 py-1"
          >
            {e}
          </li>
        ))}
      </ul>
    </Card>
  );
}
