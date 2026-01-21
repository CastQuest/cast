# Documentation Validation Scripts

This directory contains scripts for validating and auditing the CastQuest documentation.

## Scripts

### `validate-docs.js`

Performs a comprehensive audit of the CastQuest monorepo documentation, including:

1. **Feature Inventory** - Enumerates all implemented features across:
   - apps/web (Next.js web application)
   - packages/contracts (Smart contracts)
   - packages/sdk (TypeScript SDK)
   - packages/agents (AI agents)
   - packages/indexer (Blockchain indexers)
   - infra/ (Docker, Kubernetes, Terraform, scripts)
   - .github/workflows/ (CI/CD pipelines)

2. **Documentation Mapping** - Maps each feature to corresponding documentation in docs-site/

3. **Completeness Checks** - Verifies documentation contains required sections:
   - Purpose & architecture
   - Setup instructions
   - Environment variables
   - Build commands
   - Runtime behavior
   - Production deployment notes
   - Security considerations

4. **Consistency Validation** - Checks for:
   - Commands in docs matching package.json scripts
   - Accurate file paths
   - Valid references

5. **Production Readiness Assessment** - Evaluates documentation coverage for:
   - Production build steps
   - CI/CD pipeline documentation
   - Infrastructure deployment
   - Secret management
   - Monitoring & alerting
   - Upgrade/migration guides

## Usage

### Run via npm/pnpm

```bash
pnpm run validate:docs
```

### Run directly

```bash
node scripts/validate-docs.js
```

## Output

The script generates a comprehensive markdown report: `DOCS_VALIDATION_REPORT.md`

This report includes:
- Executive summary with coverage statistics
- Complete feature inventory
- Feature-to-documentation mapping table
- Documentation completeness analysis
- Consistency issues
- Production readiness assessment
- Missing documentation checklist
- Prioritized recommendations

## Non-Blocking Nature

**Important:** This validation is informational only and does not:
- Block builds or deployments
- Modify runtime or feature logic
- Enforce any CI/CD checks
- Make any code changes

The validation helps identify documentation gaps and inconsistencies to improve the overall documentation quality.

## Integration with CI/CD

While not currently enforced, this script can be integrated into CI/CD pipelines as an informational step:

```yaml
- name: Validate Documentation
  run: pnpm run validate:docs
  continue-on-error: true
```

## Future Enhancements

Potential improvements:
- More granular coverage metrics
- Link checking and dead link detection
- Code example validation
- API documentation synchronization
- Automated documentation suggestions
- Integration with documentation site builds
