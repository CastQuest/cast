import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="container py-20">
      <div className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 p-12 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">Ready to Get Started?</h2>
        <p className="mb-8 text-lg opacity-90 md:text-xl">
          Join thousands of creators in the CASTQUEST ecosystem
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/casts/create">
            <Button size="lg" variant="secondary">
              Create Your First CAST
            </Button>
          </Link>
          <Link href="/docs">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Read Documentation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
