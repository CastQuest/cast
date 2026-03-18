export type AgentStatus = 'idle' | 'running' | 'error' | 'stopped';

export interface AgentConfig {
  id: string;
  name: string;
  description?: string;
  maxRetries?: number;
  timeoutMs?: number;
}

export interface AgentMessage {
  from: string;
  to: string;
  type: string;
  payload: unknown;
  timestamp: number;
}

export interface Task {
  id: string;
  type: string;
  payload: unknown;
  priority?: number;
  createdAt: number;
}

export interface TaskResult {
  taskId: string;
  success: boolean;
  data?: unknown;
  error?: string;
  completedAt: number;
}

export interface SwarmConfig {
  name: string;
  maxConcurrency?: number;
  messageBusSize?: number;
}
