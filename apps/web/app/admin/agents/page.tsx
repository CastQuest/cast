import { ShellLayout } from '../../../components/layout/ShellLayout';
import { Card } from '../../../components/ui/Card';

const agents = [
  { id: 'pricing-1', name: 'PricingAgent', status: 'active', tasks: 142, errors: 0 },
  { id: 'monitor-1', name: 'MonitoringAgent', status: 'active', tasks: 89, errors: 1 },
  { id: 'creation-1', name: 'CreationAgent', status: 'idle', tasks: 56, errors: 0 },
  { id: 'auction-1', name: 'AuctionAgent', status: 'active', tasks: 203, errors: 2 },
  { id: 'fraud-1', name: 'FraudAgent', status: 'active', tasks: 31, errors: 0 },
  { id: 'curation-1', name: 'CurationAgent', status: 'idle', tasks: 77, errors: 0 },
];

const statusColor: Record<string, string> = {
  active: 'bg-emerald-500',
  idle: 'bg-yellow-500',
  error: 'bg-red-500',
};

export default function AgentsPage() {
  return (
    <ShellLayout>
      <Card title="Agent Monitoring">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-left">
                <th className="pb-2 pr-4">ID</th>
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 pr-4">Tasks</th>
                <th className="pb-2">Errors</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id} className="border-b border-slate-800 text-slate-300">
                  <td className="py-2 pr-4 font-mono">{agent.id}</td>
                  <td className="py-2 pr-4">{agent.name}</td>
                  <td className="py-2 pr-4">
                    <span className="flex items-center gap-1">
                      <span className={`h-2 w-2 rounded-full ${statusColor[agent.status]}`} />
                      {agent.status}
                    </span>
                  </td>
                  <td className="py-2 pr-4">{agent.tasks}</td>
                  <td className={`py-2 ${agent.errors > 0 ? 'text-red-400' : ''}`}>{agent.errors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </ShellLayout>
  );
}
