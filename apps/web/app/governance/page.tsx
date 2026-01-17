import { GovernanceList } from "@/components/governance-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GovernancePage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Governance</h1>
          <p className="text-muted-foreground mt-2">
            Participate in DAO decision-making
          </p>
        </div>
        <Link href="/governance/propose">
          <Button>Create Proposal</Button>
        </Link>
      </div>
      <GovernanceList />
    </div>
  );
}
