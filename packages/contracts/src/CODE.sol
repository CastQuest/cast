// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CODE
 * @notice Code repository and snippet management
 */
contract CODE is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    Counters.Counter private _codeIdCounter;

    enum Language { Solidity, JavaScript, TypeScript, Python, Rust, Go, Other }

    struct CodeSnippet {
        uint256 id;
        address author;
        string title;
        string description;
        Language language;
        string ipfsHash;
        uint256 createdAt;
        uint256 updatedAt;
        bool isPublic;
        uint256 stars;
        uint256 forks;
    }

    mapping(uint256 => CodeSnippet) public codeSnippets;
    mapping(address => uint256[]) public authorSnippets;
    mapping(uint256 => mapping(address => bool)) public hasStarred;
    mapping(uint256 => uint256) public forkParent;

    event CodeCreated(uint256 indexed codeId, address indexed author, string title, Language language);
    event CodeUpdated(uint256 indexed codeId, string newIpfsHash);
    event CodeStarred(uint256 indexed codeId, address indexed user);
    event CodeForked(uint256 indexed originalId, uint256 indexed forkId, address indexed forker);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createCode(
        string memory title,
        string memory description,
        Language language,
        string memory ipfsHash,
        bool isPublic
    ) public returns (uint256) {
        uint256 codeId = _codeIdCounter.current();
        _codeIdCounter.increment();

        codeSnippets[codeId] = CodeSnippet({
            id: codeId,
            author: msg.sender,
            title: title,
            description: description,
            language: language,
            ipfsHash: ipfsHash,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            isPublic: isPublic,
            stars: 0,
            forks: 0
        });

        authorSnippets[msg.sender].push(codeId);

        emit CodeCreated(codeId, msg.sender, title, language);
        return codeId;
    }

    function updateCode(uint256 codeId, string memory newIpfsHash) public {
        require(codeSnippets[codeId].author == msg.sender, "Not author");
        codeSnippets[codeId].ipfsHash = newIpfsHash;
        codeSnippets[codeId].updatedAt = block.timestamp;
        emit CodeUpdated(codeId, newIpfsHash);
    }

    function starCode(uint256 codeId) public {
        require(codeSnippets[codeId].isPublic, "Code not public");
        require(!hasStarred[codeId][msg.sender], "Already starred");

        hasStarred[codeId][msg.sender] = true;
        codeSnippets[codeId].stars++;

        emit CodeStarred(codeId, msg.sender);
    }

    function forkCode(uint256 originalId, string memory newTitle) public returns (uint256) {
        require(codeSnippets[originalId].isPublic, "Code not public");

        uint256 forkId = _codeIdCounter.current();
        _codeIdCounter.increment();

        CodeSnippet memory original = codeSnippets[originalId];

        codeSnippets[forkId] = CodeSnippet({
            id: forkId,
            author: msg.sender,
            title: newTitle,
            description: original.description,
            language: original.language,
            ipfsHash: original.ipfsHash,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            isPublic: true,
            stars: 0,
            forks: 0
        });

        authorSnippets[msg.sender].push(forkId);
        codeSnippets[originalId].forks++;
        forkParent[forkId] = originalId;

        emit CodeForked(originalId, forkId, msg.sender);
        return forkId;
    }

    function getCodeByAuthor(address author) external view returns (uint256[] memory) {
        return authorSnippets[author];
    }

    function setVisibility(uint256 codeId, bool isPublic) public {
        require(codeSnippets[codeId].author == msg.sender, "Not author");
        codeSnippets[codeId].isPublic = isPublic;
    }
}
