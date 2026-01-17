import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Stats } from "@/components/stats";
import { CTA } from "@/components/cta";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </div>
  );
}
