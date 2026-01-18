# CASTQUEST V3 — Production Beta Release Notes

This release marks the **first public stable release** of CASTQUEST V3, unifying V1, V2, and V3 into a single autonomous creative economy.

---

## 🚀 Highlights
- Full multi-chain protocol (Base, L2s, Solana, L3s)
- AI-powered builders (Code, Frame, Game, UI)
- Full agent suite with permissioned autonomy
- Global multi-chain marketplace (PR #58)
- SponsorToken + sponsorship economy
- Autonomous treasury + yield strategies
- AI DAO Constitution + GovernanceV2
- Full SDK + indexers + dashboards
- Full docs-site rebuild (V3 structure)

---

## 🧪 Testnet Deployment (Required)
Deploy the following on **Base Sepolia**:

- Core contracts  
- Marketplace suite  
- L3 system (RollupFactory, L3Bridge)  
- Agents + indexers  
- SDK verification  
- Dashboard integration  

---

## 🌐 Mainnet Deployment (After Testnet Validation)
Deploy on:

- Base  
- Solana  
- Creator L3s  

Mainnet uses the **same contract suite** and **same invariants** as testnet.

---

## 📚 Documentation
Full documentation lives in `docs-site/` and includes:

- Overview  
- Protocol  
- Tokens  
- Agents  
- Marketplace  
- Builders  
- SDK  
- L3  
- Integrations  
- SEO  

---

## 🧱 Monorepo Structure
- `apps/web` — dashboards  
- `packages/contracts` — contract suite  
- `packages/sdk` — TypeScript SDK  
- `packages/agents` — AI agents  
- `packages/indexer` — indexers  
- `bots/*` — automation bots  
- `docs-site/` — full V3 docs  
- `infra/` — deployment + orchestration  

---

## 🛠 Dev Quickstart
```bash
pnpm install
pnpm dev:web
pnpm docs:dev

🧩 Next Steps
Testnet verification

L3 deployment validation

Marketplace routing validation

Agent orchestration validation

Mainnet deployment PR


---

# **3. PR CHECKLIST (Production‑Ready)**

```md
# PR Checklist — CASTQUEST V3

## General
- [ ] Branch is up to date with `main`
- [ ] No leftover debug code or logs
- [ ] No generated artifacts committed accidentally
- [ ] All file paths match the V3 monorepo structure

## Documentation
- [ ] All new docs added to `docs-site/`
- [ ] Frontmatter is correct (title, section, slug, tags, weight)
- [ ] Sidebar updated if needed
- [ ] No placeholders or template artifacts

## Contracts
- [ ] Compiles successfully
- [ ] ABI changes reviewed
- [ ] Storage layout unchanged (unless intentional)
- [ ] Tests updated and passing

## SDK
- [ ] All modules build successfully
- [ ] Types updated
- [ ] Breaking changes documented

## Agents
- [ ] Agent permissions validated
- [ ] Logging + safety checks in place
- [ ] No infinite loops or runaway tasks

## Marketplace
- [ ] Cross-chain routing validated
- [ ] Auction flows validated
- [ ] Sponsor flows validated

## L3
- [ ] RollupFactory deployment validated
- [ ] L3Bridge tested
- [ ] L3 governance flows validated

## Dashboards
- [ ] User dashboard loads without errors
- [ ] Admin dashboard shows system health
- [ ] Dev dashboard shows contract map + SDK playground

## Final
- [ ] PR description complete
- [ ] Linked to relevant issues
- [ ] Ready for review
# CASTQUEST V3 — Testnet Verification Checklist

## 1. Contract Deployment
- [ ] Deploy core contracts on Base Sepolia
- [ ] Deploy marketplace suite
- [ ] Deploy SponsorToken + SponsorMarketplace
- [ ] Deploy RollupFactory + L3Bridge
- [ ] Verify contracts on explorer

## 2. L3 Deployment
- [ ] Deploy a test L3 via RollupFactory
- [ ] Bridge assets via L3Bridge
- [ ] Validate L3 marketplace
- [ ] Validate L3 governance

## 3. Marketplace
- [ ] Create listing
- [ ] Buy listing
- [ ] Create auction
- [ ] Bid on auction
- [ ] Settle auction
- [ ] Validate cross-chain listing visibility

## 4. Agents
- [ ] CreationAgent deploys a contract
- [ ] FrameAgent processes a Farcaster frame
- [ ] PricingAgent returns price suggestions
- [ ] AuctionAgent monitors auctions
- [ ] FraudAgent flags invalid activity
- [ ] SyncAgent reconciles multi-chain state
- [ ] UiAgent generates UI config
- [ ] PortfolioAgent returns MC insights
- [ ] SocialAutomationAgent posts to test channels

## 5. SDK
- [ ] Wallet connect works
- [ ] Read functions return correct data
- [ ] Write functions execute correctly
- [ ] Profile SDK returns MC + assets
- [ ] Marketplace SDK returns listings + auctions

## 6. Dashboards
- [ ] User dashboard loads
- [ ] Admin dashboard shows system health
- [ ] Dev dashboard shows contract map + SDK playground

## 7. Indexers
- [ ] MC indexer running
- [ ] Buyback indexer running
- [ ] Social indexer running

## 8. Treasury
- [ ] FeeManager routes fees
- [ ] BuybackRouter executes buybacks
- [ ] Treasury strategies simulate correctly

## 9. Governance
- [ ] Create proposal
- [ ] Vote on proposal
- [ ] Execute proposal
- [ ] AI DAO Constitution constraints validated

## 10. Final Validation
- [ ] All flows pass
- [ ] No critical errors
- [ ] Ready for mainnet deployment
