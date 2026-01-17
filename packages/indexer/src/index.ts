import { EventIndexer } from "./event-indexer";
import { DatabaseManager } from "./database";
import { APIServer } from "./api-server";

export async function main() {
  console.log("Starting CASTQUEST Indexer...");

  // Initialize database
  const db = new DatabaseManager({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "castquest",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
  });

  await db.connect();
  await db.initialize();

  // Initialize indexer
  const indexer = new EventIndexer(
    process.env.RPC_URL || "http://localhost:8545",
    {
      cast: process.env.CAST_ADDRESS || "",
      quest: process.env.QUEST_ADDRESS || "",
      marketplace: process.env.MARKETPLACE_ADDRESS || "",
      governance: process.env.GOVERNANCE_ADDRESS || "",
    },
    db
  );

  // Start indexing
  await indexer.start();

  // Start API server
  const api = new APIServer(db, parseInt(process.env.PORT || "3001"));
  api.start();

  console.log("Indexer started successfully");
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export * from "./event-indexer";
export * from "./database";
export * from "./api-server";
