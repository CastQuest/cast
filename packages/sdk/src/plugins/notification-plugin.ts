import type { PluginRegistry, PluginWithHooks } from './types';

export interface Notification {
  type: string;
  title: string;
  message: string;
  timestamp: number;
}

export class NotificationPlugin implements PluginWithHooks {
  name = 'notifications';
  version = '1.0.0';
  private queue: Notification[] = [];
  private handler: ((n: Notification) => void) | null = null;

  async init(_registry: PluginRegistry): Promise<void> {
    this.queue = [];
  }

  async destroy(): Promise<void> {
    this.queue = [];
    this.handler = null;
  }

  setHandler(handler: (n: Notification) => void): void {
    this.handler = handler;
  }

  private push(type: string, title: string, message: string): void {
    const n: Notification = { type, title, message, timestamp: Date.now() };
    this.queue.push(n);
    if (this.handler) this.handler(n);
  }

  onMint(payload: { tokenId: number; contract: string; to: string }): void {
    this.push('mint', 'New Mint!', `Token #${payload.tokenId} minted to ${payload.to}`);
  }

  onQuest(payload: { questId: string; userId: string; action: string }): void {
    this.push('quest', 'Quest Update', `Quest ${payload.questId}: ${payload.action}`);
  }

  onGovernanceProposal(payload: { proposalId: string; proposer: string; description: string }): void {
    this.push('governance', 'New Proposal', payload.description.slice(0, 80));
  }

  getQueue(): Notification[] {
    return [...this.queue];
  }
}
