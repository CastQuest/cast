"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MarketplaceFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2 font-medium">Price Range</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Under 0.5 ETH
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              0.5 - 1 ETH
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              1 - 5 ETH
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Over 5 ETH
            </Button>
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-medium">Category</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              Art
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Music
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              3D Models
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Code
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
