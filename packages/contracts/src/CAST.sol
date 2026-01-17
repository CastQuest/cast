// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CAST
 * @notice Core NFT representing creative assets in the CASTQUEST ecosystem
 * @dev ERC721 with metadata, royalties, and multi-chain support
 */
contract CAST is ERC721, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    Counters.Counter private _tokenIdCounter;

    struct CastMetadata {
        address creator;
        uint256 createdAt;
        uint96 royaltyBps;
        string contentHash;
        bool isActive;
    }

    mapping(uint256 => CastMetadata) public castMetadata;
    mapping(address => uint256[]) public creatorCasts;

    event CastMinted(uint256 indexed tokenId, address indexed creator, string contentHash, uint96 royaltyBps);
    event CastUpdated(uint256 indexed tokenId, string newContentHash);
    event RoyaltyUpdated(uint256 indexed tokenId, uint96 newRoyaltyBps);

    constructor() ERC721("CASTQUEST CAST", "CAST") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, string memory contentHash, uint96 royaltyBps, string memory uri) 
        public onlyRole(MINTER_ROLE) returns (uint256) {
        require(royaltyBps <= 10000, "Royalty too high");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        castMetadata[tokenId] = CastMetadata({
            creator: to,
            createdAt: block.timestamp,
            royaltyBps: royaltyBps,
            contentHash: contentHash,
            isActive: true
        });
        creatorCasts[to].push(tokenId);
        emit CastMinted(tokenId, to, contentHash, royaltyBps);
        return tokenId;
    }

    function updateContentHash(uint256 tokenId, string memory newContentHash) public {
        require(ownerOf(tokenId) == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        castMetadata[tokenId].contentHash = newContentHash;
        emit CastUpdated(tokenId, newContentHash);
    }

    function updateRoyalty(uint256 tokenId, uint96 newRoyaltyBps) public {
        require(castMetadata[tokenId].creator == msg.sender, "Not creator");
        require(newRoyaltyBps <= 10000, "Royalty too high");
        castMetadata[tokenId].royaltyBps = newRoyaltyBps;
        emit RoyaltyUpdated(tokenId, newRoyaltyBps);
    }

    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address, uint256) {
        CastMetadata memory metadata = castMetadata[tokenId];
        return (metadata.creator, (salePrice * metadata.royaltyBps) / 10000);
    }

    function getCastsByCreator(address creator) external view returns (uint256[] memory) {
        return creatorCasts[creator];
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}
