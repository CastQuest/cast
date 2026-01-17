// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title MEDIA
 * @notice Media storage and distribution with IPFS integration
 */
contract MEDIA is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    Counters.Counter private _mediaIdCounter;

    enum MediaType { Image, Video, Audio, Document, Model3D, Code }

    struct Media {
        uint256 id;
        address owner;
        string ipfsHash;
        MediaType mediaType;
        uint256 size;
        uint256 uploadedAt;
        bool isPublic;
        string title;
        string description;
    }

    mapping(uint256 => Media) public media;
    mapping(address => uint256[]) public userMedia;
    mapping(string => bool) public ipfsHashExists;

    event MediaUploaded(uint256 indexed mediaId, address indexed owner, string ipfsHash, MediaType mediaType);
    event MediaUpdated(uint256 indexed mediaId, string title, string description);
    event MediaVisibilityChanged(uint256 indexed mediaId, bool isPublic);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function uploadMedia(
        string memory ipfsHash,
        MediaType mediaType,
        uint256 size,
        string memory title,
        string memory description,
        bool isPublic
    ) public returns (uint256) {
        require(!ipfsHashExists[ipfsHash], "Media already exists");
        require(bytes(ipfsHash).length > 0, "Invalid IPFS hash");

        uint256 mediaId = _mediaIdCounter.current();
        _mediaIdCounter.increment();

        media[mediaId] = Media({
            id: mediaId,
            owner: msg.sender,
            ipfsHash: ipfsHash,
            mediaType: mediaType,
            size: size,
            uploadedAt: block.timestamp,
            isPublic: isPublic,
            title: title,
            description: description
        });

        userMedia[msg.sender].push(mediaId);
        ipfsHashExists[ipfsHash] = true;

        emit MediaUploaded(mediaId, msg.sender, ipfsHash, mediaType);
        return mediaId;
    }

    function updateMedia(uint256 mediaId, string memory title, string memory description) public {
        require(media[mediaId].owner == msg.sender, "Not owner");
        media[mediaId].title = title;
        media[mediaId].description = description;
        emit MediaUpdated(mediaId, title, description);
    }

    function setVisibility(uint256 mediaId, bool isPublic) public {
        require(media[mediaId].owner == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        media[mediaId].isPublic = isPublic;
        emit MediaVisibilityChanged(mediaId, isPublic);
    }

    function getMediaByUser(address user) external view returns (uint256[] memory) {
        return userMedia[user];
    }

    function getMediaByIpfsHash(string memory ipfsHash) external view returns (uint256) {
        require(ipfsHashExists[ipfsHash], "Media not found");
        for (uint256 i = 0; i < _mediaIdCounter.current(); i++) {
            if (keccak256(bytes(media[i].ipfsHash)) == keccak256(bytes(ipfsHash))) {
                return i;
            }
        }
        revert("Media not found");
    }
}
