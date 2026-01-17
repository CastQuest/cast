// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./CAST.sol";

/**
 * @title Marketplace
 * @notice NFT marketplace for buying and selling CASTs
 */
contract Marketplace is AccessControl, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    struct Listing {
        uint256 listingId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
        uint256 listedAt;
    }

    struct Offer {
        address buyer;
        uint256 amount;
        uint256 expiresAt;
        bool isActive;
    }

    uint256 public listingCounter;
    uint256 public platformFee; // in basis points (100 = 1%)

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Offer[]) public offers;
    mapping(address => uint256[]) public userListings;

    event Listed(uint256 indexed listingId, address indexed seller, address nftContract, uint256 tokenId, uint256 price);
    event Sold(uint256 indexed listingId, address indexed buyer, uint256 price);
    event ListingCancelled(uint256 indexed listingId);
    event OfferMade(uint256 indexed listingId, address indexed buyer, uint256 amount);
    event OfferAccepted(uint256 indexed listingId, address indexed buyer, uint256 amount);

    constructor(uint256 _platformFee) {
        require(_platformFee <= 1000, "Fee too high"); // Max 10%
        platformFee = _platformFee;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function list(address nftContract, uint256 tokenId, uint256 price) public nonReentrant returns (uint256) {
        require(price > 0, "Price must be positive");
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not token owner");
        require(IERC721(nftContract).isApprovedForAll(msg.sender, address(this)) || 
                IERC721(nftContract).getApproved(tokenId) == address(this), "Not approved");

        uint256 listingId = listingCounter++;

        listings[listingId] = Listing({
            listingId: listingId,
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            isActive: true,
            listedAt: block.timestamp
        });

        userListings[msg.sender].push(listingId);

        emit Listed(listingId, msg.sender, nftContract, tokenId, price);
        return listingId;
    }

    function buy(uint256 listingId) public payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");

        listing.isActive = false;

        uint256 fee = (listing.price * platformFee) / 10000;
        uint256 sellerAmount = listing.price - fee;

        IERC721(listing.nftContract).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        payable(listing.seller).transfer(sellerAmount);

        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }

        emit Sold(listingId, msg.sender, listing.price);
    }

    function cancelListing(uint256 listingId) public {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        require(listing.isActive, "Listing not active");

        listing.isActive = false;
        emit ListingCancelled(listingId);
    }

    function makeOffer(uint256 listingId, uint256 expiresAt) public payable {
        require(listings[listingId].isActive, "Listing not active");
        require(msg.value > 0, "Offer must be positive");
        require(expiresAt > block.timestamp, "Invalid expiration");

        offers[listingId].push(Offer({
            buyer: msg.sender,
            amount: msg.value,
            expiresAt: expiresAt,
            isActive: true
        }));

        emit OfferMade(listingId, msg.sender, msg.value);
    }

    function acceptOffer(uint256 listingId, uint256 offerIndex) public nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not seller");
        require(listing.isActive, "Listing not active");

        Offer storage offer = offers[listingId][offerIndex];
        require(offer.isActive, "Offer not active");
        require(block.timestamp < offer.expiresAt, "Offer expired");

        listing.isActive = false;
        offer.isActive = false;

        uint256 fee = (offer.amount * platformFee) / 10000;
        uint256 sellerAmount = offer.amount - fee;

        IERC721(listing.nftContract).safeTransferFrom(msg.sender, offer.buyer, listing.tokenId);
        payable(msg.sender).transfer(sellerAmount);

        emit OfferAccepted(listingId, offer.buyer, offer.amount);
    }

    function getOffers(uint256 listingId) external view returns (Offer[] memory) {
        return offers[listingId];
    }

    function getUserListings(address user) external view returns (uint256[] memory) {
        return userListings[user];
    }

    function updatePlatformFee(uint256 newFee) public onlyRole(ADMIN_ROLE) {
        require(newFee <= 1000, "Fee too high");
        platformFee = newFee;
    }

    function withdrawFees() public onlyRole(ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }
}
