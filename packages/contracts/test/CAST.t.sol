// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import "../src/CAST.sol";

contract CASTTest is Test {
    CAST public cast;
    address public owner;
    address public user1;
    address public user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        
        cast = new CAST();
    }

    function testMint() public {
        string memory contentHash = "QmTest123";
        uint96 royaltyBps = 1000; // 10%
        string memory uri = "ipfs://QmTest123";

        uint256 tokenId = cast.mint(user1, contentHash, royaltyBps, uri);

        assertEq(cast.ownerOf(tokenId), user1);
        assertEq(cast.tokenURI(tokenId), uri);

        (address creator, uint256 createdAt, uint96 royalty, string memory hash, bool isActive) = 
            cast.castMetadata(tokenId);
        
        assertEq(creator, user1);
        assertEq(royalty, royaltyBps);
        assertEq(hash, contentHash);
        assertTrue(isActive);
    }

    function testUpdateContentHash() public {
        string memory contentHash = "QmTest123";
        uint96 royaltyBps = 1000;
        string memory uri = "ipfs://QmTest123";

        uint256 tokenId = cast.mint(user1, contentHash, royaltyBps, uri);

        vm.prank(user1);
        string memory newHash = "QmTest456";
        cast.updateContentHash(tokenId, newHash);

        (, , , string memory hash, ) = cast.castMetadata(tokenId);
        assertEq(hash, newHash);
    }

    function testRoyaltyInfo() public {
        string memory contentHash = "QmTest123";
        uint96 royaltyBps = 1000; // 10%
        string memory uri = "ipfs://QmTest123";

        uint256 tokenId = cast.mint(user1, contentHash, royaltyBps, uri);

        (address receiver, uint256 royaltyAmount) = cast.royaltyInfo(tokenId, 1 ether);
        
        assertEq(receiver, user1);
        assertEq(royaltyAmount, 0.1 ether);
    }

    function testGetCastsByCreator() public {
        cast.mint(user1, "QmTest1", 1000, "ipfs://1");
        cast.mint(user1, "QmTest2", 1000, "ipfs://2");
        cast.mint(user2, "QmTest3", 1000, "ipfs://3");

        uint256[] memory user1Casts = cast.getCastsByCreator(user1);
        assertEq(user1Casts.length, 2);

        uint256[] memory user2Casts = cast.getCastsByCreator(user2);
        assertEq(user2Casts.length, 1);
    }
}
