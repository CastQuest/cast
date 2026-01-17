export interface Cast {
  tokenId: bigint;
  creator: string;
  createdAt: bigint;
  royaltyBps: bigint;
  contentHash: string;
  isActive: boolean;
}

export interface Quest {
  id: bigint;
  creator: string;
  title: string;
  description: string;
  questType: number;
  reward: bigint;
  deadline: bigint;
  status: number;
}

export interface Listing {
  listingId: bigint;
  seller: string;
  nftContract: string;
  tokenId: bigint;
  price: bigint;
  isActive: boolean;
}

export interface Proposal {
  id: bigint;
  proposer: string;
  title: string;
  description: string;
  startBlock: bigint;
  endBlock: bigint;
  forVotes: bigint;
  againstVotes: bigint;
  state: number;
}
