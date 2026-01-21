#!/usr/bin/env node

/**
 * Documentation Validation & Reporting Script
 * 
 * This script performs a comprehensive audit of the CastQuest repository to:
 * 1. Inventory all implemented features
 * 2. Map features to documentation
 * 3. Check documentation completeness
 * 4. Assess production readiness
 * 5. Generate a detailed validation report
 * 
 * Non-blocking informational analysis only.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_SITE = path.join(REPO_ROOT, 'docs-site');

// Feature inventory results
const inventory = {
  apps: [],
  contracts: [],
  sdk: [],
  agents: [],
  indexer: [],
  infra: [],
  workflows: [],
};

// Documentation mapping
const docsMapping = [];

// Completeness findings
const completenessFindings = [];

// Production readiness findings
const prodReadinessFindings = [];

/**
 * Recursively find files matching a pattern
 */
function findFiles(dir, pattern, results = []) {
  if (!fs.existsSync(dir)) return results;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, .git, dist, build directories
      if (!['node_modules', '.git', 'dist', 'build', '.next', 'artifacts', 'cache', 'typechain-types'].includes(file)) {
        findFiles(filePath, pattern, results);
      }
    } else if (pattern.test(file)) {
      results.push(filePath);
    }
  }
  
  return results;
}

/**
 * Read file content safely
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return null;
  }
}

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Inventory apps/web features
 */
function inventoryWebApp() {
  console.log('📱 Inventorying apps/web...');
  
  const webDir = path.join(REPO_ROOT, 'apps/web');
  const packageJson = JSON.parse(readFile(path.join(webDir, 'package.json')) || '{}');
  
  // Find all pages
  const pages = findFiles(path.join(webDir, 'app'), /page\.tsx?$/);
  
  // Find all components
  const components = findFiles(path.join(webDir, 'components'), /\.tsx?$/);
  
  inventory.apps.push({
    name: 'Web Application (Next.js)',
    path: 'apps/web',
    description: 'Next.js 14 web application with dashboards',
    features: {
      pages: pages.map(p => p.replace(webDir, '')),
      components: components.length,
      scripts: Object.keys(packageJson.scripts || {}),
    },
  });
}

/**
 * Inventory smart contracts
 */
function inventoryContracts() {
  console.log('📜 Inventorying packages/contracts...');
  
  const contractsDir = path.join(REPO_ROOT, 'packages/contracts');
  const contracts = findFiles(contractsDir, /\.sol$/);
  
  const contractsByCategory = {};
  
  contracts.forEach(contract => {
    const relativePath = contract.replace(contractsDir + '/', '');
    const category = relativePath.split('/')[0] || 'root';
    
    if (!contractsByCategory[category]) {
      contractsByCategory[category] = [];
    }
    
    const name = path.basename(contract, '.sol');
    contractsByCategory[category].push({
      name,
      path: relativePath,
    });
  });
  
  inventory.contracts = Object.entries(contractsByCategory).map(([category, contracts]) => ({
    category,
    count: contracts.length,
    contracts: contracts.map(c => c.name),
    paths: contracts.map(c => c.path),
  }));
}

/**
 * Inventory SDK modules
 */
function inventorySdk() {
  console.log('🔧 Inventorying packages/sdk...');
  
  const sdkDir = path.join(REPO_ROOT, 'packages/sdk');
  const modules = findFiles(sdkDir, /\.ts$/).filter(f => 
    !f.includes('node_modules') && 
    !f.includes('dist') &&
    !f.includes('.config.') &&
    !f.includes('test')
  );
  
  inventory.sdk = modules.map(module => {
    const name = path.basename(module, '.ts');
    const content = readFile(module) || '';
    
    // Extract exported functions/classes
    const exports = [];
    const exportMatches = content.matchAll(/export\s+(class|function|const)\s+(\w+)/g);
    for (const match of exportMatches) {
      exports.push(match[2]);
    }
    
    return {
      name,
      path: module.replace(REPO_ROOT, ''),
      exports: exports.slice(0, 5), // First 5 exports
    };
  });
}

/**
 * Inventory AI agents
 */
