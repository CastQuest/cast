"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuestList() {
  // Mock data
  const quests = [
    { id: 1, title: "Create Your First CAST", reward: "100 CQSP", difficulty: "Easy" },
    { id: 2, title: "Complete 10 Trades", reward: "500 CQSP", difficulty: "Medium" },
    { id: 3, title: "Join a SubDAO", reward: "250 CQSP", difficulty: "Easy" },
  ];

  return (
    <div className="space-y-4">
      {quests.map((quest) => (
        <Card key={quest.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{quest.title}</CardTitle>
              <span className="text-sm text-muted-foreground">{quest.difficulty}</span>
            </div>
            <CardDescription>Reward: {quest.reward}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Start Quest</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
