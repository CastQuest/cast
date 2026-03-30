import { ShellLayout } from '../../../components/layout/ShellLayout';
import { Card } from '../../../components/ui/Card';

const auditLogs = [
  { id: 1, time: '2025-03-13 05:30:12', actor: '0xabc…def', action: 'MarketplaceListing', details: 'Listed GAME token #142' },
  { id: 2, time: '2025-03-13 05:28:44', actor: 'PricingAgent', action: 'PriceUpdate', details: 'CAST/USDC: $0.0412' },
  { id: 3, time: '2025-03-13 05:25:11', actor: '0xfed…123', action: 'GovernanceVote', details: 'Proposal #12 — Yes' },
  { id: 4, time: '2025-03-13 05:20:09', actor: 'FraudAgent', action: 'FlaggedActivity', details: 'Suspicious wallet 0x…' },
  { id: 5, time: '2025-03-13 05:15:33', actor: '0x111…222', action: 'TokenMint', details: 'MEDIA token #203 minted' },
];

export default function AuditPage() {
  return (
    <ShellLayout>
      <Card title="Audit Log">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-left">
                <th className="pb-2 pr-4">Time</th>
                <th className="pb-2 pr-4">Actor</th>
                <th className="pb-2 pr-4">Action</th>
                <th className="pb-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="border-b border-slate-800 text-slate-300">
                  <td className="py-2 pr-4 font-mono text-slate-400">{log.time}</td>
                  <td className="py-2 pr-4 font-mono">{log.actor}</td>
                  <td className="py-2 pr-4 text-cyan-400">{log.action}</td>
                  <td className="py-2 text-slate-400">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </ShellLayout>
  );
}
