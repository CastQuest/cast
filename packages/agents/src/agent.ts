import type { AgentConfig, AgentMessage, AgentStatus, Task, TaskResult } from './types';

export abstract class Agent {
  protected config: AgentConfig;
  protected status: AgentStatus = 'idle';
  protected messageQueue: AgentMessage[] = [];

  constructor(config: AgentConfig) {
    this.config = config;
  }

  get id(): string {
    return this.config.id;
  }

  get name(): string {
    return this.config.name;
  }

  getStatus(): AgentStatus {
    return this.status;
  }

  async init(): Promise<void> {
    this.status = 'idle';
  }

  abstract execute(_task: Task): Promise<TaskResult>;

  async shutdown(): Promise<void> {
    this.status = 'stopped';
  }

  receiveMessage(message: AgentMessage): void {
    this.messageQueue.push(message);
  }

  protected createResult(task: Task, data: unknown, success = true): TaskResult {
    return {
      taskId: task.id,
      success,
      data,
      completedAt: Date.now(),
    };
  }

  protected createErrorResult(task: Task, error: string): TaskResult {
    return {
      taskId: task.id,
      success: false,
      error,
      completedAt: Date.now(),
    };
  }
}
