// CASTQUEST Indexer Entry Point
console.log('CASTQUEST Indexer starting...');

export async function startIndexer() {
  console.log('Indexer service started');
  // Indexer implementation will be added here
}

if (require.main === module) {
  startIndexer().catch(console.error);
}
