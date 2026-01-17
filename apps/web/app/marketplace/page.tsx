import { MarketplaceGrid } from "@/components/marketplace-grid";
import { MarketplaceFilters } from "@/components/marketplace-filters";

export default function MarketplacePage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground mt-2">
          Buy and sell NFTs on the CASTQUEST marketplace
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <MarketplaceFilters />
        </aside>
        <div className="md:col-span-3">
          <MarketplaceGrid />
        </div>
      </div>
export default function MarketplacePage() {
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Global Marketplace</h1>
      <p className='text-slate-300'>
        Global multi-chain marketplace, auctions, sponsor market, and L3 markets will render here.
      </p>
    </div>
  );
}
