import { Agent } from '../agent';
import type { Task, TaskResult } from '../types';

export class MonitoringAgent extends Agent {
  private metrics: Record<string, number> = {};

  async execute(task: Task): Promise<TaskResult> {
    this.status = 'running';
    try {
      const payload = task.payload as { metric?: string; value?: number };
      if (payload.metric) {
        this.metrics[payload.metric] = payload.value ?? 0;
      }
      this.status = 'idle';
      return this.createResult(task, {
        metrics: { ...this.metrics },
        timestamp: Date.now(),
      });
    } catch (err) {
      this.status = 'error';
      return this.createErrorResult(task, String(err));
    }
  }

  getMetrics(): Record<string, number> {
    return { ...this.metrics };
  }
}
