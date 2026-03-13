export type HookName =
  | 'onTransaction'
  | 'onMint'
  | 'onQuest'
  | 'onAgentAction'
  | 'onMarketplaceListing'
  | 'onGovernanceProposal';

export type HookHandler<T = unknown> = (_payload: T) => void | Promise<void>;

export interface Plugin {
  name: string;
  version: string;
  init(_registry: PluginRegistry): Promise<void>;
  destroy(): Promise<void>;
}

export interface PluginHooks {
  onTransaction?: HookHandler<{ hash: string; from: string; to: string; value: string }>;
  onMint?: HookHandler<{ tokenId: number; contract: string; to: string }>;
  onQuest?: HookHandler<{ questId: string; userId: string; action: string }>;
  onAgentAction?: HookHandler<{ agentId: string; action: string; payload: unknown }>;
  onMarketplaceListing?: HookHandler<{ listingId: string; seller: string; price: string }>;
  onGovernanceProposal?: HookHandler<{ proposalId: string; proposer: string; description: string }>;
}

export type PluginWithHooks = Plugin & PluginHooks;

export interface PluginRegistry {
  register(_plugin: PluginWithHooks): void;
  unregister(_name: string): void;
  getPlugin(_name: string): PluginWithHooks | undefined;
  listPlugins(): PluginWithHooks[];
  emit<T>(_hook: HookName, _payload: T): Promise<void>;
}
