import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Creative NFTs",
    description: "Mint and trade unique digital assets with royalty tracking",
    icon: "🎨",
  },
  {
    title: "Quest System",
    description: "Complete bounties and challenges to earn rewards",
    icon: "🎯",
  },
  {
    title: "Global Marketplace",
    description: "Buy, sell, and auction NFTs across multiple chains",
    icon: "🏪",
  },
  {
    title: "DAO Governance",
    description: "Participate in decentralized decision-making",
    icon: "🗳️",
  },
  {
    title: "Sponsorship Economy",
    description: "Support creators and projects with token-based sponsorships",
    icon: "💰",
  },
  {
    title: "AI Agents",
    description: "Leverage autonomous agents for creative workflows",
    icon: "🤖",
  },
];

export function Features() {
  return (
    <section className="container py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">Powerful Features</h2>
        <p className="text-muted-foreground md:text-lg">
          Everything you need for a thriving creative economy
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <div className="mb-2 text-4xl">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
