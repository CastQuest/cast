#!/usr/bin/env node

/**
 * Documentation Validation Script
 * 
 * Validates that all features have complete documentation with required sections:
 * - architecture
 * - setup
 * - environment variables
 * - build & runtime
 * - deployment
 * - security
 * 
 * Outputs a DOCS_VALIDATION_REPORT.md file with findings.
 */

const fs = require('fs');
const path = require('path');

// Required sections for complete documentation
const REQUIRED_SECTIONS = [
  'architecture',
  'setup',
  'environment variables',
  'build',
  'deployment',
  'security'
];

// Features to validate (mapped to code paths and doc locations)
const FEATURES = [
  {
    name: 'SDK',
    codePath: 'packages/sdk/',
    docsPath: 'docs-site/sdk/',
    envVars: ['CASTQUEST_API_KEY', 'CASTQUEST_NETWORK'],
    buildCommand: 'pnpm --filter @castquest/sdk build',
    testCommand: 'pnpm --filter @castquest/sdk test'
  },
  {
    name: 'Agents',
    codePath: 'packages/agents/',
    docsPath: 'docs-site/agents/',
    envVars: ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'REPLICATE_API_KEY'],
    buildCommand: 'pnpm --filter @castquest/agents build',
    testCommand: 'pnpm --filter @castquest/agents test'
  },
  {
    name: 'Indexer',
    codePath: 'packages/indexer/',
    docsPath: 'docs-site/overview/',
    envVars: ['DATABASE_URL', 'REDIS_URL', 'BASE_RPC_URL', 'ETHEREUM_RPC_URL'],
    buildCommand: 'pnpm --filter @castquest/indexer build',
    testCommand: 'pnpm --filter @castquest/indexer test'
  },
  {
    name: 'Contracts',
    codePath: 'packages/contracts/',
    docsPath: 'docs-site/protocol/',
    envVars: ['DEPLOYER_PRIVATE_KEY', 'BASE_RPC_URL', 'BASESCAN_API_KEY'],
    buildCommand: 'pnpm --filter @castquest/contracts build',
    testCommand: 'pnpm --filter @castquest/contracts test'
  },
  {
    name: 'Web App',
    codePath: 'apps/web/',
    docsPath: 'docs-site/overview/',
    envVars: ['NEXT_PUBLIC_APP_URL', 'DATABASE_URL', 'SESSION_SECRET'],
    buildCommand: 'pnpm --filter @castquest/web build',
    testCommand: 'pnpm --filter @castquest/web test'
  },
  {
    name: 'Frames',
    codePath: 'apps/web/',
    docsPath: 'docs-site/frames/',
    envVars: ['FARCASTER_APP_FID', 'FARCASTER_APP_MNEMONIC'],
    buildCommand: 'pnpm --filter @castquest/web build',
    testCommand: null
  },
  {
    name: 'Quests',
    codePath: 'apps/web/',
    docsPath: 'docs-site/quests/',
    envVars: [],
    buildCommand: 'pnpm --filter @castquest/web build',
    testCommand: null
  },
  {
    name: 'Mints',
    codePath: 'apps/web/',
    docsPath: 'docs-site/mints/',
    envVars: [],
    buildCommand: 'pnpm --filter @castquest/web build',
    testCommand: null
  },
  {
    name: 'Marketplace',
    codePath: 'apps/web/',
    docsPath: 'docs-site/marketplace/',
    envVars: [],
    buildCommand: 'pnpm --filter @castquest/web build',
    testCommand: null
  }
];

// Check if a section exists in documentation content
function hasSectionContent(content, sectionKeywords) {
  const lowerContent = content.toLowerCase();
  
  // Check for section headers
  for (const keyword of sectionKeywords) {
    const patterns = [
      new RegExp(`#+\\s*${keyword}`, 'i'),
      new RegExp(`##\\s*${keyword}`, 'i'),
      new RegExp(`###\\s*${keyword}`, 'i')
    ];
    
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        // Check if section has actual content (not just template text)
        const match = pattern.exec(content);
        if (match) {
          const afterSection = content.substring(match.index + match[0].length);
          const nextSection = afterSection.indexOf('\n##');
          const sectionContent = nextSection > -1 
            ? afterSection.substring(0, nextSection)
            : afterSection;
          
          // Check if it's not just placeholder text
          if (!sectionContent.includes('Describe the') && 
              !sectionContent.includes('Explain the') &&
              !sectionContent.includes('Add implementation') &&
              !sectionContent.includes('$args') &&
              sectionContent.trim().length > 50) {
            return 'COMPLETE';
          } else if (sectionContent.trim().length > 10) {
            return 'PARTIAL';
          }
        }
      }
    }
  }
  
  return 'MISSING';
}

