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

  async dispatch(task: Task): Promise<TaskResult | null> {
    const agent = this.routeTask(task);
    if (!agent) {
      return null;
    }
    return agent.execute(task);
  }

  enqueueTask(task: Task): void {
    this.taskQueue.push(task);
    this.taskQueue.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  }

  async processQueue(): Promise<TaskResult[]> {
    const results: TaskResult[] = [];
    const maxConcurrency = this.config.maxConcurrency ?? 5;

    while (this.taskQueue.length > 0 && this.running) {
      const batch = this.taskQueue.splice(0, maxConcurrency);
      const batchResults = await Promise.all(
        batch.map((task) => this.dispatch(task))
      );
      results.push(...batchResults.filter((r): r is TaskResult => r !== null));
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
    const available = agentsList.filter((a) => a.getStatus() === 'idle');
    if (available.length === 0) return agentsList[0];
    return available[0];
  }
}
