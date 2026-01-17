import { ethers } from "ethers";

const GOVERNANCE_ABI = [
  "function propose(string memory title, string memory description, address[] memory targets, uint256[] memory values, bytes[] memory calldatas) public returns (uint256)",
  "function castVote(uint256 proposalId, uint8 support) public",
  "function executeProposal(uint256 proposalId) public",
  "function getProposalState(uint256 proposalId) external view returns (uint8)",
  "function hasVoted(uint256 proposalId, address voter) external view returns (bool)",
];

export class GovernanceClient {
  private contract: ethers.Contract;
  private signer?: ethers.Signer;

  constructor(provider: ethers.Provider, address: string, signer?: ethers.Signer) {
    this.contract = new ethers.Contract(address, GOVERNANCE_ABI, provider);
    this.signer = signer;
  }

  async propose(
    title: string,
    description: string,
    targets: string[],
    values: bigint[],
    calldatas: string[]
  ): Promise<bigint> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.propose(title, description, targets, values, calldatas);
    const receipt = await tx.wait();
    const event = receipt.logs.find((log: any) => log.eventName === "ProposalCreated");
    return event?.args?.proposalId;
  }

  async castVote(proposalId: bigint, support: number): Promise<void> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.castVote(proposalId, support);
    await tx.wait();
  }

  async executeProposal(proposalId: bigint): Promise<void> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.executeProposal(proposalId);
    await tx.wait();
  }

  async getProposalState(proposalId: bigint): Promise<number> {
    return await this.contract.getProposalState(proposalId);
  }

  async hasVoted(proposalId: bigint, voter: string): Promise<boolean> {
    return await this.contract.hasVoted(proposalId, voter);
  }
}
