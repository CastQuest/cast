import { CastQuestClient } from "@castquest/sdk";

export interface AgentConfig {
  name: string;
  description: string;
  capabilities: string[];
  apiKey?: string;
}

export abstract class AgentBase {
  protected client: CastQuestClient;
  protected config: AgentConfig;

  constructor(client: CastQuestClient, config: AgentConfig) {
    this.client = client;
    this.config = config;
  }

  abstract execute(task: string, params: any): Promise<any>;

  protected log(message: string): void {
    console.log(`[${this.config.name}] ${message}`);
  }

  protected async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getCapabilities(): string[] {
    return this.config.capabilities;
  }

  getName(): string {
    return this.config.name;
  }

  getDescription(): string {
    return this.config.description;
  }
}
