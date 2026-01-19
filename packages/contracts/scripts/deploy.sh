#!/bin/bash
# Deployment script for contract deployment
# This script should be run with appropriate environment variables set

set -e

echo "🚀 Deploying CASTQUEST Contracts"

# Check required environment variables
if [ -z "$PRIVATE_KEY" ]; then
  echo "❌ Error: PRIVATE_KEY environment variable is required"
  exit 1
fi

if [ -z "$RPC_URL_BASE" ]; then
  echo "❌ Error: RPC_URL_BASE environment variable is required"
  exit 1
fi

# Navigate to contracts directory
cd "$(dirname "$0")/.." || exit 1

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🔨 Compiling contracts..."
pnpm run build

echo "🧪 Running tests..."
pnpm run test

echo "📝 Deploying contracts to Base..."
pnpm run deploy:base

echo "✅ Deployment complete!"
