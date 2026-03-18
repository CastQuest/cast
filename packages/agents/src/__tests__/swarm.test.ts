import { describe, it, expect, beforeEach } from 'vitest';
import { Swarm } from '../swarm';
import { PricingAgent } from '../agents/pricing-agent';
import { MonitoringAgent } from '../agents/monitoring-agent';
import type { Task } from '../types';

function makeTask(type: string, payload: unknown, priority = 0): Task {
  return {
    id: `task-${Math.random().toString(36).slice(2)}`,
    type,
    payload,
    priority,
    createdAt: Date.now(),
  };
}

describe('Swarm orchestrator', () => {
  let swarm: Swarm;
  let pricingAgent: PricingAgent;
  let monitoringAgent: MonitoringAgent;

  beforeEach(() => {
    swarm = new Swarm({ name: 'test-swarm' });
    pricingAgent = new PricingAgent({ id: 'price-1', name: 'Pricing' });
    monitoringAgent = new MonitoringAgent({ id: 'monitor-1', name: 'Monitor' });
  });

  it('has a name', () => {
    expect(swarm.name).toBe('test-swarm');
  });

  it('can register and list agents', () => {
    swarm.registerAgent(pricingAgent);
    swarm.registerAgent(monitoringAgent);
    expect(swarm.listAgents()).toHaveLength(2);
  });

  it('can unregister an agent', () => {
    swarm.registerAgent(pricingAgent);
    swarm.unregisterAgent('price-1');
    expect(swarm.listAgents()).toHaveLength(0);
  });

  it('can retrieve an agent by id', () => {
    swarm.registerAgent(pricingAgent);
    expect(swarm.getAgent('price-1')).toBe(pricingAgent);
  });

  it('starts and stops all agents', async () => {
    swarm.registerAgent(pricingAgent);
    await swarm.start();
    expect(pricingAgent.getStatus()).toBe('idle');
    await swarm.stop();
    expect(pricingAgent.getStatus()).toBe('stopped');
  });

  it('dispatches a task to an agent', async () => {
    swarm.registerAgent(pricingAgent);
    await swarm.start();
    const task = makeTask('price', { tokenAddress: '0xabc' });
    const result = await swarm.dispatch(task);
    expect(result.success).toBe(true);
    await swarm.stop();
  });

  it('returns an error result when no agents are registered', async () => {
    const task = makeTask('price', {});
    const result = await swarm.dispatch(task);
    expect(result.success).toBe(false);
    expect(result.error).toContain('No agents available');
  });

  it('returns an error result when agents are registered but none are idle', async () => {
    swarm.registerAgent(pricingAgent);
    await swarm.start();
    // Force the agent into a non-idle state
    (pricingAgent as unknown as { status: string }).status = 'running';
    const task = makeTask('price', {});
    const result = await swarm.dispatch(task);
    expect(result.success).toBe(false);
    expect(result.error).toContain('No agents available');
    await swarm.stop();
  });

  it('processes a queue of tasks', async () => {
    swarm.registerAgent(pricingAgent);
    await swarm.start();
    swarm.enqueueTask(makeTask('price', {}, 1));
    swarm.enqueueTask(makeTask('price', {}, 2));
    const results = await swarm.processQueue();
    expect(results).toHaveLength(2);
    expect(results.every((r) => r.success)).toBe(true);
    await swarm.stop();
  });
});
