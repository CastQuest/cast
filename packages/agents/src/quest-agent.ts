import { AgentBase, AgentConfig } from "./agent-base";
import { CastQuestClient } from "@castquest/sdk";

export class QuestAgent extends AgentBase {
  constructor(client: CastQuestClient, apiKey?: string) {
    super(client, {
      name: "Quest Agent",
      description: "Autonomous agent for quest management and completion",
      capabilities: ["create", "join", "complete", "recommend"],
      apiKey,
    });
  }

  async execute(task: string, params: any): Promise<any> {
    this.log(`Executing task: ${task}`);

    switch (task) {
      case "create":
        return await this.createQuest(params);
      case "join":
        return await this.joinQuest(params);
      case "recommend":
        return await this.recommendQuests(params);
      default:
        throw new Error(`Unknown task: ${task}`);
    }
  }

  private async createQuest(params: {
    title: string;
    description: string;
    questType: number;
    reward: bigint;
    deadline: bigint;
  }): Promise<bigint> {
    this.log(`Creating quest: ${params.title}`);
    const questId = await this.client.quest.createQuest(
      params.title,
      params.description,
      params.questType,
      params.reward,
      params.deadline
    );
    this.log(`Created quest #${questId}`);
    return questId;
  }

  private async joinQuest(params: { questId: bigint }): Promise<void> {
    this.log(`Joining quest #${params.questId}`);
    await this.client.quest.joinQuest(params.questId);
    this.log(`Joined quest #${params.questId}`);
  }

  private async recommendQuests(params: { user: string }): Promise<any> {
    this.log(`Finding quest recommendations for ${params.user}`);

    const userQuests = await this.client.quest.getQuestsByUser(params.user);

    const recommendations = {
      beginner: userQuests.length === 0,
      suggested: this.getSuggestedQuests(userQuests.length),
      completed: userQuests.length,
    };

    return recommendations;
  }

  private getSuggestedQuests(completedCount: number): string[] {
    if (completedCount === 0) {
      return ["Complete your first CAST", "Join the community Discord", "Vote on a proposal"];
    } else if (completedCount < 5) {
      return ["Create a quest", "Trade on marketplace", "Join a SubDAO"];
    } else {
      return ["Become a quest creator", "Help moderate community", "Contribute to governance"];
    }
  }
}
