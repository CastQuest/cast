// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title Auctions
 * @notice English auction system for NFTs
 */
contract Auctions is AccessControl, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct Auction {
        uint256 auctionId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 startingBid;
        uint256 currentBid;
        address currentBidder;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        bool isFinalized;
    }

    struct Bid {
        address bidder;
        uint256 amount;
        uint256 timestamp;
    }

    uint256 public auctionCounter;
    uint256 public minimumBidIncrement; // in basis points

    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => Bid[]) public bids;
    mapping(uint256 => mapping(address => uint256)) public pendingReturns;

    event AuctionCreated(uint256 indexed auctionId, address indexed seller, address nftContract, uint256 tokenId, uint256 startingBid, uint256 endTime);
    event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount);
    event AuctionFinalized(uint256 indexed auctionId, address winner, uint256 finalBid);
    event AuctionCancelled(uint256 indexed auctionId);

    constructor(uint256 _minimumBidIncrement) {
        minimumBidIncrement = _minimumBidIncrement;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createAuction(
        address nftContract,
        uint256 tokenId,
        uint256 startingBid,
        uint256 duration
    ) public nonReentrant returns (uint256) {
        require(startingBid > 0, "Starting bid must be positive");
        require(duration > 0, "Duration must be positive");
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not token owner");
        require(IERC721(nftContract).isApprovedForAll(msg.sender, address(this)) || 
                IERC721(nftContract).getApproved(tokenId) == address(this), "Not approved");

        uint256 auctionId = auctionCounter++;

        auctions[auctionId] = Auction({
            auctionId: auctionId,
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            startingBid: startingBid,
            currentBid: 0,
            currentBidder: address(0),
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            isActive: true,
            isFinalized: false
        });

        emit AuctionCreated(auctionId, msg.sender, nftContract, tokenId, startingBid, block.timestamp + duration);
        return auctionId;
    }

    function placeBid(uint256 auctionId) public payable nonReentrant {
        Auction storage auction = auctions[auctionId];
        require(auction.isActive, "Auction not active");
        require(block.timestamp < auction.endTime, "Auction ended");
        require(msg.sender != auction.seller, "Seller cannot bid");

        uint256 minBid = auction.currentBid == 0 
            ? auction.startingBid 
            : auction.currentBid + (auction.currentBid * minimumBidIncrement / 10000);

        require(msg.value >= minBid, "Bid too low");

        if (auction.currentBidder != address(0)) {
            pendingReturns[auctionId][auction.currentBidder] += auction.currentBid;
        }

        auction.currentBid = msg.value;
        auction.currentBidder = msg.sender;

        bids[auctionId].push(Bid({
            bidder: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        }));

        emit BidPlaced(auctionId, msg.sender, msg.value);
    }

    function finalizeAuction(uint256 auctionId) public nonReentrant {
        Auction storage auction = auctions[auctionId];
        require(auction.isActive, "Auction not active");
        require(block.timestamp >= auction.endTime, "Auction not ended");
        require(!auction.isFinalized, "Already finalized");

        auction.isActive = false;
        auction.isFinalized = true;

        if (auction.currentBidder != address(0)) {
            IERC721(auction.nftContract).safeTransferFrom(
                auction.seller,
                auction.currentBidder,
                auction.tokenId
            );

            payable(auction.seller).transfer(auction.currentBid);

            emit AuctionFinalized(auctionId, auction.currentBidder, auction.currentBid);
        } else {
            emit AuctionCancelled(auctionId);
        }
    }

    function withdraw(uint256 auctionId) public nonReentrant {
        uint256 amount = pendingReturns[auctionId][msg.sender];
        require(amount > 0, "No funds to withdraw");

        pendingReturns[auctionId][msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function cancelAuction(uint256 auctionId) public {
        Auction storage auction = auctions[auctionId];
        require(auction.seller == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        require(auction.isActive, "Auction not active");
        require(auction.currentBidder == address(0), "Bids already placed");

        auction.isActive = false;
        emit AuctionCancelled(auctionId);
    }

    function getBids(uint256 auctionId) external view returns (Bid[] memory) {
        return bids[auctionId];
    }

    function updateMinimumBidIncrement(uint256 newIncrement) public onlyRole(ADMIN_ROLE) {
        minimumBidIncrement = newIncrement;
    }
}
