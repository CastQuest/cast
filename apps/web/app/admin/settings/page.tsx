import { ShellLayout } from '../../../components/layout/ShellLayout';
import { Card } from '../../../components/ui/Card';

export default function SettingsPage() {
  return (
    <ShellLayout>
      <div className="space-y-4 max-w-xl">
        <Card title="Protocol Settings">
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Protocol Fee</span>
              <span className="font-mono text-cyan-400">2.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Buyback Rate</span>
              <span className="font-mono text-cyan-400">20%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Min Stake</span>
              <span className="font-mono text-cyan-400">100 CAST</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Governance Quorum</span>
              <span className="font-mono text-cyan-400">10%</span>
            </div>
          </div>
        </Card>
        <Card title="Network Configuration">
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Primary Chain</span>
              <span className="font-mono text-cyan-400">Base (8453)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">L3 Rollup</span>
              <span className="font-mono text-cyan-400">Active</span>
            </div>
          </div>
        </Card>
        <Card title="Agent Configuration">
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Max Concurrent Agents</span>
              <span className="font-mono text-cyan-400">10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Agent Timeout</span>
              <span className="font-mono text-cyan-400">30s</span>
            </div>
          </div>
        </Card>
      </div>
    </ShellLayout>
  );
}
