# @castquest/contracts

Smart contracts for the CASTQUEST V3 platform.

## Contracts

- **CAST**: Core NFT for creative assets
- **QUEST**: Bounty and quest system
- **MEDIA**: Media storage and distribution
- **FRAM**: Framework templates
- **GAME**: On-chain game mechanics
- **CODE**: Code repository management
- **SponsorToken**: ERC20 sponsorship token
- **GovernanceV2**: DAO governance
- **SubDAOs**: Hierarchical DAO structure
- **L3**: Layer 3 chain management
- **Marketplace**: NFT marketplace
- **Auctions**: Auction system
- **Sponsorship**: Sponsorship campaigns

## Development

```bash
# Install Foundry first
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install dependencies
forge install OpenZeppelin/openzeppelin-contracts

# Build
forge build

# Test
forge test

# Deploy
forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --broadcast
```

## License

MIT
