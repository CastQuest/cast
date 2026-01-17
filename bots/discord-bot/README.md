# CASTQUEST Discord Bot

Discord bot for interacting with CASTQUEST V3.

## Setup

1. Create a Discord application and bot at https://discord.com/developers
2. Set environment variables:

```bash
DISCORD_BOT_TOKEN=your_bot_token
RPC_URL=https://your-rpc-url
CAST_ADDRESS=0x...
QUEST_ADDRESS=0x...
# ... other contract addresses
```

3. Install and run:

```bash
npm install
npm run dev
```

## Commands

- `/casts <address>` - Get CASTs by creator address
- `/stats` - View platform statistics
- `/help` - Show help message

## Features

- Real-time blockchain data
- Interactive commands
- Embed formatting
- Quest notifications (coming soon)

## License

MIT
