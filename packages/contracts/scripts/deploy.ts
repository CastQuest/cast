import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CASTQUEST V3 Contracts...");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy CastToken
  console.log("\n📝 Deploying CastToken...");
  const CastToken = await ethers.getContractFactory("CastToken");
  const castToken = await CastToken.deploy();
  await castToken.waitForDeployment();
  console.log("✅ CastToken deployed to:", await castToken.getAddress());

  // Deploy QuestToken
  console.log("\n📝 Deploying QuestToken...");
  const QuestToken = await ethers.getContractFactory("QuestToken");
  const questToken = await QuestToken.deploy();
  await questToken.waitForDeployment();
  console.log("✅ QuestToken deployed to:", await questToken.getAddress());

  // Deploy Marketplace
  console.log("\n📝 Deploying Marketplace...");
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.waitForDeployment();
  console.log("✅ Marketplace deployed to:", await marketplace.getAddress());

  console.log("\n🎉 All contracts deployed successfully!");
  console.log("\nContract Addresses:");
  console.log("===================");
  console.log("CastToken:    ", await castToken.getAddress());
  console.log("QuestToken:   ", await questToken.getAddress());
  console.log("Marketplace:  ", await marketplace.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
