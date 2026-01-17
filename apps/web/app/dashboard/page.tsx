import { ShellLayout } from "../../components/layout/ShellLayout";
import { McGraph } from "../../components/charts/McGraph";
import { TokenBalances } from "../../components/charts/TokenBalances";
import { ActivityStream } from "../../components/charts/ActivityStream";
import { BuybackFlowDiagram } from "../../components/flows/BuybackFlowDiagram";
import { BuilderToProtocolMap } from "../../components/flows/BuilderToProtocolMap";

export default function DashboardPage() {
  return (
    <ShellLayout>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <McGraph />
          <ActivityStream />
        </div>
        <div className="space-y-4">
          <TokenBalances />
          <BuybackFlowDiagram />
          <BuilderToProtocolMap />
        </div>
      </div>
    </ShellLayout>
  );
}
