# CASTQUEST V3  
### Autonomous Multi‑Chain Creative Economy

CASTQUEST V3 is the first public stable release of the CASTQUEST Protocol — a fully autonomous, multi‑chain creative economy powered by AI builders, agents, L3 chains, a global marketplace, sponsorship economy, and an extensible governance + treasury system.

This repository contains the complete CASTQUEST V3 implementation:

- **Next.js V3 UI/UX system** (App Router + Tailwind + ShadCN)
- **Full contract suite** (CAST, QUEST, MEDIA, FRAM, GAME, CODE, SponsorToken, GovernanceV2, SubDAOs, L3, Marketplace, Auctions, Sponsorship)
- **AI Builders** (Code, Frame, Game, UI)
- **Agents** (Creation, Frame, Game, Pricing, Auction, Curation, Fraud, Sync, UI, Portfolio, Social Automation)
- **SDK** (typed, deterministic, multi‑chain aware)
- **Indexers** (MC indexer, buyback indexer, social indexer)
- **Bots** (Farcaster, Reddit, X, Discord, Telegram)
- **Docs‑Site** (full protocol documentation, V1→V2→V3 migration guides)
- **Infra** (orchestration, CI/CD, deployment)

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

## 📦 Monorepo Structure

castquest-frames/
apps/web/              # Next.js  UI/UX system
packages/contracts/    # Solidity + Solana programs
packages/sdk/          # Unified SDK
packages/agents/       # AI + automation agents
packages/indexer/      # Indexers (MC, buybacks, social)
bots/                  # Farcaster, Reddit, X, Discord, Telegram
docs-site/             # Full documentation
infra/                 # Orchestration + CI/CD



---

## 🧩 Features

### **AI Builders**
- Code Builder  
- Frame Builder  
- Game Builder  
- UI Builder  

### **Agents**
- Creation  
- Frame  
- Game  
- Pricing  
- Auction  
- Curation  
- Fraud  
- Sync  
- UI  
- Portfolio  
- Social Automation  

### **Marketplace**
- Global multi‑chain marketplace  
- L3 marketplace  
- Solana marketplace  
- Sponsor marketplace  
- Auctions  

### **L3 Chains**
- Creator‑owned L3s  
- Local governance  
- Local royalties  
- Local MC  
- Local sponsorship rules  

### **Governance**
- CAST voting  
- GovernanceV2  
- AI DAO Constitution  
- SubDAOs  
- Timelocks  

### **Treasury**
- Autonomous yield strategies  
- Sponsor overlays  
- Multi‑chain routing  

---

## 🛠 Development

### Install dependencies
### Run the web app   npm install

### Build contracts  npm run dev:web

### Run docs-site  npm run docs:dev


---

## 📚 Documentation

Full documentation lives in: docs-site/

Including:

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
Contributions are welcome across:

- Contracts  
- SDK  
- Agents  
- UI/UX  
- Indexers  
- Docs  
- Builders  
- L3 templates  

---

## GXQ STUDIO 🛡 License Apache 

Apache License.

---

## 🌐 Community

Coming soon: Discord, Farcaster channel, and contributor guides.


This repo MUST match the following high-level structure:

