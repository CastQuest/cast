import type { PluginRegistry, PluginWithHooks } from './types';

export class AnalyticsPlugin implements PluginWithHooks {
  name = 'analytics';
  version = '1.0.0';
  private events: Array<{ hook: string; payload: unknown; timestamp: number }> = [];

  async init(_registry: PluginRegistry): Promise<void> {
    this.events = [];
  }

  async destroy(): Promise<void> {
    this.events = [];
  }

  private track(hook: string, payload: unknown): void {
    this.events.push({ hook, payload, timestamp: Date.now() });
  }

  onTransaction(payload: { hash: string; from: string; to: string; value: string }): void {
    this.track('onTransaction', payload);
  }

  onMint(payload: { tokenId: number; contract: string; to: string }): void {
    this.track('onMint', payload);
  }

  onQuest(payload: { questId: string; userId: string; action: string }): void {
    this.track('onQuest', payload);
  }

  onAgentAction(payload: { agentId: string; action: string; payload: unknown }): void {
    this.track('onAgentAction', payload);
  }

  getEvents(): Array<{ hook: string; payload: unknown; timestamp: number }> {
    return [...this.events];
  }

  getEventCount(): number {
    return this.events.length;
  }
}
