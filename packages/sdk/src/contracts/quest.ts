import { ethers } from "ethers";
import { Quest } from "../utils/types";

const QUEST_ABI = [
  "function createQuest(string memory title, string memory description, uint8 questType, uint256 reward, uint256 deadline, uint256 castIdRequired) public payable returns (uint256)",
  "function joinQuest(uint256 questId) public",
  "function completeQuest(uint256 questId, address winner) public",
  "function getQuestsByUser(address user) external view returns (uint256[] memory)",
  "function quests(uint256 questId) public view returns (uint256 id, address creator, string memory title, string memory description, uint8 questType, uint256 reward, uint256 deadline, uint8 status, uint256 castIdRequired)",
];

export class QuestClient {
  private contract: ethers.Contract;
  private signer?: ethers.Signer;

  constructor(provider: ethers.Provider, address: string, signer?: ethers.Signer) {
    this.contract = new ethers.Contract(address, QUEST_ABI, provider);
    this.signer = signer;
  }

  async createQuest(
    title: string,
    description: string,
    questType: number,
    reward: bigint,
    deadline: bigint,
    castIdRequired: bigint = 0n
  ): Promise<bigint> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.createQuest(title, description, questType, reward, deadline, castIdRequired, {
      value: reward,
    });
    const receipt = await tx.wait();
    const event = receipt.logs.find((log: any) => log.eventName === "QuestCreated");
    return event?.args?.questId;
  }

  async joinQuest(questId: bigint): Promise<void> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.joinQuest(questId);
    await tx.wait();
  }

  async completeQuest(questId: bigint, winner: string): Promise<void> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.completeQuest(questId, winner);
    await tx.wait();
  }

  async getQuestsByUser(user: string): Promise<bigint[]> {
    return await this.contract.getQuestsByUser(user);
  }

  async getQuest(questId: bigint): Promise<Quest> {
    const quest = await this.contract.quests(questId);
    return {
      id: quest[0],
      creator: quest[1],
      title: quest[2],
      description: quest[3],
      questType: quest[4],
      reward: quest[5],
      deadline: quest[6],
      status: quest[7],
    };
  }
}
