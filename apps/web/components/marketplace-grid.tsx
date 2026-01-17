"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MarketplaceGrid() {
  // Mock data
  const listings = [
    { id: 1, title: "Rare NFT #1", price: "2.5 ETH", seller: "0x1234...5678" },
    { id: 2, title: "Digital Artwork", price: "1.8 ETH", seller: "0x8765...4321" },
    { id: 3, title: "Collectible", price: "0.9 ETH", seller: "0xabcd...ef01" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <Card key={listing.id}>
          <CardHeader>
            <CardTitle>{listing.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted rounded-md mb-4" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Seller:</span>
              <span>{listing.seller}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="text-lg font-bold">{listing.price}</span>
            <Button>Buy Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
