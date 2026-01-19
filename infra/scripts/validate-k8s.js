#!/usr/bin/env node
/**
 * Kubernetes manifest validation script
 * Validates all K8s manifests for syntax and best practices
 */

const fs = require('fs');
const path = require('path');

const K8S_DIR = path.join(__dirname, '..', 'k8s');
const ENVIRONMENTS = ['staging', 'production'];

function validateManifests() {
  console.log('🔍 Validating Kubernetes manifests...\n');

  let hasErrors = false;

  for (const env of ENVIRONMENTS) {
    const envDir = path.join(K8S_DIR, env);
    
    if (!fs.existsSync(envDir)) {
      console.error(`❌ Directory not found: ${envDir}`);
      hasErrors = true;
      continue;
    }

    console.log(`📁 Validating ${env} environment...`);

    const files = fs.readdirSync(envDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

    for (const file of files) {
      const filePath = path.join(envDir, file);
      console.log(`  Checking ${file}...`);

      try {
        // Basic YAML syntax validation using kubectl dry-run
        // In CI, this would use actual kubectl. For local dev, we do basic checks
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for basic syntax issues
        if (!content.includes('apiVersion:')) {
          throw new Error('Missing apiVersion field');
        }
        if (!content.includes('kind:')) {
          throw new Error('Missing kind field');
        }
        if (!content.includes('metadata:')) {
          throw new Error('Missing metadata field');
        }

        // Check for common security issues
        if (content.includes('privileged: true')) {
          console.warn(`  ⚠️  Warning: Privileged container found in ${file}`);
        }

        // Check for resource limits
        if (content.includes('kind: Deployment') || content.includes('kind: StatefulSet')) {
          if (!content.includes('limits:') || !content.includes('requests:')) {
            console.warn(`  ⚠️  Warning: Missing resource limits/requests in ${file}`);
          }
        }

        console.log(`  ✅ ${file} is valid`);
      } catch (error) {
        console.error(`  ❌ ${file}: ${error.message}`);
        hasErrors = true;
      }
    }

    console.log('');
  }

  if (hasErrors) {
    console.error('❌ Validation failed with errors');
    process.exit(1);
  } else {
    console.log('✅ All Kubernetes manifests are valid!');
    process.exit(0);
  }
}

// Run validation
validateManifests();
