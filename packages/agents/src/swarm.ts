import type { Agent } from './agent';
import type { AgentMessage, SwarmConfig, Task, TaskResult } from './types';

export class Swarm {
  private config: SwarmConfig;
  private agents: Map<string, Agent> = new Map();
  private taskQueue: Task[] = [];
  private running = false;

  constructor(config: SwarmConfig) {
    this.config = config;
  }

  get name(): string {
    return this.config.name;
  }

  registerAgent(agent: Agent): void {
    this.agents.set(agent.id, agent);
  }

  unregisterAgent(agentId: string): void {
    this.agents.delete(agentId);
  }

  getAgent(agentId: string): Agent | undefined {
    return this.agents.get(agentId);
  }

  listAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  async start(): Promise<void> {
    this.running = true;
    for (const agent of this.agents.values()) {
      await agent.init();
    }
  }

  async stop(): Promise<void> {
    this.running = false;
    for (const agent of this.agents.values()) {
      await agent.shutdown();
    }
  }

  async dispatch(task: Task): Promise<TaskResult> {
    const agent = this.routeTask(task);
    if (!agent) {
      return {
        taskId: task.id,
        success: false,
        error: 'No agents available to handle the task',
        completedAt: Date.now(),
      };
    }
    return agent.execute(task);
  }

  enqueueTask(task: Task): void {
    this.taskQueue.push(task);
    this.taskQueue.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  }

  async processQueue(): Promise<TaskResult[]> {
    const results: TaskResult[] = [];

    while (this.taskQueue.length > 0 && this.running) {
      // Only dispatch to agents that are currently idle to avoid concurrent tasks on the same agent
      const idleAgents = Array.from(this.agents.values()).filter(
        (a) => a.getStatus() === 'idle'
      );
      if (idleAgents.length === 0) {
        // No idle agents; wait briefly and retry
        await new Promise((resolve) => setTimeout(resolve, 50));
        continue;
      }

      const batchSize = Math.min(idleAgents.length, this.taskQueue.length);
      const batch = this.taskQueue.splice(0, batchSize);

      // Pair each task with a distinct idle agent
      const batchResults = await Promise.all(
        batch.map((task, i) => idleAgents[i].execute(task))
      );
      results.push(...batchResults);
    }
    return results;
  }

  broadcast(message: AgentMessage): void {
    for (const agent of this.agents.values()) {
      if (agent.id !== message.from) {
        agent.receiveMessage(message);
      }
    }
  }

  sendMessage(message: AgentMessage): void {
    const target = this.agents.get(message.to);
    if (target) {
      target.receiveMessage(message);
    }
  }

  private routeTask(_task: Task): Agent | undefined {
    const agentsList = Array.from(this.agents.values());
    return agentsList.find((a) => a.getStatus() === 'idle');
  }
}
