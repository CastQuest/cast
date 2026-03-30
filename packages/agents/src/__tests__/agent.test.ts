import { describe, it, expect, beforeEach } from 'vitest';
import { PricingAgent } from '../agents/pricing-agent';
import type { Task } from '../types';

function makeTask(type: string, payload: unknown): Task {
  return {
    id: `task-${Date.now()}`,
    type,
    payload,
    createdAt: Date.now(),
  };
}

describe('Agent base class', () => {
  let agent: PricingAgent;

  beforeEach(() => {
    agent = new PricingAgent({ id: 'price-1', name: 'Pricing Agent' });
  });

  it('has correct id and name', () => {
    expect(agent.id).toBe('price-1');
    expect(agent.name).toBe('Pricing Agent');
  });

  it('starts with idle status', () => {
    expect(agent.getStatus()).toBe('idle');
  });

  it('can be initialised', async () => {
    await agent.init();
    expect(agent.getStatus()).toBe('idle');
  });

  it('can be shut down', async () => {
    await agent.shutdown();
    expect(agent.getStatus()).toBe('stopped');
  });

  it('executes a task and returns a result', async () => {
    const task = makeTask('price', { tokenAddress: '0xabc' });
    const result = await agent.execute(task);
    expect(result.taskId).toBe(task.id);
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });
});
