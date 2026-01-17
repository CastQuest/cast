# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.1] - 2024-01-17

### Security

- Updated Next.js from 14.1.0 to 14.2.35 to fix multiple security vulnerabilities:
  - CVE: Denial of Service with Server Components (patched in 14.2.34-14.2.35)
  - CVE: Authorization bypass vulnerability (patched in 14.2.15)
  - CVE: Cache Poisoning (patched in 14.2.10)
  - CVE: Server-Side Request Forgery in Server Actions (patched in 14.1.1)
  - CVE: Authorization Bypass in Middleware (patched in 14.2.25)
- Updated LangChain from 0.1.7 to 0.3.80 to fix serialization injection vulnerability (patched in 0.3.37-0.3.80)
- Updated @langchain/openai from 0.0.12 to 0.3.14 for compatibility

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

[3.0.1]: https://github.com/castquest/cast/releases/tag/v3.0.1
[3.0.0]: https://github.com/castquest/cast/releases/tag/v3.0.0
