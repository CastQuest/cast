import { ethers } from "ethers";
import { CASTClient } from "./contracts/cast";
import { QuestClient } from "./contracts/quest";
import { MarketplaceClient } from "./contracts/marketplace";
import { GovernanceClient } from "./contracts/governance";

export interface CastQuestConfig {
  provider: ethers.Provider;
  signer?: ethers.Signer;
  contracts: {
    cast: string;
    quest: string;
    media: string;
    fram: string;
    game: string;
    code: string;
    sponsorToken: string;
    governance: string;
    subDAOs: string;
    l3: string;
    marketplace: string;
    auctions: string;
    sponsorship: string;
  };
}

export class CastQuestClient {
  public cast: CASTClient;
  public quest: QuestClient;
  public marketplace: MarketplaceClient;
  public governance: GovernanceClient;

  constructor(config: CastQuestConfig) {
    this.cast = new CASTClient(config.provider, config.contracts.cast, config.signer);
    this.quest = new QuestClient(config.provider, config.contracts.quest, config.signer);
    this.marketplace = new MarketplaceClient(
      config.provider,
      config.contracts.marketplace,
      config.signer
    );
    this.governance = new GovernanceClient(
      config.provider,
      config.contracts.governance,
      config.signer
    );
  }

  static connect(rpcUrl: string, contractAddresses: CastQuestConfig["contracts"]) {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    return new CastQuestClient({ provider, contracts: contractAddresses });
  }

  static connectWithSigner(
    rpcUrl: string,
    privateKey: string,
    contractAddresses: CastQuestConfig["contracts"]
  ) {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const signer = new ethers.Wallet(privateKey, provider);
    return new CastQuestClient({ provider, signer, contracts: contractAddresses });
  }
}
