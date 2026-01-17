import { QuestList } from "@/components/quest-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function QuestsPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Quests</h1>
          <p className="text-muted-foreground mt-2">
            Complete quests and earn rewards
          </p>
        </div>
        <Link href="/quests/create">
          <Button>Create Quest</Button>
        </Link>
      </div>
      <QuestList />
    </div>
  );
}
