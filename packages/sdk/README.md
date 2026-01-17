# @castquest/sdk

TypeScript SDK for interacting with CASTQUEST V3 smart contracts.

## Installation

```bash
npm install @castquest/sdk ethers
```

## Usage

```typescript
import { CastQuestClient } from "@castquest/sdk";

// Connect with read-only access
const client = CastQuestClient.connect("https://rpc-url", {
  cast: "0x...",
  quest: "0x...",
  // ... other contract addresses
});

// Connect with signer for write operations
const clientWithSigner = CastQuestClient.connectWithSigner(
  "https://rpc-url",
  "PRIVATE_KEY",
  contractAddresses
);

// Mint a CAST
const tokenId = await clientWithSigner.cast.mint(
  "0xRecipient...",
  "QmIPFSHash...",
  1000, // 10% royalty
  "ipfs://metadata-uri"
);

// Create a quest
const questId = await clientWithSigner.quest.createQuest(
  "Complete Tutorial",
  "Finish the onboarding tutorial",
  0, // Quest type
  ethers.parseEther("0.1"),
  Math.floor(Date.now() / 1000) + 86400, // 24 hours
  0n // No CAST required
);

// List on marketplace
const listingId = await clientWithSigner.marketplace.list(
  castContractAddress,
  tokenId,
  ethers.parseEther("1.0")
);
```

## API

### CASTClient

- `mint(to, contentHash, royaltyBps, uri)` - Mint new CAST NFT
- `getOwner(tokenId)` - Get token owner
- `getMetadata(tokenId)` - Get CAST metadata
- `getCastsByCreator(creator)` - Get all CASTs by creator
- `updateContentHash(tokenId, newHash)` - Update content hash
- `getRoyaltyInfo(tokenId, salePrice)` - Get royalty information

### QuestClient

- `createQuest(...)` - Create new quest
- `joinQuest(questId)` - Join existing quest
- `completeQuest(questId, winner)` - Mark quest as complete
- `getQuestsByUser(user)` - Get quests by user
- `getQuest(questId)` - Get quest details

### MarketplaceClient

- `list(nftContract, tokenId, price)` - List NFT for sale
- `buy(listingId, price)` - Buy listed NFT
- `cancelListing(listingId)` - Cancel listing
- `makeOffer(listingId, amount, expiresAt)` - Make offer on listing
- `getListing(listingId)` - Get listing details
- `getUserListings(user)` - Get user's listings

### GovernanceClient

- `propose(...)` - Create governance proposal
- `castVote(proposalId, support)` - Vote on proposal
- `executeProposal(proposalId)` - Execute passed proposal
- `getProposalState(proposalId)` - Get proposal state
- `hasVoted(proposalId, voter)` - Check if address voted

## License

MIT