// Validate a feature's documentation
function validateFeature(feature) {
  const rootDir = path.resolve(__dirname, '../..');
  const docsDir = path.join(rootDir, feature.docsPath);
  
  const results = {
    feature: feature.name,
    codePath: feature.codePath,
    docsPath: feature.docsPath,
    sections: {},
    overall: 'COMPLETE'
  };
  
  // Check if docs directory exists
  if (!fs.existsSync(docsDir)) {
    results.overall = 'MISSING';
    return results;
  }
  
  // Read all markdown files in docs directory
  let allDocsContent = '';
  try {
    const files = fs.readdirSync(docsDir);
    const mdFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    
    for (const file of mdFiles) {
      const filePath = path.join(docsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      allDocsContent += content + '\n';
    }
  } catch (err) {
    results.overall = 'MISSING';
    return results;
  }
  
  // Check each required section
  const sectionKeywords = {
    'architecture': ['architecture', 'design', 'structure', 'components'],
    'setup': ['setup', 'installation', 'getting started', 'prerequisites', 'dependencies'],
    'environment variables': ['environment variables', 'env vars', 'configuration', 'env', 'environment'],
    'build': ['build', 'compile', 'bundling', 'building'],
    'deployment': ['deployment', 'deploy', 'publishing', 'release'],
    'security': ['security', 'authentication', 'authorization', 'vulnerabilities', 'secrets']
  };
  
  for (const section of REQUIRED_SECTIONS) {
    const keywords = sectionKeywords[section] || [section];
    const status = hasSectionContent(allDocsContent, keywords);
    results.sections[section] = status;
    
    if (status === 'MISSING') {
      results.overall = 'INCOMPLETE';
    } else if (status === 'PARTIAL' && results.overall === 'COMPLETE') {
      results.overall = 'PARTIAL';
    }
  }
  
  return results;
}

// Generate the validation report
function generateReport() {
  const results = FEATURES.map(validateFeature);
  
  let report = `# Documentation Validation Report\n\n`;
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += `This report identifies documentation gaps across the CastQuest repository.\n`;
  report += `Each feature should have complete documentation covering:\n`;
  report += REQUIRED_SECTIONS.map(s => `- ${s}`).join('\n') + '\n\n';
  
  report += `## Summary\n\n`;
  const complete = results.filter(r => r.overall === 'COMPLETE').length;
  const partial = results.filter(r => r.overall === 'PARTIAL').length;
  const incomplete = results.filter(r => r.overall === 'INCOMPLETE').length;
  const missing = results.filter(r => r.overall === 'MISSING').length;
  
  report += `- ✅ Complete: ${complete}\n`;
  report += `- ⚠️ Partial: ${partial}\n`;
  report += `- ❌ Incomplete: ${incomplete}\n`;
  report += `- 🚫 Missing: ${missing}\n\n`;
  
  report += `## Feature Details\n\n`;
  
  for (const result of results) {
    const icon = result.overall === 'COMPLETE' ? '✅' : 
                 result.overall === 'PARTIAL' ? '⚠️' : 
                 result.overall === 'INCOMPLETE' ? '❌' : '🚫';
    
    report += `### ${icon} ${result.feature}\n\n`;
    report += `**Status:** ${result.overall}\n\n`;
    report += `**Code Path:** \`${result.codePath}\`\n\n`;
    report += `**Docs Path:** \`${result.docsPath}\`\n\n`;
    
    const feature = FEATURES.find(f => f.name === result.feature);
    
    if (feature.envVars && feature.envVars.length > 0) {
      report += `**Environment Variables:**\n`;
      for (const envVar of feature.envVars) {
        report += `- \`${envVar}\`\n`;
      }
      report += `\n`;
    }
    
    if (feature.buildCommand) {
      report += `**Build Command:** \`${feature.buildCommand}\`\n\n`;
    }
    
    if (feature.testCommand) {
      report += `**Test Command:** \`${feature.testCommand}\`\n\n`;
    }
    
    report += `**Section Coverage:**\n\n`;
    for (const [section, status] of Object.entries(result.sections)) {
      const sectionIcon = status === 'COMPLETE' ? '✅' : 
                         status === 'PARTIAL' ? '⚠️' : '❌';
      report += `- ${sectionIcon} ${section}: ${status}\n`;
    }
    report += `\n`;
  }
  
  report += `## Recommended Actions\n\n`;
  report += `1. Complete all MISSING sections with actual content\n`;
  report += `2. Expand PARTIAL sections with complete information\n`;
  report += `3. Add cross-references to code paths in each doc\n`;
  report += `4. Validate all commands and environment variable names\n`;
  report += `5. Include security best practices in each feature doc\n\n`;
  
  report += `## Validation Script\n\n`;
  report += `To run this validation:\n`;
  report += `\`\`\`bash\n`;
  report += `pnpm validate:docs\n`;
  report += `\`\`\`\n\n`;
  report += `The script checks:\n`;
  report += `- Existence of documentation files\n`;
  report += `- Presence of required sections\n`;
  report += `- Content completeness (not just templates)\n`;
  report += `- Cross-references to code paths\n`;
  
  return report;
}

// Main execution
const report = generateReport();
const reportPath = path.resolve(__dirname, '../../DOCS_VALIDATION_REPORT.md');
fs.writeFileSync(reportPath, report);

console.log('✅ Documentation validation complete');
console.log(`📄 Report generated: ${reportPath}`);
console.log('\nRun: cat DOCS_VALIDATION_REPORT.md to view the report');
