import { ethers } from "ethers";
import { Listing } from "../utils/types";

const MARKETPLACE_ABI = [
  "function list(address nftContract, uint256 tokenId, uint256 price) public returns (uint256)",
  "function buy(uint256 listingId) public payable",
  "function cancelListing(uint256 listingId) public",
  "function makeOffer(uint256 listingId, uint256 expiresAt) public payable",
  "function listings(uint256 listingId) public view returns (uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price, bool isActive, uint256 listedAt)",
  "function getUserListings(address user) external view returns (uint256[] memory)",
];

export class MarketplaceClient {
  private contract: ethers.Contract;
  private signer?: ethers.Signer;

  constructor(provider: ethers.Provider, address: string, signer?: ethers.Signer) {
    this.contract = new ethers.Contract(address, MARKETPLACE_ABI, provider);
    this.signer = signer;
  }

  async list(nftContract: string, tokenId: bigint, price: bigint): Promise<bigint> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.list(nftContract, tokenId, price);
    const receipt = await tx.wait();
    const event = receipt.logs.find((log: any) => log.eventName === "Listed");
    return event?.args?.listingId;
  }

  async buy(listingId: bigint, price: bigint): Promise<void> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.buy(listingId, { value: price });
    await tx.wait();
  }

  async cancelListing(listingId: bigint): Promise<void> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.cancelListing(listingId);
    await tx.wait();
  }

  async makeOffer(listingId: bigint, amount: bigint, expiresAt: bigint): Promise<void> {
    if (!this.signer) throw new Error("Signer required");
    const contract = this.contract.connect(this.signer);
    const tx = await contract.makeOffer(listingId, expiresAt, { value: amount });
    await tx.wait();
  }

  async getListing(listingId: bigint): Promise<Listing> {
    const listing = await this.contract.listings(listingId);
    return {
      listingId: listing[0],
      seller: listing[1],
      nftContract: listing[2],
      tokenId: listing[3],
      price: listing[4],
      isActive: listing[5],
    };
  }

  async getUserListings(user: string): Promise<bigint[]> {
    return await this.contract.getUserListings(user);
  }
}
