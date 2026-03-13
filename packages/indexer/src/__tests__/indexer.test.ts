import { describe, it, expect } from 'vitest';

describe('@castquest/indexer', () => {
  it('indexer module loads correctly', async () => {
    const indexer = await import('../../index');
    expect(indexer).toBeDefined();
    expect(typeof indexer.startIndexer).toBe('function');
  });
});
