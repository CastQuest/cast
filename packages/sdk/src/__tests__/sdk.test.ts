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

describe('Plugin system', () => {
  it('Registry can register and list plugins', async () => {
    const { Registry, AnalyticsPlugin } = await import('../plugins/index');
    const registry = new Registry();
    const analytics = new AnalyticsPlugin();
    await registry.register(analytics);
    expect(registry.listPlugins()).toHaveLength(1);
    expect(registry.getPlugin('analytics')).toBe(analytics);
  });

  it('Registry emits hooks to plugins', async () => {
    const { Registry, AnalyticsPlugin } = await import('../plugins/index');
    const registry = new Registry();
    const analytics = new AnalyticsPlugin();
    await registry.register(analytics); // register() calls init() automatically
    await registry.emit('onMint', { tokenId: 1, contract: '0x0', to: '0xabc' });
    expect(analytics.getEventCount()).toBe(1);
  });

  it('NotificationPlugin sends notifications on mint', async () => {
    const { Registry, NotificationPlugin } = await import('../plugins/index');
    const registry = new Registry();
    const notifications = new NotificationPlugin();
    await registry.register(notifications); // register() calls init() automatically
    await registry.emit('onMint', { tokenId: 42, contract: '0x0', to: '0xabc' });
    const queue = notifications.getQueue();
    expect(queue).toHaveLength(1);
    expect(queue[0].type).toBe('mint');
  });

  it('Registry unregister awaits destroy and removes plugin', async () => {
    const { Registry, AnalyticsPlugin } = await import('../plugins/index');
    const registry = new Registry();
    const analytics = new AnalyticsPlugin();
    await registry.register(analytics);
    await registry.unregister('analytics');
    expect(registry.listPlugins()).toHaveLength(0);
  });

  it('Registry throws when registering a duplicate plugin name', async () => {
    const { Registry, AnalyticsPlugin } = await import('../plugins/index');
    const registry = new Registry();
    await registry.register(new AnalyticsPlugin());
    await expect(registry.register(new AnalyticsPlugin())).rejects.toThrow('already registered');
  });
});

