// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title FRAM
 * @notice Framework and architecture management for dApp templates
 */
contract FRAM is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    Counters.Counter private _frameworkIdCounter;

    enum FrameworkType { Frontend, Backend, FullStack, SmartContract, Mobile }

    struct Framework {
        uint256 id;
        address creator;
        string name;
        string description;
        FrameworkType frameworkType;
        string repoUrl;
        string documentationHash;
        uint256 createdAt;
        uint256 version;
        bool isActive;
    }

    mapping(uint256 => Framework) public frameworks;
    mapping(address => uint256[]) public creatorFrameworks;
    mapping(string => uint256) public frameworkByName;

    event FrameworkCreated(uint256 indexed frameworkId, address indexed creator, string name);
    event FrameworkUpdated(uint256 indexed frameworkId, uint256 newVersion);
    event FrameworkDeactivated(uint256 indexed frameworkId);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createFramework(
        string memory name,
        string memory description,
        FrameworkType frameworkType,
        string memory repoUrl,
        string memory documentationHash
    ) public returns (uint256) {
        require(frameworkByName[name] == 0, "Framework name exists");

        uint256 frameworkId = _frameworkIdCounter.current();
        _frameworkIdCounter.increment();

        frameworks[frameworkId] = Framework({
            id: frameworkId,
            creator: msg.sender,
            name: name,
            description: description,
            frameworkType: frameworkType,
            repoUrl: repoUrl,
            documentationHash: documentationHash,
            createdAt: block.timestamp,
            version: 1,
            isActive: true
        });

        creatorFrameworks[msg.sender].push(frameworkId);
        frameworkByName[name] = frameworkId;

        emit FrameworkCreated(frameworkId, msg.sender, name);
        return frameworkId;
    }

    function updateFramework(uint256 frameworkId, string memory repoUrl, string memory documentationHash) public {
        require(frameworks[frameworkId].creator == msg.sender, "Not creator");
        frameworks[frameworkId].repoUrl = repoUrl;
        frameworks[frameworkId].documentationHash = documentationHash;
        frameworks[frameworkId].version++;
        emit FrameworkUpdated(frameworkId, frameworks[frameworkId].version);
    }

    function deactivateFramework(uint256 frameworkId) public {
        require(frameworks[frameworkId].creator == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        frameworks[frameworkId].isActive = false;
        emit FrameworkDeactivated(frameworkId);
    }

    function getFrameworksByCreator(address creator) external view returns (uint256[] memory) {
        return creatorFrameworks[creator];
    }
}