function inventoryAgents() {
  console.log('🤖 Inventorying packages/agents...');
  
  const agentsDir = path.join(REPO_ROOT, 'packages/agents');
  const agents = findFiles(agentsDir, /Agent\.ts$/);
  
  inventory.agents = agents.map(agent => {
    const name = path.basename(agent, '.ts');
    return {
      name,
      path: agent.replace(REPO_ROOT, ''),
    };
  });
}

/**
 * Inventory indexer services
 */
function inventoryIndexer() {
  console.log('🔍 Inventorying packages/indexer...');
  
  const indexerDir = path.join(REPO_ROOT, 'packages/indexer');
  const indexers = findFiles(indexerDir, /-indexer\.ts$/);
  
  inventory.indexer = indexers.map(indexer => {
    const name = path.basename(indexer, '.ts');
    return {
      name,
      path: indexer.replace(REPO_ROOT, ''),
    };
  });
}

/**
 * Inventory infrastructure
 */
function inventoryInfra() {
  console.log('🏗️ Inventorying infra/...');
  
  const infraDir = path.join(REPO_ROOT, 'infra');
  
  // Docker
  const dockerFiles = findFiles(path.join(infraDir, 'docker'), /^Dockerfile/);
  
  // Kubernetes
  const k8sFiles = findFiles(path.join(infraDir, 'k8s'), /\.yaml$/);
  
  // Terraform
  const terraformFiles = findFiles(path.join(infraDir, 'terraform'), /\.tf$/);
  
  // Scripts
  const scripts = findFiles(path.join(infraDir, 'scripts'), /\.(sh|js|ps1)$/);
  
  inventory.infra = {
    docker: dockerFiles.map(f => path.basename(f)),
    kubernetes: k8sFiles.map(f => f.replace(infraDir + '/', '')),
    terraform: terraformFiles.map(f => path.basename(f)),
    scripts: scripts.map(f => path.basename(f)),
  };
}

/**
 * Inventory GitHub workflows
 */
function inventoryWorkflows() {
  console.log('⚙️ Inventorying .github/workflows/...');
  
  const workflowsDir = path.join(REPO_ROOT, '.github/workflows');
  const workflows = findFiles(workflowsDir, /\.yml$/);
  
  inventory.workflows = workflows.map(workflow => {
    const name = path.basename(workflow, '.yml');
    const content = readFile(workflow) || '';
    
    // Extract job names
    const jobs = [];
    const jobMatches = content.matchAll(/^\s{2}(\w[\w-]+):/gm);
    for (const match of jobMatches) {
      jobs.push(match[1]);
    }
    
    return {
      name,
      path: workflow.replace(REPO_ROOT, ''),
      jobs,
    };
  });
}

/**
 * Find all documentation files
 */
function findDocumentationFiles() {
  const mdFiles = findFiles(DOCS_SITE, /\.mdx?$/);
  
  // Also include root-level documentation files
  const rootDocs = [
    'README.md',
    'BUILD_DEPLOY.md',
    'DEPLOYMENT_GUIDE.md',
    'IMPLEMENTATION_SUMMARY.md',
    'CHANGELOG.md',
    'RELEASE.md',
  ];
  
  const docs = mdFiles.map(f => ({
    path: f,
    relativePath: f.replace(DOCS_SITE + '/', ''),
    content: readFile(f),
  }));
  
  // Add root docs
  rootDocs.forEach(doc => {
    const fullPath = path.join(REPO_ROOT, doc);
    if (fileExists(fullPath)) {
      docs.push({
        path: fullPath,
        relativePath: `[ROOT]/${doc}`,
        content: readFile(fullPath),
      });
    }
  });
  
  return docs;
}

/**
 * Map features to documentation
 */
