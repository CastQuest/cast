// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title SponsorToken
 * @notice ERC20 token for sponsorship economy
 */
contract SponsorToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens

    struct Sponsorship {
        address sponsor;
        address recipient;
        uint256 amount;
        uint256 timestamp;
        string message;
    }

    mapping(address => Sponsorship[]) public sponsorships;
    mapping(address => uint256) public totalSponsored;
    mapping(address => uint256) public totalReceived;

    event Sponsored(address indexed sponsor, address indexed recipient, uint256 amount, string message);
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    constructor() ERC20("CASTQUEST Sponsor Token", "CQSP") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        
        // Mint initial supply
        _mint(msg.sender, 100_000_000 * 10**18); // 100M initial
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }

    function sponsor(address recipient, uint256 amount, string memory message) public {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be positive");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        transfer(recipient, amount);

        Sponsorship memory newSponsorship = Sponsorship({
            sponsor: msg.sender,
            recipient: recipient,
            amount: amount,
            timestamp: block.timestamp,
            message: message
        });

        sponsorships[recipient].push(newSponsorship);
        totalSponsored[msg.sender] += amount;
        totalReceived[recipient] += amount;

        emit Sponsored(msg.sender, recipient, amount, message);
    }

    function getSponsorships(address recipient) external view returns (Sponsorship[] memory) {
        return sponsorships[recipient];
    }

    function getSponsorshipCount(address recipient) external view returns (uint256) {
        return sponsorships[recipient].length;
    }
}
