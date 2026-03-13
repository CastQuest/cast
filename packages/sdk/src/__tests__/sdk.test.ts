import { describe, it, expect } from 'vitest';

describe('@castquest/sdk', () => {
  it('exports a valid module', async () => {
    const sdk = await import('../../index');
    expect(sdk).toBeDefined();
  });

  it('wallet module is a valid module', async () => {
    const wallet = await import('../../wallet');
    expect(wallet).toBeDefined();
  });

  it('marketplace module is a valid module', async () => {
    const marketplace = await import('../../marketplace');
    expect(marketplace).toBeDefined();
  });
});
