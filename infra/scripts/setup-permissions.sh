#!/bin/bash
# Script to make deploy.sh executable
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="$SCRIPT_DIR/../../packages/contracts/scripts/deploy.sh"
chmod +x "$TARGET"
