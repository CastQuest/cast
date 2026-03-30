import { Agent } from '../agent';
import type { Task, TaskResult } from '../types';

export class PricingAgent extends Agent {
  async execute(task: Task): Promise<TaskResult> {
    this.status = 'running';
    try {
      const payload = task.payload as { tokenAddress?: string; amount?: number };
      // Stub: would call on-chain pricing oracle
      const price = Math.random() * 100;
      this.status = 'idle';
      return this.createResult(task, {
        tokenAddress: payload.tokenAddress ?? '0x0',
        price,
        currency: 'USDC',
        timestamp: Date.now(),
      });
    } catch (err) {
      this.status = 'error';
      return this.createErrorResult(task, String(err));
    }
  }
}
