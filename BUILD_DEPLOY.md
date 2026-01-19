# CASTQUEST V3 - Production Build and Deployment

This repository contains the complete production build and deployment setup for CASTQUEST V3.

## 🏗️ Architecture

- **Monorepo Structure**: pnpm workspaces with Turbo for build orchestration
- **Apps**: Web application (Next.js 14)
- **Packages**: SDK, Smart Contracts, Indexer, Agents
- **Docs**: Documentation site (Vite + React)
- **Infrastructure**: Docker, Kubernetes, Terraform

## 📋 Prerequisites

- Node.js >= 18.18.0 (see `.nvmrc`)
- pnpm >= 8.0.0
- Docker (for containerization)
- kubectl (for Kubernetes deployment)
- Terraform >= 1.6.0 (for infrastructure)

## 🚀 Getting Started

### Installation

```bash
# Install pnpm if not already installed
npm install -g pnpm@8.15.0

# Install dependencies
pnpm install
```

### Environment Setup

Copy the production environment template:

```bash
cp .env.production.template .env.production
```

Fill in the required values in `.env.production`. **Never commit this file with real secrets!**

## 🔨 Build Scripts

### Build All
```bash
pnpm run build
```

### Build Individual Components

```bash
# Smart Contracts
pnpm run build:protocol

# SDK
pnpm run build:sdk

# Web Application
pnpm run build:web

# Documentation
pnpm run build:docs

# Infrastructure Validation
pnpm run build:infra
```

## 🧪 Testing

```bash
# Run all tests, linting, and type checking
pnpm run test:all

# Individual test commands
pnpm run lint
pnpm run test
pnpm run typecheck
```

## 🔒 Security

```bash
# Run security scans
pnpm run security:scan
```

This runs:
- `pnpm audit` for dependency vulnerabilities
- ESLint with security rules

## 🐳 Docker

### Build Docker Images

```bash
# Web application
docker build -f infra/docker/Dockerfile.web -t castquest/web:latest .

# Indexer
docker build -f infra/docker/Dockerfile.indexer -t castquest/indexer:latest .
```

### Run with Docker Compose

```bash
cd infra
docker compose up -d
```

## ☸️ Kubernetes Deployment

### Staging

```bash
kubectl apply -f infra/k8s/staging/
```

### Production

```bash
kubectl apply -f infra/k8s/production/
```

### Validation

```bash
# Validate Kubernetes manifests
pnpm run validate:k8s
```

## 🏗️ Infrastructure

### Terraform

```bash
cd infra/terraform

# Initialize
terraform init

# Plan
terraform plan

# Apply (with caution!)
terraform apply
```

### Validate Terraform

```bash
pnpm run validate:terraform
```

## 🚢 CI/CD

GitHub Actions workflows are configured in `.github/workflows/`:

- **ci.yml**: Runs on every PR and push - linting, testing, security scans
- **build.yml**: Builds all components and Docker images on push to main
- **deploy.yml**: Handles deployments to staging/production environments

### Required Secrets

Configure these in GitHub repository settings:

- `DEPLOYER_PRIVATE_KEY`: Private key for contract deployment
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID
- `AWS_ROLE_ARN`: AWS IAM role for OIDC authentication
- `NPM_TOKEN`: NPM registry token for SDK publishing

## 📦 Package Structure

```
cast/
├── apps/
│   └── web/                 # Next.js 14 web application
├── packages/
│   ├── agents/             # AI agents
│   ├── contracts/          # Smart contracts (Hardhat)
│   ├── indexer/            # Blockchain indexer
│   └── sdk/                # TypeScript SDK
├── docs-site/              # Documentation (Vite)
├── infra/
│   ├── docker/             # Docker configurations
│   ├── k8s/                # Kubernetes manifests
│   ├── terraform/          # Infrastructure as code
│   └── scripts/            # Validation scripts
└── .github/
    └── workflows/          # CI/CD pipelines
```

## 🔗 Deployment Targets

### Web Application
- **Staging**: https://staging.castquest.io
- **Production**: https://castquest.io

### Documentation
- **URL**: https://docs.castquest.io

### API/Indexer
- **Staging**: https://api-staging.castquest.io
- **Production**: https://api.castquest.io

## 📝 Development Workflow

1. Create a feature branch from `main`
2. Make changes and test locally
3. Run `pnpm run test:all` to ensure quality
4. Push and create a PR
5. CI runs automatically
6. After merge to `main`, build workflow runs
7. Deploy manually using workflow dispatch

## 🛠️ Troubleshooting

### Build Failures

```bash
# Clean all build artifacts
pnpm run clean

# Reinstall dependencies
rm -rf node_modules
pnpm install
```

### Docker Issues

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -f infra/docker/Dockerfile.web .
```

### Kubernetes Issues

```bash
# Check pod status
kubectl get pods -n castquest-prod

# View logs
kubectl logs -n castquest-prod deployment/castquest-web

# Describe pod for events
kubectl describe pod -n castquest-prod <pod-name>
```

## 📚 Documentation

Full documentation is available in the `docs-site/` directory. Topics include:

- Protocol architecture
- Smart contract APIs
- SDK usage
- Agent configuration
- Marketplace integration
- L3 deployment
- Security best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🆘 Support

For issues and questions:
- GitHub Issues: https://github.com/CastQuest/cast/issues
- Documentation: https://docs.castquest.io

---

Built with ❤️ by the CASTQUEST team
