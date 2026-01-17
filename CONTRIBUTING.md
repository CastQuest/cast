# Contributing to CASTQUEST V3

Thank you for your interest in contributing to CASTQUEST V3!

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/cast.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feature/your-feature`

## Code Style

- Use TypeScript for all new code
- Follow existing code conventions
- Run `pnpm lint` before committing
- Run `pnpm format` to format code

## Testing

- Write tests for new features
- Ensure all tests pass: `pnpm test`
- For smart contracts: `cd packages/contracts && forge test`

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Create a pull request with a clear description

## Smart Contract Guidelines

- Follow Solidity best practices
- Include NatSpec comments
- Write comprehensive tests
- Gas optimize where possible
- Use OpenZeppelin libraries

## Commit Messages

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `test:` Tests
- `chore:` Maintenance

Example: `feat: add quest completion notification`

## Questions?

Join our [Discord](https://discord.gg/castquest) or open an issue.

## Code of Conduct

Be respectful and inclusive. We welcome all contributors!
