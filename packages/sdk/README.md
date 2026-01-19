# @castquest/sdk

TypeScript SDK for interacting with the CASTQUEST V3 protocol.

## Installation

```bash
npm install @castquest/sdk
# or
pnpm add @castquest/sdk
```

## Usage

```typescript
import { Wallet, Marketplace, Agents } from '@castquest/sdk';

// Initialize SDK
const sdk = new CastQuestSDK({
  provider: 'https://mainnet.base.org',
  chainId: 8453,
});

// Use SDK methods
const balance = await sdk.wallet.getBalance(address);
const listings = await sdk.marketplace.getListings();
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm run build

# Test
pnpm run test

# Lint
pnpm run lint
```

## Documentation

Full documentation: https://docs.castquest.io/sdk

## License

MIT