- package.json (workspaces: apps/*, packages/*, bots/*, docs-site)
- turbo.json / nx.json / v3-workspace.yaml (pipelines for web, contracts, sdk, bots, docs-site)

- apps/
  - web/ (Next.js V3 UI/UX system)
    - app/
      - page.tsx                      # Landing / marketing
      - dashboard/page.tsx            # User dashboard
      - admin/page.tsx                # Admin dashboard
      - dev/page.tsx                  # Dev dashboard
      - marketplace/page.tsx          # Global multi-chain marketplace
      - builders/
        - code/page.tsx               # AI code builder
        - frame/page.tsx              # AI frame builder
        - game/page.tsx               # AI game builder
        - ui/page.tsx                 # AI UI/UX builder
      - farcaster/
        - import/page.tsx             # Frame importer
        - timeline/page.tsx           # Social timeline
      - social-automation/page.tsx    # Reddit / X / Discord / Telegram flows
      - dao/
        - page.tsx                    # DAO dashboard
        - constitution.tsx            # Render protocol + AI DAO constitution
        - treasury.tsx                # Autonomous treasury + yield
      - subdaos/[subdaoId]/page.tsx   # Creator SubDAO UI
      - tokens/page.tsx               # User tokens, launch, stats
      - settings/page.tsx
      - docs/page.tsx                 # In-app docs viewer (docs-site embed)
    - components/
      - ui/                           # Design system (buttons, cards, modals, inputs)
      - charts/
        - McChart.tsx                 # MC over time
        - TokenPie.tsx
      - flows/
        - BuybackFlowDiagram.tsx      # Buyback flow (V1→V2→V3)
        - BuilderToProtocolMap.tsx    # Builder → protocol integration map
        - GovernanceFlowDiagram.tsx   # Governance + AI DAO flow
        - SocialAutomationFlow.tsx    # Social automation flow
      - layout/
      - seo/
        - MetaTags.tsx
        - StructuredData.tsx
    - public/
      - assets/
        - diagrams/
          - v3-architecture.svg       # SVG-ready architecture diagram
        - logos/
        - tokens/
        - ui-templates/
      - styles/
        - globals.css
        - theme.css

- packages/
  - contracts/
    - core/
      - CastToken.sol                 # CAST (governance)
      - QuestToken.sol                # QUEST (fees + buybacks)
      - MediaToken.sol                # MEDIA
      - FramToken.sol                 # FRAM
      - GameToken.sol                 # GAME
      - CodeToken.sol                 # CODE
      - UserProfile.sol               # User MC + balances
    - economy/
      - FeeManager.sol                # Fee routing
      - BuybackRouter.sol             # Buyback engine (V1→V2→V3)
      - RevenueRouter.sol             # Global sponsorship flows
      - SponsorToken.sol              # SponsorToken
    - governance/
      - GovernanceV2.sol              # Core DAO
      - AgentRegistry.sol             # Agent permissions
      - SubDAOFactory.sol             # SubDAO deployment
      - AIDaoConstitution.sol         # AI DAO constitution
    - l3/
      - RollupFactory.sol             # Creator L3 chains
      - L3Bridge.sol                  # L3 <→ Base bridge
    - marketplace/
      - Marketplace.sol               # Global multi-chain marketplace
      - AuctionHouse.sol              # Auctions
      - SponsorMarketplace.sol        # Sponsor marketplace
    - social/
      - FarcasterFrameRegistry.sol    # Frames → FRAM
      - SocialAutomationConfig.sol    # Social automation config

  - sdk/
    - index.ts
    - wallet.ts
    - media.ts
    - fram.ts
    - game.ts
    - code.ts
    - marketplace.ts
    - agents.ts
    - l3.ts
    - bridge.ts
    - governance.ts
    - profile.ts                      # getMC(), getAssets(), getLaunchedTokens()

  - agents/
    - CreationAgent.ts
    - FrameAgent.ts
    - GameAgent.ts
    - PricingAgent.ts
    - AuctionAgent.ts
    - CurationAgent.ts
    - FraudAgent.ts
    - SyncAgent.ts
    - UiAgent.ts
    - PortfolioAgent.ts
    - SocialAutomationAgent.ts

  - indexer/
    - mc-indexer.ts                   # User MC + graph balances
    - buyback-indexer.ts              # Buyback events
    - social-indexer.ts               # Social streams

- bots/
  - farcaster-bot/
  - reddit-bot/
  - x-bot/
  - discord-bot/
  - telegram-bot/

- docs-site/
  - index.md
  - overview/
    - what-is-castquest.md
    - architecture.md                 # V1 + V2 + V3 architecture
    - v1-to-v2-migration.md
    - v2-to-v3-migration.md
    - tokenomics.md
    - glossary.md
    - faq.md
  - protocol/
    - constitution.md                 # Protocol constitution
    - ai-dao-constitution.md          # AI DAO constitution
    - governance.md
    - treasury.md
    - buybacks.md
    - fees.md
    - mc-calculation.md
    - multi-chain.md
    - solana-integration.md
    - l3-chains.md
    - subdaos.md
  - tokens/
    - cast.md
    - quest.md
    - media.md
    - fram.md
    - game.md
    - code.md
    - sponsor-token.md
  - agents/
    - agent-overview.md
    - creation-agent.md
    - frame-agent.md
    - game-agent.md
    - pricing-agent.md
    - auction-agent.md
    - curation-agent.md
    - fraud-agent.md
    - sync-agent.md
    - ui-agent.md
    - portfolio-agent.md
    - social-automation-agent.md
  - marketplace/
    - marketplace-overview.md
    - listings.md
    - auctions.md
    - cross-chain-marketplace.md
    - solana-marketplace.md
    - sponsor-marketplace.md
    - marketplace-flows.md
  - builders/
    - ai-code-builder.md
    - ai-frame-builder.md
    - ai-game-builder.md
    - ai-ui-builder.md
    - builder-flows.md
  - sdk/
    - sdk-reference.md
    - wallet.md
    - media.md
    - fram.md
    - game.md
    - code.md
    - marketplace.md
    - agents.md
    - l3.md
    - bridge.md
    - governance.md
    - profile.md
  - l3/
    - l3-overview.md
    - l3-deployment-guide.md
    - rollup-factory.md
    - l3-bridge.md
    - l3-marketplace.md
    - l3-governance.md
  - integrations/
    - github.md
    - vercel.md
    - netlify.md
    - render.md
    - telegram.md
    - discord.md
    - reddit.md
    - x.md
    - google-login.md
    - facebook-login.md
    - wallet-login.md
  - seo/
    - seo-engine.md
    - geo-engine.md
    - sitemap.md

- infra/
  - vercel/
  - github-actions/
  - Orchestration.ps1

- README.md

-----------------------------------------
MASTER SPEC (YOU MUST IMPLEMENT TO MATCH)
-----------------------------------------

1. Protocol:
   - Implement all contracts in packages/contracts exactly as named above.
   - Ensure CAST, QUEST, MEDIA, FRAM, GAME, CODE, SponsorToken, UserProfile, GovernanceV2, AgentRegistry, SubDAOFactory, AIDaoConstitution, RollupFactory, L3Bridge, Marketplace, AuctionHouse, SponsorMarketplace, FarcasterFrameRegistry, SocialAutomationConfig are fully implemented and compile.
   - Enforce protocol constitution invariants:
     - Creator rights, sponsor rights, user rights, agent boundaries, governance limits, treasury constraints, multi-chain invariants.

2. Tokenomics:
   - Implement fee routing in FeeManager.sol and RevenueRouter.sol.
   - Implement QUEST buyback logic in BuybackRouter.sol:
     - Multi-chain QUEST routing
     - L3 buybacks
     - Solana buybacks
     - Treasury integration
     - MC updates via indexer events.

3. Marketplace:
   - Implement Marketplace.sol, AuctionHouse.sol, SponsorMarketplace.sol:
     - Global marketplace
     - L3 marketplace
     - Solana marketplace
     - Sponsor marketplace
     - Unified listing + auction schemas
     - Sponsor overlays.

4. L3:
   - Implement RollupFactory.sol and L3Bridge.sol:
     - Creator L3 deployment
     - L3 <→ Base bridging
     - L3 marketplace hooks
     - L3 governance hooks.

5. Governance:
   - Implement GovernanceV2.sol, AgentRegistry.sol, SubDAOFactory.sol, AIDaoConstitution.sol:
     - CAST voting
     - Proposals, quorum, timelocks
     - SubDAO deployment + control
     - AI DAO constitution with clear boundaries (no autonomous execution).

6. SDK:
   - Implement all modules in packages/sdk:
     - wallet.ts, media.ts, fram.ts, game.ts, code.ts, marketplace.ts, agents.ts, l3.ts, bridge.ts, governance.ts, profile.ts.
   - All calls must be:
     - Indexer-aligned
     - Multi-chain aware
     - Typed
     - Deterministic.

7. Agents:
   - Implement all agents in packages/agents:
     - CreationAgent, FrameAgent, GameAgent, PricingAgent, AuctionAgent, CurationAgent, FraudAgent, SyncAgent, UiAgent, PortfolioAgent, SocialAutomationAgent.
   - Enforce:
     - Permission-scoped
     - Logged
     - Explainable
     - Revocable
     - No direct governance or asset seizure.

8. Indexers:
   - Implement mc-indexer.ts, buyback-indexer.ts, social-indexer.ts:
     - MC indexer: user MC, balances, multi-asset MC (CAST, QUEST, MEDIA, FRAM, GAME, CODE).
     - Buyback indexer: all buyback events across chains.
     - Social indexer: Farcaster + social automation streams.

9. UI/UX (apps/web):
   - Implement Next.js app with:
     - User dashboard: MC graph, token balances, activity stream, portfolio insights, builder shortcuts.
     - Admin dashboard: system health, dependency health, agent control, treasury overview, governance status.
     - Dev dashboard: contract map, SDK playground, docs links, build status.
     - Marketplace: global marketplace, auctions, sponsor market, L3 market.
     - Builders: code, frame, game, UI builders wired to SDK + agents.
     - DAO: DAO dashboard, constitution renderer, treasury view.
     - SubDAOs: per-subdao page.
     - Tokens: user tokens, launch, stats.
     - Farcaster: frame import + timeline.
     - Social automation: flows for Reddit/X/Discord/Telegram.
     - Docs: in-app docs-site viewer.

   - Use a dark, aura/fx/glow/neo-nix design system:
     - Glass cards, neon edges, responsive grid, topbar + sidebar layout.

10. Docs-site:
    - Populate all docs-site markdown files with content consistent and index.html with:
      - Protocol constitution
      - AI DAO constitution
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
      - V1→V2 migration
      - V2→V3 migration
      - Buyback engine changes
      - MC calculation.

11. Migration:
    - Ensure docs-site/overview/v1-to-v2-migration.md and v2-to-v3-migration.md reflect:
      - New asset types (FRAM, GAME, CODE).
      - New contracts and addresses.
      - New event listeners.
      - New MC logic (multi-asset, multi-chain).
      - New marketplace flows.
      - New Farcaster integration.
      - SubDAOs, governance, L3, social automation.