function mapFeaturesToDocs() {
  console.log('\n📋 Mapping features to documentation...');
  
  const docs = findDocumentationFiles();
  
  // Map contracts to protocol/tokens docs
  inventory.contracts.forEach(category => {
    category.contracts.forEach(contractName => {
      const docMatches = docs.filter(doc => 
        doc.content && (
          doc.content.toLowerCase().includes(contractName.toLowerCase()) ||
          doc.relativePath.toLowerCase().includes(contractName.toLowerCase().replace('token', ''))
        )
      );
      
      docsMapping.push({
        feature: `Contract: ${contractName}`,
        source: `packages/contracts/${category.category}/`,
        docsPages: docMatches.map(d => d.relativePath),
        coverage: docMatches.length > 0 ? 'FULL' : 'MISSING',
      });
    });
  });
  
  // Map SDK modules to sdk docs
  inventory.sdk.forEach(module => {
    const docMatches = docs.filter(doc => 
      doc.relativePath.includes('sdk/') && (
        doc.content && doc.content.toLowerCase().includes(module.name.toLowerCase())
      )
    );
    
    docsMapping.push({
      feature: `SDK: ${module.name}`,
      source: module.path,
      docsPages: docMatches.map(d => d.relativePath),
      coverage: docMatches.length > 0 ? 'PARTIAL' : 'MISSING',
    });
  });
  
  // Map agents to agents docs
  inventory.agents.forEach(agent => {
    const docMatches = docs.filter(doc => 
      doc.relativePath.includes('agents/') && (
        doc.content && doc.content.toLowerCase().includes(agent.name.toLowerCase())
      )
    );
    
    docsMapping.push({
      feature: `Agent: ${agent.name}`,
      source: agent.path,
      docsPages: docMatches.map(d => d.relativePath),
      coverage: docMatches.length > 0 ? 'PARTIAL' : 'MISSING',
    });
  });
  
  // Map infrastructure to deployment docs
  ['docker', 'kubernetes', 'terraform'].forEach(infraType => {
    const items = inventory.infra[infraType] || [];
    items.forEach(item => {
      const docMatches = docs.filter(doc => 
        (doc.content && doc.content.toLowerCase().includes(infraType)) ||
        doc.relativePath.toLowerCase().includes('deploy') ||
        doc.relativePath.toLowerCase().includes('infra')
      );
      
      docsMapping.push({
        feature: `Infra: ${infraType}/${item}`,
        source: `infra/${infraType}/`,
        docsPages: docMatches.length > 0 ? [docMatches[0].relativePath] : [],
        coverage: docMatches.length > 0 ? 'PARTIAL' : 'MISSING',
      });
    });
  });
  
  // Map workflows to CI/CD docs
  inventory.workflows.forEach(workflow => {
    const docMatches = docs.filter(doc => 
      doc.content && (
        doc.content.toLowerCase().includes('ci') ||
        doc.content.toLowerCase().includes('workflow') ||
        doc.content.toLowerCase().includes(workflow.name)
      )
    );
    
    docsMapping.push({
      feature: `Workflow: ${workflow.name}`,
      source: workflow.path,
      docsPages: docMatches.map(d => d.relativePath),
      coverage: docMatches.length > 0 ? 'PARTIAL' : 'MISSING',
    });
  });
}

/**
 * Check documentation completeness
 */
function checkDocCompleteness() {
  console.log('\n✅ Checking documentation completeness...');
  
  const docs = findDocumentationFiles();
  const requiredSections = [
    { name: 'Purpose/Overview', patterns: ['purpose', 'overview', 'introduction', '## '] },
    { name: 'Architecture', patterns: ['architecture', 'design', 'structure'] },
    { name: 'Setup/Installation', patterns: ['setup', 'install', 'getting started', 'prerequisites'] },
    { name: 'Environment Variables', patterns: ['environment', 'env', 'configuration', 'config'] },
    { name: 'Build Commands', patterns: ['build', 'compile', 'npm run', 'pnpm run'] },
    { name: 'Usage/Runtime', patterns: ['usage', 'running', 'start', 'runtime'] },
    { name: 'Deployment', patterns: ['deploy', 'production', 'release'] },
    { name: 'Security', patterns: ['security', 'authentication', 'authorization', 'secrets'] },
  ];
  
  docs.forEach(doc => {
    if (doc.content && doc.content.length > 200) { // Skip very short docs
      const missingSections = [];
      
      requiredSections.forEach(section => {
        const hasSection = section.patterns.some(pattern => 
          doc.content.toLowerCase().includes(pattern.toLowerCase())
        );
        
        if (!hasSection) {
          missingSections.push(section.name);
        }
      });
      
      if (missingSections.length > 0) {
        completenessFindings.push({
          doc: doc.relativePath,
          missingSections,
          severity: missingSections.length > 4 ? 'HIGH' : 'MEDIUM',
        });
      }
    }
  });
}

