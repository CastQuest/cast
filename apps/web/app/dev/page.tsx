import { ShellLayout } from "../../components/layout/ShellLayout";
import { Card } from "../../components/ui/Card";

export default function DevPage() {
  return (
    <ShellLayout>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Contract Map">
          <p className="text-[11px] text-slate-300">
            Placeholder for mapping contracts (core, economy, governance, marketplace, L3, social) to networks and addresses.
          </p>
        </Card>
        <Card title="SDK Playground">
          <p className="text-[11px] text-slate-300">
            Placeholder for interactive SDK calls (wallet, media, fram, game, code, marketplace, agents, l3, bridge, governance, profile).
          </p>
        </Card>
        <Card title="Docs Links">
          <ul className="text-[11px] text-slate-300">
            <li>• docs-site/index.md</li>
            <li>• overview/architecture.md</li>
            <li>• protocol/constitution.md</li>
            <li>• protocol/ai-dao-constitution.md</li>
            <li>• marketplace/cross-chain-marketplace.md</li>
          </ul>
        </Card>
        <Card title="CI / Workflow Status">
          <p className="text-[11px] text-slate-300">
            Placeholder for surfacing buildui.yaml status, dependency health, and orchestration scripts.
          </p>
        </Card>
      </div>
    </ShellLayout>
  );
}
