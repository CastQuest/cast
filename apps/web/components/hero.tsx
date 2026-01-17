import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container py-20 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Autonomous Multi-Chain
          </span>
          <br />
          Creative Economy
        </h1>
        <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
          AI builders, agents, L3 chains, global marketplace, and sponsorship economy
          powering the future of digital creativity
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/casts">
            <Button size="lg">Explore CASTs</Button>
          </Link>
          <Link href="/quests">
            <Button size="lg" variant="outline">
              Start Quests
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
