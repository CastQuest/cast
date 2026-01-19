# CASTQUEST V3 - Deployment Guide

This guide provides step-by-step instructions for deploying CASTQUEST V3 to various environments.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Local Development](#local-development)
3. [Staging Deployment](#staging-deployment)
4. [Production Deployment](#production-deployment)
5. [Smart Contract Deployment](#smart-contract-deployment)
6. [Rollback Procedures](#rollback-procedures)

## Pre-Deployment Checklist

Before deploying to any environment, ensure:

- [ ] All tests pass (`pnpm run test:all`)
- [ ] Security scan completed (`pnpm run security:scan`)
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Backup plan in place
- [ ] Rollback procedure documented

## Local Development

### Setup

```bash
# Clone repository
git clone https://github.com/CastQuest/cast.git
cd cast

# Install dependencies
pnpm install

# Copy environment template
cp .env.production.template .env.local

# Start development servers
pnpm dev:web
```

### Testing Locally

```bash
# Run all checks
pnpm run test:all

# Test individual packages
pnpm --filter @castquest/contracts test
pnpm --filter @castquest/sdk test
pnpm --filter @castquest/web build
```

### Docker Testing

```bash
# Build images
docker build -f infra/docker/Dockerfile.web -t castquest/web:local .

# Run with docker compose
cd infra
docker compose up
```

## Staging Deployment

### Prerequisites

- Access to staging environment
- Kubernetes cluster configured
- GitHub Actions secrets set

### Deploy to Staging

1. **Push to staging branch**:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b staging
   git push origin staging
   ```

2. **Trigger deployment**:
   - Go to GitHub Actions
   - Select "Deploy" workflow
   - Choose "staging" environment
   - Select component or "all"
   - Click "Run workflow"

3. **Monitor deployment**:
   ```bash
   kubectl get pods -n castquest-staging -w
   kubectl logs -f deployment/castquest-web -n castquest-staging
   ```

4. **Verify deployment**:
   - Visit https://staging.castquest.io
   - Check health endpoint: https://staging.castquest.io/api/health
   - Run smoke tests

### Staging Validation

```bash
# Check pod status
kubectl get pods -n castquest-staging

# Check services
kubectl get svc -n castquest-staging

# Check ingress
kubectl get ingress -n castquest-staging
```

## Production Deployment

### Prerequisites

- All staging tests passed
- Product owner approval
- Change control ticket
- Communication plan

### Pre-Production Steps

1. **Database Backup**:
   ```bash
   # Backup production database
   pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql
   ```

2. **Tag Release**:
   ```bash
   git tag -a v3.0.0 -m "Release v3.0.0"
   git push origin v3.0.0
   ```

3. **Final Checks**:
   ```bash
   pnpm run test:all
   pnpm run security:scan
   pnpm run build
   ```

### Deploy to Production

1. **Deploy Infrastructure**:
   ```bash
   # Via GitHub Actions
   # Workflow: Deploy
   # Environment: production
   # Component: infra
   ```

2. **Deploy Web Application**:
   ```bash
   # Via GitHub Actions
   # Workflow: Deploy
   # Environment: production
   # Component: web
   ```

3. **Deploy Documentation**:
   ```bash
   # Via GitHub Actions
   # Workflow: Deploy
   # Environment: production
   # Component: docs
   ```

### Post-Deployment Verification

```bash
# Check deployment status
kubectl get pods -n castquest-prod

# Check application health
curl https://castquest.io/api/health

# Monitor logs
kubectl logs -f deployment/castquest-web -n castquest-prod

# Check metrics
# View Grafana dashboards
# Check error rates in Sentry
```

### Production Monitoring

Monitor these metrics post-deployment:

- **Application Health**: Response times, error rates
- **Infrastructure**: CPU, memory, disk usage
- **Database**: Query performance, connection pool
- **User Experience**: Page load times, core web vitals

## Smart Contract Deployment

### Local Testing

```bash
cd packages/contracts

# Start local node
npx hardhat node

# Deploy to local
pnpm run deploy:localhost
```

### Testnet Deployment (Base Sepolia)

```bash
# Set environment variables
export PRIVATE_KEY="your-private-key"
export RPC_URL_BASE="https://sepolia.base.org"

# Deploy
pnpm --filter @castquest/contracts deploy:base

# Verify contracts
npx hardhat verify --network base <CONTRACT_ADDRESS>
```

### Mainnet Deployment

⚠️ **CRITICAL**: Mainnet deployment is irreversible and involves real funds.

```bash
# CHECKLIST BEFORE MAINNET DEPLOYMENT
# [ ] All tests pass on testnet
# [ ] Security audit completed
# [ ] Multi-sig wallet prepared
# [ ] Gas price checked
# [ ] Deployment plan reviewed

# Set production environment
export PRIVATE_KEY="$DEPLOYER_PRIVATE_KEY"
export RPC_URL_BASE="$PRODUCTION_RPC_URL"

# Deploy via GitHub Actions
# Workflow: Deploy
# Environment: production-contracts
# Requires manual approval
```

### Post-Deployment Contract Verification

```bash
# Verify on Basescan
npx hardhat verify --network base \
  <CONTRACT_ADDRESS> \
  <CONSTRUCTOR_ARGS>

# Update contract addresses in .env.production
# NEXT_PUBLIC_CAST_TOKEN_ADDRESS=0x...
# NEXT_PUBLIC_MARKETPLACE_ADDRESS=0x...
```

## Rollback Procedures

### Web Application Rollback

```bash
# Rollback to previous deployment
kubectl rollout undo deployment/castquest-web -n castquest-prod

# Rollback to specific revision
kubectl rollout undo deployment/castquest-web -n castquest-prod --to-revision=2

# Check rollback status
kubectl rollout status deployment/castquest-web -n castquest-prod
```

### Database Rollback

```bash
# Restore from backup
psql $DATABASE_URL < backup-20240119-120000.sql

# Run down migrations
npm run migrate:down
```

### Infrastructure Rollback

```bash
cd infra/terraform

# Revert to previous state
terraform plan -target=<resource>
terraform apply -target=<resource>
```

## Emergency Procedures

### Application Down

1. Check pod status: `kubectl get pods -n castquest-prod`
2. Check logs: `kubectl logs deployment/castquest-web -n castquest-prod`
3. Scale up: `kubectl scale deployment castquest-web --replicas=5 -n castquest-prod`
4. If critical: Enable maintenance mode

### Database Issues

1. Check connections: Monitor connection pool
2. Check slow queries: `pg_stat_statements`
3. Scale read replicas if needed
4. Contact DBA team

### High Traffic

1. Scale pods: `kubectl scale deployment castquest-web --replicas=10`
2. Enable CDN caching
3. Rate limit endpoints
4. Monitor costs

## Support Contacts

- **DevOps Lead**: devops@castquest.io
- **Security Team**: security@castquest.io
- **On-Call**: Use PagerDuty
- **Emergency**: +1-XXX-XXX-XXXX

## Useful Commands

```bash
# Check all deployments
kubectl get deployments -A

# Port forward for debugging
kubectl port-forward svc/castquest-web 3000:80 -n castquest-prod

# Execute in pod
kubectl exec -it deployment/castquest-web -n castquest-prod -- /bin/sh

# View events
kubectl get events -n castquest-prod --sort-by='.lastTimestamp'

# Scale deployment
kubectl scale deployment castquest-web --replicas=5 -n castquest-prod
```

## Additional Resources

- [Build Documentation](BUILD_DEPLOY.md)
- [Architecture Docs](docs-site/overview/)
- [API Reference](docs-site/sdk/)
- [Runbook](https://wiki.castquest.io/runbook)

---

Last Updated: 2026-01-19