/**
 * Check production readiness documentation
 */
function checkProdReadiness() {
  console.log('\n🚀 Checking production readiness documentation...');
  
  const docs = findDocumentationFiles();
  const allContent = docs.map(d => d.content).join('\n').toLowerCase();
  
  const prodChecks = [
    {
      name: 'Production Build Steps',
      patterns: ['production build', 'build:web', 'build:protocol', 'NODE_ENV=production'],
      priority: 'BLOCKER',
    },
    {
      name: 'CI/CD Pipeline Documentation',
      patterns: ['github actions', 'ci/cd', 'workflow', 'continuous integration'],
      priority: 'BLOCKER',
    },
    {
      name: 'Infrastructure Deployment',
      patterns: ['kubernetes', 'docker', 'terraform', 'deployment'],
      priority: 'BLOCKER',
    },
    {
      name: 'Secret Management',
      patterns: ['secrets', 'environment variables', 'credentials', 'api keys'],
      priority: 'IMPORTANT',
    },
    {
      name: 'Monitoring & Alerting',
      patterns: ['monitoring', 'alerts', 'logging', 'observability'],
      priority: 'IMPORTANT',
    },
    {
      name: 'Upgrade/Migration Guide',
      patterns: ['upgrade', 'migration', 'version', 'changelog'],
      priority: 'IMPORTANT',
    },
    {
      name: 'Disaster Recovery',
      patterns: ['disaster recovery', 'backup', 'rollback', 'incident response'],
      priority: 'IMPORTANT',
    },
    {
      name: 'Performance Tuning',
      patterns: ['performance', 'optimization', 'scaling', 'caching'],
      priority: 'OPTIONAL',
    },
  ];
  
  prodChecks.forEach(check => {
    const hasCoverage = check.patterns.some(pattern => 
      allContent.includes(pattern.toLowerCase())
    );
    
    if (!hasCoverage) {
      prodReadinessFindings.push({
        check: check.name,
        status: 'MISSING',
        priority: check.priority,
      });
    } else {
      // Check if coverage is sufficient
      const mentionCount = check.patterns.reduce((count, pattern) => {
        return count + (allContent.match(new RegExp(pattern.toLowerCase(), 'g')) || []).length;
      }, 0);
      
      prodReadinessFindings.push({
        check: check.name,
        status: mentionCount > 5 ? 'ADEQUATE' : 'PARTIAL',
        priority: check.priority,
        mentions: mentionCount,
      });
    }
  });
}

/**
 * Verify documentation consistency
 */
function checkConsistency() {
  console.log('\n🔍 Checking documentation consistency...');
  
  const docs = findDocumentationFiles();
  const packageJson = JSON.parse(readFile(path.join(REPO_ROOT, 'package.json')) || '{}');
  const scripts = Object.keys(packageJson.scripts || {});
  
  const inconsistencies = [];
  
  docs.forEach(doc => {
    if (!doc.content) return;
    
    // Check for npm/pnpm commands
    const commandMatches = doc.content.matchAll(/`(npm|pnpm) run ([\w:-]+)`/g);
    
    for (const match of commandMatches) {
      const command = match[2];
      if (!scripts.includes(command)) {
        inconsistencies.push({
          doc: doc.relativePath,
          issue: `Command not found in package.json: ${match[1]} run ${command}`,
          type: 'INVALID_COMMAND',
        });
      }
    }
    
    // Check for file paths that might not exist
    const pathMatches = doc.content.matchAll(/`(apps\/[\w/-]+|packages\/[\w/-]+|infra\/[\w/-]+)`/g);
    
    for (const match of pathMatches) {
      const filePath = path.join(REPO_ROOT, match[1]);
      if (!fileExists(filePath)) {
        inconsistencies.push({
          doc: doc.relativePath,
          issue: `Path may not exist: ${match[1]}`,
          type: 'INVALID_PATH',
        });
      }
    }
  });
  
  return inconsistencies;
}

