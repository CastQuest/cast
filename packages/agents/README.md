# @castquest/agents

AI agents for autonomous operations on CASTQUEST V3.

## Features

- **CAST Agent**: Automate NFT minting, updates, and portfolio management
- **Quest Agent**: Manage quests and recommend activities
- **Marketplace Agent**: Automated trading and pricing analysis
- **Content Generator**: AI-powered metadata and description generation

## Installation

```bash
npm install @castquest/agents
```

## Usage

```typescript
import { CASTAgent, QuestAgent, ContentGenerator } from "@castquest/agents";
import { CastQuestClient } from "@castquest/sdk";

// Initialize client
const client = CastQuestClient.connectWithSigner(rpcUrl, privateKey, contracts);

// Create agents
const castAgent = new CASTAgent(client, process.env.OPENAI_API_KEY);
const questAgent = new QuestAgent(client);
const contentGen = new ContentGenerator(client, process.env.OPENAI_API_KEY);

// Use CAST Agent
const analysis = await castAgent.execute("analyze", {
  creator: "0x123...",
});

// Generate content
const metadata = await contentGen.execute("generate-metadata", {
  title: "My Artwork",
  type: "Digital Art",
});

// Quest recommendations
const recommendations = await questAgent.execute("recommend", {
  user: "0x123...",
});
```

## Agents

### CASTAgent

Capabilities:
- `mint` - Mint new CASTs
- `update` - Update CAST content
- `analyze` - Analyze creator portfolio

### QuestAgent

Capabilities:
- `create` - Create new quests
- `join` - Join existing quests
- `recommend` - Get quest recommendations

### MarketplaceAgent

Capabilities:
- `list` - List NFTs for sale
- `buy` - Purchase NFTs
- `analyze-price` - Price analysis and suggestions

### ContentGenerator

Capabilities:
- `generate-metadata` - Generate NFT metadata
- `generate-description` - Generate descriptions
- `suggest-tags` - Suggest relevant tags

## License

MIT
