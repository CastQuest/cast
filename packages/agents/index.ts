// CASTQUEST Agents Entry Point
console.log('CASTQUEST Agents starting...');

export async function startAgents() {
  console.log('Agents service started');
  // Agent implementation will be added here
}

// Only run if this is the main module
const isMainModule = require.main === module;
if (isMainModule) {
  startAgents().catch(console.error);
}
