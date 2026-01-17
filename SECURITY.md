# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 3.0.x   | :white_check_mark: |

## Recent Security Updates

### Version 3.0.1 (2024-01-17)

**Critical Security Fixes:**

- **Next.js updated to 14.2.35** - Fixed multiple high-severity vulnerabilities:
  - Denial of Service with Server Components (CVE affecting 13.3.0 - 14.2.34)
  - Authorization bypass vulnerability (CVE affecting 9.5.5 - 14.2.14)
  - Cache Poisoning (CVE affecting 14.0.0 - 14.2.9)
  - Server-Side Request Forgery in Server Actions (CVE affecting 13.4.0 - 14.1.0)
  - Authorization Bypass in Middleware (CVE affecting 14.0.0 - 14.2.24)

- **LangChain updated to 0.3.80** - Fixed serialization injection vulnerability:
  - Enables secret extraction (CVE affecting < 0.3.37)
  - Updated @langchain/openai to 0.3.14 for compatibility

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
- **Up-to-date dependencies with security patches**

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
- **Keep dependencies updated with `pnpm update`**
- **Monitor security advisories**

## Dependency Security

We actively monitor and update dependencies to address security vulnerabilities:
- Automated security scanning
- Regular dependency updates
- Version pinning for stability
- Security patches applied promptly

## Contact

- Security Email: security@castquest.io
- Discord: https://discord.gg/castquest (DM @security)
