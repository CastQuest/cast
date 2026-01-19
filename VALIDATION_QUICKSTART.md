# Documentation Validation - Quick Start Guide

## Purpose

This validation layer helps identify documentation gaps without blocking development. It's designed to be run periodically to track documentation health.

## Quick Usage

### Run Validation

```bash
# Using pnpm
pnpm run validate:docs

# Using npm
npm run validate:docs

# Direct execution
node scripts/validate-docs.js
```

**Output:** Generates `DOCS_VALIDATION_REPORT.md` in the repository root.

## Reading the Report

### Executive Summary (Top of Report)

Look for these key metrics:
- **Total Features Inventoried:** How many features were scanned
- **Fully/Partially/Missing Documentation:** Coverage breakdown
- **Completeness Issues:** Number of docs missing required sections
- **Consistency Issues:** Broken commands or invalid paths (should be 0)

### Production Readiness Section

Check all items should be ✅ ADEQUATE:
- Production Build Steps
- CI/CD Pipeline Documentation
- Infrastructure Deployment
- Secret Management
- Monitoring & Alerting
- Upgrade/Migration Guide
- Disaster Recovery
- Performance Tuning

### Finding What to Document

**Section 2: Feature-to-Documentation Mapping**
- Shows all features and their doc coverage
- Filter by `MISSING` to see undocumented features
- Use suggested paths to create new docs

**Section 6: Missing Documentation Checklist**
- Ready-to-use checklist of missing docs
- Includes suggested filenames and locations
- Prioritized list for completion

## Common Workflows

### For Developers Adding Features

1. Add your feature code
2. Run validation: `pnpm run validate:docs`
3. Check report for your feature in Section 2
4. If marked `MISSING`, add documentation per Section 6
5. Re-run validation to verify

### For Technical Writers

1. Run validation: `pnpm run validate:docs`
2. Review Section 3 (Completeness Analysis)
3. Pick a doc with HIGH severity
4. Add missing sections listed
5. Re-run to verify improvement

### For Release Managers

1. Before release, run: `pnpm run validate:docs`
2. Check Section 5 (Production Readiness)
3. All items should be ✅ ADEQUATE
4. If ❌ or ⚠️, address before release
5. Review Section 7 (Recommendations) for priorities

### For DevOps/CI Integration

**Option 1: Manual runs (Recommended initially)**
```bash
# Run before major releases
pnpm run validate:docs
```

**Option 2: CI Integration (Informational)**
```yaml
- name: Documentation Validation
  run: pnpm run validate:docs
  continue-on-error: true  # Non-blocking
  
- name: Upload Report
  uses: actions/upload-artifact@v3
  with:
    name: docs-validation-report
    path: DOCS_VALIDATION_REPORT.md
```

**Option 3: PR Comments**
```yaml
- name: Validate Docs
  run: pnpm run validate:docs
  continue-on-error: true

- name: Comment PR
  uses: actions/github-script@v6
  with:
    script: |
      const fs = require('fs');
      const report = fs.readFileSync('DOCS_VALIDATION_REPORT.md', 'utf8');
      const summary = report.split('## 1.')[0]; // Just executive summary
      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: '## Documentation Validation\n\n' + summary
      });
```

## Understanding Output

### Coverage Status
- **FULL:** Feature is well-documented across multiple pages
- **PARTIAL:** Feature mentioned but needs more detail
- **MISSING:** No documentation found for feature

### Severity Levels
- **HIGH:** Missing 5+ required sections
- **MEDIUM:** Missing 2-4 required sections
- **LOW:** Missing 1 section

### Priority Classifications
- **BLOCKER:** Must have for production (build, CI/CD, infra)
- **IMPORTANT:** Should have for operations (secrets, monitoring)
- **OPTIONAL:** Nice to have (performance tuning)

## Interpreting Results

### Good Signs ✅
- Production Readiness all ✅ ADEQUATE
- Consistency Issues: 0
- Fully Documented > 50%

### Action Required ⚠️
- Production Readiness has ❌ MISSING
- Consistency Issues > 0
- Missing Documentation > 50%

### Improvement Opportunities 📈
- Production Readiness has ⚠️ PARTIAL
- Completeness Issues > 100
- Many HIGH severity docs

## Recommended Cadence

