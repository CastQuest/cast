import { expect } from "chai";
import { ethers } from "hardhat";

describe("CastToken", function () {
  it("Should have correct name and symbol", async function () {
    const CastToken = await ethers.getContractFactory("CastToken");
    const token = await CastToken.deploy();
    await token.waitForDeployment();

    expect(await token.name()).to.equal("CAST");
    expect(await token.symbol()).to.equal("CAST");
    expect(await token.decimals()).to.equal(18);
  });
});
