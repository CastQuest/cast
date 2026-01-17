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
export default function Page() {
  return (
    <main className='min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-bold tracking-tight'>CASTQUEST V3</h1>
      <p className='text-slate-300 max-w-xl text-center'>
        Autonomous, multi-chain creative economy with AI builders, agents, L3s, sponsorship, and a unified marketplace.
      </p>
    </main>
  );
}
