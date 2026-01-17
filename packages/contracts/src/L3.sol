// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title L3
 * @notice Layer 3 chain configuration and management
 */
contract L3 is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct Chain {
        uint256 chainId;
        string name;
        string rpcUrl;
        address bridgeContract;
        bool isActive;
        uint256 createdAt;
    }

    struct Bridge {
        address token;
        uint256 sourceChainId;
        uint256 destChainId;
        uint256 amount;
        address sender;
        address recipient;
        uint256 timestamp;
        bool isCompleted;
    }

    mapping(uint256 => Chain) public chains;
    mapping(bytes32 => Bridge) public bridges;
    
    uint256[] public chainIds;
    uint256 public bridgeNonce;

    event ChainRegistered(uint256 indexed chainId, string name, address bridgeContract);
    event ChainUpdated(uint256 indexed chainId, string rpcUrl);
    event BridgeInitiated(bytes32 indexed bridgeId, uint256 sourceChain, uint256 destChain, address token, uint256 amount);
    event BridgeCompleted(bytes32 indexed bridgeId);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function registerChain(
        uint256 chainId,
        string memory name,
        string memory rpcUrl,
        address bridgeContract
    ) public onlyRole(ADMIN_ROLE) {
        require(chains[chainId].chainId == 0, "Chain already registered");

        chains[chainId] = Chain({
            chainId: chainId,
            name: name,
            rpcUrl: rpcUrl,
            bridgeContract: bridgeContract,
            isActive: true,
            createdAt: block.timestamp
        });

        chainIds.push(chainId);

        emit ChainRegistered(chainId, name, bridgeContract);
    }

    function updateChainRPC(uint256 chainId, string memory newRpcUrl) public onlyRole(ADMIN_ROLE) {
        require(chains[chainId].chainId != 0, "Chain not registered");
        chains[chainId].rpcUrl = newRpcUrl;
        emit ChainUpdated(chainId, newRpcUrl);
    }

    function initiateBridge(
        address token,
        uint256 destChainId,
        uint256 amount,
        address recipient
    ) public payable returns (bytes32) {
        require(chains[destChainId].isActive, "Destination chain not active");
        require(amount > 0, "Amount must be positive");

        bytes32 bridgeId = keccak256(abi.encodePacked(
            block.chainid,
            destChainId,
            msg.sender,
            recipient,
            amount,
            bridgeNonce++
        ));

        bridges[bridgeId] = Bridge({
            token: token,
            sourceChainId: block.chainid,
            destChainId: destChainId,
            amount: amount,
            sender: msg.sender,
            recipient: recipient,
            timestamp: block.timestamp,
            isCompleted: false
        });

        emit BridgeInitiated(bridgeId, block.chainid, destChainId, token, amount);
        return bridgeId;
    }

    function completeBridge(bytes32 bridgeId) public onlyRole(ADMIN_ROLE) {
        require(!bridges[bridgeId].isCompleted, "Bridge already completed");
        bridges[bridgeId].isCompleted = true;
        emit BridgeCompleted(bridgeId);
    }

    function deactivateChain(uint256 chainId) public onlyRole(ADMIN_ROLE) {
        chains[chainId].isActive = false;
    }

    function getChainIds() external view returns (uint256[] memory) {
        return chainIds;
    }

    function isChainActive(uint256 chainId) external view returns (bool) {
        return chains[chainId].isActive;
    }
}
