"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CastGrid() {
  // Mock data - in production, fetch from API
  const casts = [
    { id: 1, title: "Digital Art #1", creator: "0x1234...5678", price: "0.5 ETH" },
    { id: 2, title: "3D Model", creator: "0x8765...4321", price: "1.2 ETH" },
    { id: 3, title: "Music Track", creator: "0xabcd...ef01", price: "0.3 ETH" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {casts.map((cast) => (
        <Card key={cast.id}>
          <CardHeader>
            <CardTitle>{cast.title}</CardTitle>
            <CardDescription>by {cast.creator}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted rounded-md" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="font-semibold">{cast.price}</span>
            <Button size="sm">View Details</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
