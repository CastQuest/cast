# @castquest/indexer

Blockchain event indexer and API for CASTQUEST V3.

## Features

- Real-time event indexing from smart contracts
- PostgreSQL database storage
- REST API for querying indexed data
- Historical event backfilling

## Installation

```bash
npm install @castquest/indexer
```

## Setup

1. Create a PostgreSQL database
2. Set environment variables:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=castquest
DB_USER=postgres
DB_PASSWORD=yourpassword
RPC_URL=https://your-rpc-url
CAST_ADDRESS=0x...
QUEST_ADDRESS=0x...
MARKETPLACE_ADDRESS=0x...
GOVERNANCE_ADDRESS=0x...
PORT=3001
```

3. Run the indexer:

```bash
npm start
```

## API Endpoints

### GET /health
Health check endpoint

### GET /api/casts?creator=0x...
Get CASTs by creator address

### GET /api/quests?creator=0x...
Get quests by creator address

### GET /api/marketplace/listings
Get active marketplace listings

### GET /api/governance/proposals
Get governance proposals

### GET /api/stats
Get platform statistics

## Database Schema

The indexer creates the following tables:
- `casts` - CAST NFT mints and updates
- `quests` - Quest creation and completion
- `marketplace_listings` - Marketplace listings and sales
- `proposals` - Governance proposals and votes

## License

MIT