| Frequency | When | Who | Focus |
|-----------|------|-----|-------|
| **Daily** | During feature development | Developers | Check their new features |
| **Weekly** | During doc updates | Tech Writers | Complete missing sections |
| **Sprint End** | Before release planning | Team Leads | Review recommendations |
| **Release** | Before production deploy | Release Managers | Verify production readiness |
| **Quarterly** | Strategic planning | Product/Eng | Assess overall doc health |

## Tips & Best Practices

### For Efficient Documentation

1. **Start with essentials:**
   - Purpose/overview (what it does)
   - Basic usage (how to use it)
   - Common issues (troubleshooting)

2. **Add details progressively:**
   - Setup instructions
   - Configuration options
   - Advanced usage
   - Security considerations

3. **Link related docs:**
   - Reference other relevant pages
   - Cross-link SDK/contracts/features
   - Provide examples from real usage

### For Better Coverage

1. **Document as you code:**
   - Add basic README when creating feature
   - Update docs when changing behavior
   - Include examples in code comments

2. **Use templates:**
   - Copy structure from well-documented features
   - Follow the required sections checklist
   - Maintain consistent style

3. **Validate frequently:**
   - Run after completing each feature
   - Check before committing docs
   - Verify before PR approval

## Troubleshooting

### "Command not found: pnpm"
```bash
# Install pnpm globally
npm install -g pnpm@8.15.0

# Or use npm instead
npm run validate:docs
```

### "Script returns errors"
```bash
# Check Node.js version (need >= 18.18.0)
node --version

# Run directly to see full errors
node scripts/validate-docs.js
```

### "Report not generated"
```bash
# Check write permissions
ls -la | grep DOCS_VALIDATION_REPORT.md

# Try running with explicit permissions
chmod +x scripts/validate-docs.js
node scripts/validate-docs.js
```

### "Want to validate specific features only"
Currently validates all features. To focus on specific areas:
```bash
# Run validation
pnpm run validate:docs

# Then search report for your feature
grep -A 5 "YourFeatureName" DOCS_VALIDATION_REPORT.md
```

## Getting Help

1. **Script Documentation:** See `scripts/README.md`
2. **Implementation Details:** See `VALIDATION_IMPLEMENTATION.md`
3. **Full Report:** See `DOCS_VALIDATION_REPORT.md`
4. **Script Source:** See `scripts/validate-docs.js`

## Examples

### Example 1: New Feature Documentation

```bash
# You added a new contract: SuperToken.sol
# Run validation
pnpm run validate:docs

# Search report for SuperToken
# Result: "Contract: SuperToken | MISSING"

# Create documentation
# File: docs-site/tokens/super-token.mdx
# Include: purpose, architecture, usage, deployment

# Re-run validation
pnpm run validate:docs

# Now shows: "Contract: SuperToken | PARTIAL" or "FULL"
```

### Example 2: Completing Documentation

```bash
# Check which docs need work
pnpm run validate:docs

# Look at Section 3: Completeness Analysis
# Pick a HIGH severity doc

# Example: agents/pricing-agents.mdx
# Missing: Setup/Installation, Environment Variables, Deployment

# Add those sections to the doc

# Verify improvement
pnpm run validate:docs

# Section 3 should show fewer missing sections
```

### Example 3: Pre-Release Check

```bash
# Before release, validate production readiness
pnpm run validate:docs

# Check Section 5: Production Readiness Assessment
# Ensure all BLOCKER items are ✅ ADEQUATE

# If any ❌ MISSING:
# - Review Section 6 for missing docs
# - Add critical documentation
# - Re-validate until all green

# Ready for release when all BLOCKER items ✅
```

## FAQ

**Q: Does this block builds or deployments?**  
A: No, it's purely informational. Non-blocking by design.

**Q: How often should I run it?**  
A: Whenever you add/modify features or documentation.

**Q: Can I customize what it checks?**  
A: Yes, edit `scripts/validate-docs.js` to add/remove checks.

**Q: Where should I put new documentation?**  
A: The report suggests paths in Section 6.

**Q: What if I disagree with findings?**  
A: The report is informational - use your judgment on priorities.

**Q: Can this auto-generate documentation?**  
A: No, it only validates existing docs and suggests improvements.

**Q: How do I track improvement over time?**  
A: Run periodically and compare the coverage statistics in the executive summary.

---

**Need More Help?** Review the comprehensive documentation:
- `scripts/README.md` - Technical details
- `VALIDATION_IMPLEMENTATION.md` - Architecture and implementation
- `DOCS_VALIDATION_REPORT.md` - Latest validation results
