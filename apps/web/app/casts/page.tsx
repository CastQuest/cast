import { CastGrid } from "@/components/cast-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CastsPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Explore CASTs</h1>
          <p className="text-muted-foreground mt-2">
            Discover creative assets from the CASTQUEST community
          </p>
        </div>
        <Link href="/casts/create">
          <Button>Create CAST</Button>
        </Link>
      </div>
      <CastGrid />
    </div>
  );
}
