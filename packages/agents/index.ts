// CASTQUEST Agents Entry Point
console.log('CASTQUEST Agents starting...');

export async function startAgents() {
  console.log('Agents service started');
  // Agent implementation will be added here
}

if (require.main === module) {
  startAgents().catch(console.error);
}