/**
 * Generate comprehensive report
 */
function generateReport() {
  console.log('\n📄 Generating validation report...');
  
  const inconsistencies = checkConsistency();
  
  let report = `# CastQuest Documentation Validation Report

**Generated:** ${new Date().toISOString()}  
**Repository:** CastQuest/cast  
**Purpose:** Non-blocking validation and audit of documentation completeness and accuracy

---

## Executive Summary

This report provides a comprehensive audit of the CastQuest monorepo documentation against implemented features and production workflows.

### Coverage Statistics

- **Total Features Inventoried:** ${docsMapping.length}
- **Fully Documented:** ${docsMapping.filter(m => m.coverage === 'FULL').length}
- **Partially Documented:** ${docsMapping.filter(m => m.coverage === 'PARTIAL').length}
- **Missing Documentation:** ${docsMapping.filter(m => m.coverage === 'MISSING').length}
- **Documentation Pages Analyzed:** ${findDocumentationFiles().length}
- **Completeness Issues Found:** ${completenessFindings.length}
- **Consistency Issues Found:** ${inconsistencies.length}

---

## 1. Feature Inventory

### 1.1 Web Application (apps/web)

`;

  inventory.apps.forEach(app => {
    report += `**${app.name}**\n`;
    report += `- Location: \`${app.path}\`\n`;
    report += `- Pages: ${app.features.pages.length}\n`;
    report += `- Components: ${app.features.components}\n`;
    report += `- Scripts: ${app.features.scripts.join(', ')}\n\n`;
  });

  report += `### 1.2 Smart Contracts (packages/contracts)\n\n`;
  
  inventory.contracts.forEach(category => {
    report += `**${category.category}** (${category.count} contracts)\n`;
    report += `- Contracts: ${category.contracts.join(', ')}\n\n`;
  });

  report += `### 1.3 SDK Modules (packages/sdk)\n\n`;
  
  inventory.sdk.forEach(module => {
    report += `- **${module.name}**: ${module.exports.length > 0 ? module.exports.join(', ') : 'module'}\n`;
  });

  report += `\n### 1.4 AI Agents (packages/agents)\n\n`;
  
  inventory.agents.forEach(agent => {
    report += `- ${agent.name}\n`;
  });

  report += `\n### 1.5 Indexers (packages/indexer)\n\n`;
  
  inventory.indexer.forEach(indexer => {
    report += `- ${indexer.name}\n`;
  });

  report += `\n### 1.6 Infrastructure (infra/)\n\n`;
  report += `**Docker:**\n`;
  inventory.infra.docker.forEach(f => report += `- ${f}\n`);
  
  report += `\n**Kubernetes:**\n`;
  inventory.infra.kubernetes.forEach(f => report += `- ${f}\n`);
  
  report += `\n**Terraform:**\n`;
  inventory.infra.terraform.forEach(f => report += `- ${f}\n`);
  
  report += `\n**Scripts:**\n`;
  inventory.infra.scripts.forEach(f => report += `- ${f}\n`);

  report += `\n### 1.7 GitHub Workflows (.github/workflows/)\n\n`;
  
  inventory.workflows.forEach(workflow => {
    report += `**${workflow.name}**\n`;
    report += `- Jobs: ${workflow.jobs.join(', ')}\n\n`;
  });

  report += `\n---\n\n## 2. Feature-to-Documentation Mapping\n\n`;
  report += `| Feature | Source Directory | Docs Pages | Coverage |\n`;
  report += `|---------|------------------|------------|----------|\n`;
  
  docsMapping.forEach(mapping => {
    const docsDisplay = mapping.docsPages.length > 0 
      ? mapping.docsPages.slice(0, 2).join(', ') + (mapping.docsPages.length > 2 ? '...' : '')
      : 'NONE';
    report += `| ${mapping.feature} | \`${mapping.source}\` | ${docsDisplay} | **${mapping.coverage}** |\n`;
  });

  report += `\n---\n\n## 3. Documentation Completeness Analysis\n\n`;
  
  if (completenessFindings.length === 0) {
    report += `✅ All documentation pages contain required sections.\n\n`;
  } else {
    report += `Found ${completenessFindings.length} documentation pages with missing sections:\n\n`;
    
    completenessFindings
      .sort((a, b) => b.missingSections.length - a.missingSections.length)
      .slice(0, 20)
      .forEach(finding => {
        report += `### ${finding.doc}\n`;
        report += `- **Severity:** ${finding.severity}\n`;
        report += `- **Missing Sections:** ${finding.missingSections.join(', ')}\n\n`;
      });
    
    if (completenessFindings.length > 20) {
      report += `\n_... and ${completenessFindings.length - 20} more pages with missing sections._\n\n`;
    }
  }

  report += `---\n\n## 4. Documentation Consistency Issues\n\n`;
  
  if (inconsistencies.length === 0) {
    report += `✅ No consistency issues found in documentation.\n\n`;
  } else {
    report += `Found ${inconsistencies.length} potential inconsistencies:\n\n`;
    
    const byType = {};
    inconsistencies.forEach(issue => {
      if (!byType[issue.type]) byType[issue.type] = [];
      byType[issue.type].push(issue);
    });
    
    Object.entries(byType).forEach(([type, issues]) => {
      report += `### ${type}\n\n`;
      issues.slice(0, 10).forEach(issue => {
        report += `- **${issue.doc}**: ${issue.issue}\n`;
      });
      if (issues.length > 10) {
        report += `\n_... and ${issues.length - 10} more ${type} issues._\n`;
      }
      report += `\n`;
    });
  }

  report += `---\n\n## 5. Production Readiness Assessment\n\n`;
  
  const blockers = prodReadinessFindings.filter(f => f.priority === 'BLOCKER');
  const important = prodReadinessFindings.filter(f => f.priority === 'IMPORTANT');
  const optional = prodReadinessFindings.filter(f => f.priority === 'OPTIONAL');
  
  report += `### BLOCKER Priority\n\n`;
  blockers.forEach(finding => {
    const status = finding.status === 'ADEQUATE' ? '✅' : finding.status === 'PARTIAL' ? '⚠️' : '❌';
    report += `${status} **${finding.check}**: ${finding.status}`;
    if (finding.mentions) report += ` (${finding.mentions} mentions)`;
    report += `\n`;
  });
  
  report += `\n### IMPORTANT Priority\n\n`;
  important.forEach(finding => {
    const status = finding.status === 'ADEQUATE' ? '✅' : finding.status === 'PARTIAL' ? '⚠️' : '❌';
    report += `${status} **${finding.check}**: ${finding.status}`;
    if (finding.mentions) report += ` (${finding.mentions} mentions)`;
    report += `\n`;
  });
  
  report += `\n### OPTIONAL Priority\n\n`;
  optional.forEach(finding => {
    const status = finding.status === 'ADEQUATE' ? '✅' : finding.status === 'PARTIAL' ? '⚠️' : '❌';
    report += `${status} **${finding.check}**: ${finding.status}`;
    if (finding.mentions) report += ` (${finding.mentions} mentions)`;
    report += `\n`;
  });

  report += `\n---\n\n## 6. Missing Documentation Checklist\n\n`;
  report += `The following documentation pages or sections are recommended:\n\n`;
  
  const missingFeatures = docsMapping.filter(m => m.coverage === 'MISSING');
  
  if (missingFeatures.length > 0) {
    report += `### Features Without Documentation\n\n`;
    
    missingFeatures.slice(0, 30).forEach(feature => {
      const suggestedPath = feature.feature.toLowerCase().includes('contract') 
        ? 'docs-site/protocol/'
        : feature.feature.toLowerCase().includes('sdk')
        ? 'docs-site/sdk/'
        : feature.feature.toLowerCase().includes('agent')
        ? 'docs-site/agents/'
        : feature.feature.toLowerCase().includes('workflow')
        ? 'docs-site/overview/'
        : 'docs-site/reference/';
      
      const filename = feature.feature
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') + '.mdx';
      
      report += `- [ ] **${feature.feature}**\n`;
      report += `  - Source: \`${feature.source}\`\n`;
      report += `  - Suggested location: \`${suggestedPath}${filename}\`\n\n`;
    });
  }
  
  const highSeverityDocs = completenessFindings.filter(f => f.severity === 'HIGH');
  if (highSeverityDocs.length > 0) {
    report += `### Existing Documentation Needing Completion\n\n`;
    highSeverityDocs.slice(0, 15).forEach(finding => {
      report += `- [ ] **${finding.doc}**\n`;
      report += `  - Add sections: ${finding.missingSections.join(', ')}\n\n`;
    });
  }

  report += `\n---\n\n## 7. Recommendations\n\n`;
  report += `### High Priority\n\n`;
  report += `1. **Document missing features** - ${missingFeatures.length} features lack documentation\n`;
  report += `2. **Fix consistency issues** - ${inconsistencies.length} inconsistencies found\n`;
  report += `3. **Complete production readiness docs** - Address ${blockers.filter(b => b.status !== 'ADEQUATE').length} blocker items\n\n`;
  
  report += `### Medium Priority\n\n`;
  report += `1. **Fill in missing sections** - ${completenessFindings.length} docs need completion\n`;
  report += `2. **Enhance important production docs** - ${important.filter(i => i.status !== 'ADEQUATE').length} items need attention\n`;
  report += `3. **Create migration guides** - If not present\n\n`;
  
  report += `### Low Priority\n\n`;
  report += `1. **Add optional production docs** - ${optional.filter(o => o.status !== 'ADEQUATE').length} items\n`;
  report += `2. **Improve cross-references** - Link related documentation\n`;
  report += `3. **Add code examples** - Especially for SDK modules\n\n`;

  report += `---\n\n## 8. Notes\n\n`;
  report += `- This is a **non-blocking, informational report**\n`;
  report += `- No runtime or feature logic has been modified\n`;
  report += `- All findings are recommendations for documentation improvement\n`;
  report += `- Documentation validation should be run periodically as features evolve\n`;
  report += `- Consider integrating validation into CI/CD as informational checks\n\n`;

  report += `---\n\n## 9. Validation Metadata\n\n`;
  report += `- **Script:** \`scripts/validate-docs.js\`\n`;
  report += `- **Repository Root:** \`${REPO_ROOT}\`\n`;
  report += `- **Documentation Root:** \`${DOCS_SITE}\`\n`;
  report += `- **Analysis Date:** ${new Date().toLocaleString()}\n`;
  report += `- **Total Features Analyzed:** ${docsMapping.length}\n`;
  report += `- **Total Docs Analyzed:** ${findDocumentationFiles().length}\n\n`;

  report += `---\n\n`;
  report += `**End of Report**\n`;

  return report;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting CastQuest Documentation Validation\n');
  console.log('================================================\n');
  
  // Phase 1: Inventory
  console.log('PHASE 1: Feature Inventory');
  console.log('---------------------------');
  inventoryWebApp();
  inventoryContracts();
  inventorySdk();
  inventoryAgents();
  inventoryIndexer();
  inventoryInfra();
  inventoryWorkflows();
  
  // Phase 2: Mapping
  console.log('\nPHASE 2: Documentation Mapping');
  console.log('-------------------------------');
  mapFeaturesToDocs();
  
  // Phase 3: Completeness
  console.log('\nPHASE 3: Completeness Checks');
  console.log('-----------------------------');
  checkDocCompleteness();
  
  // Phase 4: Production Readiness
  console.log('\nPHASE 4: Production Readiness');
  console.log('------------------------------');
  checkProdReadiness();
  
  // Phase 5: Generate Report
  console.log('\nPHASE 5: Report Generation');
  console.log('---------------------------');
  const report = generateReport();
  
  // Write report
  const reportPath = path.join(REPO_ROOT, 'DOCS_VALIDATION_REPORT.md');
  fs.writeFileSync(reportPath, report);
  
  console.log(`\n✅ Report generated: ${reportPath}`);
  console.log('\n================================================');
  console.log('Documentation validation complete!');
  console.log('================================================\n');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
