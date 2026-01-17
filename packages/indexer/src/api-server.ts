import express from "express";
import { DatabaseManager } from "./database";

export class APIServer {
  private app: express.Application;
  private db: DatabaseManager;
  private port: number;

  constructor(db: DatabaseManager, port: number) {
    this.app = express();
    this.db = db;
    this.port = port;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.use(express.json());

    // Health check
    this.app.get("/health", (req, res) => {
      res.json({ status: "ok", timestamp: new Date().toISOString() });
    });

    // CAST endpoints
    this.app.get("/api/casts", async (req, res) => {
      try {
        const creator = req.query.creator as string;
        if (creator) {
          const casts = await this.db.getCastsByCreator(creator);
          res.json(casts);
        } else {
          res.status(400).json({ error: "Creator parameter required" });
        }
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Quest endpoints
    this.app.get("/api/quests", async (req, res) => {
      try {
        const creator = req.query.creator as string;
        if (creator) {
          const quests = await this.db.getQuestsByCreator(creator);
          res.json(quests);
        } else {
          res.status(400).json({ error: "Creator parameter required" });
        }
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Marketplace endpoints
    this.app.get("/api/marketplace/listings", async (req, res) => {
      try {
        const listings = await this.db.getActiveListings();
        res.json(listings);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Governance endpoints
    this.app.get("/api/governance/proposals", async (req, res) => {
      try {
        const proposals = await this.db.getProposals();
        res.json(proposals);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Stats endpoint
    this.app.get("/api/stats", async (req, res) => {
      try {
        // Aggregate stats would be calculated here
        res.json({
          totalCasts: 0,
          totalQuests: 0,
          totalListings: 0,
          totalProposals: 0,
        });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    });
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.log(`API server listening on port ${this.port}`);
    });
  }
}
