# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2024-01-17

### Added

- Complete monorepo structure with Turborepo
- 13 core smart contracts (CAST, QUEST, MEDIA, FRAM, GAME, CODE, SponsorToken, GovernanceV2, SubDAOs, L3, Marketplace, Auctions, Sponsorship)
- Full TypeScript SDK with multi-chain support
- AI agent framework with 4 specialized agents
- Blockchain indexer with PostgreSQL and REST API
- Next.js 14 web application with App Router
- Tailwind CSS and ShadCN UI components
- Discord bot integration
- Comprehensive documentation site
- Docker and Kubernetes deployment configs
- Terraform infrastructure as code
- Multi-chain support (Ethereum, Base, Arbitrum)

### Smart Contracts

- CAST: ERC721 with royalties and content versioning
- QUEST: Bounty and challenge system
- MEDIA: IPFS-based media storage
- FRAM: Framework templates
- GAME: On-chain game mechanics
- CODE: Code repository management
- SponsorToken: ERC20 for sponsorship economy
- GovernanceV2: DAO governance with proposals
- SubDAOs: Hierarchical DAO structure
- L3: Layer 3 chain management
- Marketplace: NFT marketplace with listings
- Auctions: English auction system
- Sponsorship: Campaign management

### SDK

- CASTClient: NFT operations
- QuestClient: Quest management
- MarketplaceClient: Trading operations
- GovernanceClient: DAO participation

### Agents

- CASTAgent: NFT portfolio management
- QuestAgent: Quest recommendations
- MarketplaceAgent: Trading and pricing
- ContentGenerator: AI metadata generation

### Infrastructure

- PostgreSQL database schema
- Redis caching
- Kubernetes deployments
- AWS infrastructure (EKS, RDS, ElastiCache)
- Docker Compose for local development

[3.0.0]: https://github.com/castquest/cast/releases/tag/v3.0.0
