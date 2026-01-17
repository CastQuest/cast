// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import "../src/CAST.sol";
import "../src/QUEST.sol";
import "../src/MEDIA.sol";
import "../src/FRAM.sol";
import "../src/GAME.sol";
import "../src/CODE.sol";
import "../src/SponsorToken.sol";
import "../src/GovernanceV2.sol";
import "../src/SubDAOs.sol";
import "../src/L3.sol";
import "../src/Marketplace.sol";
import "../src/Auctions.sol";
import "../src/Sponsorship.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy core contracts
        CAST cast = new CAST();
        console.log("CAST deployed at:", address(cast));

        QUEST quest = new QUEST();
        console.log("QUEST deployed at:", address(quest));

        MEDIA media = new MEDIA();
        console.log("MEDIA deployed at:", address(media));

        FRAM fram = new FRAM();
        console.log("FRAM deployed at:", address(fram));

        GAME game = new GAME();
        console.log("GAME deployed at:", address(game));

        CODE code = new CODE();
        console.log("CODE deployed at:", address(code));

        // Deploy token and governance
        SponsorToken sponsorToken = new SponsorToken();
        console.log("SponsorToken deployed at:", address(sponsorToken));

        GovernanceV2 governance = new GovernanceV2(
            address(sponsorToken),
            1000000 * 10**18, // 1M token threshold
            50400, // ~1 week voting period
            4 // 4% quorum
        );
        console.log("GovernanceV2 deployed at:", address(governance));

        // Deploy DAO and L3
        SubDAOs subDAOs = new SubDAOs();
        console.log("SubDAOs deployed at:", address(subDAOs));

        L3 l3 = new L3();
        console.log("L3 deployed at:", address(l3));

        // Deploy marketplace contracts
        Marketplace marketplace = new Marketplace(250); // 2.5% platform fee
        console.log("Marketplace deployed at:", address(marketplace));

        Auctions auctions = new Auctions(500); // 5% minimum bid increment
        console.log("Auctions deployed at:", address(auctions));

        Sponsorship sponsorship = new Sponsorship(address(sponsorToken));
        console.log("Sponsorship deployed at:", address(sponsorship));

        vm.stopBroadcast();
    }
}
