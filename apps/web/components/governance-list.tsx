"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function GovernanceList() {
  // Mock data
  const proposals = [
    { id: 1, title: "Increase Platform Fee", status: "Active", votes: "1.2M", endDate: "3 days" },
    { id: 2, title: "Add New Chain Support", status: "Pending", votes: "850K", endDate: "5 days" },
    { id: 3, title: "Treasury Allocation", status: "Succeeded", votes: "2.1M", endDate: "Ended" },
  ];

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{proposal.title}</CardTitle>
              <span className={`text-sm px-2 py-1 rounded-full ${
                proposal.status === "Active" ? "bg-green-100 text-green-800" :
                proposal.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {proposal.status}
              </span>
            </div>
            <CardDescription>
              {proposal.votes} votes · Ends in {proposal.endDate}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>View Proposal</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
