import { Pool } from "pg";

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export class DatabaseManager {
  private pool: Pool;

  constructor(config: DatabaseConfig) {
    this.pool = new Pool(config);
  }

  async connect(): Promise<void> {
    try {
      await this.pool.query("SELECT NOW()");
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  }

  async initialize(): Promise<void> {
    console.log("Initializing database schema...");

    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS casts (
        token_id BIGINT PRIMARY KEY,
        creator VARCHAR(42) NOT NULL,
        content_hash TEXT NOT NULL,
        royalty_bps INTEGER NOT NULL,
        block_number INTEGER NOT NULL,
        transaction_hash VARCHAR(66) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_casts_creator ON casts(creator);
      CREATE INDEX IF NOT EXISTS idx_casts_block ON casts(block_number);
    `);

    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS quests (
        quest_id BIGINT PRIMARY KEY,
        creator VARCHAR(42) NOT NULL,
        title TEXT NOT NULL,
        reward NUMERIC NOT NULL,
        block_number INTEGER NOT NULL,
        transaction_hash VARCHAR(66) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_quests_creator ON quests(creator);
    `);

    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS marketplace_listings (
        listing_id BIGINT PRIMARY KEY,
        seller VARCHAR(42) NOT NULL,
        nft_contract VARCHAR(42) NOT NULL,
        token_id BIGINT NOT NULL,
        price NUMERIC NOT NULL,
        is_active BOOLEAN DEFAULT true,
        block_number INTEGER NOT NULL,
        transaction_hash VARCHAR(66) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_listings_seller ON marketplace_listings(seller);
      CREATE INDEX IF NOT EXISTS idx_listings_active ON marketplace_listings(is_active);
    `);

    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS proposals (
        proposal_id BIGINT PRIMARY KEY,
        proposer VARCHAR(42) NOT NULL,
        title TEXT NOT NULL,
        block_number INTEGER NOT NULL,
        transaction_hash VARCHAR(66) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_proposals_proposer ON proposals(proposer);
    `);

    console.log("Database schema initialized");
  }

  async saveCastMint(data: any): Promise<void> {
    await this.pool.query(
      `INSERT INTO casts (token_id, creator, content_hash, royalty_bps, block_number, transaction_hash)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (token_id) DO NOTHING`,
      [data.tokenId, data.creator, data.contentHash, data.royaltyBps, data.blockNumber, data.transactionHash]
    );
  }

  async saveQuestCreated(data: any): Promise<void> {
    await this.pool.query(
      `INSERT INTO quests (quest_id, creator, title, reward, block_number, transaction_hash)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (quest_id) DO NOTHING`,
      [data.questId, data.creator, data.title, data.reward, data.blockNumber, data.transactionHash]
    );
  }

  async saveMarketplaceListing(data: any): Promise<void> {
    await this.pool.query(
      `INSERT INTO marketplace_listings (listing_id, seller, nft_contract, token_id, price, block_number, transaction_hash)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (listing_id) DO NOTHING`,
      [data.listingId, data.seller, data.nftContract, data.tokenId, data.price, data.blockNumber, data.transactionHash]
    );
  }

  async saveProposalCreated(data: any): Promise<void> {
    await this.pool.query(
      `INSERT INTO proposals (proposal_id, proposer, title, block_number, transaction_hash)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (proposal_id) DO NOTHING`,
      [data.proposalId, data.proposer, data.title, data.blockNumber, data.transactionHash]
    );
  }

  async getCastsByCreator(creator: string): Promise<any[]> {
    const result = await this.pool.query(
      "SELECT * FROM casts WHERE creator = $1 ORDER BY created_at DESC",
      [creator]
    );
    return result.rows;
  }

  async getQuestsByCreator(creator: string): Promise<any[]> {
    const result = await this.pool.query(
      "SELECT * FROM quests WHERE creator = $1 ORDER BY created_at DESC",
      [creator]
    );
    return result.rows;
  }

  async getActiveListings(): Promise<any[]> {
    const result = await this.pool.query(
      "SELECT * FROM marketplace_listings WHERE is_active = true ORDER BY created_at DESC LIMIT 100"
    );
    return result.rows;
  }

  async getProposals(): Promise<any[]> {
    const result = await this.pool.query(
      "SELECT * FROM proposals ORDER BY created_at DESC LIMIT 100"
    );
    return result.rows;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
