# CASTQUEST V3 — Autonomous Creative Economy  
**First Public Stable Release (V1 + V2 + V3 Unified)**

CASTQUEST V3 is a multi-chain, AI‑powered creative protocol that unifies creators, sponsors, agents, and L3 chains into one autonomous economy.

This release merges the full evolution:

- **V1** — MEDIA, MC, buybacks, early Farcaster  
- **V2** — Multi-chain, agents, L3s, Solana, DAO, builders  
- **V3** — Production‑grade architecture with AI UI/UX, global marketplace, sponsorship economy, autonomous treasury, AI DAO Constitution, and full SDK  

---

# 📚 Documentation  
All documentation lives in the `docs-site/` directory and follows the CASTQUEST V3 structure.

---

# **Overview**
- [What is CASTQUEST?](docs-site/overview/what-is-castquest.md)
- [Architecture](docs-site/overview/architecture.md)
- [V1 → V2 Migration](docs-site/overview/v1-to-v2-migration.md)
- [V2 → V3 Migration](docs-site/overview/v2-to-v3-migration.md)
- [Tokenomics](docs-site/overview/tokenomics.md)
- [Glossary](docs-site/overview/glossary.md)
- [FAQ](docs-site/overview/faq.md)

---

# **Protocol**
- [Protocol Constitution](docs-site/protocol/constitution.md)
- [AI DAO Constitution](docs-site/protocol/ai-dao-constitution.md)
- [Governance](docs-site/protocol/governance.md)
- [Treasury](docs-site/protocol/treasury.md)
- [Buybacks](docs-site/protocol/buybacks.md)
- [Fees](docs-site/protocol/fees.md)
- [MC Calculation](docs-site/protocol/mc-calculation.md)
- [Multi-chain](docs-site/protocol/multi-chain.md)
- [Solana Integration](docs-site/protocol/solana-integration.md)
- [L3 Chains](docs-site/protocol/l3-chains.md)
- [SubDAOs](docs-site/protocol/subdaos.md)

---

# **Tokens**
- [CAST](docs-site/tokens/cast.md)
- [QUEST](docs-site/tokens/quest.md)
- [MEDIA](docs-site/tokens/media.md)
- [FRAM](docs-site/tokens/fram.md)
- [GAME](docs-site/tokens/game.md)
- [CODE](docs-site/tokens/code.md)
- [SponsorToken](docs-site/tokens/sponsor-token.md)

---

# **Agents**
- [Agent Overview](docs-site/agents/agent-overview.md)
- [Creation Agent](docs-site/agents/creation-agent.md)
- [Frame Agent](docs-site/agents/frame-agent.md)
- [Game Agent](docs-site/agents/game-agent.md)
- [Pricing Agent](docs-site/agents/pricing-agent.md)
- [Auction Agent](docs-site/agents/auction-agent.md)
- [Curation Agent](docs-site/agents/curation-agent.md)
- [Fraud Agent](docs-site/agents/fraud-agent.md)
- [Sync Agent](docs-site/agents/sync-agent.md)
- [UI Agent](docs-site/agents/ui-agent.md)
- [Portfolio Agent](docs-site/agents/portfolio-agent.md)
- [Social Automation Agent](docs-site/agents/social-automation-agent.md)

---

# **Marketplace**
- [Marketplace Overview](docs-site/marketplace/marketplace-overview.md)
- [Listings](docs-site/marketplace/listings.md)
- [Auctions](docs-site/marketplace/auctions.md)
- [Cross-chain Marketplace](docs-site/marketplace/cross-chain-marketplace.md)
- [Solana Marketplace](docs-site/marketplace/solana-marketplace.md)
- [Sponsor Marketplace](docs-site/marketplace/sponsor-marketplace.md)
- [Marketplace Flows](docs-site/marketplace/marketplace-flows.md)

---

# **Builders**
- [AI Code Builder](docs-site/builders/ai-code-builder.md)
- [AI Frame Builder](docs-site/builders/ai-frame-builder.md)
- [AI Game Builder](docs-site/builders/ai-game-builder.md)
- [AI UI Builder](docs-site/builders/ai-ui-builder.md)
- [Builder Flows](docs-site/builders/builder-flows.md)

---

# **SDK**
- [SDK Reference](docs-site/sdk/sdk-reference.md)
- [Wallet](docs-site/sdk/wallet.md)
- [Media](docs-site/sdk/media.md)
- [FRAM](docs-site/sdk/fram.md)
- [Game](docs-site/sdk/game.md)
- [Code](docs-site/sdk/code.md)
- [Marketplace](docs-site/sdk/marketplace.md)
- [Agents](docs-site/sdk/agents.md)
- [L3](docs-site/sdk/l3.md)
- [Bridge](docs-site/sdk/bridge.md)
- [Governance](docs-site/sdk/governance.md)
- [Profile](docs-site/sdk/profile.md)

---

# **L3**
- [L3 Overview](docs-site/l3/l3-overview.md)
- [L3 Deployment Guide](docs-site/l3/l3-deployment-guide.md)
- [RollupFactory](docs-site/l3/rollup-factory.md)
- [L3 Bridge](docs-site/l3/l3-bridge.md)
- [L3 Marketplace](docs-site/l3/l3-marketplace.md)
- [L3 Governance](docs-site/l3/l3-governance.md)

---

# **Integrations**
- [GitHub](docs-site/integrations/github.md)
- [Vercel](docs-site/integrations/vercel.md)
- [Netlify](docs-site/integrations/netlify.md)
- [Render](docs-site/integrations/render.md)
- [Telegram](docs-site/integrations/telegram.md)
- [Discord](docs-site/integrations/discord.md)
- [Reddit](docs-site/integrations/reddit.md)
- [X (Twitter)](docs-site/integrations/x.md)
- [Google Login](docs-site/integrations/google-login.md)
- [Facebook Login](docs-site/integrations/facebook-login.md)
- [Wallet Login](docs-site/integrations/wallet-login.md)

---

# **SEO**
- [SEO Engine](docs-site/seo/seo-engine.md)
- [Geo Engine](docs-site/seo/geo-engine.md)
- [Sitemap](docs-site/seo/sitemap.md)

---

# 🚀 Production Beta (Testnet + Mainnet)

CASTQUEST V3 is ready for Production Beta:

### **Testnet**
- Deploy full contract suite  
- Validate L3 deployment  
- Validate marketplace PR #58  
- Validate agent orchestration  
- Validate SDK flows  
- Validate dashboards  

### **Mainnet**
- Same contracts  
- Same flows  
- Same invariants  
- Same architecture  

---

# 🧱 Monorepo Structure

apps/web          → Next.js  dashboards (user/admin/dev)
packages/contracts → Full V3 contract suite
packages/sdk       → TypeScript SDK
packages/agents    → AI agents
packages/indexer   → Indexers
bots/*             → Farcaster, Reddit, X, Discord, Telegram
docs-site/         → Full V3 documentation
infra/             → Deployment + orchestration

---

# 🛠 Dev Quickstart

```bash
pnpm install
pnpm dev:web
pnpm docs:dev


🌐 Deployment
Testnet: Base Sepolia

Mainnet: Base, Solana, L3s

Hosting: Vercel / Netlify / Render

📎 Links
Docs: docs-site/

Dashboards: apps/web/

Contracts: packages/contracts/

SDK: packages/sdk/

Agents: packages/agents/
