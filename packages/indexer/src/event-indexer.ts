import { ethers } from "ethers";
import { DatabaseManager } from "./database";

export interface ContractAddresses {
  cast: string;
  quest: string;
  marketplace: string;
  governance: string;
}

export class EventIndexer {
  private provider: ethers.JsonRpcProvider;
  private contracts: ContractAddresses;
  private db: DatabaseManager;
  private isRunning: boolean = false;

  constructor(rpcUrl: string, contracts: ContractAddresses, db: DatabaseManager) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.contracts = contracts;
    this.db = db;
  }

  async start(): Promise<void> {
    console.log("Starting event indexer...");
    this.isRunning = true;

    // Index historical events
    await this.indexHistoricalEvents();

    // Listen for new events
    this.listenToEvents();
  }

  stop(): void {
    console.log("Stopping event indexer...");
    this.isRunning = false;
  }

  private async indexHistoricalEvents(): Promise<void> {
    console.log("Indexing historical events...");

    const currentBlock = await this.provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 10000); // Last 10k blocks

    await Promise.all([
      this.indexCASTEvents(fromBlock, currentBlock),
      this.indexQuestEvents(fromBlock, currentBlock),
      this.indexMarketplaceEvents(fromBlock, currentBlock),
      this.indexGovernanceEvents(fromBlock, currentBlock),
    ]);

    console.log("Historical indexing complete");
  }

  private async indexCASTEvents(fromBlock: number, toBlock: number): Promise<void> {
    const castContract = new ethers.Contract(
      this.contracts.cast,
      [
        "event CastMinted(uint256 indexed tokenId, address indexed creator, string contentHash, uint96 royaltyBps)",
        "event CastUpdated(uint256 indexed tokenId, string newContentHash)",
      ],
      this.provider
    );

    const mintFilter = castContract.filters.CastMinted();
    const mintEvents = await castContract.queryFilter(mintFilter, fromBlock, toBlock);

    for (const event of mintEvents) {
      await this.db.saveCastMint({
        tokenId: event.args![0].toString(),
        creator: event.args![1],
        contentHash: event.args![2],
        royaltyBps: event.args![3].toString(),
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
      });
    }
  }

  private async indexQuestEvents(fromBlock: number, toBlock: number): Promise<void> {
    const questContract = new ethers.Contract(
      this.contracts.quest,
      [
        "event QuestCreated(uint256 indexed questId, address indexed creator, string title, uint256 reward)",
        "event QuestJoined(uint256 indexed questId, address indexed participant)",
        "event QuestCompleted(uint256 indexed questId, address indexed winner, uint256 reward)",
      ],
      this.provider
    );

    const createFilter = questContract.filters.QuestCreated();
    const createEvents = await questContract.queryFilter(createFilter, fromBlock, toBlock);

    for (const event of createEvents) {
      await this.db.saveQuestCreated({
        questId: event.args![0].toString(),
        creator: event.args![1],
        title: event.args![2],
        reward: event.args![3].toString(),
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
      });
    }
  }

  private async indexMarketplaceEvents(fromBlock: number, toBlock: number): Promise<void> {
    const marketplaceContract = new ethers.Contract(
      this.contracts.marketplace,
      [
        "event Listed(uint256 indexed listingId, address indexed seller, address nftContract, uint256 tokenId, uint256 price)",
        "event Sold(uint256 indexed listingId, address indexed buyer, uint256 price)",
      ],
      this.provider
    );

    const listFilter = marketplaceContract.filters.Listed();
    const listEvents = await marketplaceContract.queryFilter(listFilter, fromBlock, toBlock);

    for (const event of listEvents) {
      await this.db.saveMarketplaceListing({
        listingId: event.args![0].toString(),
        seller: event.args![1],
        nftContract: event.args![2],
        tokenId: event.args![3].toString(),
        price: event.args![4].toString(),
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
      });
    }
  }

  private async indexGovernanceEvents(fromBlock: number, toBlock: number): Promise<void> {
    const govContract = new ethers.Contract(
      this.contracts.governance,
      [
        "event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title)",
        "event VoteCast(uint256 indexed proposalId, address indexed voter, uint8 support, uint256 weight)",
      ],
      this.provider
    );

    const propFilter = govContract.filters.ProposalCreated();
    const propEvents = await govContract.queryFilter(propFilter, fromBlock, toBlock);

    for (const event of propEvents) {
      await this.db.saveProposalCreated({
        proposalId: event.args![0].toString(),
        proposer: event.args![1],
        title: event.args![2],
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
      });
    }
  }

  private listenToEvents(): void {
    console.log("Listening for new events...");

    // Listen to CAST events
    const castContract = new ethers.Contract(
      this.contracts.cast,
      ["event CastMinted(uint256 indexed tokenId, address indexed creator, string contentHash, uint96 royaltyBps)"],
      this.provider
    );

    castContract.on("CastMinted", async (tokenId, creator, contentHash, royaltyBps, event) => {
      console.log(`New CAST minted: ${tokenId}`);
      await this.db.saveCastMint({
        tokenId: tokenId.toString(),
        creator,
        contentHash,
        royaltyBps: royaltyBps.toString(),
        blockNumber: event.log.blockNumber,
        transactionHash: event.log.transactionHash,
      });
    });

    // Similar listeners for other contracts would be added here
  }
}
