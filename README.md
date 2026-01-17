# CASTQUEST V3

> Autonomous multi-chain creative economy with AI builders, agents, L3 chains, global marketplace, sponsorship economy, and full Next.js UI/UX system.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Overview

CASTQUEST V3 is a comprehensive creative economy platform that combines:

- **Creative NFTs (CASTs)** - ERC721 tokens with royalty tracking and content versioning
- **Quest System** - Bounties, challenges, and missions with token rewards
- **Global Marketplace** - Multi-chain NFT trading with auctions
- **DAO Governance** - Decentralized decision-making with SubDAOs
- **Sponsorship Economy** - Token-based creator support system
- **AI Agents** - Autonomous agents for creative workflows
- **Layer 3 Infrastructure** - Multi-chain architecture for scalability
- **Full-Stack Web App** - Next.js 14 with App Router, Tailwind CSS, and ShadCN UI

## 📦 Monorepo Structure

```
cast/
├── apps/
│   └── web/                 # Next.js 14 web application
├── packages/
│   ├── contracts/           # Solidity smart contracts (Foundry)
│   ├── sdk/                 # TypeScript SDK
│   ├── agents/              # AI agent framework
│   └── indexer/             # Blockchain event indexer
├── bots/
│   └── discord-bot/         # Discord integration
├── docs-site/               # Nextra documentation
└── infra/                   # Infrastructure configs
    ├── docker/
    ├── kubernetes/
    └── terraform/
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- Foundry (for contracts)

### Installation

```bash
# Clone the repository
git clone https://github.com/castquest/cast.git
cd cast

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
```

### Development URLs

- Web App: http://localhost:3000
- Indexer API: http://localhost:3001
- Documentation: http://localhost:3002

## 📋 Smart Contracts

The platform includes 13 core smart contracts:

1. **CAST** - Core NFT with royalties and metadata
2. **QUEST** - Quest/bounty management system
3. **MEDIA** - IPFS-based media storage
4. **FRAM** - Framework and template management
5. **GAME** - On-chain game mechanics
6. **CODE** - Code repository and snippets
7. **SponsorToken** - ERC20 sponsorship token
8. **GovernanceV2** - DAO governance with proposals
9. **SubDAOs** - Hierarchical DAO structure
10. **L3** - Layer 3 chain management
11. **Marketplace** - NFT marketplace with listings
12. **Auctions** - English auction system
13. **Sponsorship** - Sponsorship campaign management

### Deploy Contracts

```bash
cd packages/contracts

# Install Foundry dependencies
forge install

# Compile contracts
forge build

# Run tests
forge test

# Deploy (set env vars first)
forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --broadcast
```

## 🔧 SDK Usage

```typescript
import { CastQuestClient } from "@castquest/sdk";

// Connect to the platform
const client = CastQuestClient.connect("https://rpc-url", {
  cast: "0x...",
  quest: "0x...",
  marketplace: "0x...",
  // ... other contract addresses
});

// Mint a CAST
const tokenId = await client.cast.mint(
  recipientAddress,
  "QmIPFSHash...",
  1000, // 10% royalty
  "ipfs://metadata-uri"
);

// Create a quest
const questId = await client.quest.createQuest(
  "Complete Tutorial",
  "Finish the onboarding",
  0, // Quest type
  ethers.parseEther("0.1"),
  Math.floor(Date.now() / 1000) + 86400 // 24 hours
);

// List on marketplace
const listingId = await client.marketplace.list(
  castAddress,
  tokenId,
  ethers.parseEther("1.0")
);
```

## 🤖 AI Agents

```typescript
import { CASTAgent, QuestAgent, ContentGenerator } from "@castquest/agents";

// Create agents
const castAgent = new CASTAgent(client, apiKey);
const questAgent = new QuestAgent(client);
const contentGen = new ContentGenerator(client, apiKey);

// Use agents
const analysis = await castAgent.execute("analyze", { creator: "0x..." });
const metadata = await contentGen.execute("generate-metadata", {
  title: "My Artwork",
  type: "Digital Art",
});
```

## 🔍 Indexer

The indexer monitors blockchain events and provides a GraphQL API:

```bash
cd packages/indexer

# Set environment variables
export DB_HOST=localhost
export DB_PORT=5432
export RPC_URL=https://...

# Start indexer
pnpm start
```

API endpoints:
- `GET /api/casts?creator=0x...`
- `GET /api/quests?creator=0x...`
- `GET /api/marketplace/listings`
- `GET /api/governance/proposals`

## 🐳 Docker Deployment

```bash
cd infra/docker
docker-compose up -d
```

## ☸️ Kubernetes Deployment

```bash
cd infra/kubernetes
kubectl apply -f .
```

## 🏗️ Terraform Infrastructure

```bash
cd infra/terraform
terraform init
terraform plan
terraform apply
```

## 📚 Documentation

Full documentation is available at `/docs-site` or run:

```bash
cd docs-site
pnpm dev
```

## 🎯 Features

### Web Application
- Next.js 14 with App Router
- Tailwind CSS styling
- ShadCN UI components
- Web3 wallet integration (wagmi)
- Multi-chain support

### Smart Contracts
- Solidity 0.8.23
- Foundry framework
- OpenZeppelin libraries
- Comprehensive test coverage
- Gas optimized

### SDK
- Full TypeScript support
- Type-safe contract interactions
- Multi-chain support
- Browser and Node.js compatible

### Agents
- Autonomous operations
- AI-powered content generation
- Market analysis
- Portfolio management

## 🛠️ Development

### Running Tests

```bash
# Test contracts
cd packages/contracts
forge test

# Test SDK
cd packages/sdk
pnpm test

# Test web app
cd apps/web
pnpm test
```

### Linting

```bash
pnpm lint
```

### Formatting

```bash
pnpm format
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- Website: https://castquest.io
- Documentation: https://docs.castquest.io
- Discord: https://discord.gg/castquest
- Twitter: https://twitter.com/castquest
- GitHub: https://github.com/castquest

## 🙏 Acknowledgments

Built with:
- Next.js
- Solidity & Foundry
- ethers.js
- Tailwind CSS
- ShadCN UI
- OpenZeppelin
- And many other amazing open-source projects

---

**CASTQUEST V3** - Building the future of creative economies 🚀
Autonomous, multi-chain creative economy with:

- AI builders (code, frame, game, UI)
- Agents (creation, pricing, auction, curation, fraud, sync, UI, portfolio, social)
- L3 chains
- Global multi-chain marketplace
- Sponsorship economy
- Autonomous treasury + yield
- DAO + AI DAO
- Full docs-site

This repo is scaffolded by V3-Bootstrap.ps1 and must be completed according to the CASTQUEST V3 Master Spec.
Use my local folder structure exactly as-is:

Root: D:\tools\repos\CastQuest\cast
Docs: D:\tools\repos\CastQuest\cast\docs-site

Do not invent folders.
Do not rename anything.
Follow this structure for all code, pages, and components.
