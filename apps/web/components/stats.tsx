export function Stats() {
  const stats = [
    { label: "Total CASTs", value: "10,000+" },
    { label: "Active Quests", value: "500+" },
    { label: "Community Members", value: "50,000+" },
    { label: "Trading Volume", value: "$5M+" },
  ];

  return (
    <section className="border-y bg-muted/50 py-20">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 text-4xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
