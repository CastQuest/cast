# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 3.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please:

1. **Do NOT** open a public issue
2. Email security@castquest.io with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

## Security Measures

### Smart Contracts

- OpenZeppelin libraries for standard implementations
- Access control with role-based permissions
- ReentrancyGuard for state-changing functions
- Comprehensive test coverage
- Gas optimization

### Web Application

- Environment variable protection
- Secure wallet connections
- HTTPS enforcement
- XSS protection
- CSRF tokens

### Infrastructure

- Regular security updates
- Encrypted data at rest
- Secure API endpoints
- Rate limiting
- DDoS protection

## Bug Bounty

We offer rewards for security vulnerability reports:

- Critical: Up to $10,000
- High: Up to $5,000
- Medium: Up to $2,000
- Low: Up to $500

Contact security@castquest.io for details.

## Audits

Smart contracts will be audited by reputable firms before mainnet deployment.

## Best Practices

For developers:
- Never commit private keys or secrets
- Use `.env` files (never committed)
- Review all dependencies
- Follow secure coding guidelines
- Test thoroughly

## Contact

- Security Email: security@castquest.io
- Discord: https://discord.gg/castquest (DM @security)
