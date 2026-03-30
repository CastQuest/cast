import type { HookName, PluginRegistry, PluginWithHooks } from './types';

export class Registry implements PluginRegistry {
  private plugins: Map<string, PluginWithHooks> = new Map();

  async register(plugin: PluginWithHooks): Promise<void> {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin "${plugin.name}" is already registered`);
    }
    await plugin.init(this);
    this.plugins.set(plugin.name, plugin);
  }

  async unregister(name: string): Promise<void> {
    const plugin = this.plugins.get(name);
    if (plugin) {
      this.plugins.delete(name);
      await plugin.destroy();
    }
  }

  getPlugin(name: string): PluginWithHooks | undefined {
    return this.plugins.get(name);
  }

  listPlugins(): PluginWithHooks[] {
    return Array.from(this.plugins.values());
  }

  async emit<T>(hook: HookName, payload: T): Promise<void> {
    const handlerKey = hook as keyof PluginWithHooks;
    const pluginsWithHook = Array.from(this.plugins.values()).filter(
      (p) => typeof p[handlerKey] === 'function'
    );

    await Promise.all(
      pluginsWithHook.map((p) => {
        const handler = p[handlerKey] as (payload: T) => void | Promise<void>;
        return handler.call(p, payload);
      })
    );
  }

  async initAll(): Promise<void> {
    for (const plugin of this.plugins.values()) {
      await plugin.init(this);
    }
  }

  async destroyAll(): Promise<void> {
    for (const plugin of this.plugins.values()) {
      await plugin.destroy();
    }
    this.plugins.clear();
  }
}
