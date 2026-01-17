import { ethers } from "ethers";
import { Cast } from "../utils/types";

const CAST_ABI = [
  "function mint(address to, string memory contentHash, uint96 royaltyBps, string memory uri) public returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function castMetadata(uint256 tokenId) public view returns (address creator, uint256 createdAt, uint96 royaltyBps, string memory contentHash, bool isActive)",
  "function getCastsByCreator(address creator) external view returns (uint256[] memory)",
  "function updateContentHash(uint256 tokenId, string memory newContentHash) public",
  "function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address, uint256)",
];

export class CASTClient {
  private contract: ethers.Contract;
  private signer?: ethers.Signer;

  constructor(provider: ethers.Provider, address: string, signer?: ethers.Signer) {
    this.contract = new ethers.Contract(address, CAST_ABI, provider);
    this.signer = signer;
  }

  async mint(
    to: string,
    contentHash: string,
    royaltyBps: number,
    uri: string
  ): Promise<bigint> {
    if (!this.signer) throw new Error("Signer required for minting");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.mint(to, contentHash, royaltyBps, uri);
    const receipt = await tx.wait();
    const event = receipt.logs.find((log: any) => log.eventName === "CastMinted");
    return event?.args?.tokenId;
  }

  async getOwner(tokenId: bigint): Promise<string> {
    return await this.contract.ownerOf(tokenId);
  }

  async getTokenURI(tokenId: bigint): Promise<string> {
    return await this.contract.tokenURI(tokenId);
  }

  async getMetadata(tokenId: bigint): Promise<Cast> {
    const metadata = await this.contract.castMetadata(tokenId);
    return {
      tokenId,
      creator: metadata[0],
      createdAt: metadata[1],
      royaltyBps: metadata[2],
      contentHash: metadata[3],
      isActive: metadata[4],
    };
  }

  async getCastsByCreator(creator: string): Promise<bigint[]> {
    return await this.contract.getCastsByCreator(creator);
  }

  async updateContentHash(tokenId: bigint, newContentHash: string): Promise<void> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.updateContentHash(tokenId, newContentHash);
    await tx.wait();
  }

  async getRoyaltyInfo(tokenId: bigint, salePrice: bigint): Promise<{ receiver: string; amount: bigint }> {
    const [receiver, amount] = await this.contract.royaltyInfo(tokenId, salePrice);
    return { receiver, amount };
  }
}
