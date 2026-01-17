import { ShellLayout } from "../../components/layout/ShellLayout";
import { Card } from "../../components/ui/Card";
import { GovernanceFlowDiagram } from "../../components/flows/GovernanceFlowDiagram";

export default function AdminPage() {
  return (
    <ShellLayout>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card title="System Health (PR48–PR66)">
            <ul className="text-[11px] text-slate-300">
              <li>• Contracts compiled</li>
              <li>• SDK built</li>
              <li>• Agents registered</li>
              <li>• Docs-site generated</li>
              <li>• Dependency health (Issue #66) — surfaced via CI</li>
            </ul>
          </Card>
          <Card title="Agent Control">
            <p className="text-[11px] text-slate-300">
              Placeholder for enabling/disabling agents (Creation, Frame, Game, Pricing, Auction, Curation, Fraud, Sync, UI, Portfolio, SocialAutomation).
            </p>
          </Card>
          <GovernanceFlowDiagram />
        </div>
        <div className="space-y-4">
          <Card title="Treasury + Yield Strategies">
            <p className="text-[11px] text-slate-300">
              Placeholder for autonomous treasury strategies, yield allocations, and sponsor overlays.
            </p>
          </Card>
          <Card title="DAO + SubDAOs">
            <p className="text-[11px] text-slate-300">
              Placeholder for DAO metrics, SubDAO list, and governance status.
            </p>
          </Card>
        </div>
      </div>
    </ShellLayout>
  );
}
