import { ShellLayout } from '../../../components/layout/ShellLayout';
import { Card } from '../../../components/ui/Card';

export default function TreasuryPage() {
  const metrics = [
    { label: 'Total Value Locked', value: '$2.4M', change: '+12.3%' },
    { label: 'Protocol Revenue (7d)', value: '$48.2K', change: '+5.1%' },
    { label: 'CAST Buybacks (7d)', value: '$12.8K', change: '+8.7%' },
    { label: 'Yield Generated (7d)', value: '$3.2K', change: '+2.4%' },
  ];

  return (
    <ShellLayout>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((m) => (
            <Card key={m.label}>
              <p className="text-[10px] text-slate-400">{m.label}</p>
              <p className="text-xl font-bold text-slate-100 mt-1">{m.value}</p>
              <p className="text-[10px] text-emerald-400 mt-0.5">{m.change}</p>
            </Card>
          ))}
        </div>
        <Card title="Treasury Allocation">
          <div className="space-y-2">
            {[
              { label: 'Liquidity Pools', pct: 45 },
              { label: 'CAST Buybacks', pct: 25 },
              { label: 'Development Fund', pct: 20 },
              { label: 'Community Grants', pct: 10 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-slate-400">{item.pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full">
                  <div
                    className="h-1.5 bg-cyan-500 rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ShellLayout>
  );
}
