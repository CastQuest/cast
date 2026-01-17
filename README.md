# CASTQUEST V3  
### Autonomous Multi‑Chain Creative Economy

CASTQUEST V3 is the complete implementation of the CASTQUEST Protocol — an autonomous, multi‑chain creative economy powered by AI builders, agents, L3 creator chains, a global marketplace, sponsorship economy, and a full Next.js V3 UI/UX system.

This monorepo contains:

- **Next.js V3 UI/UX system** (App Router, Tailwind, ShadCN)
- **Full contract suite** (CAST, QUEST, MEDIA, FRAM, GAME, CODE, SponsorToken, GovernanceV2, SubDAOs, L3, Marketplace, Auctions, Sponsorship)
- **AI Builders** (Code, Frame, Game, UI)
- **Agents** (Creation, Frame, Game, Pricing, Auction, Curation, Fraud, Sync, UI, Portfolio, Social Automation)
- **SDK** (typed, deterministic, multi‑chain aware)
- **Indexers** (MC indexer, buyback indexer, social indexer)
- **Bots** (Farcaster, Reddit, X, Discord, Telegram)
- **Docs‑Site** (full protocol documentation)
- **Infra** (orchestration, CI/CD, deployment)

---

## 📦 Monorepo Structure

castquest-frames/
├── package.json
├── turbo.json  / nx.json  / v3-workspace.yaml
│
├── apps/
│   └── web/
│       ├── app/
│       │   ├── page.tsx
│       │   ├── dashboard/page.tsx
│       │   ├── admin/page.tsx
│       │   ├── dev/page.tsx
│       │   ├── marketplace/page.tsx
│       │   ├── builders/
│       │   │   ├── code/page.tsx
│       │   │   ├── frame/page.tsx
│       │   │   ├── game/page.tsx
│       │   │   └── ui/page.tsx
│       │   ├── farcaster/
│       │   │   ├── import/page.tsx
│       │   │   └── timeline/page.tsx
│       │   ├── social-automation/page.tsx
│       │   ├── dao/
│       │   │   ├── page.tsx
│       │   │   ├── constitution.tsx
│       │   │   └── treasury.tsx
│       │   ├── subdaos/[subdaoId]/page.tsx
│       │   ├── tokens/page.tsx
│       │   ├── settings/page.tsx
│       │   └── docs/page.tsx
│       │
│       ├── components/
│       │   ├── ui/
│       │   ├── charts/
│       │   │   ├── McChart.tsx
│       │   │   └── TokenPie.tsx
│       │   ├── flows/
│       │   │   ├── BuybackFlowDiagram.tsx
│       │   │   ├── BuilderToProtocolMap.tsx
│       │   │   ├── GovernanceFlowDiagram.tsx
│       │   │   └── SocialAutomationFlow.tsx
│       │   ├── layout/
│       │   └── seo/
│       │       ├── MetaTags.tsx
│       │       └── StructuredData.tsx
│       │
│       └── public/
│           ├── assets/
│           │   ├── diagrams/v3-architecture.svg
│           │   ├── logos/
│           │   ├── tokens/
│           │   └── ui-templates/
│           └── styles/
│               ├── globals.css
│               └── theme.css
│
├── packages/
│   ├── contracts/
│   │   ├── core/
│   │   │   ├── CastToken.sol
│   │   │   ├── QuestToken.sol
│   │   │   ├── MediaToken.sol
│   │   │   ├── FramToken.sol
│   │   │   ├── GameToken.sol
│   │   │   ├── CodeToken.sol
│   │   │   └── UserProfile.sol
│   │   ├── economy/
│   │   │   ├── FeeManager.sol
│   │   │   ├── BuybackRouter.sol
│   │   │   ├── RevenueRouter.sol
│   │   │   └── SponsorToken.sol
│   │   ├── governance/
│   │   │   ├── GovernanceV2.sol
│   │   │   ├── AgentRegistry.sol
│   │   │   ├── SubDAOFactory.sol
│   │   │   └── AIDaoConstitution.sol
│   │   ├── l3/
│   │   │   ├── RollupFactory.sol
│   │   │   └── L3Bridge.sol
│   │   ├── marketplace/
│   │   │   ├── Marketplace.sol
│   │   │   ├── AuctionHouse.sol
│   │   │   └── SponsorMarketplace.sol
│   │   └── social/
│   │       ├── FarcasterFrameRegistry.sol
│   │       └── SocialAutomationConfig.sol
│   │
│   ├── sdk/
│   │   ├── index.ts
│   │   ├── wallet.ts
│   │   ├── media.ts
│   │   ├── fram.ts
│   │   ├── game.ts
│   │   ├── code.ts
│   │   ├── marketplace.ts
│   │   ├── agents.ts
│   │   ├── l3.ts
│   │   ├── bridge.ts
│   │   ├── governance.ts
│   │   └── profile.ts
│   │
│   ├── agents/
│   │   ├── CreationAgent.ts
│   │   ├── FrameAgent.ts
│   │   ├── GameAgent.ts
│   │   ├── PricingAgent.ts
│   │   ├── AuctionAgent.ts
│   │   ├── CurationAgent.ts
│   │   ├── FraudAgent.ts
│   │   ├── SyncAgent.ts
│   │   ├── UiAgent.ts
│   │   ├── PortfolioAgent.ts
│   │   └── SocialAutomationAgent.ts
│   │
│   └── indexer/
│       ├── mc-indexer.ts
│       ├── buyback-indexer.ts
│       └── social-indexer.ts
│
├── bots/
│   ├── farcaster-bot/
│   ├── reddit-bot/
│   ├── x-bot/
│   ├── discord-bot/
│   └── telegram-bot/
│
├── docs-site/
│   ├── index.md
│   ├── overview/
│   ├── protocol/
│   ├── tokens/
│   ├── agents/
│   ├── marketplace/
│   ├── builders/
│   ├── sdk/
│   ├── l3/
│   ├── integrations/
│   └── seo/
│
└── infra/
├── vercel/
├── github-actions/
└── Orchestration.ps1

Code

---

## 🚀 Vision

CASTQUEST V3 enables creators, sponsors, and agents to coordinate through:

- Multi‑chain assets  
- AI‑assisted creation  
- Autonomous treasury + yield  
- Global multi‑chain marketplace  
- L3 creator chains  
- Sponsor economy  
- SubDAOs  
- AI DAO governance  

Everything is deterministic, indexer‑verified, and designed for long‑term autonomy.

---

## 🛠 Development

### Install dependencies

pnpm install

Code

### Run the web app

pnpm dev

Code

### Build contracts

cd packages/contracts
forge build

Code

### Run docs-site

cd docs-site
pnpm dev

Code

---

## 📚 Documentation

Full documentation lives in `docs-site/`, including:

- Protocol Constitution  
- AI DAO Constitution  
- Tokenomics  
- Marketplace  
- Agents  
- Builders  
- SDK  
- L3  
- Governance  
- Treasury  
- Integrations  
- SEO  
- V1→V2 Migration  
- V2→V3 Migration  

---

## 🤝 Contributing

CASTQUEST V3 is designed as an open, extensible protocol.  
Contributions are welcome across all modules.

---

## GXQ STUDIO 🛡 License

Apache License.
